import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { userFormTypes } from '../../types/userFormType';
import { userFormError } from '../../types/userFormError';
import { login, resetUser } from '../../redux/userSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
   const dispatch = useAppDispatch();
   const navigate=useNavigate();
   const { success, error, message } = useAppSelector((state) => state.user);
   const [formData, setFormData] = useState<userFormTypes>({
     email: "",
     password: "",
   });
    const [errors, setErrors] = useState<userFormError>({
      name: "",
      email: "",
      password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    };



     const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();

       const newErrors: userFormError = {
         email: formData.email ? "" : "Email is required",
         password: formData.password ? "" : "Password is required",
       };
       setErrors(newErrors);

       // Check if there are any errors
       if (Object.values(newErrors).some((error) => error)) return;

       try {
         const formDataJson = JSON.stringify(formData);

         const response = await dispatch(login(formDataJson));
       } catch (error) {
         console.log("error", error);
       }
     };

      useEffect(() => {
        if (success) {
          toast.success(message);
          navigate("/home");
        }
        if (error) {
          toast.error(error);
        }
      }, [success, error, dispatch, message]);
    
      const handleNavigate = () => {
        navigate("/register");
      };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
        <p
          className="font-normal underline text-center hover:cursor-pointer"
          onClick={handleNavigate}
        >
          You do not have an account ?{" "}
        </p>
      </form>
    </div>
  );
}
