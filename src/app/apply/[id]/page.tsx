"use client";

import EducationalBackgroundForm from '@src/components/apply/EducationalBackgroundForm';
import PersonalInfoForm from '@src/components/apply/PersonalInfoForm';
import ReviewAndSubmitForm from '@src/components/apply/ReviewAndSubmitForm';
import SupportingDocumentsForm from '@src/components/apply/SupportingDocumentsForm'
import { useState } from 'react';

export default function ApplyPage({ params }: { params: { id: string } | null }) {
    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = () => setCurrentStep(currentStep + 1);
    const prevStep = () => setCurrentStep(currentStep - 1);

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


