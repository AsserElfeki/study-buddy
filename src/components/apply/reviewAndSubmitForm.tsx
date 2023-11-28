"use client";

import { Divider } from '@mui/material';

const ReviewAndSubmitForm = ({ personalInfo, educationalBackground, onEdit, onSubmit , children}) => {
    return (
        <div className="p-4">

            <Divider className='mt-2 mb-6'>Personal Information</Divider>

            <div className="grid grid-cols-2 gap-2 mb-8 mx-auto font-bold ">
                <span className="text-left font-lg">Official First Name(s):</span>
                <span className="text-right">{personalInfo.firstName}</span>

                <span className="text-left font-lg">Official Last Name:</span>
                <span className="text-right">{personalInfo.lastName}</span>

                <span className="text-left font-lg">Email:</span>
                <span className="text-right flex justify-end items-center">{personalInfo.email}</span>

                <span className="text-left font-lg">Phone Number:</span>
                <span className="text-right">{personalInfo.phoneNumber}</span>

                <span className="text-left font-lg">Nationality</span>
                <span className="text-right">{personalInfo.nationality.label}</span>

                <span className="text-left font-lg">Date of Birth:</span>
                <span className="text-right">{personalInfo.dateOfBirth}</span>

                <span className="text-left font-lg">Native Language:</span>
                <span className="text-right">{personalInfo.nativeLanguage.label}</span>

                <span className="text-left font-lg">English Proficiency:</span>
                <span className="text-right">{personalInfo.englishProficiency.label}</span>
            </div>
            

            <Divider className='mt-2 mb-6'>Educational Background</Divider>
            <div className="grid grid-cols-2 gap-2 mb-8  mx-auto font-bold ">
                <span className="text-left font-lg">Highest Qualification:</span>
                <span className="text-right">{educationalBackground.highestQualification.label}</span>

                <span className="text-left font-lg">Institution Name:</span>
                <span className="text-right">{educationalBackground.institutionName}</span>

                <span className="text-left font-lg">Graduation Year:</span>
                <span className="text-right">{educationalBackground.graduationYear.label}</span>
            </div>

            <Divider className='mt-2 mb-6'>Supporting Documents</Divider>
            
            {children}

            <div className="flex justify-between mt-6">
                <button
                    onClick={onEdit}
                    className="py-2 px-4 border border-transparent shadow-sm text-lg font-bold rounded-md text-white bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Edit
                </button>
                <button
                    onClick={onSubmit}
                    className="py-2 px-4 border border-transparent shadow-sm text-lg font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default ReviewAndSubmitForm;
