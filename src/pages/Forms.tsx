import React from 'react'
import Form1 from '../components/Forms/Form1'
import NewPatientForm from '../components/Forms/NewPatientForm'
import HIPAANotice from '../components/Forms/HIPPANotice'
import HPVScreening from '../components/Forms/HPVScreening'
import YourInsuranceCompany from '../components/Forms/YourInsuranceCompany'
import PatientPaymentAgreement from '../components/Forms/PatientPaymentAgreement'
import PaymentAndCollectionPolicy from '../components/Forms/PaymentAndCollectionPolicy'
import PrivacyPracticesForm from '../components/Forms/PrivacyPracticesForm'

const Forms = () => {
  return (
    <div>
        <Form1/>
        <NewPatientForm/>
        <HIPAANotice/>
        <HPVScreening/>
        <YourInsuranceCompany/>
        <PatientPaymentAgreement/>
        <PaymentAndCollectionPolicy/>
        <PrivacyPracticesForm/>
    </div>
  )
}

export default Forms