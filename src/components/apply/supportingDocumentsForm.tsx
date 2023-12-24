"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getSignature } from '@utils/_cloudinary';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';


const SupportingDocumentsForm = ({ nextStep, prevStep , data , callback}) => {
    const [documents, setDocuments] = useState([]);
    const [numFiles, setNumFiles] = useState(1);

    useEffect(() => {
        setNumFiles(data.numFiles);
        setDocuments(data.documents);
    }, [])
    

    const handleFileChange = (event) => {
       
        setDocuments(prevDocuments => [...prevDocuments, ...event.target.files]);
    };


    async function action() {
        nextStep();
        // console.log(numFiles)
        callback({ documents: documents, numFiles: numFiles });
        // console.log("data: ", data);
        // for (const doc of documents) {
        //     if (!doc)
        //         //skip if the document is not selected
        //         continue;

        //     const { timestamp, signature } = await getSignature('supporting-documents');
        //     const formData = new FormData();
        //     formData.append('file', documents[0]);
        //     formData.append('resource_type', 'auto')
        //     formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
        //     formData.append('signature', signature);
        //     formData.append('timestamp', timestamp.toString());
        //     formData.append('folder', 'supporting-documents');

        //     const endPoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL;
        //     let res;
        //     try {
        //         res = await fetch(endPoint, {

        //             method: 'POST',
        //             body: formData,
        //         }).then(res => res.json());

        //         if (res.error) {
        //             console.error("Upload error: ", res.error.message);
        //         } else {
        //             console.log("Upload successful: ", res);
        //             // Handle successful upload, e.g., save URL to database
        //         }
        //     } catch (error) {
        //         console.error("Fetch error: ", error);

        //     }
        //     //save the url to the database
        //     await saveToDataBase({
        //         version: res?.version,
        //         public_id: res?.public_id,
        //         signature: res?.signature,
        //     });
        // }
    }
    return (
            <>
            <form action={action} className="space-y-6 w-full max-w-xl text-2xl">
                {[...Array(numFiles)].map((_, i) => (
                    <div key={i}>
                        <label htmlFor={`documents${i}`} className="block text-lg font-medium text-gray-700">
                            Upload Supporting Document {i + 1}
                        </label>
                        <input
                            type="file"
                            name={`documents${i}`}
                            id={`documents${i}`}
                            onChange={handleFileChange}
                            className="mt-1 block w-full shadow-sm sm:text-lg border-gray-300 rounded-lg p-1"
                        />
                    </div>
                ))}

                
                <button
                    // className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-lg font-bold rounded-md text-white bg-sky-400 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    disabled={numFiles > documents.length}
                    className={`disabled:opacity-20 color-gray-500`}
                    type="button" onClick={() => setNumFiles(numFiles + 1)}>
                    <AddBoxOutlinedIcon
                        className="h-12 w-12"
                        aria-hidden="true"
                        fontSize='large'
                        color='primary'
                    />
                </button>

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={prevStep}
                        className="py-2 px-4 border border-transparent shadow-sm text-lg font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        onClick={action}
                        className="py-2 px-4 border border-transparent shadow-sm text-lg font-bold rounded-md text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                    >
                        Review your data
                    </button>
                </div>
            </form>

            
        </>
        );
    };

    export default SupportingDocumentsForm;
