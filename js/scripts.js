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

  // 2. Розгортання та приховування додаткового опису
  const detailsToggle = document.querySelector(".details-toggle");
  const extraDetails = document.querySelector("#extra-about");

  if (detailsToggle && extraDetails) {
    detailsToggle.addEventListener("click", () => {
      const isHidden = extraDetails.classList.toggle("is-hidden");
      detailsToggle.textContent = isHidden ? "Показати більше" : "Сховати деталі";
      detailsToggle.setAttribute("aria-expanded", String(!isHidden));
    });
  }

  // 3. Функція перемикання "В обране" для карток
  function initFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll(".favorite-button");
    favoriteButtons.forEach((btn) => {
      btn.onclick = () => {
        const isActive = btn.classList.toggle("is-active");
        btn.textContent = isActive ? "В обраному ★" : "Додати в обране";
        btn.setAttribute("aria-pressed", String(isActive));
      };
    });
  }

  // Масив щонайменше з 8 об'єктів та 3 категорій
  const items = [
    {
      id: 1,
      title: "Класичний еспресо-бар",
      category: "coffee",
      description: "Еспресо з щільним тілом, американо, фільтр-кава дня, а також капучино, лате та флет-вайт.",
      image: "images/cup of coffee.png"
    },
    {
      id: 2,
      title: "Альтернативні методи",
      category: "coffee",
      description: "Ручне приготування вибіркових моносортів методом V60, аеропрес і клейвер.",
      image: "images/cup of coffee.png"
    },
    {
      id: 3,
      title: "Фільтр-кава дня",
      category: "coffee",
      description: "Світле обсмаження зі смаковими дескрипторами стиглих цитрусів та соковитих ягід.",
      image: "images/cup of coffee.png"
    },
    {
      id: 4,
      title: "Трав'яні карпатські чаї",
      category: "tea",
      description: "Натуральні карпатські трав'яні збори з чебрецем, м'ятою та пелюстками квітів.",
      image: "images/cup of coffee.png"
    },
    {
      id: 5,
      title: "Какао на цільному молоці",
      category: "tea",
      description: "Натуральне густе какао без додавання штучних підсолоджувачів.",
      image: "images/cup of coffee.png"
    },
    {
      id: 6,
      title: "Пекарня та десерти",
      category: "pastry",
      description: "Хрусткі свіжі круасани з солодкими й солоними начинками та десерти власного виробництва.",
      image: "images/cup of coffee.png"
    },
    {
      id: 7,
      title: "Баскський чизкейк",
      category: "pastry",
      description: "Ніжний запечений сирний десерт із карамелізованою скоринкою від шефа.",
      image: "images/cup of coffee.png"
    },
    {
      id: 8,
      title: "Кава додому та зерно to-go",
      category: "coffee",
      description: "Свіже обсмажене зерно під ваш смак із безкоштовним помелом під турку або фільтр.",
      image: "images/cup of coffee.png"
    }
  ];

  // DOM-елементи
  const grid = document.querySelector("#item-grid");
  const searchInput = document.querySelector("#item-search");
  const categorySelect = document.querySelector("#category-filter");
  const resultsCount = document.querySelector("#results-count");
  const emptyMessage = document.querySelector("#empty-message");

  // Окрема функція створення картки
  function createCard(item) {
    return `
      <article class="card">
        <div class="card-header">
          <h3 class="card-title">${item.title}</h3>
          <button 
            class="favorite-button" 
            type="button" 
            aria-pressed="false"
            title="Додати напій до списку улюблених"
          >
            Додати в обране
          </button>
        </div>
        <p class="card-text">${item.description}</p>
      </article>
    `;
  }

  // Окрема функція рендерингу списку
  function renderItems(itemsToRender) {
    grid.innerHTML = itemsToRender.map(createCard).join("");
    resultsCount.textContent = `Знайдено: ${itemsToRender.length}`;
    emptyMessage.hidden = itemsToRender.length !== 0;

    initFavoriteButtons();
  }

  // Функція спільної фільтрації за пошуком і категорією
  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    const selectedCategory = categorySelect.value;

    const filteredItems = items.filter((item) => {
      const searchableText = `${item.title} ${item.description}`.toLowerCase();
      const matchesText = searchableText.includes(query);
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;

      return matchesText && matchesCategory;
    });

    renderItems(filteredItems);
  }

  // Слухачі подій
  if (searchInput && categorySelect && grid) {
    searchInput.addEventListener("input", applyFilters);
    categorySelect.addEventListener("change", applyFilters);

    // Первинний рендеринг при старті
    renderItems(items);
  }
});