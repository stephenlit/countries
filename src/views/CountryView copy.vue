<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCountry } from "@/composables/useCountry";

const route = useRoute();
const { countries, loading, error, fetchCountry } = useCountry();
const currentCountry = computed(() => countries.value[0] ?? null);

onMounted(() => {
  const name = route.params.name as string;
  fetchCountry(name);
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 w-full m-auto gap-6">
    <div class="md:col-span-3 flex justify-center md:justify-start">
      <RouterLink
        to="/"
        class="inline-block mb-6 rounded-md bg-blue-900 px-4 py-2 text-sm font-semibold text-grey-50 shadow-md transition hover:bg-blue-950"
        >Back</RouterLink
      >
    </div>

    <div v-if="loading" class="md:col-span-3 mt-8">Loading...</div>

    <p v-else-if="error" class="md:col-span-3 mt-8 text-base text-red-400">{{ error }}</p>

    <template v-else-if="currentCountry">
      <div class="flex items-center justify-center md:justify-start">
        <img
          :src="currentCountry.flag"
          :alt="`${currentCountry.name} flag`"
          class="rounded-md h-full"
        />
      </div>
      <div
        class="text-gray-50 flex flex-col gap-1 mx-auto w-full md:mx-0 md:ml-6 border border-red-500"
      >
        <h1 class="mt-1 text-lg font-bold">{{ currentCountry.name }}</h1>
        <h4 class="mt-1 text-base">Native Name: {{ currentCountry.nativeName }}</h4>
        <p class="text-base">Population: {{ currentCountry.population.toLocaleString() }}</p>
        <p class="text-base">Region: {{ currentCountry.region }}</p>
        <p class="text-base">Sub Region: {{ currentCountry.subregion }}</p>
        <p class="text-base">Capital: {{ currentCountry.capital || "N/A" }}</p>
      </div>
      <div class="flex flex-col gap-1 text-white items-start text-left w-fit mx-auto md:mx-0">
        <p>Top Level Domain: {{ currentCountry.tld }}</p>
        <p>Currencies: {{ currentCountry.currencies }}</p>
        <p>Languages: {{ currentCountry.languages }}</p>
      </div>
      <div
        class="md:col-start-2 md:col-span-2 text-white flex flex-wrap items-center justify-center md:justify-start gap-2 p-4"
      >
        <span>Border Countries:</span>
        <span
          v-for="border in currentCountry.borders"
          :key="border"
          class="bg-blue-900 px-4 py-1 rounded text-xs"
        >
          {{ border }}
        </span>
      </div>
    </template>

    <div v-else class="md:col-span-3 bg-gray-100 p-4">Country not found.</div>
  </div>
</template>
