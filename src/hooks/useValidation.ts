/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from 'yup'
import { useCallback } from 'react'
import { FinanceRequestFormData } from '../types/types'
import { addDays, addYears, startOfDay } from 'date-fns'

const requiredMessage = (label: string) => `${label} is required`

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required(requiredMessage('Name')),
  countryCode: Yup.string().required(requiredMessage('Country')),
  projectCode: Yup.string()
    .matches(/^[A-Z]{4}-[1-9]{4}$/, 'Invalid project code format')
    .required(requiredMessage('Project code')),
  description: Yup.string()
    .max(150, 'Description must be 150 characters or less')
    .required(requiredMessage('Description')),
  amount: Yup.number().positive('Amount must be positive').required('Amount is required'),
  currency: Yup.string().required(requiredMessage('Currency')),
  validityStartDate: Yup.date()
    .transform((_value, originalValue) => (originalValue ? new Date(originalValue) : null))
    .min(startOfDay(addDays(new Date(), 15)), 'Start date must be at least 15 days from now')
    .required(requiredMessage('Start date')),

  validityEndDate: Yup.date()
    .transform((_value, originalValue) => (originalValue ? new Date(originalValue) : null))
    .when('validityStartDate', (startDate: any, schema) =>
      startDate
        ? schema
            .min(
              startOfDay(addYears(startDate, 1)),
              'End date must be at least 1 year after start date'
            )
            .max(
              startOfDay(addYears(startDate, 3)),
              'End date must be within 3 years of start date'
            )
        : schema
    )
    .required(requiredMessage('End date'))
})

export const useFinanceRequestValidation = () => {
  const validate = useCallback((formData: FinanceRequestFormData) => {
    try {
      validationSchema.validateSync(formData, { abortEarly: false })
      return {}
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors: { [key: string]: string } = {}
        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path] = err.message
          }
        })
        return errors
      }
      return {}
    }
  }, [])

  return { validate }
}
