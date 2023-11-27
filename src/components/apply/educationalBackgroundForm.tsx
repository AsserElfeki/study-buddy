"use client";
import React, { useState } from 'react';
import Select from 'react-select';

const EducationalBackgroundForm = ({ nextStep, prevStep }) => {
    const [highestQualification, setHighestQualification] = useState('');
    const [institutionName, setInstitutionName] = useState('');
    const [graduationYear, setGraduationYear] = useState('');

    
    const qualificationOptions = [
        { value: 'high_school', label: 'High School' },
        { value: 'bachelor', label: 'Bachelor' },
        { value: 'master', label: 'Master' },
        { value: 'phd', label: 'PhD' },
    ];

    const yearOptions = Array.from({ length: 50 }, (_, i) => {
        return { value: new Date().getFullYear() - i, label: new Date().getFullYear() - i };
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-xl text-2xl">
            <div>
                <label htmlFor="highestQualification" className="block text-lg font-medium text-gray-700">
                    Highest Qualification
                </label>
                <Select
                    options={qualificationOptions}
                    value={highestQualification}
                    onChange={setHighestQualification}
                    name="highestQualification"
                    id="highestQualification"
                />
            </div>

            <div>
                <label htmlFor="institutionName" className="block text-lg font-medium text-gray-700">
                    Institution Name
                </label>
                <input
                    type="text"
                    name="institutionName"
                    id="institutionName"
                    className="mt-1 block w-full shadow-sm sm:text-lg border-gray-300 rounded-lg p-1"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="graduationYear" className="block text-lg font-medium text-gray-700">
                    Graduation Year
                </label>
                <Select
                    options={yearOptions}
                    value={graduationYear}
                    onChange={setGraduationYear}
                    name="graduationYear"
                    id="graduationYear"
                />
            </div>

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-lg font-bold rounded-md text-white bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Previous
                </button>
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-lg font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Next
                </button>
            </div>
        </form>
    );
};

export default EducationalBackgroundForm;
