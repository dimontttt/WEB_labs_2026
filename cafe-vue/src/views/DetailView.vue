<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useMenuStore } from "../stores/menu.js";

const route = useRoute();
const store = useMenuStore();

const CATEGORY_LABELS = {
  coffee: "Кава",
  tea: "Чай та авторські мікси",
  pastry: "Пекарня та десерти",
};

const item = computed(() =>
  store.items.find((entry) => String(entry.id) === String(route.params.id))
);
</script>

<template>
  <section class="section">
    <div class="container">
      <article v-if="item" class="card detail-view-card">
        <div class="detail-top">
          <RouterLink :to="{ name: 'home' }" class="button button-secondary">
            &larr; Повернутися до меню
          </RouterLink>
        </div>

        <span class="card-category">
          {{ CATEGORY_LABELS[item.category] || item.category }}
        </span>

        <h1 class="section-title">{{ item.title }}</h1>
        <p class="section-text">{{ item.description }}</p>

        <div class="detail-actions">
          <button
            type="button"
            class="favorite-button"
            :class="{ 'is-active': store.isFavorite(item.id) }"
            :aria-pressed="store.isFavorite(item.id)"
            @click="store.toggleFavorite(item.id)"
          >
            {{
              store.isFavorite(item.id)
                ? "★ Прибрати з обраного"
                : "☆ До обраного"
            }}
          </button>
        </div>
      </article>

      <section v-else class="card not-found-card">
        <h1 class="section-title">Позицію не знайдено</h1>
        <p class="section-text">
          На жаль, позиції з ідентифікатором «{{ route.params.id }}» немає у
          нашому меню.
        </p>
        <RouterLink :to="{ name: 'home' }" class="button">
          Повернутися до каталогу
        </RouterLink>
      </section>
    </div>
  </section>
</template>