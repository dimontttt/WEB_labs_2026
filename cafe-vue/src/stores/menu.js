import { defineStore } from 'pinia'
import { menuItems } from '../data/menuItems.js'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    items: menuItems,
    favoriteIds: [],
  }),
  getters: {
    favoriteCount: (state) => state.favoriteIds.length,
    isFavorite: (state) => (id) => state.favoriteIds.includes(id),
  },
  actions: {
    toggleFavorite(id) {
      if (this.favoriteIds.includes(id)) {
        this.favoriteIds = this.favoriteIds.filter((itemId) => itemId !== id)
      } else {
        this.favoriteIds = [...this.favoriteIds, id]
      }
    },
  },
})