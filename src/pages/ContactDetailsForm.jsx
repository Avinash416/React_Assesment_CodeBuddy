import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Checkbox } from "@material-tailwind/react";
import PropTypes from "prop-types";
import "./styles.css";
export function ContactDetailsForm({ onBack, onSave, onSaveAndNext, defaultValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {},
  });
  // Set default form values using useForm hook

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [termsError, setTermsError] = useState("");

  const onSubmit = (data) => {
    try {
      //check terms and conditions clicked
      if (!acceptTerms) {
        setTermsError("You must accept the terms and conditions");
        return;
      } else {
        setTermsError("");
      }
      // Call onSave function with form data if defined
      onSave(data);

      // Call onSaveAndNext function to proceed to next step
      onSaveAndNext();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container min-h-[63vh]">
      <div className="form-sub-container w-4/5 md:w-2/3 lg:w-1/3">
        <h1 className="heading mb-7">Contact Details</h1>

        <div className="max-md:flex-row flex flex-col gap-2">
          <div className="mb-4 pt-2">
            <select
              id="countryCode"
              {...register("countryCode", { required: "Country code is required" })}
              className="mt-1 block w-full"
            >
              <option value="+1">America (+1)</option>
              <option value="+91">India (+91)</option>
            </select>
            {errors.countryCode && <span>{errors.countryCode.message}</span>}
          </div>
          <div className="mb-4">
            <Input
              type="text"
              label="Phone Number"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: { value: /^[0-9]{10}$/, message: "Phone number must be 10 digits" },
              })}
            />
            {errors.phoneNumber && (
              <span className="text-red-500">{errors.phoneNumber.message}</span>
            )}
          </div>
        </div>
        <div className="mb-4 flex flex-col">
          <Checkbox
            label="Accept Terms and Conditions"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
          />
          {termsError && <span className="text-red-500">{termsError}</span>}
        </div>
      </div>
      <div className="buttons-container">
        <Button onClick={onBack} className="max-sm:w-3/5 button-group">
          Back
        </Button>
        <Button type="submit" className="max-sm:w-3/5 button-group">
          Save
        </Button>
        <Button disabled className="max-sm:w-3/5 button-group">
          Save and Next
        </Button>
      </div>
    </form>
  );
}

// PropTypes for component props
ContactDetailsForm.propTypes = {
  onBack: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSaveAndNext: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    countryCode: PropTypes.string,
    phoneNumber: PropTypes.string,
  }).isRequired,
};
