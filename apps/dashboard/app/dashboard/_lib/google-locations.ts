export interface GoogleLocation {
  /** DataForSEO location_name (e.g. "Italy") */
  locationName: string
  /** ISO 3166-1 alpha-2 (e.g. "IT") */
  countryCode: string
  /** Display name in native language */
  nativeName: string
  /** Default language code for this country */
  defaultLanguageCode: string
}

/**
 * Countries supported by DataForSEO, sorted by English name.
 * `locationName` maps directly to the DataForSEO `location_name` parameter.
 * `defaultLanguageCode` auto-selects the language when the user picks a country.
 */
export const googleLocations: GoogleLocation[] = [
  { locationName: "Argentina", countryCode: "AR", nativeName: "Argentina", defaultLanguageCode: "es" },
  { locationName: "Australia", countryCode: "AU", nativeName: "Australia", defaultLanguageCode: "en" },
  { locationName: "Austria", countryCode: "AT", nativeName: "Österreich", defaultLanguageCode: "de" },
  { locationName: "Belgium", countryCode: "BE", nativeName: "Belgique", defaultLanguageCode: "fr" },
  { locationName: "Brazil", countryCode: "BR", nativeName: "Brasil", defaultLanguageCode: "pt" },
  { locationName: "Bulgaria", countryCode: "BG", nativeName: "България", defaultLanguageCode: "bg" },
  { locationName: "Canada", countryCode: "CA", nativeName: "Canada", defaultLanguageCode: "en" },
  { locationName: "Chile", countryCode: "CL", nativeName: "Chile", defaultLanguageCode: "es" },
  { locationName: "China", countryCode: "CN", nativeName: "中国", defaultLanguageCode: "zh" },
  { locationName: "Colombia", countryCode: "CO", nativeName: "Colombia", defaultLanguageCode: "es" },
  { locationName: "Croatia", countryCode: "HR", nativeName: "Hrvatska", defaultLanguageCode: "hr" },
  { locationName: "Czechia", countryCode: "CZ", nativeName: "Česko", defaultLanguageCode: "cs" },
  { locationName: "Denmark", countryCode: "DK", nativeName: "Danmark", defaultLanguageCode: "da" },
  { locationName: "Egypt", countryCode: "EG", nativeName: "مصر", defaultLanguageCode: "ar" },
  { locationName: "Finland", countryCode: "FI", nativeName: "Suomi", defaultLanguageCode: "fi" },
  { locationName: "France", countryCode: "FR", nativeName: "France", defaultLanguageCode: "fr" },
  { locationName: "Germany", countryCode: "DE", nativeName: "Deutschland", defaultLanguageCode: "de" },
  { locationName: "Greece", countryCode: "GR", nativeName: "Ελλάδα", defaultLanguageCode: "el" },
  { locationName: "Hong Kong", countryCode: "HK", nativeName: "香港", defaultLanguageCode: "zh" },
  { locationName: "Hungary", countryCode: "HU", nativeName: "Magyarország", defaultLanguageCode: "hu" },
  { locationName: "India", countryCode: "IN", nativeName: "India", defaultLanguageCode: "en" },
  { locationName: "Indonesia", countryCode: "ID", nativeName: "Indonesia", defaultLanguageCode: "id" },
  { locationName: "Ireland", countryCode: "IE", nativeName: "Ireland", defaultLanguageCode: "en" },
  { locationName: "Israel", countryCode: "IL", nativeName: "ישראל", defaultLanguageCode: "he" },
  { locationName: "Italy", countryCode: "IT", nativeName: "Italia", defaultLanguageCode: "it" },
  { locationName: "Japan", countryCode: "JP", nativeName: "日本", defaultLanguageCode: "ja" },
  { locationName: "Malaysia", countryCode: "MY", nativeName: "Malaysia", defaultLanguageCode: "ms" },
  { locationName: "Mexico", countryCode: "MX", nativeName: "México", defaultLanguageCode: "es" },
  { locationName: "Netherlands", countryCode: "NL", nativeName: "Nederland", defaultLanguageCode: "nl" },
  { locationName: "New Zealand", countryCode: "NZ", nativeName: "New Zealand", defaultLanguageCode: "en" },
  { locationName: "Norway", countryCode: "NO", nativeName: "Norge", defaultLanguageCode: "nb" },
  { locationName: "Peru", countryCode: "PE", nativeName: "Perú", defaultLanguageCode: "es" },
  { locationName: "Philippines", countryCode: "PH", nativeName: "Pilipinas", defaultLanguageCode: "fil" },
  { locationName: "Poland", countryCode: "PL", nativeName: "Polska", defaultLanguageCode: "pl" },
  { locationName: "Portugal", countryCode: "PT", nativeName: "Portugal", defaultLanguageCode: "pt" },
  { locationName: "Romania", countryCode: "RO", nativeName: "România", defaultLanguageCode: "ro" },
  { locationName: "Russia", countryCode: "RU", nativeName: "Россия", defaultLanguageCode: "ru" },
  { locationName: "Saudi Arabia", countryCode: "SA", nativeName: "السعودية", defaultLanguageCode: "ar" },
  { locationName: "Serbia", countryCode: "RS", nativeName: "Србија", defaultLanguageCode: "sr" },
  { locationName: "Singapore", countryCode: "SG", nativeName: "Singapore", defaultLanguageCode: "en" },
  { locationName: "Slovakia", countryCode: "SK", nativeName: "Slovensko", defaultLanguageCode: "sk" },
  { locationName: "Slovenia", countryCode: "SI", nativeName: "Slovenija", defaultLanguageCode: "sl" },
  { locationName: "South Africa", countryCode: "ZA", nativeName: "South Africa", defaultLanguageCode: "en" },
  { locationName: "South Korea", countryCode: "KR", nativeName: "대한민국", defaultLanguageCode: "ko" },
  { locationName: "Spain", countryCode: "ES", nativeName: "España", defaultLanguageCode: "es" },
  { locationName: "Sweden", countryCode: "SE", nativeName: "Sverige", defaultLanguageCode: "sv" },
  { locationName: "Switzerland", countryCode: "CH", nativeName: "Schweiz", defaultLanguageCode: "de" },
  { locationName: "Taiwan", countryCode: "TW", nativeName: "台灣", defaultLanguageCode: "zh" },
  { locationName: "Thailand", countryCode: "TH", nativeName: "ประเทศไทย", defaultLanguageCode: "th" },
  { locationName: "Turkey", countryCode: "TR", nativeName: "Türkiye", defaultLanguageCode: "tr" },
  { locationName: "Ukraine", countryCode: "UA", nativeName: "Україна", defaultLanguageCode: "uk" },
  { locationName: "United Arab Emirates", countryCode: "AE", nativeName: "الإمارات", defaultLanguageCode: "ar" },
  { locationName: "United Kingdom", countryCode: "GB", nativeName: "United Kingdom", defaultLanguageCode: "en" },
  { locationName: "United States", countryCode: "US", nativeName: "United States", defaultLanguageCode: "en" },
  { locationName: "Vietnam", countryCode: "VN", nativeName: "Việt Nam", defaultLanguageCode: "vi" },
]

export function getLocationByCode(countryCode: string): GoogleLocation | undefined {
  return googleLocations.find((loc) => loc.countryCode === countryCode)
}
