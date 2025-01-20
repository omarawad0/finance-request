import { useState } from 'react'
import { FinanceRequestFormData } from '../types/types'
import { addDays, addYears } from 'date-fns'
import { formatDate, isOPECCountry } from '../utils/validation'

const useFinanceRequestForm = () => {
  const [formData, setFormData] = useState<FinanceRequestFormData>({
    fullName: '',
    countryCode: '',
    projectCode: '',
    description: '',
    amount: 0,
    currency: '',
    validityStartDate: formatDate(addDays(new Date(), 15)),
    validityEndDate: formatDate(addYears(addDays(new Date(), 15), 1))
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    if (name === 'countryCode') {
      if (value && isOPECCountry(value)) {
        setFormData((prev) => ({ ...prev, currency: 'USD' }))
      }
    } else if (name === 'validityStartDate') {
      const startDate = new Date(value)
      if (!isNaN(startDate.getTime())) {
        const endDate = addYears(startDate, 1)
        setFormData((prev) => ({
          ...prev,
          validityStartDate: formatDate(startDate),
          validityEndDate: formatDate(endDate)
        }))
      }
    }
    if (name === 'projectCode') {
      setFormData((prev) => ({ ...prev, projectCode: value.toUpperCase() }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: type === 'number' ? Number(value) : value }))
    }
  }

  return { formData, setFormData, handleInputChange }
}

export default useFinanceRequestForm
