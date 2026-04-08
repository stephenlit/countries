// useBorderCountries.ts
export function useBorderCountries() {
  const fetchBorderNames = async (codes: string[]) => {
    const res = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codes.join(",")}`);
    const data = await res.json();
    return data.map((c: any) => c.name.common);
  };

  return { fetchBorderNames };
}
