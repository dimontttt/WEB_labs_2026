<script setup>
import { computed, onMounted, ref } from "vue";
import { useMenuStore } from "../stores/menu.js";
import MenuList from "../components/MenuList.vue";
import UserWishForm from "../components/UserWishForm.vue";

const store = useMenuStore();
const showExtraAbout = ref(false);

const query = ref("");
const category = ref("all");
const userItems = ref([]);
const statusMessage = ref("");

onMounted(() => {
  store.loadItems();
});

const filteredMenu = computed(() => {
  const text = query.value.trim().toLowerCase();
  return store.items.filter(
    (item) =>
      (category.value === "all" || item.category === category.value) &&
      `${item.title} ${item.description}`.toLowerCase().includes(text)
  );
});

function resetFilters() {
  query.value = "";
  category.value = "all";
}

function addUserItem(item) {
  userItems.value = [...userItems.value, item];
  statusMessage.value = "Запис додано до списку.";
}

function deleteUserItem(id) {
  userItems.value = userItems.value.filter((item) => item.id !== id);
  statusMessage.value = "Запис видалено.";
}
</script>

<template>
  <section id="about" class="section about-section">
    <div class="container">
      <h2 class="section-title">Про нас</h2>
      <p class="section-text">
        «Доброго дня!» — це локальний міський брю-бар і простір неквапливого
        відпочинку. Ми готуємо напої виключно зі 100% арабіки класу specialty,
        співпрацюючи з перевіреними українськими обсмажчиками.
      </p>

      <div v-if="showExtraAbout" class="extra-details">
        <p class="section-text">
          Для гостей ми облаштували відкриту світлу залу з барною стійкою з
          масиву дуба та тихий коворкінг-куточок із м'якими кріслами,
          розетками біля столів і надійним Wi-Fi.
        </p>
      </div>

      <div class="about-actions">
        <button
          class="button button-secondary details-toggle"
          type="button"
          :aria-expanded="String(showExtraAbout)"
          @click="showExtraAbout = !showExtraAbout"
        >
          {{ showExtraAbout ? "Сховати деталі" : "Показати більше" }}
        </button>
        <a href="#services" class="button">Ознайомитися з меню</a>
      </div>

      <div class="image-wrapper">
        <img
          src="/images/cafe.jfif"
          alt="Інтер'єр кав'ярні «Доброго дня!»"
        />
      </div>
    </div>
  </section>

  <section id="services" class="section services-section">
    <div class="container">
      <h2 class="section-title">Послуги та меню</h2>

      <div class="catalog-controls filter-actions">
        <label for="item-search">Пошук</label>
        <input
          id="item-search"
          v-model.trim="query"
          type="search"
          placeholder="Введіть назву або опис"
        />

        <label for="category-filter">Категорія</label>
        <select id="category-filter" v-model="category">
          <option value="all">Усі</option>
          <option value="coffee">Класична гаряча кава</option>
          <option value="tea">Холодна кава та авторські мікси</option>
          <option value="pastry">Пекарня та десерти</option>
        </select>

        <button
          v-if="query || category !== 'all'"
          type="button"
          class="button button-secondary"
          @click="resetFilters"
        >
          Скинути фільтри
        </button>
      </div>

      <p v-if="store.loading" role="status" class="state-box state-loading">
        Завантаження меню з сервера…
      </p>

      <section v-else-if="store.error" role="alert" class="state-box state-error">
        <p>{{ store.error }}</p>
        <button type="button" class="button" @click="store.retry()">
          Спробувати ще раз
        </button>
      </section>

      <p v-else-if="filteredMenu.length === 0" id="empty-message" class="state-box">
        Нічого не знайдено.
      </p>

      <template v-else>
        <p id="results-count" aria-live="polite">
          Знайдено позицій: {{ filteredMenu.length }}
        </p>
        <MenuList :items="filteredMenu" />
      </template>

      <div class="image-wrapper">
        <img
          src="/images/cup of coffee.png"
          alt="Свіжозварена кава у кав'ярні «Доброго дня!»"
        />
      </div>
    </div>
  </section>

  <section id="user-wishes" class="section user-wishes-section">
    <div class="container">
      <h2 class="section-title">Побажання та рецепти гостей</h2>
      <p class="section-text">
        Поділіться ідеєю нового авторського напою, рецептом чи побажанням до
        нашого меню.
      </p>

      <UserWishForm @add="addUserItem" />

      <p v-if="statusMessage" role="status" class="user-status-message">
        {{ statusMessage }}
      </p>

      <h3 class="subsection-title">Мої рецепти та побажання</h3>
      <MenuList
        v-if="userItems.length > 0"
        :items="userItems"
        :removable="true"
        @delete="deleteUserItem"
      />
      <p v-else class="empty-state">Власних записів поки немає.</p>
    </div>
  </section>

  <section id="contacts" class="section contacts-section">
    <div class="container">
      <h2 class="section-title">Контакти</h2>
      <div class="contacts-card">
        <p class="contact-item">
          <strong>Адреса:</strong> вул. Центральна, 12, Київ, Україна
        </p>
        <p class="contact-item">
          <strong>Графік роботи:</strong> Пн–Пт 08:00–21:00, Сб–Нд 09:00–22:00
        </p>
        <p class="contact-item">
          <strong>Email:</strong>
          <a class="contact-link" href="mailto:info@dobrogodnya.coffee"
            >info@dobrogodnya.coffee</a
          >
        </p>
      </div>
    </div>
  </section>
</template>