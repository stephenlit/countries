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
    <ul class="flex gap-2 flex-wrap items-center justify-center w-full">
      <CountryCard v-for="country in paginated" :countries="country" />
    </ul>
  </main>
</template>
