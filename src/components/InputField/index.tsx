import React from 'react'
import classNames from 'classnames'
import FieldError from '../FieldError'
import InputMask from 'react-input-mask'

interface InputFieldProps {
  label: string
  name: string
  type: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  mask?: string
  placeholder?: string
}

const InputField = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  mask,
  placeholder
}: InputFieldProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {mask ? (
        <InputMask
          mask={mask}
          placeholder={placeholder}
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={classNames(
            'mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
            { 'border-red-500': error }
          )}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={classNames(
            'mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
            { 'border-red-500': error }
          )}
        />
      )}

      <FieldError error={error} />
    </div>
  )
}

export default InputField
