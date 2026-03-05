import React from 'react'
import FormContainer from '../UI/FormContainer'
import HeaderImage from '../UI/HeaderImage'

type LineInputProps = {
  className?: string;
  type?: "text" | "email" | "tel" | "date" | "number";
};

const LineInput = ({ className = ""  , type}: LineInputProps) => (
  <input
    type={type || "text"}
    className={`border-b border-black outline-none px-1 w-full  ${className}`}
  />
);


const NewPatientForm = () => {
  return (
    <FormContainer>
        <HeaderImage />
        <div className="max-w-4xl mx-auto p-4 sm:p-8 text-xs sm:text-sm text-black">

  <h2 className="text-center font-semibold mb-6">
    PATIENT REGISTRATION FORM
  </h2>

  {/* Name Row */}
  <div className="flex flex-col flex-wrap sm:flex-row sm:items-end gap-2 sm:gap-4 mb-4">
    <div className="flex items-end gap-2 flex-1 sm:w-40">
      <label className="whitespace-nowrap">First Name</label>
      <LineInput className="flex-1" />
    </div>

    <div className="flex items-end gap-2  sm:w-auto flex-1 sm:w-40">
      <label>M</label>
      <LineInput className="w-16 sm:w-12 " />
    </div>

    <div className="flex items-end gap-2 flex-1 sm:w-40">
      <label className="whitespace-nowrap">Last Name</label>
      <LineInput className="flex-1" />
    </div>
  </div>

  {/* Address */}
  <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4 mb-4">
    <div className="flex items-end gap-2 w-full">
      <label>Address</label>
      <LineInput className="flex-1" />
    </div>

    <div className="flex items-end gap-2 w-full sm:w-40">
      <label>Apt#</label>
      <LineInput className="flex-1" />
    </div>
  </div>

  {/* City State Zip */}
  <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4 mb-4">
    <div className="flex items-end gap-2 w-full flex-1 sm:w-40">
      <label>City</label>
      <LineInput className="flex-1" />
    </div>

    <div className="flex items-end gap-2 w-full flex-1 sm:w-40">
      <label>State</label>
      <LineInput className="flex-1" />
    </div>

    <div className="flex items-end gap-2 w-full flex-1 sm:w-40">
      <label>Zip Code</label>
      <LineInput className="flex-1" />
    </div>
  </div>

  {/* SSN + DOB */}
  <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4 mb-4">
    <div className="flex items-end gap-2">
      <label>SS#</label>
      <LineInput className="flex-1" />
    </div>

    <div className="flex items-end gap-2">
      <label>Date of Birth</label>
      <LineInput className="flex-1" type='date' />
    </div>

    <div className="flex items-end gap-2 w-full sm:w-28">
      <label>Sex</label>
      <LineInput className="flex-1" />
    </div>

    <div className="flex items-end gap-2 w-full sm:w-40">
      <label>Marital Status</label>
      <LineInput className="flex-1" />
    </div>
  </div>

  {/* Phone */}
  <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4 mb-4">
    <div className="flex items-end gap-2 w-full">
      <label>Phone</label>
      <LineInput className="flex-1" />
    </div>

    <div className="flex items-end gap-2 w-full">
      <label>Alternative Phone</label>
      <LineInput className="flex-1" />
    </div>
  </div>

  {/* Emergency */}
  <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4 mb-4">
    <div className="flex items-end gap-2 w-full">
      <label>Emergency Contact</label>
      <LineInput className="flex-1" />
    </div>

    <div className="flex items-end gap-2 w-full">
      <label>Phone</label>
      <LineInput className="flex-1" />
    </div>
  </div>

  {/* Full Width Fields */}
  {[
    "Please list your primary care clinician:",
    "Please list any other providers that are currently involved in your care:",
    "PATIENT EMPLOYER:",
    "Occupation",
    "Company Name & Address",
    "Self Pay"
  ].map((label, i) => (
    <div key={i} className="mb-4">
      <label>{label}</label>
      <LineInput className="w-full mt-1" />
    </div>
  ))}

  {/* Pharmacy */}
  <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4 mb-4">
    <div className="flex items-end gap-2 w-full">
      <label>Pharmacy</label>
      <LineInput className="flex-1" />
    </div>
    <div className="flex items-end gap-2 w-full">
      <label>Location</label>
      <LineInput className="flex-1" />
    </div>
  </div>

  {/* Government Section */}
  <div className="mb-2 font-semibold text-xs sm:text-sm">
    New Government regulations require medical offices to ask the following questions:
  </div>

  <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4 mb-6">
    <div className="flex items-end gap-2 w-full">
      <label>Language</label>
      <LineInput className="flex-1" />
    </div>
    <div className="flex items-end gap-2 w-full">
      <label>Race</label>
      <LineInput className="flex-1" />
    </div>
    <div className="flex items-end gap-2 w-full">
      <label>Ethnicity</label>
      <LineInput className="flex-1" />
    </div>
  </div>

  {/* Insurance */}
  <h3 className="font-semibold mb-2">
    MEDICAL INSURANCE INFORMATION
  </h3>

  <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4 mb-6">
    <div className="flex items-end gap-2 w-full">
      <label>Primary Insurance</label>
      <LineInput className="flex-1" />
    </div>
    <div className="flex items-end gap-2 w-full">
      <label>Secondary Insurance</label>
      <LineInput className="flex-1" />
    </div>
  </div>

  {/* Signature */}
  <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4 mt-8">
    <div className="flex items-end gap-2 w-full">
      <label>SIGNATURE</label>
      <LineInput className="flex-1" />
    </div>
    <div className="flex items-end gap-2 w-full sm:w-60">
      <label>DATE</label>
      <LineInput className="flex-1" />
    </div>
  </div>

</div>
    </FormContainer>
  )
}

export default NewPatientForm