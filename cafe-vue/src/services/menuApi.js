import { API_URL } from '../config/api.js'

function mapMealCategory(raw) {
  const name = (raw.strMeal || '').toLowerCase()
  if (name.includes('coffee') || name.includes('espresso') || name.includes('mocha')) {
    return 'coffee'
  }
  if (name.includes('tea') || name.includes('smoothie') || name.includes('shake') || name.includes('lemon')) {
    return 'tea'
  }
  return 'pastry'
}

function normalizeMenuItem(raw) {
  return {
    id: raw.idMeal,
    title: raw.strMeal || 'Фірмовий десерт',
    category: mapMealCategory(raw),
    description: `Свіжа позиція з вітрини кав’ярні «Доброго дня!» — ${raw.strMeal}.`,
    image: raw.strMealThumb || '',
    time: 10,
    details: `Авторський рецепт кав’ярні «Доброго дня!» для позиції «${raw.strMeal}». Подається свіжим до філіжанки кави.`,
  }
}

export async function fetchMenuItems() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error(`Помилка HTTP: ${response.status}`)
  }

  const payload = await response.json()

  if (!payload || !Array.isArray(payload.meals)) {
    throw new Error('Некоректна структура відповіді від сервера')
  }

  return payload.meals.slice(0, 8).map(normalizeMenuItem)
}