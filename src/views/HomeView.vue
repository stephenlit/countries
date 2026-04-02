<script setup lang="ts">
import { ref, computed } from "vue";
import { useCountryStore } from "@/stores/countryStore";
import CountryCard from "@/components/CountryCard.vue";
const store = useCountryStore();

const currentPage = ref(1);
const perPage = 20;

const paginated = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return store.countries.slice(start, start + perPage);
});

function nextPage() {
  currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}
</script>

<template>
  <main>
    <ul class="flex gap-15 flex-wrap items-center justify-center w-full">
      <CountryCard v-for="country in paginated" :key="country.name" :countries="country" />
    </ul>
    <div class="mt-10 flex items-center justify-center gap-4">
      <button
        class="rounded-md bg-blue-900 px-5 py-2.5 text-sm font-semibold text-grey-50 shadow-md transition hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-grey-50/60 disabled:cursor-not-allowed disabled:opacity-40"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        Previous
      </button>
      <button
        class="rounded-md bg-blue-900 px-5 py-2.5 text-sm font-semibold text-grey-50 shadow-md transition hover:bg-blue-950 focus:outline-none focus:ring-2 focus:ring-grey-50/60"
        @click="nextPage"
      >
        Next
      </button>
    </div>
  </main>
</template>
