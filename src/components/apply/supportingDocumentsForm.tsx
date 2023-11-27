"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { getSignature, saveToDataBase, uploadImage, uploadPdf } from '@utils/_cloudinary';

const SupportingDocumentsForm = ({ nextStep, prevStep }) => {
    const { data: session } = useSession();
    const [documents, setDocuments] = useState([]);

    const handleFileChange = (event) => {

        setDocuments([...event.target.files]);

    };


    async function action() {
        if (!documents[0])
            return
        const { timestamp, signature } = await getSignature();
        const formData = new FormData();
        formData.append('file', documents[0]);
        formData.append('resource_type', 'auto')
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
        formData.append('signature', signature);
        formData.append('timestamp', timestamp.toString());
        formData.append('folder', 'test');

        const endPoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL;
        let res;
        try {
            res = await fetch(endPoint, {
                
                method: 'POST',
                body: formData,
            }).then(res => res.json());

            if (res.error) {
                console.error("Upload error: ", res.error.message);
            } else {
                console.log("Upload successful: ", res);
                // Handle successful upload, e.g., save URL to database
            }
        } catch (error) {
            console.error("Fetch error: ", error);
        }
        //save the url to the database
        await saveToDataBase({
            version: res?.version,
            public_id: res?.public_id,
            signature: res?.signature,
        });

        nextStep();

    }

    return (
        <form action={action} className="space-y-6 w-full max-w-xl text-2xl">
            <div>
                <label htmlFor="documents" className="block text-lg font-medium text-gray-700">
                    Upload Supporting Documents
                </label>
                <input
                    type="file"
                    name="documents"
                    id="documents"
                    // multiple
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
