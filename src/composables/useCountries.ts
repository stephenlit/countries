import {ref, onMounted} from 'vue'
import type {Country} from '@/types/country'

export function useCountries() {
    const countries = ref<Country[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    async function fetchCountries() {
        loading.value = true

        try {
            const response = await fetch('https://restcountries.com/v3/all')
            console.log(response.status)
            const data = await response.json()
            console.log(data)
            countries.value = data.map((country: Country) => ({
                name: country.name,
                nativeName: country.nativeName,
                population: country.population,
                region: country.region,
                subregion: country.subregion,
                capital: country.capital,
                flag: country.flag,
                tld: country.tld[0],
                currencies: country.currencies,
                languages: Array.isArray(country.languages) ? country.languages.map((lang: any) => lang.name).join(', ') : country.languages,
                borders: country.borders
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
