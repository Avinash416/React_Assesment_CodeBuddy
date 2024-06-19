/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stepper, Step, Typography } from "@material-tailwind/react";
import { UserIcon, PhoneIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { UserCredentialsForm } from "./UserCredentialsForm";
import { UserDetailsForm } from "./UserDetailsForm";
import { ContactDetailsForm } from "./ContactDetailsForm";

export function StepperWithContent() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    countryCode: "",
    phoneNumber: "",
  });

  const [formUpdated, setFormUpdated] = useState(false);

  useEffect(() => {
    if (formUpdated) {
      // Proceed to the next step when form data is updated
      handleNextStep();
      // Reset form update flag
      setFormUpdated(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formUpdated, formData]);

  const handleNext = async () => {
    // Set form update flag to trigger useEffect
    setFormUpdated(true);
  };

  const handleNextStep = () => {
    if (activeStep < 2) {
      setActiveStep((cur) => cur + 1);
    } else {
      if (formData.countryCode !== "") {
        console.log("Submitting data:", formData);
        postData("https://codebuddy.review/submit", formData)
          .then((response) => {
            navigate("/posts");
            console.log("Post successful:", response);
          })
          .catch((error) => {
            console.error("Error posting data:", error);
          });
      }
    }
  };

  // Move to previous step if not on the first step
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const handleSave = (data) => {
    console.log("form data", data);
    // Update formData with current form data
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const postData = async (url, data) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  return (
    <div className="container mx-auto bg-white p-6 py-8 shadow-md">
      <Stepper
        className="m-auto w-3/4"
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>
          <UserIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography variant="h6" color={activeStep === 0 ? "blue-gray" : "gray"}>
              Step 1
            </Typography>
            <Typography color={activeStep === 0 ? "blue-gray" : "gray"} className="font-normal">
              User Credentials
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <UserPlusIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography variant="h6" color={activeStep === 1 ? "blue-gray" : "gray"}>
              Step 2
            </Typography>
            <Typography color={activeStep === 1 ? "blue-gray" : "gray"} className="font-normal">
              User Details
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <PhoneIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Typography variant="h6" color={activeStep === 2 ? "blue-gray" : "gray"}>
              Step 3
            </Typography>
            <Typography color={activeStep === 2 ? "blue-gray" : "gray"} className="font-normal">
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
            onSaveAndNext={() => {
              handleNext();
            }}
            defaultValues={formData}
          />
        )}
        {activeStep === 1 && (
          <UserDetailsForm
            onBack={handlePrev}
            onSave={(data) => handleSave(data)}
            onSaveAndNext={() => {
              handleNext();
            }}
            defaultValues={formData}
          />
        )}
        {activeStep === 2 && (
          <ContactDetailsForm
            onBack={handlePrev}
            onSave={(data) => handleSave(data)}
            onSaveAndNext={() => {
              handleNext();
            }}
            defaultValues={formData}
          />
        )}
      </div>
    </div>
  );
}
