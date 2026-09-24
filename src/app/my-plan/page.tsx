
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useFitLog } from "@/context/LogContext";
import { useSearchParams } from "next/navigation";

type Tab = "plan" | "saved";
type ToastType = "success" | "remove";

const MyPlanPage = () => {
  const {
    plan,
    saved,
    removeFromPlan,
    markAsDone,
    removeSaved,
  } = useFitLog();

  const [message, setMessage] = useState("");
  const [toastType, setToastType] = useState<ToastType>("success");
  const [sortBy, setSortBy] = useState("duration");

  const searchParams = useSearchParams();

  const activeTab: Tab =
    searchParams.get("tab") === "saved" ? "saved" : "plan";

  const currentWorkouts = activeTab === "plan" ? plan : saved;

  const sortedWorkouts = [...currentWorkouts].sort((a, b) => {
    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    if (sortBy === "rating") {
      return a.rating - b.rating;
    }

    return a.duration - b.duration;
  });

  const totalMinutes = currentWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = currentWorkouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  const showMessage = (
    text: string,
    type: ToastType = "success"
  ) => {
    setMessage(text);
    setToastType(type);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const handleDone = (id: number) => {
    markAsDone(id);
    showMessage("Workout marked as done!", "success");
  };

  const handleRemove = (id: number) => {
    removeFromPlan(id);
    showMessage("Workout removed from your plan.", "remove");
  };

  const handleRemoveSaved = (id: number) => {
    removeSaved(id);
    showMessage("Workout removed from saved.", "remove");
  };

  return (
    <main className="flex-1 bg-[var(--fitlog-bg)]">
      <section className="border-[var(--fitlog-border)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-[1400px]">

          {/* Header */}
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl font-bold uppercase text-white sm:text-5xl lg:text-6xl">
              MY PLAN
            </h1>

            <p className="mt-3 text-sm leading-6 text-[var(--fitlog-muted)] sm:text-base">
              Cap of five lifts for today. Finish them, then load more.
            </p>
          </div>

          {/* Metrics */}
          <div className="mt-10 rounded-2xl border border-[var(--fitlog-border)] bg-[var(--fitlog-card)] px-6 py-7 sm:px-8">
            <div className="grid grid-cols-3">

              {/* Exercises */}
              <div className="border-r border-[var(--fitlog-border)] pr-6 sm:pr-8">
                <p className="text-xs text-[var(--fitlog-muted)]">
                  Exercises
                </p>

                <p className="mt-2 font-display text-4xl font-bold leading-none text-[var(--fitlog-accent)]">
                  {currentWorkouts.length}
                </p>
              </div>

              {/* Minutes */}
              <div className="border-r border-[var(--fitlog-border)] px-6 sm:px-8">
                <p className="text-xs text-[var(--fitlog-muted)]">
                  Minutes
                </p>

                <p className="mt-2 font-display text-4xl font-bold leading-none text-white">
                  {totalMinutes}
                </p>
              </div>

              {/* Calories */}
              <div className="pl-6 sm:pl-8">
                <p className="text-xs text-[var(--fitlog-muted)]">
                  Calories
                </p>

                <p className="mt-2 font-display text-4xl font-bold leading-none text-white">
                  {totalCalories}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-[var(--fitlog-border)]">
            <div className="flex gap-2">

              <Link
                href="/my-plan"
                className={`px-4 py-3 text-xs font-bold uppercase tracking-wide ${
                  activeTab === "plan"
                    ? "border-b-2 border-[var(--fitlog-accent)] text-[var(--fitlog-accent)]"
                    : "text-[var(--fitlog-muted)] hover:text-white"
                }`}
              >
                Today&apos;s Plan ({plan.length})
              </Link>

              <Link
                href="/my-plan?tab=saved"
                className={`px-4 py-3 text-xs font-bold uppercase tracking-wide ${
                  activeTab === "saved"
                    ? "border-b-2 border-[var(--fitlog-accent)] text-[var(--fitlog-accent)]"
                    : "text-[var(--fitlog-muted)] hover:text-white"
                }`}
              >
                Saved ({saved.length})
              </Link>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3 pb-3">
              <label
                htmlFor="sort"
                className="text-xs font-bold uppercase tracking-wide text-[var(--fitlog-muted)]"
              >
                Sort by
              </label>

              <select
                id="sort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-full border border-[var(--fitlog-border)] bg-[var(--fitlog-card)] px-4 py-2 text-xs font-semibold text-white outline-none focus:border-[var(--fitlog-accent)]"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Toast */}
          {message && (
            <div className="fixed right-4 top-20 z-50 flex items-center gap-3 rounded-xl border border-[var(--fitlog-border)] bg-[var(--fitlog-card)] px-5 py-3 text-sm font-medium text-white shadow-2xl sm:right-6">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  toastType === "remove"
                    ? "bg-red-500 text-white"
                    : "bg-[var(--fitlog-accent)] text-black"
                }`}
              >
                {toastType === "remove" ? "×" : "✓"}
              </span>

              <span>{message}</span>
            </div>
          )}

          {/* Workout Cards */}
          {sortedWorkouts.length > 0 ? (
            <div className="mt-8 space-y-4">
              {sortedWorkouts.map((workout) => (
                <article
                  key={workout.id}
                  className="flex flex-col gap-5 rounded-2xl border border-[var(--fitlog-border)] bg-[var(--fitlog-card)] p-4 sm:flex-row sm:items-center"
                >
                  {/* Image */}
                  <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-36">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Workout Info */}
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-xl font-bold uppercase leading-none text-white">
                      {workout.name}
                    </h2>

                    <p className="mt-1 text-xs text-[var(--fitlog-muted)]">
                      {workout.equipment}
                    </p>

                    {/* Stats */}
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-[var(--fitlog-muted)]">
                      <span className="flex items-center gap-1.5">
                        <span className="text-[var(--fitlog-accent)]">
                          ◷
                        </span>
                        {workout.duration} min
                      </span>

                      <span className="flex items-center gap-1.5">
                        <span className="text-[var(--fitlog-accent)]">
                          ♨
                        </span>
                        {workout.caloriesBurned} kcal
                      </span>

                      <span className="flex items-center gap-1.5">
                        <span className="text-[var(--fitlog-accent)]">
                          ☆
                        </span>
                        {workout.rating}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-3">
                    <Link
                      href={`/workouts/${workout.id}`}
                      className="rounded-full border border-[var(--fitlog-border)] px-5 py-2.5 text-xs font-medium text-white transition-colors hover:border-[var(--fitlog-accent)] hover:text-[var(--fitlog-accent)]"
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleDone(workout.id)}
                          className="rounded-full bg-[var(--fitlog-accent)] px-5 py-2.5 text-xs font-bold text-black transition-opacity hover:opacity-90"
                        >
                          <span className="mr-1">✓</span>
                          Mark as Done
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemove(workout.id)}
                          aria-label={`Remove ${workout.name}`}
                          className="px-1 text-lg text-[var(--fitlog-muted)] transition-colors hover:text-red-400"
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleRemoveSaved(workout.id)}
                        className="rounded-full border border-[var(--fitlog-border)] px-5 py-2.5 text-xs font-bold uppercase text-white transition-colors hover:border-red-500 hover:text-red-400"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="mt-10 rounded-2xl border border-dashed border-[var(--fitlog-border)] bg-[var(--fitlog-card)] px-6 py-16 text-center">
              <h2 className="font-display text-3xl font-bold uppercase text-white">
                NOTHING HERE YET
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--fitlog-muted)]">
                {activeTab === "plan"
                  ? "Add workouts to today's plan and they will appear here."
                  : "Browse the library and save a lift to get started."}
              </p>

              <Link
                href="/#library"
                className="mt-6 inline-block rounded-full bg-[var(--fitlog-accent)] px-6 py-3 text-xs font-bold uppercase text-black hover:opacity-90"
              >
                Go to workouts
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default MyPlanPage;

