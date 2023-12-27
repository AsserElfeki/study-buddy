"use client";

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useEffect, useState } from 'react';

const steps = [
    'Choose a program',
    'Fill out application form',
    'Submit application',
    'Upload documents',
    "University's Response"
];

export default function HorizontalLinearAlternativeLabelStepper({ status , docsUploaded}: any) {

    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if(status == "pending" ) {
            if (docsUploaded) {
                setActiveStep(3);
            }
            else {
                setActiveStep(2);
            }
        }
        else if(status == "accepted") {
            setActiveStep(4);
        }
    }, [status, docsUploaded]);
    
    // const { activeStep } = props;

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}
