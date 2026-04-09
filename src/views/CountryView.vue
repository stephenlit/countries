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
      class="mb-6 ml-4 md:col-span-3 inline-flex items-center gap-2 w-fit rounded-md bg-blue-900 px-5 py-1.5 font-semibold text-grey-50 shadow-md transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        class="h-4 w-4"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 18l-6-6 6-6" />
      </svg>
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
        <h4 class="text-white tracking-wide">
          Native Name: <span class="text-grey-400">{{ currentCountry.nativeName }}</span>
        </h4>
        <p class="text-white">
          Population:
          <span class="text-grey-400">{{ currentCountry.population.toLocaleString() }}</span>
        </p>
        <p class="text-white">
          Region: <span class="text-grey-400">{{ currentCountry.region }}</span>
        </p>
        <p class="text-white">
          Sub Region: <span class="text-grey-400">{{ currentCountry.subregion }}</span>
        </p>
        <p class="text-white">
          Capital: <span class="text-grey-400">{{ currentCountry.capital || "N/A" }}</span>
        </p>
      </div>
      <div class="mt-13 px-6">
        <p class="text-white">
          Top Level Domain: <span class="text-grey-400">{{ currentCountry.tld }}</span>
        </p>
        <p class="text-white">
          Currencies: <span class="text-grey-400">{{ currentCountry.currencies }}</span>
        </p>
        <p class="text-white">
          Languages: <span class="text-grey-400">{{ currentCountry.languages }}</span>
        </p>
      </div>
      <!-- Now a direct child of the grid -->
      <div class="md:col-span-2 md:col-start-2 px-6 flex flex-col gap-2 text-grey-400">
        <span class="text-white">Border Countries:</span>
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
          <span v-else class="text-white"
            >Border Countries: <span class="text-grey-400">No Border Countries</span></span
          >
        </div>
      </div>
      <div class="md:col-span-3 mx-auto" v-if="loading">Loading...</div>
      <div class="md:col-span-3 ms-auto" v-if="error">{{ error }}</div>
    </template>
  </div>
</template>
