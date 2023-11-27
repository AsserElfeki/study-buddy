"use client";

import EducationalBackgroundForm from '@components/apply/educationalBackgroundForm';
import PersonalInfoForm from '@components/apply/personalInfoForm';
import SupportingDocumentsForm from '@components/apply/supportingDocumentsForm'
import ReviewAndSubmitForm from '@components/apply/reviewAndSubmitForm';

import { useState } from 'react';

export default function ApplyPage({ params }: { params: { id: string } | null }) {
    const [currentStep, setCurrentStep] = useState(3);

    const nextStep = () => setCurrentStep(currentStep + 1);
    const prevStep = () => setCurrentStep(currentStep - 1);

    // a call back function that saves the data from the form to the state here
    /* 
    ToDo: 
    save the data to the state here
    mutate state here and pass it to each component
    send after the last step and review 
    */
    const handleChangePersonalInfo = () => {

    }


    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <PersonalInfoForm nextStep={nextStep} />;
            case 2:
                return <EducationalBackgroundForm nextStep={nextStep} prevStep={prevStep} />;
            case 3:
                return <SupportingDocumentsForm nextStep={nextStep} prevStep={prevStep} />;
            default:
                return <ReviewAndSubmitForm prevStep={prevStep} />;
        }
    };

    return (
        <section className='flex flex-col items-center w-full'>
            <h1 className='text-3xl font-black text-blue-600 mb-5 mt-3 '>Application Form</h1>
            <div className=' shadow-lg flex justify-center items-center w-full rounded-lg border border-slate-100 py-4'>
                {renderStep()}
            </div>
        </section>
    );
};


