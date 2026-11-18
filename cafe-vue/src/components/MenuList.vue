<script setup>
import MenuCard from "./MenuCard.vue";

defineProps({
  items: {
    type: Array,
    required: true,
  },
  removable: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["delete"]);
</script>

<template>
  <div class="cards-grid">
    <MenuCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      :removable="removable"
      @delete="emit('delete', $event)"
    />
  </div>
</template>
