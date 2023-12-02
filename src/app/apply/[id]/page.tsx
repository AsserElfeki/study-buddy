"use client";

import EducationalBackgroundForm from '@components/apply/educationalBackgroundForm';
import PersonalInfoForm from '@components/apply/personalInfoForm';
import SupportingDocumentsForm from '@components/apply/supportingDocumentsForm'
import ReviewAndSubmitForm from '@components/apply/reviewAndSubmitForm';
import { use, useEffect, useState } from 'react';
import { startApplication } from '@src/utils/_actions';
import { useSession } from 'next-auth/react';
import ReviewDocuments from '@src/components/apply/review';

export default function ApplyPage({ params }: { params: { id: string } | null }) {
    const { data: session } = useSession();
    const [currentStep, setCurrentStep] = useState(1);
    const [applicationId, setApplicationId] = useState("");
    
    //forms state :
    const [personalInfo, setPersonalInfo] = useState({
        firstName: session?.user?.firstName? session.user.firstName : "",
        lastName: session?.user?.lastName? session.user.lastName : "",
        email: session?.user?.email? session.user.email : "",
        phoneNumber: "",
        dateOfBirth: "",
        nationality: "",
        nativeLanguage: "",
        englishProficiency: "",
    });

    const [educationalBackground, setEducationalBackground] = useState({
        highestQualification: "",
        institutionName: "",
        graduationYear: "",
    });

    const [supportingDocuments, setSupportingDocuments] = useState({
        documents: [],
        numFiles: 3,

    });


    useEffect(() => {
        setPersonalInfo({
            ...personalInfo,
            firstName: session?.user?.firstName,
            lastName: session?.user?.lastName,
            email: session?.user?.email,
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session])

    const nextStep = () => setCurrentStep(currentStep + 1);
    const prevStep = () => setCurrentStep(currentStep - 1);

    const handleEdit = async () => {  
        setCurrentStep(1);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // await submitApplication(applicationId, personalInfo, educationalBackground, supportingDocuments);
        console.log("submitting application");
        console.log("personalInfo: ", personalInfo);
        console.log("educationalBackground: ", educationalBackground);
        console.log("supportingDocuments: ", supportingDocuments);

        const application = await startApplication(params.id, personalInfo, educationalBackground, supportingDocuments);
        //ToDo: create personal ifno 
        //ToDo: create educational background
        //ToDo: upload supporting documents
        //todo: save documents to database


    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <PersonalInfoForm nextStep={nextStep} callback={setPersonalInfo} data={ personalInfo } />;
            case 2:
                return <EducationalBackgroundForm nextStep={nextStep} prevStep={prevStep} callback={setEducationalBackground} data={educationalBackground} />;
            case 3:
                return <SupportingDocumentsForm nextStep={nextStep} prevStep={prevStep} data={ supportingDocuments} callback={setSupportingDocuments}/>;
            default:
                return (
                    <section>
                        <ReviewAndSubmitForm personalInfo={personalInfo} educationalBackground={educationalBackground} onEdit={handleEdit} onSubmit={handleSubmit} >
                            <ReviewDocuments files={supportingDocuments} callback={setSupportingDocuments} />
                        </ReviewAndSubmitForm>
                    </section>
                );
        }
    };

    return (
        <section className='flex flex-col items-center w-full bg-zinc-100'>
            <h1 className='text-3xl font-black text-blue-600 mb-5 mt-3 '>Application Form</h1>
            <div className=' shadow-lg flex justify-center items-center w-full rounded-lg border border-slate-100 py-4 h-fit'>
                {renderStep()}
            </div>
        </section>
    );
};


