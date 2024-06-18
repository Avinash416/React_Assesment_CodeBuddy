import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from "@material-tailwind/react";

export function UserDetailsForm({ onBack, onSave, onSaveAndNext }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
        data && onSave(data)
        onSaveAndNext();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center flex-col items-center min-h-[63vh]'>
            <div className='m-auto w-1/3 border-2 border-solid rounded-md p-10 border-gray-700'>

                <h1 className='text-center text-2xl mb-9'>User Details</h1>
            <div className="mb-4">
                <Input
                    type="text"
                    label="First Name"
                    {...register("firstName", {
                        required: "First name is required",
                        minLength: { value: 2, message: "Minimum length is 2" },
                        maxLength: { value: 50, message: "Maximum length is 50" },
                        pattern: { value: /^[A-Za-z]+$/, message: "Only alphabets are allowed" }
                    })}
                />
                    {errors.firstName && <span className='text-red-500'>{errors.firstName.message}</span>}
            </div>
            <div className="mb-4">
                <Input
                    type="text"
                    label="Last Name"
                    {...register("lastName", {
                        pattern: { value: /^[A-Za-z]*$/, message: "Only alphabets are allowed" }
                    })}
                />
                    {errors.lastName && <span className='text-red-500'>{errors.lastName.message}</span>}
            </div>
            <div className="mb-4">
                <Input
                    type="text"
                    label="Address"
                    {...register("address", { required: "Address is required", minLength: { value: 10, message: "Minimum length is 10" } })}
                />
                    {errors.address && <span className='text-red-500'>{errors.address.message}</span>}
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
