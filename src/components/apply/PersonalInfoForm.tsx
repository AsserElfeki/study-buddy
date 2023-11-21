import React, { useMemo, useState } from 'react';
import Select from 'react-select'
import countryList from 'react-select-country-list'
const PersonalInfoForm = ({ nextStep }) => {

    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])

    const changeHandler = value => {
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
                    name='nationality'
                    className='rounded-lg'
                    options={options}
                    value={value}
                    onChange={changeHandler} />
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
