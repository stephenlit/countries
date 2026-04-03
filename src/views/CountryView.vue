<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCountry } from "@/composables/useCountry";

const route = useRoute();
const { countries, loading, error, fetchCountry } = useCountry();
const country = countries;

onMounted(() => {
  const name = route.params.name as string;
  fetchCountry(name);
});
</script>

<template>
  <div v-if="loading" class="mt-8 text-grey-50">Loading...</div>
  <p v-else-if="error" class="mt-8 text-base text-red-400">{{ error }}</p>

  <section v-else-if="country[0]" class="h-full px-40 mt-8 rounded-lg text-grey-50">
    <div class="mb-6">
      <RouterLink
        to="/"
        class="inline-block rounded-md bg-blue-900 px-4 py-2 text-sm font-semibold text-grey-50 shadow-md transition hover:bg-blue-950"
      >
        Back
      </RouterLink>
    </div>
    <div class="flex flex-wrap">
      <img :src="country[0].flag" :alt="`${country[0].name} flag`" class="w-1/2 shrink-0" />

      <div class="w-1/2 ml-6">
        <h1 class="mt-6 text-lg text-white font-bold">{{ country[0].name }}</h1>
        <h4 class="mt-1 text-base">Native Name: {{ country[0].nativeName }}</h4>
        <p class="mt-3 text-base">Population: {{ country[0].population.toLocaleString() }}</p>
        <p class="text-base">Region: {{ country[0].region }}</p>
        <p class="text-base">Capital: {{ country[0].capital || "N/A" }}</p>
      </div>
    </div>
  </section>

  <p v-else class="mt-8 text-base">Country not found.</p>
</template>
