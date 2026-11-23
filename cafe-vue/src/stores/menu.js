import { defineStore } from 'pinia'
import { fetchMenuItems } from '../services/menuApi.js'
import * as menuData from '../data/menuItems.js'

const LOCAL_ITEMS =
  menuData.default ||
  menuData.MENU_ITEMS ||
  menuData.menuItems ||
  Object.values(menuData).find(Array.isArray) ||
  []

export const useMenuStore = defineStore('menu', {
  state: () => ({
    items: [],
    favoriteIds: [],
    loading: false,
    error: '',
    hasLoaded: false,
  }),
  getters: {
    favoriteCount: (state) => state.favoriteIds.length,
    isFavorite: (state) => (id) => state.favoriteIds.includes(id),
  },
  actions: {
    async loadItems(force = false) {
      if (this.loading) return
      if (this.hasLoaded && !force) return

      this.loading = true
      this.error = ''

      try {
        const apiDesserts = await fetchMenuItems()
        const localDrinks = LOCAL_ITEMS.filter((item) => item.category !== 'pastry')
        const combined = [...localDrinks, ...apiDesserts]

        this.items = combined
        this.hasLoaded = true

        const validIds = new Set(combined.map((item) => item.id))
        this.favoriteIds = this.favoriteIds.filter((id) => validIds.has(id))
      } catch (err) {
        this.items = []
        this.hasLoaded = false
        this.error = 'Не вдалося завантажити меню з сервера. Перевірте з’єднання та спробуйте ще раз.'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    retry() {
      return this.loadItems(true)
    },
    toggleFavorite(id) {
      if (this.favoriteIds.includes(id)) {
        this.favoriteIds = this.favoriteIds.filter((itemId) => itemId !== id)
      } else {
        this.favoriteIds = [...this.favoriteIds, id]
      }
    },
  },
})