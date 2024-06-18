import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from "@material-tailwind/react";

export function UserCredentialsForm({ onBack, onSave, onSaveAndNext }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log(data);
    data && onSave(data)
    onSaveAndNext();
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center flex-col items-center min-h-[63vh]'>
        <div className='m-auto w-1/3 border-2 border-solid rounded-md p-10 border-gray-700'>
              <h1 className='text-center text-2xl mb-9'>User Credentials</h1>
      <div className="mb-4">
        <Input
          type="email"
          label="Email"
          {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
        />
                  {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
      </div>
      <div className="mb-4">
        <Input
          type="password"
          label="Password"
          {...register("password", { 
            required: "Password is required",
            validate: value =>
              [/[A-Z]/g, /[a-z]/g, /[0-9]/g, /[^a-zA-Z0-9]/g].every(pattern => pattern.test(value)) ||
              "Password must contain at least 2 uppercase, 2 lowercase letters, 2 numbers, and 2 special characters"
          })}
        />
                  {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
      </div>
          </div>
          <div className="flex gap-x-80 mt-20">
        <Button onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSave}>
          Save
        </Button>
        <Button type="submit">
          Save and Next
        </Button>
      </div>
    </form>
  );
}
