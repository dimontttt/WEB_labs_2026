<script setup>
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

const CATEGORY_LABELS = {
  coffee: "Кава",
  tea: "Чай та авторські мікси",
  pastry: "Пекарня та десерти",
};
</script>

<template>
  <article class="card user-card">
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
    </div>

    <span class="card-category">
      {{ CATEGORY_LABELS[item.category] || item.category }}
    </span>

    <p class="card-text">{{ item.description }}</p>
  </article>
</template>
