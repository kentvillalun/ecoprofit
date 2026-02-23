import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { Inter } from "next/font/google"

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
})

export const SearchInput = () => {

    return (
        <div className={`${inter.className} flex flex-row items-center justify-start py-4 px-6 gap-4 bg-[#89D95710] rounded-full focus-within:border-[#89D957] border border-transparent transition-all`}>
            <MagnifyingGlassIcon className="w-8 h-8 stroke-[#74C857]"/>
            <input type="text" className="w-full outline-none text-[#74C857] " placeholder="Search for something"/>
        </div>
    )
}