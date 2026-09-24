import Image from "next/image";
import Link from "next/link";
import banner from "@/assets/banner.png";

const Banner = () => {
  return (
    <section className="bg-[#0b0c0e]">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid min-h-[450px] w-full max-w-[1232px] items-center overflow-hidden rounded-xl border border-[#252932] bg-[#15171d] md:grid-cols-[1.1fr_0.9fr]">
          
          {/* Left Content */}
          <div className="px-7 py-7 lg:px-8">
            <p className="mb-4 text-[10px] font-semibold tracking-[0.18em] text-[#ccff00]">
              WORKOUT LIBRARY
            </p>

            <h1 className="font-display max-w-[620px] text-[42px] font-bold leading-[0.92] tracking-[-0.02em] text-white sm:text-[48px] lg:text-[52px]">
              TRAIN WITH INTENT. LOG
              <br />
              EVERY SET.
            </h1>

            <p className="mt-6 max-w-[520px] text-sm leading-7 text-[#8b909a] sm:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <Link
            href="#library"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-bold text-black hover:bg-[#d8ff33]"
          >
            BROWSE WORKOUTS
            <span className="text-base">↓</span>
          </Link>
        
          </div>

          {/* Right Image */}
          <div className="relative flex h-[220px] items-center justify-center">
            <Image
              src={banner}
              alt="Athlete working out"
              width={320}
              height={220}
              priority
              className="object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;