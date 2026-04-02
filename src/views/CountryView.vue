<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useCountryStore } from "@/stores/countryStore";

const route = useRoute();
const store = useCountryStore();

const country = computed(() => {
  const name = route.params.name as string;
  return store.countries.find((item) => item.name === name);
});
</script>

<template>
  <main class="mx-auto w-full max-w-3xl px-6 py-10 h-screen">
    <RouterLink
      to="/"
      class="inline-block rounded-md bg-blue-900 px-4 py-2 text-sm font-semibold text-grey-50 shadow-md transition hover:bg-blue-950"
    >
      Back
    </RouterLink>

    <section v-if="country" class="mt-8 rounded-lg bg-blue-900 p-6 text-grey-50 shadow-lg">
      <div class="w-full overflow-hidden rounded-md bg-blue-950">
        <img :src="country.flag" :alt="`${country.name} flag`" class="h-52 w-full object-contain" />
      </div>
      <h1 class="mt-6 text-3xl font-bold">{{ country.name }}</h1>
      <p class="mt-3 text-base">Population: {{ country.population.toLocaleString() }}</p>
      <p class="text-base">Region: {{ country.region }}</p>
      <p class="text-base">Capital: {{ country.capital || "N/A" }}</p>
    </section>

    <p v-else class="mt-8 text-base">Country not found.</p>
  </main>
</template>
