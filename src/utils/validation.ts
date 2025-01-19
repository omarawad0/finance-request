import { format } from 'date-fns'

const letter = /[aA-zZ]/
const digit = /[1-9]/
/* XXXX-XXXX */
export const projectCodeMask = [letter, letter, letter, letter, '-', digit, digit, digit, digit]

export const formatDate = (date: Date) => {
  return format(date, 'yyyy-MM-dd') // Formats date as "YYYY-MM-DD"
}

export function isOPECCountry(countryCode: string) {
  const opecCountries = [
    'DZ',
    'AO',
    'CG',
    'GQ',
    'GA',
    'IR',
    'IQ',
    'KW',
    'LY',
    'NG',
    'SA',
    'AE',
    'VE'
  ]
  return opecCountries.includes(countryCode)
}
