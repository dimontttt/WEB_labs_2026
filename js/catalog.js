/**
 * Чиста функція фільтрації.
 * Не змінює вхідний масив і не взаємодіє з DOM.
 */
export function filterItems(items, query, category) {
  const text = query.trim().toLowerCase();
  return items.filter((item) => {
    const matchesText = `${item.title} ${item.description}`
      .toLowerCase()
      .includes(text);
    const matchesCategory = category === "all" || item.category === category;
    return matchesText && matchesCategory;
  });
}

function getCategoryName(categoryKey) {
  switch (categoryKey) {
    case "coffee": return "Кава";
    case "tea": return "Чай та какао";
    case "pastry": return "Пекарня та десерти";
    default: return categoryKey;
  }
}

/**
 * Створення вузла картки безпечними засобами DOM
 */
function createCard(item) {
  const card = document.createElement("article");
  card.className = "card catalog-card";
  card.dataset.id = String(item.id);

  const header = document.createElement("div");
  header.className = "card-header";

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = item.title;

  const favButton = document.createElement("button");
  favButton.className = "favorite-button";
  favButton.type = "button";
  favButton.setAttribute("aria-pressed", "false");
  favButton.title = "Додати напій до списку улюблених";
  favButton.textContent = "Додати в обране";

  favButton.addEventListener("click", () => {
    const isActive = favButton.classList.toggle("is-active");
    favButton.textContent = isActive ? "В обраному ★" : "Додати в обране";
    favButton.setAttribute("aria-pressed", String(isActive));
  });

  header.append(title, favButton);

  const category = document.createElement("p");
  category.className = "catalog-card__category";
  category.textContent = getCategoryName(item.category);

  const description = document.createElement("p");
  description.className = "card-text";
  description.textContent = item.description;

  card.append(header, category, description);
  return card;
}

/**
 * Рендеринг елементів у DOM без використання innerHTML
 */
export function renderItems(items, grid, count, empty) {
  const fragment = document.createDocumentFragment();
  items.forEach((item) => fragment.append(createCard(item)));

  grid.replaceChildren(fragment);
  count.textContent = `Знайдено: ${items.length}`;
  empty.hidden = items.length !== 0;
}