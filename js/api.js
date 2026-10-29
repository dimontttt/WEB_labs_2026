const ALLOWED_CATEGORIES = new Set(["coffee", "tea", "pastry"]);

/**
 * Асинхронно завантажує та валідує дані каталогу з JSON
 */
export async function loadItems() {
  const url = new URL("../data/items.json", import.meta.url);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: помилка завантаження даних`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Очікується масив об’єктів");
  }

  const seenIds = new Set();

  for (const item of data) {
    if (typeof item !== "object" || item === null) {
      throw new Error("Некоректний формат елемента каталогу");
    }

    const { id, title, category, description, image } = item;

    // Перевірка id: унікальне додатне ціле число
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error(`Некоректний ID: ${id}. Очікується додатне ціле число.`);
    }

    if (seenIds.has(id)) {
      throw new Error(`Дубльований ID: ${id}. Усі ID мають бути унікальними.`);
    }
    seenIds.add(id);

    // Перевірка рядкових полів
    if (typeof title !== "string" || !title.trim()) {
      throw new Error(`Некоректна назва у елемента з ID ${id}`);
    }

    if (typeof description !== "string") {
      throw new Error(`Некоректний опис у елемента з ID ${id}`);
    }

    if (typeof image !== "string" || !image.trim()) {
      throw new Error(`Некоректний шлях до зображення у елемента з ID ${id}`);
    }

    // Перевірка допустимості категорії
    if (!ALLOWED_CATEGORIES.has(category)) {
      throw new Error(`Невідома категорія "${category}" у елемента з ID ${id}`);
    }
  }

  return data;
}