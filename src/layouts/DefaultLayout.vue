<script setup lang="ts">
import { onMounted, ref } from "vue";

const isDark = ref(false);
const THEME_KEY = "countries-theme";

function applyTheme() {
  document.documentElement.classList.toggle("dark", isDark.value);
  localStorage.setItem(THEME_KEY, isDark.value ? "dark" : "light");
}

function toggleTheme() {
  isDark.value = !isDark.value;
  applyTheme();
}

onMounted(() => {
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme === "dark" || savedTheme === "light") {
    isDark.value = savedTheme === "dark";
  } else {
    isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  applyTheme();
});
</script>

<template>
  <header
    class="h-20 bg-blue-950 text-white flex items-center font-bold tracking-wide transition-colors"
  >
    <div class="w-full max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
      <h1 class="text-lg">Where in the world?</h1>

      <button
        type="button"
        role="switch"
        :aria-checked="isDark"
        :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
        class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-grey-50 shadow-md transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-grey-400/60"
        @click="toggleTheme"
      >
        <svg
          v-if="isDark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          class="h-5 w-5"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 12.8A9 9 0 1 1 11.2 3a7.2 7.2 0 1 0 9.8 9.8Z"
          />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          class="h-5 w-5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path
            stroke-linecap="round"
            d="M12 2.5v2.2M12 19.3v2.2M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"
          />
        </svg>

        <span class="sr-only">{{ isDark ? "Dark mode" : "Light mode" }}</span>
      </button>
    </div>
  </header>
  <main class="flex justify-center transition-colors">
    <div class="w-full max-w-7xl py-10 mx-auto">
      <slot />
    </div>
  </main>
</template>
