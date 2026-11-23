<script setup>
import { ref } from "vue";
import { useMenuStore } from "./stores/menu.js";

const isMenuOpen = ref(false);
const store = useMenuStore();
</script>

<template>
  <header class="site-header">
    <div class="container header-container">
      <h1 class="site-title">
        <RouterLink :to="{ name: 'home' }" class="title-link">
          Кав'ярня «Доброго дня!»
        </RouterLink>
      </h1>

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
        <RouterLink class="nav-link" :to="{ name: 'home' }">Меню</RouterLink>
        <a class="nav-link" href="/menu#about">Про нас</a>
        <a class="nav-link" href="/menu#user-wishes">Побажання та рецепти</a>
        <a class="nav-link" href="/menu#contacts">Контакти</a>
        <span class="favorites-counter" aria-live="polite">
          Обране: <strong>{{ store.favoriteCount }}</strong>
        </span>
      </nav>
    </div>
  </header>

  <main class="main-content">
    <RouterView />
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>
        &copy; 2026 <b>Кав'ярня «Доброго дня!»</b>. Створено на Vue 3 + Vite.
      </p>
    </div>
  </footer>
</template>