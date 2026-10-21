document.addEventListener("DOMContentLoaded", () => {
  // 1. Мобільне меню (бургер)
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector("#main-navigation");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "Закрити меню" : "Меню сайту";
    });
  }

  // 2. Розгортання та приховування додаткового опису ("Показати більше")
  const detailsToggle = document.querySelector(".details-toggle");
  const extraDetails = document.querySelector("#extra-about");

  if (detailsToggle && extraDetails) {
    detailsToggle.addEventListener("click", () => {
      const isHidden = extraDetails.classList.toggle("is-hidden");
      detailsToggle.textContent = isHidden ? "Показати більше" : "Сховати деталі";
      detailsToggle.setAttribute("aria-expanded", String(!isHidden));
    });
  }

  // 3. Незалежний перемикач "В обране" для кожної картки меню
  const favoriteButtons = document.querySelectorAll(".favorite-button");

  favoriteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isActive = btn.classList.toggle("is-active");
      btn.textContent = isActive ? "В обраному ★" : "Додати в обране";
      btn.setAttribute("aria-pressed", String(isActive));
    });
  });
});