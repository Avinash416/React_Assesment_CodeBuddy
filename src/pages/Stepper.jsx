import React, { useEffect, useState } from "react";
import { Stepper, Step, Typography } from "@material-tailwind/react";
import {
    CogIcon,
    UserIcon,
    PhoneIcon,
    UserPlusIcon
} from "@heroicons/react/24/outline";
import { UserCredentialsForm } from './UserCredentialsForm';
import { UserDetailsForm } from './UserDetailsForm';
import { ContactDetailsForm } from './ContactDetailsForm';

export function StepperWithContent() {
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] =useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        countryCode: '',
        phoneNumber: '',
    });


    useEffect(()=>{
        // handleNext();

    },[formData])
    const handleNext = async() => {
        if (activeStep < 2) {
            setActiveStep((cur) => cur + 1);
        } else {

            // setTimeout(async ()=>{
                formData.countryCode !== '' && console.log("Submitting data:", formData);
                // try {
                //     const response = await fetch('https://codebuddy.review/submit', {
                //         method: 'POST',
                //         body: JSON.stringify(formData),
                //     });
                //     if (!response.ok) {
                //         throw new Error('Failed to submit data');
                //     }
                //     // Handle success response here (e.g., show success message)
                //     console.log('Data submitted successfully!');
                // } catch (error) {
                //     // Handle error (e.g., show error message)
                //     console.error('Error submitting data:', error.message);
                // }
            // }
            // Handle final submission
           
        }
    };
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    const handleSave = (data) => {
    console.log("from data", data)
        // Update formData with current form data
        setFormData(prevData => ({
            ...prevData,
            ...data
        }));
    };
    
    return (
        <div className="container mx-auto px-4 py-8">
            <Stepper
            className="w-3/4 m-auto"
                activeStep={activeStep}
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}
            >
                <Step onClick={() => setActiveStep(0)}>
                    <UserIcon className="h-5 w-5" />
                    <div className="absolute -bottom-[4.5rem] w-max text-center">
                        <Typography
                            variant="h6"
                            color={activeStep === 0 ? "blue-gray" : "gray"}
                        >
                            Step 1
                        </Typography>
                        <Typography
                            color={activeStep === 0 ? "blue-gray" : "gray"}
                            className="font-normal"
                        >
                            User Credentials
                        </Typography>
                    </div>
                </Step>
                <Step onClick={() => setActiveStep(1)}>
                    <UserPlusIcon className="h-5 w-5" />
                    <div className="absolute -bottom-[4.5rem] w-max text-center">
                        <Typography
                            variant="h6"
                            color={activeStep === 1 ? "blue-gray" : "gray"}
                        >
                            Step 2
                        </Typography>
                        <Typography
                            color={activeStep === 1 ? "blue-gray" : "gray"}
                            className="font-normal"
                        >
                            User Details
                        </Typography>
                    </div>
                </Step>
                <Step onClick={() => setActiveStep(2)}>
                    <PhoneIcon className="h-5 w-5" />
                    <div className="absolute -bottom-[4.5rem] w-max text-center">
                        <Typography
                            variant="h6"
                            color={activeStep === 2 ? "blue-gray" : "gray"}
                        >
                            Step 3
                        </Typography>
                        <Typography
                            color={activeStep === 2 ? "blue-gray" : "gray"}
                            className="font-normal"
                        >
                            Contact Details
                        </Typography>
                    </div>
                </Step>
            </Stepper>
            <div className="mt-32">
                {activeStep === 0 && (
                    <UserCredentialsForm
                        onBack={handlePrev}
                        onSave={(data) => handleSave(data)}
                        onSaveAndNext={() => { handleNext(); }}
                    />
                )}
                {activeStep === 1 && (
                    <UserDetailsForm
                        onBack={handlePrev}
                        onSave={(data) => handleSave(data)}
                        onSaveAndNext={() => { handleNext(); }}
                    />
                )}
                {activeStep === 2 && (
                    <ContactDetailsForm
                        onBack={handlePrev}
                        onSave={(data) => handleSave(data)}
                        onSaveAndNext={() => { handleNext(); }}
                    />
                )}
            </div>
        </div>
    );
}
