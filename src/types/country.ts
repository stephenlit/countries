export interface Country {
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
  flag: string;
  tld: string; // top level domain
  currencies: string;
  languages: string; // turn the languages object into a comma-separated string
  borders: string[];
  cca2: string; // 2 letter country code
}
