import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Button, Input } from "@material-tailwind/react";
import "./styles.css";

export function UserDetailsForm({ onBack, onSave, onSaveAndNext, defaultValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {},
  });
  // Set default form values using useForm hook

  const onSubmit = (data) => {
    // Call onSave function with form data if defined
    onSave(data);

    // Call onSaveAndNext function to proceed to next step
    onSaveAndNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container min-h-[60vh]">
      <div className="form-sub-container w-4/5 md:w-2/3 lg:w-1/3">
        <h1 className="heading mb-6">User Details</h1>
        <div className="mb-4">
          <Input
            type="text"
            label="First Name"
            {...register("firstName", {
              required: "First name is required",
              minLength: { value: 2, message: "Minimum length is 2" },
              maxLength: { value: 50, message: "Maximum length is 50" },
              pattern: { value: /^[A-Za-z]+$/, message: "Only alphabets are allowed" },
            })}
          />
          {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
        </div>
        <div className="mb-4">
          <Input
            type="text"
            label="Last Name"
            {...register("lastName", {
              pattern: { value: /^[A-Za-z]*$/, message: "Only alphabets are allowed" },
            })}
          />
          {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
        </div>
        <div className="mb-4">
          <Input
            type="text"
            label="Address"
            {...register("address", {
              required: "Address is required",
              minLength: { value: 10, message: "Minimum length is 10" },
            })}
          />
          {errors.address && <span className="text-red-500">{errors.address.message}</span>}
        </div>
      </div>
      <div className="buttons-container">
        <Button className=" max-sm:w-3/5 button-group" onClick={onBack}>
          Back
        </Button>
        <Button className="max-sm:w-3/5 button-group" onClick={onSave}>
          Save
        </Button>
        <Button className="max-sm:w-3/5 button-group" type="submit">
          Save and Next
        </Button>
      </div>
    </form>
  );
}

// PropTypes for component props
UserDetailsForm.propTypes = {
  onBack: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSaveAndNext: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
};
