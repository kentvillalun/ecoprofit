"use client";

import { Poppins } from "next/font/google";
import {
  PhoneIcon,
  LockClosedIcon,
  MapPinIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { TermsModal } from "@/components/auth/TermsModal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Page } from "@/components/layout/Page";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function SingupPage() {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const schema = yup.object().shape({
    phoneNumber: yup.string().required("Phone number is required"),
    purok: yup.string().required("Sitio or Purok is required"),
    barangay: yup.string().required("Barangay is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters")
      .max(16, "Password must not exceed 16 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords do not match")
      .required("Please confirm your password"),
    termsAccepted: yup
      .boolean()
      .oneOf([true], "You must accept the Terms and Conditions to continue"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const payload = {
      phoneNumber: data.phoneNumber,
      purok: data.purok,
      barangay: data.barangay,
      password: data.password,
      confirmPassword: data.confirmPassword,
      termsAccepted: data.termsAccepted,
    };

    const res = await fetch("http://localhost:5001/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      alert("Error:", result);
      return;
    }

    alert("Success:", result);
  };

  return (
    <Page
      gradient={true} className="from-10%!"
    >
      {isTermsOpen && (
        <section className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <TermsModal
            setIsTermsOpen={setIsTermsOpen}
            isTermsOpen={isTermsOpen}
          />
        </section>
      )}
      <div className="grid">
        <div className="flex justify-end items-end">
          <img
            src="/onboarding/Ecoprofit logo.svg"
            alt="EcoProfit Logo"
            className="aspect-4/2 object-cover"
          />
        </div>
        <form
          className="mx-2 mt-2 bg-white p-8 rounded-t-[20px] flex flex-col gap-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-8">
            <h3 className="font-semibold text-[20px]">Sign Up</h3>
            <div className="flex flex-col gap-2 text-[#717680]">
              {/* Login form elements go here */}
              <div className=" flex flex-row gap-3.25 border-b border-[#E7E3E0] p-2.5">
                <PhoneIcon className="h-5.75 w-5.75 stroke-[#4C5F66]" />
                <input
                  type="text"
                  placeholder="Phone number"
                  className="outline-none"
                  {...register("phoneNumber")}
                />
              </div>
              <p className="text-[14px] text-red-500">
                {errors.phoneNumber?.message}
              </p>

              <div className="flex flex-row gap-3.25 border-b border-[#E7E3E0] p-2.5">
                <MapPinIcon className="h-5.75 w-5.75 stroke-[#4C5F66]" />
                <input
                  type="text"
                  placeholder="Sitio/Purok"
                  className="outline-none"
                  {...register("purok")}
                />
              </div>
              <p className="text-[14px] text-red-500">
                {errors.purok?.message}
              </p>

              <div className="flex flex-row gap-3.25 border-b border-[#E7E3E0] p-2.5">
                <BuildingOffice2Icon className="h-5.75 w-5.75 stroke-[#4C5F66]" />
                <input
                  type="text"
                  placeholder="Barangay"
                  className="outline-none"
                  {...register("barangay")}
                />
              </div>
              <p className="text-[14px] text-red-500">
                {errors.barangay?.message}
              </p>

              <div className="flex flex-row gap-3.25 border-b border-[#E7E3E0] p-2.5 justify-between">
                <div className="flex flex-row gap-3">
                  <LockClosedIcon className="h-5.75 w-5.75 stroke-[#4C5F66]" />
                  <input
                    type={showPassword ? `text` : `password`}
                    placeholder="Password"
                    className="outline-none"
                    {...register("password")}
                  />
                </div>
                <p
                  className="hover:cursor-pointer "
                  onClick={() => {
                    setShowPassword((prev) => !showPassword);
                  }}
                >
                  Show
                </p>
              </div>
              <p className="text-[14px] text-red-500">
                {errors.password?.message}
              </p>

              <div className="flex flex-row gap-3.25 border-b border-[#E7E3E0] p-2.5 justify-between">
                <div className="flex flex-row gap-3">
                  <LockClosedIcon className="h-5.75 w-5.75 stroke-[#4C5F66]" />
                  <input
                    type={showConfirmPassword ? `text` : `password`}
                    placeholder="Confirm Password"
                    className="outline-none"
                    {...register("confirmPassword")}
                  />
                </div>
                <p
                  className="hover:cursor-pointer "
                  onClick={() => {
                    setShowConfirmPassword((prev) => !showConfirmPassword);
                  }}
                >
                  Show
                </p>
              </div>
              <p className="text-[14px] text-red-500">
                {errors.confirmPassword?.message}
              </p>

              <div className="ml-1 flex flex-row gap-3.25 p-2.25 justify-start items-center">
                <input
                  type="checkbox"
                  name="eula"
                  className="h-4.25 w-4.25 "
                  {...register("termsAccepted")}
                />

                <p
                  className="px-1 text-[13px] text-[#4C5F66]"
                  onClick={() => {
                    setIsTermsOpen(true);
                  }}
                >
                  I accept{" "}
                  <span className="font-medium text-black">
                    Terms & conditions
                  </span>{" "}
                  and{" "}
                  <span className="font-medium text-black">
                    Privacy policy.
                  </span>
                </p>
              </div>
              <p className="text-[14px] text-red-500">
                {errors.termsAccepted?.message}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 justify-center items-center">
            <button
              className="bg-primary text-white font-medium py-3.75 px-20 rounded-[40px] max-w-63.75"
              type="submit"
            >
              Sign Up
            </button>

            <Link
              className="text-[14px] text-center text-[#4C5F66]"
              href="/login"
            >
              Already have an account?{" "}
              <span className="font-medium text-black">Log In</span>
            </Link>
          </div>
        </form>
      </div>
    </Page>
  );
}
