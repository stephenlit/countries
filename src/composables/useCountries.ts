import {ref, onMounted} from 'vue'
import type {Countries} from '@/types/countryCard'

export function useCountries() {
    const countries = ref<Countries[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function fetchCountries() {
        loading.value = true

        try {
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags')
            const data = await response.json() 
            countries.value = data.map((country: Countries) => ({
                name: country.name,
                population: country.population,
                region: country.region,
                capital: country.capital,
                flag: country.flag,
            }))
        } catch (err) {
            error.value = (err as Error).message
        } finally {
            loading.value = false
        }  
    }

    onMounted(fetchCountries)

    return {
        countries,
        loading,
        error
    }
}
