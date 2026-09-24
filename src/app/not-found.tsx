import Link from "next/link";

export default function NotFound() {
return ( <main className="flex flex-1 items-center justify-center bg-[var(--fitlog-bg)] px-4 py-20"> <div className="text-center"> <p className="text-sm font-bold uppercase tracking-[0.3em] text-[var(--fitlog-accent)]">
404 </p>

    <h1 className="mt-4 font-display text-5xl font-bold uppercase text-white sm:text-6xl">
      WORKOUT NOT FOUND
    </h1>

    <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[var(--fitlog-muted)]">
      The page you&apos;re looking for doesn&apos;t exist or the workout
      could not be found.
    </p>

    <Link
      href="/"
      className="mt-8 inline-block rounded-full bg-[var(--fitlog-accent)] px-6 py-3 text-xs font-bold uppercase text-black hover:opacity-90"
    >
      Back to workouts
    </Link>
  </div>
</main>

);
}
