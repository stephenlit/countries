<script setup lang="ts">
import type { Countries } from "@/types/countryCard";
const props = defineProps<{
  countries: Countries;
}>();
</script>

<template>
  <li
    class="w-60 bg-blue-900 text-white transition-transform duration-200 ease-out hover:-translate-y-2 hover:shadow-xl"
  >
    <RouterLink
      :to="{ name: 'country', params: { name: countries.name } }"
      class="block h-full focus:outline-none focus:ring-2 focus:ring-grey-50/60"
    >
      <div class="w-full h-30 overflow-hidden">
        <img :src="countries.flag" alt="Country Flag" class="w-full h-full object-cover" />
      </div>
      <div class="p-5">
        <h3 class="py-3 text-center text-lg font-semibold tracking-wide">
          {{ countries.name }}
        </h3>
        <p class="text-sm">Population: {{ countries.population.toLocaleString() }}</p>
        <p class="text-sm">Region: {{ countries.region }}</p>
        <p class="text-sm">Capital: {{ countries.capital }}</p>
      </div>
    </RouterLink>
  </li>
</template>
