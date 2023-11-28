"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { languageOptions } from './languageOptions';

const PersonalInfoForm = ({ nextStep , callback , data}) => {

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        callback(prevForm => ({ ...prevForm, [name]: value }));
    }

    const handleCountryChange = (selectedOption) => {
        callback(prevForm => ({ ...prevForm, nationality: selectedOption }));
    };

    const handleLanguageChange = (selectedOption) => {
        callback(prevForm => ({ ...prevForm, nativeLanguage: selectedOption }));
    };

    const handleProficiencyChange = (selectedOption) => {
        callback(prevForm => ({ ...prevForm, englishProficiency: selectedOption }));
    };


    const countryOptions = useMemo(() => countryList().getData(), [])
    const proficiencyOptions = ["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => ({ value: level, label: level }));
   
    
    const handleSubmit = (event) => {
        event.preventDefault();
        // callback(form)
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-xl text-2xl">
            <div>
                <label htmlFor="firstName" className="block text-lg  text-gray-700">
                    First Name
                </label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="mt-1 block w-full shadow-sm sm:text-lg border-gray-300 rounded-lg p-1"
                    onChange={handleInputChange}
                    placeholder='Official Name(s)'
                    value={data.firstName}
                    required
                />
            </div>

            <div>
                <label htmlFor="lastName" className="block text-lg font-medium text-gray-700">
                    Last Name
                </label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="mt-1 block w-full shadow-sm sm:text-lg border-gray-300 rounded-lg p-1"
                    placeholder='Official Surname(s)'
                    value={data.lastName}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                    Email Address
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 block w-full shadow-sm sm:text-lg border-gray-300 rounded-lg p-1"
                    onChange={handleInputChange}
                    value={data.email}
                    required
                />
            </div>

            <div>
                <label htmlFor="phoneNumber" className="block text-lg font-medium text-gray-700">
                    Phone Number
                </label>
                <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={data.phoneNumber}
                    className="mt-1 block w-full shadow-sm sm:text-lg border-gray-300 rounded-lg p-1"
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="dateOfBirth" className="block text-lg font-medium text-gray-700">
                    Date of Birth
                </label>
                <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    value={data.dateOfBirth}
                    onChange={handleInputChange}
                    className="mt-1 block w-full shadow-sm sm:text-lg border-gray-300 rounded-lg p-1"
                    required
                />
            </div>

            <div>
                <label htmlFor="nationality" className="block text-lg font-medium text-gray-700">
                    Nationality
                </label>
                <Select
                    options={countryOptions}
                    value={data.nationality}
                    onChange={handleCountryChange}
                    name='nationality'
                    id='nationality'
                    required
                />
            </div>

            <div>
                <label htmlFor="nativeLanguage">Native Language</label>
                <Select
                    options={languageOptions}
                    value={data.nativeLanguage}
                    onChange={handleLanguageChange}
                    name="nativeLanguage"
                    id="nativeLanguage"
                    required
                />
            </div>

            <div>
                <label htmlFor="profeciency">English proficiency level</label>
                <Select
                    options={proficiencyOptions}
                    value={data.englishProficiency}
                    onChange={handleProficiencyChange}
                    name="englishProfeciency"
                    id="profeciency"
                    required
                />
            </div>

            <div className="flex justify-end flex-row">
                <button
                    type="submit"
                    className="py-2 px-4 border border-transparent shadow-sm text-lg font-bold rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                >
                    save and continue
                </button>
            </div>
        </form>
    );
};

export default PersonalInfoForm;
