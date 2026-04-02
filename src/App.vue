<script setup lang="ts">
import DefaultLayout from "./layouts/DefaultLayout.vue";
import { useCounterStore } from "./stores/counter";
import { useCountryStore } from "./stores/countryStore";

const store = useCountryStore();
store.fetchCountries();
</script>

<template>
  <DefaultLayout>
    <router-view />
  </DefaultLayout>
</template>
