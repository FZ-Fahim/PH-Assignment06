"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useFitLog } from "@/context/LogContext";

type Tab = "plan" | "saved";

const MyPlanPage = () => {
const {
plan,
saved,
removeFromPlan,
markAsDone,
removeSaved,
} = useFitLog();

const [activeTab, setActiveTab] = useState<Tab>("plan");
const [message, setMessage] = useState("");
const [sortBy, setSortBy] = useState("duration");
const currentWorkouts = activeTab === "plan" ? plan : saved;

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get("tab");

  if (tab === "saved") {
    setActiveTab("saved");
  }
}, []);
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

const showMessage = (text: string) => {
setMessage(text);


setTimeout(() => {
  setMessage("");
}, 2500);


};

const handleDone = (id: number) => {
markAsDone(id);
showMessage("Workout marked as done!");
};

const handleRemove = (id: number) => {
removeFromPlan(id);
showMessage("Workout removed from your plan.");
};

const handleRemoveSaved = (id: number) => {
removeSaved(id);
showMessage("Workout removed from saved.");
};

return ( <main className="flex-1 bg-[var(--fitlog-bg)]"> <section className="border-b border-[var(--fitlog-border)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16"> <div className="mx-auto max-w-[1400px]">


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
      <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-5">
        <div className="rounded-2xl border border-[var(--fitlog-border)] bg-[var(--fitlog-card)] p-4 sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--fitlog-muted)] sm:text-xs">
            Exercises
          </p>

          <p className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
            {currentWorkouts.length}
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--fitlog-border)] bg-[var(--fitlog-card)] p-4 sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--fitlog-muted)] sm:text-xs">
            Minutes
          </p>

          <p className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
            {totalMinutes}
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--fitlog-border)] bg-[var(--fitlog-card)] p-4 sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--fitlog-muted)] sm:text-xs">
            Calories
          </p>

          <p className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
            {totalCalories}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--fitlog-border)]">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wide ${
              activeTab === "plan"
                ? "border-b-2 border-[var(--fitlog-accent)] text-[var(--fitlog-accent)]"
                : "text-[var(--fitlog-muted)] hover:text-white"
            }`}
          >
            Today&apos;s Plan ({plan.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wide ${
              activeTab === "saved"
                ? "border-b-2 border-[var(--fitlog-accent)] text-[var(--fitlog-accent)]"
                : "text-[var(--fitlog-muted)] hover:text-white"
            }`}
          >
            Saved ({saved.length})
          </button>
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
        <div className="mt-5 rounded-xl border border-[var(--fitlog-border)] bg-[var(--fitlog-card)] px-4 py-3 text-center text-sm text-white">
          {message}
        </div>
      )}

      {/* Workout Cards */}
      {sortedWorkouts.length > 0 ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sortedWorkouts.map((workout) => (
            <article
              key={workout.id}
              className="overflow-hidden rounded-2xl border border-[var(--fitlog-border)] bg-[var(--fitlog-card)]"
            >
              {/* Image */}
              <div className="relative h-52">
                <Image
                  src={workout.image}
                  alt={workout.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                {/* Muscle Groups */}
                <div className="flex flex-wrap gap-2">
                  {workout.muscleGroups.map((muscle) => (
                    <span
                      key={muscle}
                      className="rounded-full border border-[var(--fitlog-accent)] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-[var(--fitlog-accent)]"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>

                {/* Name */}
                <h2 className="mt-4 font-display text-2xl font-bold uppercase text-white">
                  {workout.name}
                </h2>

                {/* Equipment */}
                <p className="mt-2 text-xs text-[var(--fitlog-muted)]">
                  {workout.equipment}
                </p>

                {/* Stats */}
                <div className="mt-5 grid grid-cols-3 border-t border-[var(--fitlog-border)] pt-4 text-xs text-[var(--fitlog-muted)]">
                  <span>{workout.duration} min</span>

                  <span className="text-center">
                    {workout.caloriesBurned} kcal
                  </span>

                  <span className="text-right">
                    ★ {workout.rating}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="flex-1 rounded-full bg-[var(--fitlog-accent)] px-4 py-3 text-center text-xs font-bold uppercase text-black hover:opacity-90"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleDone(workout.id)}
                        className="rounded-full border border-[var(--fitlog-border)] px-4 py-3 text-xs font-bold uppercase text-white hover:border-[var(--fitlog-accent)] hover:text-[var(--fitlog-accent)]"
                      >
                        Done
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemove(workout.id)}
                        aria-label={`Remove ${workout.name}`}
                        className="rounded-full border border-[var(--fitlog-border)] px-4 py-3 text-xs font-bold text-[var(--fitlog-muted)] hover:border-red-500 hover:text-red-400"
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleRemoveSaved(workout.id)}
                      className="rounded-full border border-[var(--fitlog-border)] px-4 py-3 text-xs font-bold uppercase text-white hover:border-red-500 hover:text-red-400"
                    >
                      Remove
                    </button>
                  )}
                </div>
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
