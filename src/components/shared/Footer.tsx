import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-[#252932] bg-[#0b0c0e]">
      <div className="mx-auto flex min-h-[100px] w-full max-w-[1400px] flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logo}
            alt="FitLog logo"
            width={18}
            height={18}
          />

          <span className="font-display text-sm font-bold text-white">
            FITLOG
          </span>
        </Link>

        {/* Copyright */}
        <p className="text-center text-xs text-[#6f737c] md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;