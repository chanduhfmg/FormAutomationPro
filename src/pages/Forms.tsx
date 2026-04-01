import React, { useEffect, useState } from 'react'
import Form1 from '../components/Forms/Form1'
import NewPatientForm from '../components/Forms/NewPatientForm'
import HIPAANotice from '../components/Forms/HIPPANotice'
import HPVScreening from '../components/Forms/HPVScreening'
import YourInsuranceCompany from '../components/Forms/YourInsuranceCompany'
import PatientPaymentAgreement from '../components/Forms/PatientPaymentAgreement'
import PaymentAndCollectionPolicy from '../components/Forms/PaymentAndCollectionPolicy'
import PrivacyPracticesForm from '../components/Forms/PrivacyPracticesForm'
import { useSearchParams } from 'react-router'
import type { PatientDto } from '../DTOs/Patient'
import useFormData from '../hooks/useFormData'
import { useGetSesionDetailsQuery } from '../redux/api/PatienSlice'
import {DNA} from "react-loader-spinner"
import { AlertCircle, XSquare } from 'lucide-react'

const FormErrorState: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="flex flex-col items-center gap-4 max-w-sm w-full text-center">

        {/* Icon */}
        <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: '#fcebeb', border: '1px solid #f09595' }}>
          <AlertCircle size={28} color="#E24B4A" />
        </div>

        {/* Title */}
        <div>
          <h2 className="text-lg font-medium" style={{ color: '#A32D2D' }}>
            Unable to load your form
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Something went wrong while fetching your session.
          </p>
        </div>

        {/* Error message box */}
        {message && (
          <div className="w-full flex items-start gap-2.5 px-4 py-3 rounded-xl text-left"
            style={{ background: 'var(--color-background-secondary, #fafafa)', border: '0.5px solid #f09595' }}>
            <XSquare size={14} color="#E24B4A" className="flex-shrink-0 mt-0.5" />
            <span className="font-mono text-xs leading-relaxed" style={{ color: '#993556' }}>
              {message}
            </span>
          </div>
        )}

        <hr className="w-full border-gray-100" />

        {/* Actions
        <div className="flex gap-2.5 w-full">
          <button
            onClick={() => window.history.back()}
            className="flex-1 h-9 rounded-lg text-sm font-medium border transition-colors"
            style={{ borderColor: '#e5e7eb', color: '#6b7280', background: 'transparent' }}
          >
            Go back
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex-1 h-9 rounded-lg text-sm font-medium text-white transition-colors"
            style={{ background: '#1a5c38' }}
          >
            Try again
          </button>
        </div> */}

        {/* <p className="text-xs text-gray-400">
          Still having issues? Contact{' '}
          <a href="mailto:support@clinic.com"
            className="font-medium" style={{ color: '#1a5c38' }}>
            support@clinic.com
          </a>
        </p> */}

      </div>
    </div>
  )
}


const Forms = () => {

  
   const [params] = useSearchParams()

    console.log("Patient ID from URL:", params.get("token"))
    const token = params.get("token")

    const {data , error:sessionError, isLoading:sessionIsLoading} = useGetSesionDetailsQuery(token)
    console.log("Session details from API:", data, sessionError, sessionIsLoading)
    

    const {formData, error , isLoading, setFormData , submitFormData } = useFormData()
    console.log("Data from useFormData hook:", error, isLoading)

    if(sessionIsLoading || isLoading) {
        return <div className='fixed h-screen w-screen flex items-center justify-center bg-white/80 backdrop-blur-sm text-lg font-medium'>
          <DNA/>
        </div>
    }

    if(sessionError || error) {
        return <FormErrorState message={sessionError?.message || error?.message} />
    }


  return (
    <div>

      {/* EMAIL FETCH */}
      <Form1 />

      {/* ALL FORMS */}
      <NewPatientForm />
      <HIPAANotice /> 
      <HPVScreening patientData={formData} formData={formData} setFormData={setFormData}/>
      <YourInsuranceCompany patientData={formData} formData={formData} setFormData={setFormData}/>
      <PatientPaymentAgreement formData={formData} setFormData={setFormData}/>
      <PaymentAndCollectionPolicy patientData={formData} formData={formData} setFormData={setFormData}/>
      <PrivacyPracticesForm formData={formData} setFormData={setFormData}/> 

      {/* 🔥 ONE SUBMIT */}
      <div className="text-center p-10">
        {/* <button onClick={handleSubmit} className="bg-black text-white px-6 py-3">
          Submit All Forms
        </button> */}
        
      </div>

      <button className='px-4 py-2 bg-black text-white rounded-xl' onClick={() => submitFormData()}>Log Form Data</button>

    </div>
  )
}

export default Forms