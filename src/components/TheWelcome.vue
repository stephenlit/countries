<script setup lang="ts">
import { useCountries } from "@/composables/useCountries";

const { countries, loading, error } = useCountries();
</script>

<template>
  <div>
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>
    <pre>{{ countries[0] }}</pre>
  </div>
</template>
