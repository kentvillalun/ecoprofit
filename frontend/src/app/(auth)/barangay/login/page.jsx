"use client";

import { Poppins } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/config";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const schema = yup.object().shape({
  phoneNumber: yup.string().required("Phone number is required"),
  password: yup.string().required("Password is required"),
});

export default function BarangayLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
   
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/barangay/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      const result = await response.json();
     
      if (!response.ok) {
        setErrorMessage(result.error || "Login failed");
        return;
      }

      if (result.user?.role !== "CAPTAIN") {
        setErrorMessage("This page is for barangay staff login only.");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      setErrorMessage("There is a problem fetching the data");
      return;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main
      className={`min-h-svh flex justify-center bg-linear-to-b from-[#FFFFFF] from-24% to-[#89D957] ${poppins.className} `}
    >
      <div className="grid md:justify-center md:items-center">
        <div className="grid">
          <div className="flex justify-center items-end">
            <img
              src="/onboarding/Ecoprofit logo.svg"
              alt="EcoProfit Logo"
              className="aspect-4/2 md:aspect-7/2 object-cover md:w-[40%]"
            />
          </div>
          <div className="mx-2 mt-2 bg-white py-10 px-10 rounded-t-[20px] flex flex-col gap-8 md:rounded-2xl md:shadow-md md:min-w-171 md:max-w-172.5 md:m-auto">
            {/* bg-white py-7.5 px-11.5 rounded-2xl border border-[#00000007] shadow-md flex flex-col gap-10 min-w-171 m-auto */}
            <div className="flex flex-col gap-1.75 justify-center items-center">
              <h3 className="text-[20px] font-semibold">
                Barangay Admin Login
              </h3>
              <p className="text-[14px] text-[#4C5F66]">
                Sign in to manage recycling operatins
              </p>
            </div>
            <form
              className="flex flex-col gap-6 "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor=""
                  className="text-gray-700 text-center md:text-start"
                >
                  Phone number
                </label>
                <input
                  type="text"
                  className="outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors"
                  placeholder="Enter your phone number"
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <p className="text-[14px] text-red-500 text-center md:text-start">
                    {errors.phoneNumber?.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor=""
                  className="text-gray-700 text-center md:text-start"
                >
                  Password
                </label>
                <div className="flex flex-row justify-between outline-1 py-2.5 px-3.5 text-[#717680] outline-gray-300 rounded-lg focus-within:outline-[#74C857] transition-colors">
                  <input
                    type={showPassword ? `text` : `password`}
                    className="outline-none max-w-full min-w-[70%] "
                    placeholder="Enter your password"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="hover:cursor-pointer "
                    onClick={() => {
                      setShowPassword((prev) => !prev);
                    }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[14px] text-red-500 text-center md:text-start">
                    {errors.password?.message}
                  </p>
                )}
              </div>

              {errorMessage && (
                <p className="text-[14px] text-red-500 text-center md:text-start">
                  {errorMessage}
                </p>
              )}

              <div className="flex flex-col gap-1 justify-center items-center ">
                <button
                  className="bg-primary text-white font-medium py-3.75 px-24 rounded-[40px] disabled:opacity-70 min-w-71.75"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging In..." : "Log In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
