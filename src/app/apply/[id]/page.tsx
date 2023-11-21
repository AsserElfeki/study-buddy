"use client";

import EducationalBackgroundForm from '@src/components/apply/EducationalBackgroundForm';
import PersonalInfoForm from '@src/components/apply/PersonalInfoForm';
import ReviewAndSubmitForm from '@src/components/apply/ReviewAndSubmitForm';
import React from 'react'

export default function ApplyPage({ params }: { params: { id: string } | null }) {
    const [currentStep, setCurrentStep] = React.useState(1);

    const nextStep = () => setCurrentStep(currentStep + 1);
    const prevStep = () => setCurrentStep(currentStep - 1);

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <PersonalInfoForm nextStep={nextStep} />;
            case 2:
                return <EducationalBackgroundForm nextStep={nextStep} prevStep={prevStep} />;
            // Add additional cases for other steps
            case 3:
                return <SupportingDocumentsForm nextStep={nextStep} prevStep={prevStep} />;
            default:
                return <ReviewAndSubmitForm prevStep={prevStep} />;
        }
    };

    return (
        <section className='flex flex-col items-center w-full'>
            <h1>Application Form</h1>
            <div className='border-4 border-red-800 shadow-lg flex justify-center items-center w-full'>
                {renderStep()}
            </div>
        </section>
    );
};


