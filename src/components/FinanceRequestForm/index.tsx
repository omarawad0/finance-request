/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import useFinancingForm from '../../hooks/useFinanceRequestForm'
import { useFinanceRequestValidation } from '../../hooks/useValidation'
import InputField from '../InputField'
import TextAreaField from '../TextAreaField'
import DatePickerField from '../DatePickerField'
import { client } from '../../utils/api'
import CountriesSelect from '../CountriesSelect'
import CurrenciesSelect from '../CurrenciesSelect'
import { formatDate, isOPECCountry, projectCodeMask } from '../../utils/validation'
import { addDays, addYears, differenceInYears } from 'date-fns'
import { apiConfig } from '../../config/config'
import { FinanceRequestFormData } from '../../types/types'

const FinanceRequestForm = () => {
  const { formData, handleInputChange } = useFinancingForm()
  const { validate } = useFinanceRequestValidation()
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      const submissionData = prepareSubmitData(formData)
      client(apiConfig.financialApiURL, null, {
        method: 'POST',
        body: JSON.stringify(submissionData)
      })
      console.log('Submitting data:', submissionData)
      alert('Financing request submitted successfully!')
    }
  }

  const isOpec = isOPECCountry(formData.countryCode)
  const minStartDate = formatDate(addDays(new Date(), 15))
  const maxEndDate = formData.validityStartDate
    ? formatDate(addYears(new Date(formData.validityStartDate), 3))
    : ''

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6">Finance Request</h2>

      <InputField
        label="Name"
        name="fullName"
        type="text"
        value={formData.fullName}
        onChange={handleInputChange}
        error={errors.fullName}
      />

      <InputField
        label="Project Code"
        name="projectCode"
        type="text"
        value={formData.projectCode}
        onChange={handleInputChange}
        error={errors.projectCode}
        mask={projectCodeMask as any}
        placeholder="ABCD-1234"
      />

      <div className="flex space-x-4">
        <div className="flex-1">
          <CountriesSelect
            value={formData.countryCode}
            onChange={handleInputChange}
            error={errors.countryCode}
          />
        </div>
        <div className="flex-1">
          <CurrenciesSelect
            value={formData.currency}
            onChange={handleInputChange}
            error={errors.currency}
            disabled={isOpec}
          />
        </div>
      </div>

      <InputField
        label="Amount"
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleInputChange}
        error={errors.amount}
      />
      <TextAreaField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        error={errors.description}
        maxLength={150}
      />

      <DatePickerField
        label="Validity Start Date"
        name="validityStartDate"
        value={formData.validityStartDate}
        onChange={handleInputChange}
        error={errors.validityStartDate}
        min={minStartDate}
      />

      <DatePickerField
        label="Validity End Date"
        name="validityEndDate"
        value={formData.validityEndDate}
        onChange={handleInputChange}
        error={errors.validityEndDate}
        min={formData.validityStartDate}
        max={maxEndDate}
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit Request
      </button>
    </form>
  )
}

export default FinanceRequestForm

const prepareSubmitData = (formData: FinanceRequestFormData) => {
  const { validityStartDate, validityEndDate, ...rest } = formData
  return {
    ...rest,
    date: new Date(formData.validityStartDate).toISOString(),
    validityPeriod: differenceInYears(new Date(validityEndDate), new Date(validityStartDate))
  }
}
