"use client";

import { Poppins } from "next/font/google";
import {
  PhoneIcon,
  LockClosedIcon,
  MapPinIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TermsModal } from "@/components/auth/TermsModal";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Page } from "@/components/layout/Page";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const API_BASE_URL = "http://localhost:5001";

const schema = yup.object().shape({
  phoneNumber: yup.string().required("Phone number is required"),
  barangayName: yup.string().required("Barangay is required"),
  barangayId: yup
    .string()
    .required("Please select a barangay from the suggestions"),
  sitioId: yup.string().required("Sitio or Purok is required"),
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

export default function SingupPage() {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [barangayQuery, setBarangayQuery] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState(null);
  const [barangayOptions, setBarangayOptions] = useState([]);
  const [sitioOptions, setSitioOptions] = useState([]);
  const [isBarangayLoading, setIsBarangayLoading] = useState(false);
  const [isSitioLoading, setIsSitioLoading] = useState(false);
  const [barangayLookupError, setBarangayLookupError] = useState("");
  const [sitioLookupError, setSitioLookupError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumber: "",
      barangayName: "",
      barangayId: "",
      sitioId: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });

  const barangayNameField = register("barangayName");
  const barangayIdField = register("barangayId");
  const sitioIdField = register("sitioId");

  useEffect(() => {
    if (!barangayQuery.trim() || selectedBarangay?.name === barangayQuery.trim()) {
      setBarangayOptions([]);
      setIsBarangayLoading(false);
      setBarangayLookupError("");
      return;
    }

    let isActive = true;

    const timeoutId = setTimeout(async () => {
      try {
        setIsBarangayLoading(true);
        setBarangayLookupError("");

        const response = await fetch(
          `${API_BASE_URL}/auth/barangays?search=${encodeURIComponent(
            barangayQuery.trim()
          )}`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to load barangays");
        }

        if (isActive) {
          setBarangayOptions(result.data ?? []);
        }
      } catch (error) {
        if (isActive) {
          setBarangayOptions([]);
          setBarangayLookupError(error.message);
        }
      } finally {
        if (isActive) {
          setIsBarangayLoading(false);
        }
      }
    }, 300);

    return () => {
      isActive = false;
      clearTimeout(timeoutId);
    };
  }, [barangayQuery, selectedBarangay]);

  useEffect(() => {
    if (!selectedBarangay?.id) {
      setSitioOptions([]);
      setIsSitioLoading(false);
      setSitioLookupError("");
      return;
    }

    let isActive = true;

    const loadSitios = async () => {
      try {
        setIsSitioLoading(true);
        setSitioLookupError("");

        const response = await fetch(
          `${API_BASE_URL}/auth/barangays/${selectedBarangay.id}/sitios`
        );
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to load sitios");
        }

        if (isActive) {
          setSitioOptions(result.data ?? []);
        }
      } catch (error) {
        if (isActive) {
          setSitioOptions([]);
          setSitioLookupError(error.message);
        }
      } finally {
        if (isActive) {
          setIsSitioLoading(false);
        }
      }
    };

    loadSitios();

    return () => {
      isActive = false;
    };
  }, [selectedBarangay]);

  const resetSitio = () => {
    setSitioOptions([]);
    setValue("sitioId", "");
    clearErrors("sitioId");
  };

  const handleBarangayChange = (value) => {
    const nextValue = value;

    setBarangayQuery(nextValue);
    setValue("barangayName", nextValue, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setShowSuggestions(true);
    setSubmitError("");
    setSubmitSuccess("");

    if (selectedBarangay && nextValue.trim() !== selectedBarangay.name) {
      setSelectedBarangay(null);
      setBarangayOptions([]);
      setValue("barangayId", "", { shouldValidate: true });
      resetSitio();
    }

    if (!nextValue.trim()) {
      setSelectedBarangay(null);
      setBarangayOptions([]);
      setValue("barangayId", "", { shouldValidate: true });
      resetSitio();
    }
  };

  const handleBarangaySelect = (barangay) => {
    setSelectedBarangay(barangay);
    setBarangayQuery(barangay.name);
    setBarangayOptions([]);
    setShowSuggestions(false);
    setBarangayLookupError("");
    setSitioLookupError("");
    setValue("barangayName", barangay.name, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("barangayId", barangay.id, {
      shouldDirty: true,
      shouldValidate: true,
    });
    clearErrors(["barangayName", "barangayId"]);
    resetSitio();
  };

  const onSubmit = async (data) => {
    setSubmitError("");
    setSubmitSuccess("");

    if (!selectedBarangay?.id || selectedBarangay.name !== data.barangayName.trim()) {
      setError("barangayId", {
        type: "manual",
        message: "Please select a barangay from the suggestions",
      });
      return;
    }

    const selectedSitio = sitioOptions.find((sitio) => sitio.id === data.sitioId);

    if (!selectedSitio) {
      setError("sitioId", {
        type: "manual",
        message: "Please select a valid sitio",
      });
      return;
    }

    const payload = {
      phoneNumber: data.phoneNumber,
      barangayId: selectedBarangay.id,
      sitioId: data.sitioId,
      password: data.password,
      confirmPassword: data.confirmPassword,
      termsAccepted: data.termsAccepted,
    };

    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      setSubmitError(result.error || "Signup failed");
      return;
    }

    reset({
      phoneNumber: "",
      barangayName: "",
      barangayId: "",
      sitioId: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    });
    setBarangayQuery("");
    setSelectedBarangay(null);
    setBarangayOptions([]);
    setSitioOptions([]);
    setBarangayLookupError("");
    setSitioLookupError("");
    setShowSuggestions(false);
    setIsTermsOpen(false);
    setSubmitError("");
    setSubmitSuccess("");

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(
        "authSuccessMessage",
        "Signup successful. You can now log in."
      );
    }

    router.push("/login");
  };

  return (
    <Page gradient={true} className="from-10%!">
      {isTermsOpen && (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <TermsModal
            setIsTermsOpen={setIsTermsOpen}
            isTermsOpen={isTermsOpen}
          />
        </section>
      )}

      <div className="w-full max-w-md min-h-svh flex flex-col justify-between px-1">
        <div className=""></div>
        <div className=""></div>

        <div className="flex justify-end items-end">
          <img
            src="/onboarding/Ecoprofit logo.svg"
            alt="EcoProfit Logo"
            className="aspect-4/2 object-cover"
          />
        </div>

        <form
          className="mx-1 mt-2 bg-white p-8 rounded-t-[20px] flex flex-col gap-4 max-w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input type="hidden" {...barangayIdField} />

          <div className="flex flex-col gap-8">
            <h3 className={`font-semibold text-[20px] ${poppins.className}`}>
              Sign Up
            </h3>

            <div className="flex flex-col gap-2 text-[#717680]">
              <div className="flex flex-row gap-3.25 border-b border-[#E7E3E0] p-2.5">
                <PhoneIcon className="h-5.75 w-5.75 shrink-0 stroke-[#4C5F66]" />
                <input
                  type="text"
                  placeholder="Phone number"
                  className="outline-none max-w-full w-full min-w-0"
                  {...register("phoneNumber")}
                />
              </div>
              <p className="text-[14px] text-red-500">
                {errors.phoneNumber?.message}
              </p>

              <div className="relative">
                <div className="flex flex-row gap-3.25 border-b border-[#E7E3E0] p-2.5">
                  <BuildingOffice2Icon className="h-5.75 w-5.75 shrink-0 stroke-[#4C5F66]" />
                  <input
                    type="text"
                    placeholder="Barangay"
                    className="outline-none max-w-full w-full min-w-0"
                    {...barangayNameField}
                    value={barangayQuery}
                    autoComplete="off"
                    onChange={(event) => {
                      barangayNameField.onChange(event);
                      handleBarangayChange(event.target.value);
                    }}
                    onFocus={() => {
                      if (barangayOptions.length > 0 || barangayQuery.trim()) {
                        setShowSuggestions(true);
                      }
                    }}
                    onBlur={() => {
                      setTimeout(() => setShowSuggestions(false), 150);
                    }}
                  />
                </div>

                {showSuggestions &&
                  (isBarangayLoading ||
                    barangayOptions.length > 0 ||
                    barangayLookupError ||
                    (barangayQuery.trim() && !selectedBarangay)) && (
                    <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-xl border border-[#E7E3E0] bg-white py-2 shadow-lg">
                      {isBarangayLoading ? (
                        <p className="px-4 py-2 text-[14px] text-[#4C5F66]">
                          Loading barangays...
                        </p>
                      ) : null}

                      {!isBarangayLoading && barangayLookupError ? (
                        <p className="px-4 py-2 text-[14px] text-red-500">
                          {barangayLookupError}
                        </p>
                      ) : null}

                      {!isBarangayLoading &&
                      !barangayLookupError &&
                      barangayOptions.length === 0 &&
                      barangayQuery.trim() &&
                      !selectedBarangay ? (
                        <p className="px-4 py-2 text-[14px] text-[#4C5F66]">
                          No registered barangays found.
                        </p>
                      ) : null}

                      {!isBarangayLoading &&
                        !barangayLookupError &&
                        barangayOptions.map((barangay) => (
                          <button
                            key={barangay.id}
                            type="button"
                            className="block w-full px-4 py-2 text-left text-[14px] text-[#1E1E1E] hover:bg-[#F4F2F0]"
                            onMouseDown={() => handleBarangaySelect(barangay)}
                          >
                            {barangay.name}
                          </button>
                        ))}
                    </div>
                  )}
              </div>
              <p className="text-[14px] text-red-500">
                {errors.barangayName?.message || errors.barangayId?.message}
              </p>

              <div className="flex flex-row gap-3.25 border-b border-[#E7E3E0] p-2.5">
                <MapPinIcon className="h-5.75 w-5.75 shrink-0 stroke-[#4C5F66]" />
                <select
                  className="outline-none max-w-full w-full min-w-0 bg-transparent disabled:text-[#A3A3A3]"
                  {...sitioIdField}
                  disabled={!selectedBarangay?.id || isSitioLoading}
                  defaultValue=""
                  onChange={(event) => {
                    sitioIdField.onChange(event);
                    setSubmitError("");
                    setSubmitSuccess("");
                    clearErrors("sitioId");
                  }}
                >
                  <option value="">
                    {!selectedBarangay?.id
                      ? "Select barangay first"
                      : isSitioLoading
                      ? "Loading sitios..."
                      : "Select Sitio/Purok"}
                  </option>
                  {sitioOptions.map((sitio) => (
                    <option key={sitio.id} value={sitio.id}>
                      {sitio.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-[14px] text-red-500">
                {errors.sitioId?.message || sitioLookupError}
              </p>

              <div className="flex flex-row gap-3.25 border-b border-[#E7E3E0] p-2.5 justify-between">
                <div className="flex flex-row gap-3 flex-1 min-w-0">
                  <LockClosedIcon className="h-5.75 w-5.75 shrink-0 stroke-[#4C5F66]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="outline-none w-full min-w-0 max-w-40 md:max-w-full"
                    {...register("password")}
                  />
                </div>
                <button
                  type="button"
                  className="hover:cursor-pointer shrink-0"
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                >
                  Show
                </button>
              </div>
              <p className="text-[14px] text-red-500">
                {errors.password?.message}
              </p>

              <div className="flex flex-row gap-3.25 border-b border-[#E7E3E0] p-2.5 justify-between">
                <div className="flex flex-row gap-3 flex-1 min-w-0">
                  <LockClosedIcon className="h-5.75 w-5.75 shrink-0 stroke-[#4C5F66]" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="outline-none w-full min-w-0 max-w-40 md:max-w-full"
                    {...register("confirmPassword")}
                  />
                </div>
                <button
                  type="button"
                  className="hover:cursor-pointer shrink-0"
                  onClick={() => {
                    setShowConfirmPassword((prev) => !prev);
                  }}
                >
                  Show
                </button>
              </div>
              <p className="text-[14px] text-red-500">
                {errors.confirmPassword?.message}
              </p>

              <div className="ml-1 flex flex-row gap-3.25 p-2.25 justify-start items-center">
                <input
                  type="checkbox"
                  name="eula"
                  className="h-4.25 w-4.25 shrink-0"
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

              {submitError ? (
                <p className="text-[14px] text-red-500">{submitError}</p>
              ) : null}

              {submitSuccess ? (
                <p className="text-[14px] text-green-600">{submitSuccess}</p>
              ) : null}
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
