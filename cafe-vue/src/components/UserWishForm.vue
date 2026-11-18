<script setup>
import { ref } from "vue";

const emit = defineEmits(["add"]);

const title = ref("");
const category = ref("");
const description = ref("");
const errorMessage = ref("");

function submitForm() {
  const cleanTitle = title.value.trim();
  const cleanDescription = description.value.trim();

  if (
    cleanTitle.length < 3 ||
    cleanTitle.length > 80 ||
    cleanDescription.length < 10 ||
    cleanDescription.length > 500 ||
    !category.value
  ) {
    errorMessage.value =
      "Перевірте назву (3–80 символів), категорію та опис (10–500 символів).";
    return;
  }

  emit("add", {
    id: `user-${crypto.randomUUID()}`,
    title: cleanTitle,
    category: category.value,
    description: cleanDescription,
  });

  title.value = "";
  category.value = "";
  description.value = "";
  errorMessage.value = "";
}
</script>

<template>
  <form class="booking-form" @submit.prevent="submitForm">
    <div class="form-field">
      <label for="user-title">Назва напою або побажання</label>
      <input
        id="user-title"
        v-model="title"
        type="text"
        required
        minlength="3"
        maxlength="80"
        placeholder="Наприклад: Лавандовий раф на мигдалевому молоці"
      />
    </div>

    <div class="form-field">
      <label for="user-category">Категорія</label>
      <select id="user-category" v-model="category" required>
        <option value="">Оберіть категорію</option>
        <option value="coffee">Кава</option>
        <option value="tea">Чай та авторські мікси</option>
        <option value="pastry">Пекарня та десерти</option>
      </select>
    </div>

    <div class="form-field">
      <label for="user-description">Опис або рецепт</label>
      <textarea
        id="user-description"
        v-model="description"
        rows="4"
        required
        minlength="10"
        maxlength="500"
        placeholder="Опишіть інгредієнти, спосіб приготування або ваше побажання (мінімум 10 символів)"
      ></textarea>
    </div>

    <button type="submit" class="button submit-btn">Додати</button>

    <p v-if="errorMessage" role="alert" class="user-status-message">
      {{ errorMessage }}
    </p>
  </form>
</template>
