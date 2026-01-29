import { ShieldCheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const TermsModal = ({ setIsTermsOpen }) => {
  return (
    <>
      <section
        className={`fixed flex flex-col justify-center items-center z-100 bg-white  rounded-2xl m-4 min-w-[90%] md:min-w-[50%] ${poppins.className} max-h-[90%]`}
      >
        <div className="p-6 border-b border-gray-200 w-full">
          <div className="sticky flex flex-row items-start justify-between ">
            <div className="">
              <h4 className="font-semibold text-[16px]">
                EcoProfit Terms & Conditions
              </h4>
              <p className="text-gray-600 text-[14px]">
                Please review before continuing
              </p>
            </div>
            <div
              className="hover:cursor-pointer"
              onClick={() => {
                setIsTermsOpen(false);
              }}
            >
              <XMarkIcon className="w-8 stroke-gray-500" />
            </div>
          </div>
        </div>

        <div className="text-gray-600 text-[14px] max-h-[60%] overflow-y-auto">
          <div className="p-5 flex flex-col gap-5 ">
            <p className="">
              Welcome to EcoProfit, a barangay-based recycling management system
              designed to help residents and barangay officials manage
              recyclable materials efficiently and responsibly. By creating an
              account and using this system, you agree to the following Terms
              and Conditions.
            </p>

            <hr className="text-gray-200" />

            <div className="flex flex-col gap-2">
              <h4 className="text-[14px] font-medium">
                1. Acceptance of Terms
              </h4>
              <p className="">
                By registering and using the EcoProfit system, you confirm that
                you have read, understood, and agreed to these Terms and
                Conditions. If you do not agree, you may not register or use the
                system.
              </p>
            </div>

            <hr className="text-gray-200" />

            <div className="flex flex-col gap-2">
              <h4 className="text-[14px] font-medium">
                2. Purpose of the System
              </h4>
              <p className="">EcoProfit is intended to:</p>
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>
                  Facilitate proper recycling practices within the barangay.
                </li>
                <li>
                  Allow residents to post and transact recyclable materials.
                </li>
                <li>
                  Assist barangay officials in managing recycling schedules,
                  prices, and transactions.
                </li>
                <li>
                  The system is for community and environmental purposes only.
                </li>
              </ul>
            </div>

            <hr className="text-gray-200" />

            <div className="flex flex-col gap-2">
              <h4 className="text-[14px] font-medium">
                3. User Responsibilities
              </h4>
              <p className="">As a user, you agree to:</p>
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>
                  Provide accurate and truthful information during registration.
                </li>
                <li>Use the system only for its intended purpose.</li>
                <li>
                  Not submit false, misleading, or fraudulent recyclable
                  transactions.
                </li>
                <li>
                  Respect barangay rules, schedules, and recycling guidelines.
                </li>
                <li>
                  Misuse of the system may result in account suspension or
                  deactivation.
                </li>
              </ul>
            </div>

            <hr className="text-gray-200" />

            <div className="flex flex-col gap-2">
              <h4 className="text-[14px] font-medium">
                4. Account and Security
              </h4>
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>
                  You are responsible for keeping your login credentials
                  confidential.
                </li>
                <li>
                  Any activity performed using your account is your
                  responsibility.
                </li>
                <li>
                  Any activity performed using your account is your
                  responsibility.
                </li>
              </ul>
            </div>

            <hr className="text-gray-200" />

            <div className="flex flex-col gap-2">
              <h4 className="text-[14px] font-medium">
                5. Data Privacy and Information Use
              </h4>
              <p className="">
                EcoProfit collects basic user information such as:
              </p>
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>Contact details</li>
                <li>Barangay and address information</li>
                <li>Recycling transaction records</li>
              </ul>

              <p className="">
                This data is used solely for system functionality,
                record-keeping, and academic research purposes.
              </p>
              <p className="">
                User data will not be sold or shared with unauthorized third
                parties.
              </p>
            </div>

            <hr className="text-gray-200" />

            <div className="flex flex-col gap-2">
              <h4 className="text-[14px] font-medium">
                6. Verification and Transactions
              </h4>
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>Some features may require user verification.</li>
                <li>
                  User accounts may be verified after successful transactions,
                  as part of system validation.
                </li>
                <li>
                  Transaction records are stored for monitoring and reporting
                  purposes.
                </li>
              </ul>
            </div>

            <hr className="text-gray-200" />

            <div className="flex flex-col gap-2">
              <h4 className="text-[14px] font-medium">
                7. System Availability
              </h4>
              <p className="">
                EcoProfit is a student-developed system and may undergo
                maintenance, updates, or temporary downtime. The developers are
                not responsible for system interruptions beyond reasonable
                control.
              </p>
            </div>

            <hr className="text-gray-200" />

            <div className="flex flex-col gap-2">
              <h4 className="text-[14px] font-medium">
                8. Limitation of Liability
              </h4>
              <p className="">
                EcoProfit and its developers shall not be held liable for:
              </p>
              <ul className="list-disc list-inside flex flex-col gap-2">
                <li>Losses resulting from incorrect user input</li>
                <li>Misuse of the system</li>
                <li>Disputes between users and barangay officials</li>
              </ul>
            </div>

            <hr className="text-gray-200" />

            <div className="flex flex-col gap-2">
              <h4 className="text-[14px] font-medium">9. Changes to Terms</h4>
              <p className="">
                These Terms and Conditions may be updated as the system
                improves. Users will be informed of significant changes when
                necessary.
              </p>
            </div>

            <hr className="text-gray-200" />

            <div className="flex flex-col gap-2">
              <h4 className="text-[14px] font-medium">
                10. Contact and Support
              </h4>
              <p className="">
                For concerns or questions regarding the system, users may
                contact their barangay administrators or the EcoProfit system
                administrators.
              </p>
            </div>

            <hr className="text-gray-200" />

            <div className="flex flex-col gap-2">
              <h4 className="text-[14px] font-medium">
                11. Agreement
              </h4>
              <p className="">
                By checking the “I agree to the Terms and Conditions” box during registration, you confirm your acceptance of these Terms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
