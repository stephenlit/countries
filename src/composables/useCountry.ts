import { ref } from "vue";
import type { Country } from "@/types/country";

export function useCountry() {
  const countries = ref<Country[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchCountry(name: string) {
    loading.value = true;

    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}?fields=name,nativename,population,region,subregion,capital,flags,currencies,languages,borders,cca2,tld`,
      );
      console.log(response.status);
      const data = await response.json();
      console.log(data);
      countries.value = data.map((country: any) => ({
        name: country.name.common,
        nativeName:
          Object.values(country.name.nativeName as Record<string, { common: string }>)[0]?.common ??
          "",
        population: country.population,
        region: country.region,
        subregion: country.subregion,
        capital: country.capital?.[0] ?? "",
        flag: country.flags.svg,
        tld: country.tld?.[0] ?? "",
        currencies: Object.values(country.currencies)
          .map((c: any) => c.name)
          .join(", "),
        languages: Object.values(country.languages).join(", "),
        borders: country.borders ?? [],
      }));
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  }

  return {
    countries,
    loading,
    error,
    fetchCountry,
  };
}
