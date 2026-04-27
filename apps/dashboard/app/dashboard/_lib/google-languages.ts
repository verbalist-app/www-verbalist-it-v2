export interface GoogleLanguage {
  code: string
  name: string
  nativeName: string
}

/**
 * Google interface languages (hl parameter).
 * Sorted alphabetically by English name.
 */
export const googleLanguages: GoogleLanguage[] = [
  { code: "af", name: "Afrikaans", nativeName: "Afrikaans" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "az", name: "Azerbaijani", nativeName: "Azərbaycan" },
  { code: "be", name: "Belarusian", nativeName: "Беларуская" },
  { code: "bg", name: "Bulgarian", nativeName: "Български" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "bs", name: "Bosnian", nativeName: "Bosanski" },
  { code: "ca", name: "Catalan", nativeName: "Català" },
  { code: "cs", name: "Czech", nativeName: "Čeština" },
  { code: "cy", name: "Welsh", nativeName: "Cymraeg" },
  { code: "da", name: "Danish", nativeName: "Dansk" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "el", name: "Greek", nativeName: "Ελληνικά" },
  { code: "en", name: "English", nativeName: "English" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "et", name: "Estonian", nativeName: "Eesti" },
  { code: "eu", name: "Basque", nativeName: "Euskara" },
  { code: "fa", name: "Persian", nativeName: "فارسی" },
  { code: "fi", name: "Finnish", nativeName: "Suomi" },
  { code: "fil", name: "Filipino", nativeName: "Filipino" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "gl", name: "Galician", nativeName: "Galego" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "he", name: "Hebrew", nativeName: "עברית" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "hr", name: "Croatian", nativeName: "Hrvatski" },
  { code: "hu", name: "Hungarian", nativeName: "Magyar" },
  { code: "hy", name: "Armenian", nativeName: "Հայերեն" },
  { code: "id", name: "Indonesian", nativeName: "Indonesia" },
  { code: "is", name: "Icelandic", nativeName: "Íslenska" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "ka", name: "Georgian", nativeName: "ქართული" },
  { code: "kk", name: "Kazakh", nativeName: "Қазақша" },
  { code: "km", name: "Khmer", nativeName: "ភាសាខ្មែរ" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ko", name: "Korean", nativeName: "한국어" },
  { code: "lt", name: "Lithuanian", nativeName: "Lietuvių" },
  { code: "lv", name: "Latvian", nativeName: "Latviešu" },
  { code: "mk", name: "Macedonian", nativeName: "Македонски" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "ms", name: "Malay", nativeName: "Melayu" },
  { code: "my", name: "Burmese", nativeName: "မြန်မာဘာသာ" },
  { code: "nb", name: "Norwegian", nativeName: "Norsk" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands" },
  { code: "pl", name: "Polish", nativeName: "Polski" },
  { code: "pt-BR", name: "Portuguese (Brazil)", nativeName: "Português (Brasil)" },
  { code: "pt-PT", name: "Portuguese (Portugal)", nativeName: "Português (Portugal)" },
  { code: "ro", name: "Romanian", nativeName: "Română" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
  { code: "sk", name: "Slovak", nativeName: "Slovenčina" },
  { code: "sl", name: "Slovenian", nativeName: "Slovenščina" },
  { code: "sq", name: "Albanian", nativeName: "Shqip" },
  { code: "sr", name: "Serbian", nativeName: "Српски" },
  { code: "sv", name: "Swedish", nativeName: "Svenska" },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "th", name: "Thai", nativeName: "ไทย" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
  { code: "uz", name: "Uzbek", nativeName: "Oʻzbekcha" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt" },
  { code: "zh-CN", name: "Chinese (Simplified)", nativeName: "中文（简体）" },
  { code: "zh-TW", name: "Chinese (Traditional)", nativeName: "中文（繁體）" },
]

export function getLanguageByCode(code: string): GoogleLanguage | undefined {
  return googleLanguages.find((lang) => lang.code === code)
}
