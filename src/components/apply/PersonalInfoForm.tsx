import { useSession } from 'next-auth/react';
import React, { useMemo, useState } from 'react';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { languageOptions } from './languageOptions';

const PersonalInfoForm = ({ nextStep }) => {

    const { data: session } = useSession();
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [selectedProfeciency, setSelectedProfeciency] = useState(null);
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])
    const proficiencyOptions = ["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => ({ value: level, label: level }));
    const handleProfeciencyChange = (selectedOption: any) => {
        setSelectedProfeciency(selectedOption);
    }

    const handleLanguageChange = (selectedOption: any) => {
        setSelectedLanguage(selectedOption);
    };

    const handleCountryChange = (value: React.SetStateAction<string>) => {
        setValue(value)
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        // Here handle the form submission, e.g., updating state, sending data to an API, etc.
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
                    placeholder='Official Name(s)'
                    value={session?.user?.name}
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
                    // value={session?.user?.name}
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
                    value={session?.user?.email}
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
                    className="mt-1 block w-full shadow-sm sm:text-lg border-gray-300 rounded-lg p-1"
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
                    className="mt-1 block w-full shadow-sm sm:text-lg border-gray-300 rounded-lg p-1"
                    required
                />
            </div>

            <div>
                <label htmlFor="nationality" className="block text-lg font-medium text-gray-700">
                    Nationality
                </label>
                <Select
                    options={options}
                    value={value}
                    onChange={handleCountryChange}
                    name='nationality'
                    id='nationality'
                />
            </div>

            <div>
                <label htmlFor="nativeLanguage">Native Language</label>
                <Select
                    options={languageOptions}
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    name="nativeLanguage"
                    id="nativeLanguage"
                />
            </div>

            <div>
                <label htmlFor="profeciency">English proficiency level</label>
                <Select
                    options={proficiencyOptions}
                    value={selectedProfeciency}
                    onChange={handleProfeciencyChange}
                    name="profeciency"
                    id="profeciency"
                />
            </div>

            <div className="flex justify-center">
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

export default PersonalInfoForm;
