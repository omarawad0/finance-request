import React from 'react'
import classNames from 'classnames'
import FieldError from '../FieldError'

interface SelectFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: Array<{ code: string; name: string }>
  error?: string
  disabled?: boolean
}

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  disabled
}: SelectFieldProps) => {
  return (
    <div className="mb-4 flex-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={classNames(
          'mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
          { 'border-red-500': error }
        )}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.code} value={option.code}>
            {option.name}
          </option>
        ))}
      </select>
      <FieldError error={error} />
    </div>
  )
}

export default SelectField
