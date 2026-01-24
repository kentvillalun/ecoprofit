import { Poppins } from "next/font/google";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function LoginPage() {
  return (
    <main
      className={`min-h-screen flex justify-center bg-linear-to-b from-[#FFFFFF] from-24% to-[#89D957] ${poppins.className}`}
    >
      <div className="grid">
        <div className="flex justify-end items-end">
          <img
            src="/onboarding/step1.png"
            alt="EcoProfit Logo"
            className="aspect-4/2 object-cover "
          />
        </div>
        <div className="mx-2 mt-2 bg-white py-10 px-10 rounded-t-[20px] flex flex-col gap-8 ">
          <h3 className="font-semibold text-[20px]">Log In</h3>
          <div className="flex flex-col gap-6 ">
            {/* Login form elements go here */}
            <div className=" flex flex-row gap-3 border-b border-[#E7E3E0] p-2.5">
              <PhoneIcon className="h-6 w-6 stroke-[#4C5F66]" />
              <input
                type="text"
                placeholder="Phone number"
                className="outline-none"
              />
            </div>

            <div className="flex flex-row gap-3.25 border-b border-[#E7E3E0] p-2.5">
              <LockClosedIcon className="h-6 w-6 stroke-[#4C5F66]" />
              <input
                type="password"
                placeholder="Password"
                className="outline-none"
              />
            </div>
            <Link
              className="text-right text-[14px] text-[#4C5F66]"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
            <div className="flex flex-col gap-1 justify-center items-center">
              <button className="bg-primary text-white font-medium py-3.75 px-24 rounded-[40px] max-w-63.75 ">
                Log In
              </button>

              <Link
                className="text-[14px] text-center text-[#4C5F66]"
                href="/signup"
              >
                Don't have an account?{" "}
                <span className="font-medium text-black">Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
