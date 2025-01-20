import React from 'react'
import classNames from 'classnames'
import FieldError from '../FieldError'

interface DatePickerFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  min?: string
  max?: string
}

const DatePickerField = ({
  label,
  name,
  value,
  onChange,
  error,
  min,
  max
}: DatePickerFieldProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="date"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className={classNames(
          'mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
          { 'border-red-500': error }
        )}
      />
      <FieldError error={error} />
    </div>
  )
}

export default DatePickerField
