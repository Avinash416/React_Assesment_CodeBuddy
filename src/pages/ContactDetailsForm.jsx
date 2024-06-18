import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Checkbox } from "@material-tailwind/react";

export function ContactDetailsForm({ onBack, onSave, onSaveAndNext }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
        onSave(data);
        setTimeout(onSaveAndNext(),0);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center flex-col items-center min-h-[63vh]'>
            <div className='m-auto w-1/3 border-2 border-solid rounded-md p-10 border-gray-700'>
                <h1 className='text-center text-2xl mb-9'>Contact Details</h1>
                

            <div className='flex gap-2'>

            
            <div className="mb-4 pt-2">
                <select
                    id="countryCode"
                    {...register("countryCode", { required: "Country code is required" })}
                            className="block w-full mt-1 "
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
                        pattern: { value: /^[0-9]{10}$/, message: "Phone number must be 10 digits" }
                    })}
                />
                        {errors.phoneNumber && <span className='text-red-500'>{errors.phoneNumber.message}</span>}
            </div>
                </div>
            <div className="mb-4 flex flex-col">
                <Checkbox
                    label="Accept Terms and Conditions"
                    {...register("acceptTermsAndCondition", { required: "You must accept the terms and conditions" })}
                />
                {errors.acceptTermsAndCondition && <span className='text-red-500'>{errors.acceptTermsAndCondition.message}</span>}
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
