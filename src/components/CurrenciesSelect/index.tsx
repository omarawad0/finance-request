import React, { useEffect, useMemo } from 'react'
import SelectField from '../SelectField'
import { client } from '../../utils/api'
import { apiConfig } from '../../config/config'
import useAsync from '../../hooks/useAsync'
import { Currency } from '../../types/types'

const CurrenciesSelect = ({
  value,
  onChange,
  error,
  disabled
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  error?: string
  disabled?: boolean
}) => {
  const { data: currencies, run } = useAsync<Currency>()

  const countriesOptions = useMemo(() => {
    return (
      Object.keys(currencies || {})?.map((currency) => ({
        name: currency,
        code: currency
      })) || []
    )
  }, [currencies])
  useEffect(() => {
    run(client(apiConfig.currenciesApiURL))
  }, [])

  return (
    <SelectField
      label="Currency"
      name="currency"
      value={value}
      onChange={onChange}
      options={countriesOptions}
      error={error}
      disabled={disabled}
    />
  )
}

export default CurrenciesSelect
