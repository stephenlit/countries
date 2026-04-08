<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useCountryStore } from "@/stores/countryStore";
import CountryCard from "@/components/CountryCard.vue";
const store = useCountryStore();

const currentPage = ref(1);
const perPage = 20;

const paginated = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return store.filteredCountries.slice(start, start + perPage);
});

const totalPages = computed(() => Math.ceil(store.filteredCountries.length / perPage));

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

watch(
  () => [store.searchQuery, store.selectedRegion],
  () => {
    currentPage.value = 1; // Reset to first page on filter change
  },
);
</script>

<template>
  <div class="flex md:justify-between flex-wrap justify-center">
    <input
      v-model="store.searchQuery"
      type="text"
      placeholder="Search for a country..."
      class="w-64 mb-6 rounded-md bg-blue-900 px-5 py-2.5 text-sm font-semibold text-grey-50 shadow-md transition focus:outline-none focus:ring-2 focus:ring-grey-50/60"
    />
    <select
      v-model="store.selectedRegion"
      class="w-64 mb-6 rounded-md bg-blue-900 px-5 py-2.5 text-sm font-semibold text-grey-50 shadow-md transition focus:outline-none focus:ring-2 focus:ring-grey-50/60"
    >
      <option value="">All Regions</option>
      <option value="Africa">Africa</option>
      <option value="Americas">Americas</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  </div>
  <ul class="flex gap-15 flex-wrap justify-center md:justify-between w-full grow">
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
      :disabled="currentPage === totalPages"
    >
      Next
    </button>
  </div>
</template>
