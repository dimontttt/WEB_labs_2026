import { loadItems } from "./api.js";
import { filterItems, renderItems } from "./catalog.js";
import { debounce } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Інтерфейсні елементи з попередніх робіт (меню та деталі)
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector("#main-navigation");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "Закрити меню" : "Меню сайту";
    });
  }

  const detailsToggle = document.querySelector(".details-toggle");
  const extraDetails = document.querySelector("#extra-about");

  if (detailsToggle && extraDetails) {
    detailsToggle.addEventListener("click", () => {
      const isHidden = extraDetails.classList.toggle("is-hidden");
      detailsToggle.textContent = isHidden ? "Показати більше" : "Сховати деталі";
      detailsToggle.setAttribute("aria-expanded", String(!isHidden));
    });
  }

  // 2. DOM-елементи каталогу та станів
  const grid = document.querySelector("#item-grid");
  const searchInput = document.querySelector("#item-search");
  const categorySelect = document.querySelector("#category-filter");
  const resultsCount = document.querySelector("#results-count");
  const emptyMessage = document.querySelector("#empty-message");

  const statusMessage = document.querySelector("#load-status");
  const errorMessage = document.querySelector("#load-error");
  const retryButton = document.querySelector("#retry-load");

  let items = [];

  /**
   * Оновлення відображення каталогу за поточними значеннями фільтрів
   */
  function updateView() {
    const filtered = filterItems(items, searchInput.value, categorySelect.value);
    renderItems(filtered, grid, resultsCount, emptyMessage);
  }

  /**
   * Асинхронне завантаження каталогу та керування станами інтерфейсу
   */
  async function init() {
    searchInput.disabled = true;
    categorySelect.disabled = true;
    retryButton.disabled = true;
    retryButton.hidden = true;
    errorMessage.hidden = true;

    statusMessage.textContent = "Завантаження…";
    grid.setAttribute("aria-busy", "true");
    grid.replaceChildren();
    resultsCount.textContent = "";
    emptyMessage.hidden = true;

    let loaded = false;

    try {
      items = await loadItems();
      updateView();
      loaded = true;
    } catch (error) {
      items = [];
      errorMessage.textContent = "Не вдалося завантажити каталог. Спробуйте ще раз.";
      errorMessage.hidden = false;
      retryButton.hidden = false;
      console.error(error);
    } finally {
      statusMessage.textContent = "";
      grid.setAttribute("aria-busy", "false");
      searchInput.disabled = !loaded;
      categorySelect.disabled = !loaded;
      retryButton.disabled = false;
      if (loaded) {
        retryButton.hidden = true;
    }
    }
  }

  // Реєстрація слухачів подій (виконується лише один раз)
  const debouncedUpdateView = debounce(updateView, 300);
  searchInput.addEventListener("input", debouncedUpdateView);
  categorySelect.addEventListener("change", updateView);
  retryButton.addEventListener("click", init);

  // Первинний запуск
  init();
});