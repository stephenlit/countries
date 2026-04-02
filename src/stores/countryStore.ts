import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import type { Countries } from '@/types/countryCard'


export const useCountryStore = defineStore('countries', () => {
  const countries = ref<Countries[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchCountries() {
    if (countries.value.length) return // don't refetch if already loaded
    loading.value = true
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,cca3')
      const data = await response.json()
      countries.value = data.map((country: any) => ({
        name: country.name.common,
        population: country.population,
        region: country.region,
        capital: country.capital?.[0] ?? '',
        flag: country.flags.png,
        cca3: country.cca3
      }))
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  return { countries, loading, error, fetchCountries }
})