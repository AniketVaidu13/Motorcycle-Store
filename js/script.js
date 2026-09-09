document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.promo-card');
  const dots = document.querySelectorAll('.promo-dot');
  let currentSlide = 0;
  let autoPlayTimer;

  function showSlide(index) {
    cards[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = (index + cards.length) % cards.length;

    cards[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  // Click on dots
  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const targetIndex = parseInt(e.target.dataset.index, 10);
      showSlide(targetIndex);
      resetAutoPlay();
    });
  });

  // Auto-play rotation every 5 seconds
  function startAutoPlay() {
    autoPlayTimer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
  }

  // Touch Swipe Support for Mobile
  const slider = document.getElementById('promoSlider');
  let startX = 0;

  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    const diffX = startX - e.changedTouches[0].clientX;
    if (Math.abs(diffX) > 40) {
      if (diffX > 0) showSlide(currentSlide + 1); // Swipe left
      else showSlide(currentSlide - 1);           // Swipe right
      resetAutoPlay();
    }
  }, { passive: true });

  startAutoPlay();
});

