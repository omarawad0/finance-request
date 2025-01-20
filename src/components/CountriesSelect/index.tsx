import React, { useEffect, useMemo } from 'react'
import SelectField from '../SelectField'
import { client } from '../../utils/api'
import { apiConfig } from '../../config/config'
import useAsync from '../../hooks/useAsync'
import { Country } from '../../types/types'

const CountriesSelect = ({
  value,
  onChange,
  error
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  error?: string
}) => {
  const { data: countries, run } = useAsync<Country[]>()

  const countriesOptions = useMemo(() => {
    return (
      countries?.map((country) => ({
        name: country.name.common,
        code: country.cca2
      })) || []
    )
  }, [countries])

  useEffect(() => {
    run(client(apiConfig.countriesApiURL))
  }, [])

  return (
    <SelectField
      label="Country"
      name="countryCode"
      value={value}
      onChange={onChange}
      options={countriesOptions}
      error={error}
    />
  )
}

export default CountriesSelect
