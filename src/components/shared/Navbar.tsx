"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useFitLog } from "@/context/LogContext";

const Navbar = () => {
  const pathname = usePathname();
  const { plan, saved, hydrated } = useFitLog();

  const isHome = pathname === "/";
  const isMyPlan = pathname === "/my-plan";

  return (
    <nav className="border-b border-[#1f2228] bg-[#0b0c0e]">
      <div className="mx-auto flex min-h-[68px] w-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logo}
            alt="FitLog Logo"
            width={18}
            height={18}
            priority
          />

          <span className="font-display text-sm font-bold text-white">
            FITLOG
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-xs font-medium transition ${
              isHome
                ? "bg-[#182000] text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-2 text-xs font-medium transition ${
              isMyPlan
                ? "bg-[#182000] text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-gray-400 hover:text-white"
          >
            <span>Plan</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1 text-[10px] font-bold text-black">
              {hydrated ? plan.length : 0}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-2 text-gray-400 hover:text-white"
          >
            <span>Saved</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#363a42] px-1 text-[10px] text-gray-300">
              {hydrated ? saved.length : 0}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
