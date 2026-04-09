<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useCountry } from "@/composables/useCountry";
import type { Countries } from "@/types/countryCard";
const props = defineProps<{
  countries: Countries;
}>();

const route = useRoute();
const { countries, loading, error, fetchCountry } = useCountry();
const currentCountry = computed(() => countries.value[0] ?? null);

onMounted(() => {
  const name = route.params.name as string;
  fetchCountry(name);
});

//re-fetch country when route changes
watch(
  () => route.params.name,
  (newName) => {
    fetchCountry(newName as string);
  },
);
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-[auto_auto_auto]">
    <RouterLink
      to="/"
      class="mb-6 ml-4 md:col-span-3 w-fit rounded-md bg-blue-900 px-5 py-1.5 font-semibold text-grey-50 shadow-md transition"
    >
      Back
    </RouterLink>
    <template v-if="currentCountry">
      <div class="md:row-span-2">
        <img
          class="w-full px-4 md:w-[400px] md:shrink-0"
          :src="currentCountry.flag"
          :alt="`${currentCountry.name} flag`"
        />
      </div>
      <div class="px-6">
        <h1 class="text-2xl font-bold mb-6 text-white">{{ currentCountry.name }}</h1>
        <h4 class="text-grey-400 tracking-wide">Native Name: {{ currentCountry.nativeName }}</h4>
        <p class="text-grey-400">Population: {{ currentCountry.population.toLocaleString() }}</p>
        <p class="text-grey-400">Region: {{ currentCountry.region }}</p>
        <p class="text-grey-400">Sub Region: {{ currentCountry.subregion }}</p>
        <p class="text-grey-400">Capital: {{ currentCountry.capital || "N/A" }}</p>
      </div>
      <div class="mt-13 px-6">
        <p class="text-grey-400">Top Level Domain: {{ currentCountry.tld }}</p>
        <p class="text-grey-400">Currencies: {{ currentCountry.currencies }}</p>
        <p class="text-grey-400">Languages: {{ currentCountry.languages }}</p>
      </div>
      <!-- Now a direct child of the grid -->
      <div class="md:col-span-2 md:col-start-2 px-6 flex flex-col gap-2 text-grey-400">
        <span>Border Countries:</span>
        <div class="flex flex-wrap gap-2">
          <template v-if="currentCountry.borders.length">
            <RouterLink
              :to="{ name: 'country', params: { name: border } }"
              class="rounded-md bg-blue-950 px-5 py-1.5 text-xs font-semibold hover:bg-blue-950 text-grey-400 shadow-md transition"
              v-for="border in currentCountry.borders"
              :key="border"
              >{{ border }}</RouterLink
            >
          </template>
          <span v-else>Border Countries: No Border Countries</span>
        </div>
      </div>
      <div class="md:col-span-3 mx-auto" v-if="loading">Loading...</div>
      <div class="md:col-span-3 ms-auto" v-if="error">{{ error }}</div>
    </template>
  </div>
</template>
