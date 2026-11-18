import { readUserItems, writeUserItems } from "./storage.js";

const CATEGORY_LABELS = {
  coffee: "Кавовий рецепт",
  tea: "Чай та авторські мікси",
  dessert: "Десерт або побажання"
};

export function initUserItems() {
  const form = document.querySelector("#user-item-form");
  const list = document.querySelector("#user-list");
  const message = document.querySelector("#user-message");
  const empty = document.querySelector("#user-empty");

  if (!form || !list || !message || !empty) return;

  let userItems;
  try {
    userItems = readUserItems();
  } catch (error) {
    userItems = [];
    message.textContent = "Не вдалося відновити записи. Список почато в пам’яті.";
    console.error(error);
  }

  function renderUserItems() {
    list.replaceChildren();

    for (const item of userItems) {
      const card = document.createElement("article");
      card.className = "card user-card";

      const header = document.createElement("div");
      header.className = "card-header";

      const titleEl = document.createElement("h4");
      titleEl.className = "card-title";
      titleEl.textContent = item.title;

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "delete-button";
      deleteBtn.textContent = "Видалити";
      deleteBtn.dataset.deleteId = item.id;

      header.append(titleEl, deleteBtn);

      const categoryBadge = document.createElement("span");
      categoryBadge.className = "user-card-category";
      categoryBadge.textContent = CATEGORY_LABELS[item.category] || item.category;

      const descEl = document.createElement("p");
      descEl.className = "card-text";
      descEl.textContent = item.description;

      card.append(header, categoryBadge, descEl);
      list.append(card);
    }

    empty.hidden = userItems.length !== 0;
  }

  function commit(nextItems) {
    userItems = nextItems;
    renderUserItems();

    try {
      writeUserItems(userItems);
      return true;
    } catch (error) {
      message.textContent = "Зміни є в пам’яті, але не збережені після закриття сторінки.";
      console.error(error);
      return false;
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const title = String(data.get("title") ?? "").trim();
    const category = String(data.get("category") ?? "");
    const description = String(data.get("description") ?? "").trim();

    if (
      title.length < 3 ||
      title.length > 80 ||
      description.length < 10 ||
      description.length > 500 ||
      !Object.hasOwn(CATEGORY_LABELS, category)
    ) {
      message.textContent = "Перевірте назву, категорію й опис.";
      form.elements.namedItem("title").focus();
      return;
    }

    const record = {
      id: `user-${crypto.randomUUID()}`,
      title,
      category,
      description
    };

    const saved = commit([...userItems, record]);
    if (saved) {
      message.textContent = "Запис додано й збережено.";
    }

    form.reset();
    form.elements.namedItem("title").focus();
  });

  list.addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-id]");
    if (!button || !list.contains(button)) return;

    const id = button.dataset.deleteId;
    const saved = commit(userItems.filter((item) => item.id !== id));
    if (saved) {
      message.textContent = "Запис видалено й зміни збережено.";
    }

    form.elements.namedItem("title").focus();
  });

  renderUserItems();
}