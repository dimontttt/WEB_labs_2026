<template>
  <section class="section">
    <div class="container">
      <div class="card not-found-card">
        <h1 class="section-title">404 — Сторінку не знайдено</h1>
        <p class="section-text">
          Ви перейшли за неіснуючою адресою. Перевірте правильність посилання або
          поверніться до меню кав'ярні.
        </p>
        <RouterLink :to="{ name: 'home' }" class="button">
          На головну сторінку
        </RouterLink>
      </div>
    </div>
  </section>
</template>