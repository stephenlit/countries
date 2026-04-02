<script setup lang="ts">
import type { Countries } from "@/types/countryCard";
const props = defineProps<{
  countries: Countries;
}>();
</script>

<template>
  <li class="bg-blue-900 text-white w-60">
    <div class="w-full h-48 overflow-hidden">
      <img :src="countries.flag" alt="Country Flag" class="w-full h-40" />
    </div>
    <h3>Name: {{ props.countries.name }}</h3>
    <p>Population: {{ props.countries.population }}</p>
    <p>Region: {{ props.countries.region }}</p>
    <p>Capital: {{ props.countries.capital }}</p>
  </li>
</template>
