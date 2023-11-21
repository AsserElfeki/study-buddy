
import React from 'react';

const EducationalBackgroundForm = ({ nextStep, prevStep }) => {
    

    return (
        <div>
            <h2>Educational Background</h2>
            {/* Form fields here */}
            <button onClick={prevStep}>Back</button>
            <button onClick={nextStep}>Next</button>
        </div>
    );
};

export default EducationalBackgroundForm;