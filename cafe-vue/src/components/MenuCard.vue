<script setup>
import { useMenuStore } from "../stores/menu.js";

defineProps({
  item: {
    type: Object,
    required: true,
  },
  removable: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["delete"]);
const store = useMenuStore();

const CATEGORY_LABELS = {
  coffee: "Класична гаряча кава",
  tea: "Холодна кава та авторські мікси",
  pastry: "Пекарня та десерти",
};
</script>

<template>
  <article class="card user-card">
    <img
      v-if="item.image"
      :src="item.image"
      :alt="item.title"
      class="card-image"
    />

    <div class="card-header">
      <h3 class="card-title">{{ item.title }}</h3>

      <button
        v-if="removable"
        type="button"
        class="delete-button"
        @click="emit('delete', item.id)"
      >
        Видалити
      </button>

      <button
        v-else
        type="button"
        class="favorite-button"
        :class="{ 'is-active': store.isFavorite(item.id) }"
        :aria-pressed="store.isFavorite(item.id)"
        @click="store.toggleFavorite(item.id)"
      >
        {{ store.isFavorite(item.id) ? "★ В обраному" : "☆ До обраного" }}
      </button>
    </div>

    <span class="card-category">
      {{ CATEGORY_LABELS[item.category] || item.category }}
    </span>

    <p class="card-text">{{ item.description }}</p>

    <div v-if="!removable" class="card-footer-actions">
      <RouterLink
        :to="{ name: 'detail', params: { id: item.id } }"
        class="detail-link"
      >
        Докладніше &rarr;
      </RouterLink>
    </div>
  </article>
</template>