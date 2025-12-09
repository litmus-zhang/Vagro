import CountryList, { Country } from "country-list-with-dial-code-and-flag";

export interface CountryData {
  name: string;
  code: string;
  flag: string;
  dialCode: string;
  currency: string;
  currencyCode: string;
  currencySymbol: string;
  localName: string;
}

const allCountries = CountryList.getAll();
export const extractCountryInfo = (countries: Country[]) => {
  const seen = new Set<string>();

  return countries
    .map((country) => ({
      name: country.data.name,
      code: country.data.code,
      flag: country.data.flag,
      dialCode: country.data.dial_code,
      currency: country.data.currency,
      currencyCode: country.data.currency_code,
      currencySymbol: country.data.currency_symbol,
      localName: country.data.local_name || country.data.name,
    }))
    .filter((item) => {
      if (!seen.has(item.name)) {
        seen.add(item.name);
        return true;
      }
      return false;
    });
};
export const countriesData: CountryData[] = extractCountryInfo(allCountries)

export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + "K";
  }
  return num.toString();
}
