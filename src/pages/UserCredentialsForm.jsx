import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import "./styles.css";

export function UserCredentialsForm({ onSave, onSaveAndNext, defaultValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {},
  });
  // Set default form values using useForm hook

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    // Call onSave function with form data if defined
    onSave(data);

    // Call onSaveAndNext function to proceed to next step
    onSaveAndNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container min-h-[64vh]">
      <div className="form-sub-container w-4/5 sm:w-5/6 md:w-2/3 lg:w-1/3">
        <h1 className="heading mb-9">User Credentials</h1>
        <div className="mb-4">
          <Input
            type="email"
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
            })}
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>
        <div className="relative mb-4">
          <Input
            type={showPassword ? "text" : "password"}
            label="Password"
            {...register("password", {
              required: "Password is required",
              validate: (value) =>
                [/[A-Z]/g, /[a-z]/g, /[0-9]/g, /[^a-zA-Z0-9]/g].every((pattern) =>
                  pattern.test(value),
                ) ||
                "Password must contain at least 2 uppercase, 2 lowercase letters, 2 numbers, and 2 special characters",
            })}
          />
          {errors.password && (
            <span className="absolute text-red-500">{errors.password.message}</span>
          )}
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <div className="buttons-container">
        <Button disabled className="max-sm:w-3/5 button-group">
          Back
        </Button>
        <Button onClick={onSave} className="max-sm:w-3/5 button-group">
          Save
        </Button>
        <Button type="submit" className="max-sm:w-3/5 button-group">
          Save and Next
        </Button>
      </div>
    </form>
  );
}

// PropTypes for component props
UserCredentialsForm.propTypes = {
  onBack: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onSaveAndNext: PropTypes.func.isRequired,
  defaultValues: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
};
