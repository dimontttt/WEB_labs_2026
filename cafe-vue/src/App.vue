<script setup>
import { computed, ref } from "vue";
import { menuItems } from "./data/menuItems.js";
import MenuList from "./components/MenuList.vue";
import UserWishForm from "./components/UserWishForm.vue";

const isMenuOpen = ref(false);
const showExtraAbout = ref(false);

const query = ref("");
const category = ref("all");
const userItems = ref([]);
const statusMessage = ref("");

const filteredMenu = computed(() => {
  const text = query.value.trim().toLowerCase();
  return menuItems.filter(
    (item) =>
      (category.value === "all" || item.category === category.value) &&
      `${item.title} ${item.description}`.toLowerCase().includes(text),
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
  <header class="site-header">
    <div class="container header-container">
      <h1 class="site-title">Кав'ярня «Доброго дня!»</h1>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="String(isMenuOpen)"
        aria-controls="main-navigation"
        @click="isMenuOpen = !isMenuOpen"
      >
        {{ isMenuOpen ? "Закрити меню" : "Меню сайту" }}
      </button>

      <nav
        id="main-navigation"
        class="main-nav"
        :class="{ 'is-open': isMenuOpen }"
        aria-label="Головна навігація"
      >
        <a class="nav-link" href="#about">Про нас</a>
        <a class="nav-link" href="#services">Послуги та меню</a>
        <a class="nav-link" href="#user-wishes">Побажання та рецепти</a>
        <a class="nav-link" href="#contacts">Контакти</a>
      </nav>
    </div>
  </header>

  <main class="main-content">
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
      </div>
    </section>

    <section id="services" class="section services-section">
      <div class="container">
        <h2 class="section-title">Послуги та меню</h2>

        <div class="catalog-controls">
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
            <option value="coffee">Кава</option>
            <option value="tea">Чай та авторські мікси</option>
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

        <p id="results-count" aria-live="polite">
          Знайдено позицій: {{ filteredMenu.length }}
        </p>

        <MenuList v-if="filteredMenu.length > 0" :items="filteredMenu" />
        <p v-else id="empty-message">Нічого не знайдено.</p>
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
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>
        &copy; 2026 <b>Кав'ярня «Доброго дня!»</b>. Створено на Vue 3 + Vite.
      </p>
    </div>
  </footer>
</template>
