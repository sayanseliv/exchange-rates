<script setup lang="ts"></script>

<template>
  <header class="header">
    <div class="container header__container">
      <RouterLink to="/" class="header__logo-link">
        <img
          alt="Exchange logo"
          class="header__logo"
          src="@/assets/logo.svg"
          width="24"
          height="24"
      /></RouterLink>
      <nav class="header__nav">
        <RouterLink to="/">Домашня</RouterLink>
        <RouterLink to="/changed-exchange">Змінені курси</RouterLink>
        <RouterLink to="/search-currency">Пошук курсу</RouterLink>
      </nav>
    </div>
  </header>
</template>
<style scoped>
.header {
  background-color: var(--white);
}
.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-block: 1rem;
}
.header__nav {
  display: flex;
  gap: 0.5rem;
}
.header__nav > a {
  position: relative;
  display: inline-block;
  color: var(--blue);
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
}
.header__nav > a::after {
  content: '';
  position: absolute;
  width: 0%;
  height: 1px;
  left: 50%;
  bottom: 0;
  background-color: currentColor;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}
.header__nav > a:hover::after {
  width: 100%;
}
.header__nav > .router-link-exact-active::after {
  width: 100%;
}
@media screen and (max-width: 640px) {
  .header__container {
    flex-direction: column;
    align-items: flex-start;
  }
  .header__logo-link {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .header__logo {
    height: 56px;
    width: auto;
  }
  .header__nav {
    flex-wrap: wrap;
  }
}
</style>
