import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F8FBF4] px-6 text-center">
      <div className="max-w-md">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#74C857]">
          EcoProfit
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-[#1F2937]">
          Page not available yet
        </h1>
        <p className="mt-3 text-sm text-[#6B7280]">
          This route is not part of the current testing slice. Use one of the
          available entry points below.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-2xl bg-primary px-5 py-3 text-white transition-opacity hover:opacity-90"
        >
          Go to Resident Home
        </Link>
        <Link
          href="/collection-requests"
          className="rounded-2xl border border-[#CFE8C7] bg-white px-5 py-3 text-[#2F6F1D] transition-colors hover:bg-[#F2FAEE]"
        >
          Open Barangay Requests
        </Link>
      </div>
    </main>
  );
}
