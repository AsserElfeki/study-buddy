"use client";
import React, { useState } from 'react';
import Select from 'react-select';

const EducationalBackgroundForm = ({ nextStep, prevStep, callback, data }) => {
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        callback(prevForm => ({ ...prevForm, [name]: value }));
    }

    const handleQualificationChange = (selectedOption) => {
        callback(prevForm => ({ ...prevForm, highestQualification: selectedOption }));
    };

    const handleGraduationYearChange = (selectedOption) => {
        callback(prevForm => ({ ...prevForm, graduationYear: selectedOption }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-xl text-2xl h-fit">
            <div >
                <label htmlFor="highestQualification" className="block text-lg font-medium text-gray-700">
                    Highest Qualification
                </label>
                <Select
                    options={qualificationOptions}
                    value={data.highestQualification}
                    onChange={handleQualificationChange}
                    name="highestQualification"
                    id="highestQualification"
                    required
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
                    value={data.institutionName}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className='h-auto'>
                <label htmlFor="graduationYear" className="block text-lg font-medium text-gray-700">
                    Graduation Year
                </label>
                <Select
                    options={yearOptions}
                    value={data.graduationYear}
                    onChange={handleGraduationYearChange}
                    name="graduationYear"
                    id="graduationYear"
                />
            </div>

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={prevStep}
                    className="py-2 px-4 border border-transparent shadow-sm text-lg font-bold rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Previous
                </button>
                <button
                    type="submit"
                    className="py-2 px-4 border border-transparent shadow-sm text-lg font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                >
                    save and continue
                </button>
            </div>
        </form>
    );
};

export default EducationalBackgroundForm;
