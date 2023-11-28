"use client";

import EducationalBackgroundForm from '@components/apply/educationalBackgroundForm';
import PersonalInfoForm from '@components/apply/personalInfoForm';
import SupportingDocumentsForm from '@components/apply/supportingDocumentsForm'
import ReviewAndSubmitForm from '@components/apply/reviewAndSubmitForm';
import { useEffect, useState } from 'react';
import { startApplication } from '@src/utils/_actions';
import { useSession } from 'next-auth/react';
import ReviewDocuments from '@src/components/apply/review';

export default function ApplyPage({ params }: { params: { id: string } | null }) {
    const { data: session } = useSession();
    const [currentStep, setCurrentStep] = useState(3);
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
        graduationYear: Number,
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
        console.log("data in page: ", personalInfo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session])

    useEffect(() => {
        console.log("personal info changed: ", personalInfo);
    }, [personalInfo])

    useEffect(() => {
        console.log("educational info changed: ", educationalBackground);
    }, [educationalBackground])

    useEffect(() => {
        console.log("supporting docs changed: ", supportingDocuments);
    }, [supportingDocuments])

// create the application with user and program id
    // useEffect(() => {
    //     const Apply = async () => {
    //         const data = await startApplication(params.id);
    //         return data;
    //     }
    //     if (params && !applicationId) {
    //         const data = Apply().then(data => {setApplicationId(data.id);
    //         });
    //     }
    // }, []);

    const nextStep = () => setCurrentStep(currentStep + 1);
    const prevStep = () => setCurrentStep(currentStep - 1);

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
                        <PersonalInfoForm nextStep={nextStep} callback={setPersonalInfo} data={personalInfo} />
                        <EducationalBackgroundForm nextStep={nextStep} prevStep={prevStep} callback={setEducationalBackground} data={educationalBackground} />
                        {/* <SupportingDocumentsForm nextStep={nextStep} prevStep={prevStep} data={supportingDocuments} callback={setSupportingDocuments} /> */}
                        <ReviewDocuments files={supportingDocuments}  callback={ setSupportingDocuments }/>
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


