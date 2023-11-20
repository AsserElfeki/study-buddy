
import React from 'react';

const ReviewAndSubmitForm = ({ prevStep }) => {
    // Review and submit logic here

    return (
        <div>
            <h2>Review and Submit</h2>
            {/* Review details here */}
            <button onClick={prevStep}>Back</button>
            <button>Submit</button>
        </div>
    );
};

export default ReviewAndSubmitForm;