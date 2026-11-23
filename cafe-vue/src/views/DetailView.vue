<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useMenuStore } from "../stores/menu.js";

const route = useRoute();
const store = useMenuStore();

const CATEGORY_LABELS = {
  coffee: "Класична гаряча кава",
  tea: "Холодна кава та авторські мікси",
  pastry: "Пекарня та десерти",
};

onMounted(() => {
  store.loadItems();
});

const item = computed(() =>
  store.items.find((entry) => String(entry.id) === String(route.params.id))
);
</script>

<template>
  <section class="section">
    <div class="container">
      <div v-if="store.loading" role="status" class="card state-box state-loading">
        Завантаження інформації про позицію…
      </div>

      <div v-else-if="store.error" role="alert" class="card state-box state-error">
        <p>{{ store.error }}</p>
        <button type="button" class="button" @click="store.retry()">
          Спробувати ще раз
        </button>
      </div>

      <article v-else-if="item" class="card detail-view-card">
        <div class="detail-top">
          <RouterLink :to="{ name: 'home' }" class="button button-secondary">
            &larr; Повернутися до меню
          </RouterLink>
        </div>

        <div v-if="item.image" class="image-wrapper">
          <img :src="item.image" :alt="item.title" class="detail-photo" />
        </div>

        <span class="card-category">
          {{ CATEGORY_LABELS[item.category] || item.category }}
        </span>

        <h1 class="section-title">{{ item.title }}</h1>
        <p class="section-text">{{ item.description }}</p>

        <p v-if="item.time" class="section-text">
          <strong>Час приготування:</strong> {{ item.time }} хв
        </p>
        <p v-if="item.details" class="section-text">
          <strong>Спосіб приготування:</strong> {{ item.details }}
        </p>

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

      <section v-else-if="store.hasLoaded" class="card not-found-card">
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