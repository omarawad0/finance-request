import React from 'react'
import classNames from 'classnames'
import FieldError from '../FieldError'

interface TextAreaFieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  error?: string
  maxLength?: number
}

const TextAreaField = ({ label, name, value, onChange, error, maxLength }: TextAreaFieldProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        rows={3}
        className={classNames(
          'mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
          { 'border-red-500': error }
        )}
      />
      <div className="flex justify-between">
        <FieldError error={error} />
        {maxLength && (
          <p className="mt-2 text-sm text-gray-500">
            {value.length}/{maxLength} characters
          </p>
        )}
      </div>
    </div>
  )
}

export default TextAreaField
