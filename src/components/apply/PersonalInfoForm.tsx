
"use client";
import React from 'react';

const PersonalInfoForm = ({ nextStep }) => {
    // Form fields and logic here

    return (
        <div>
            <h2>Personal Information</h2>
            {/* Form fields here */}
            <button onClick={nextStep}>Next</button>
        </div>
    );
};

export default PersonalInfoForm;