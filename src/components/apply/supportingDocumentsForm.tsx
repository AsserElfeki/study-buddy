import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

const SupportingDocumentsForm = ({ nextStep, prevStep }) => {
    const { data: session } = useSession();
    const [documents, setDocuments] = useState([]);

    const handleFileChange = (event) => {
        // This is where you'll handle the file selection and possibly
        // upload to Cloudinary or store the file for later upload
        const files = event.target.files;
        // Example: setDocuments([...documents, ...files]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission, e.g., uploading to Cloudinary, updating state, etc.
        nextStep();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-xl text-2xl">
            <div>
                <label htmlFor="documents" className="block text-lg font-medium text-gray-700">
                    Upload Supporting Documents
                </label>
                <input
                    type="file"
                    name="documents"
                    id="documents"
                    multiple
                    onChange={handleFileChange}
                    className="mt-1 block w-full shadow-sm sm:text-lg border-gray-300 rounded-lg p-1"
                />
            </div>

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={prevStep}
                    className="py-2 px-4 border border-transparent shadow-sm text-lg font-bold rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Previous
                </button>
                <button
                    type="submit"
                    className="py-2 px-4 border border-transparent shadow-sm text-lg font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Next
                </button>
            </div>
        </form>
    );
};

export default SupportingDocumentsForm;
