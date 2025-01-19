export interface FinanceRequestFormData {
  fullName: string
  countryCode: string
  projectCode: string
  description: string
  amount: number
  currency: string
  validityStartDate: string
  validityEndDate: string
}

export type Country = {
  name: {
    common: string // "Egypt"
    official: string // "Arab Republic of Egypt"
    nativeName?: Record<string, { official: string; common: string }>
  }
  cca2: string // "EG"
  cca3: string // "EGY"
  ccn3: string // "818"
  flag: string // "🇪🇬"
  flags: {
    png: string
    svg: string
    alt?: string
  }
  coatOfArms?: {
    png?: string
    svg?: string
  }
  region: string // "Africa"
  subregion: string // "Northern Africa"
  population: number // 104258327
  area: number // 1002450
  capital: string[] // ["Cairo"]
  languages: Record<string, string> // { ara: "Arabic" }
  currencies: Record<string, { name: string; symbol: string }> // { EGP: { name: "Egyptian pound", symbol: "£" } }
  borders?: string[] // ["ISR", "LBY", "SDN"]
  timezones: string[] // ["UTC+02:00"]
  demonyms?: Record<string, { f: string; m: string }>
  latlng: [number, number] // [26.0, 30.0]
  maps: {
    googleMaps: string
    openStreetMaps: string
  }
}

export type Currency = Record<string, string>
