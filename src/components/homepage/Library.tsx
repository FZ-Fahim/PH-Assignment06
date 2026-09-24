"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Workout } from "@/types/workout";

const Library = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        const data = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error("Failed to fetch workouts:", error);
      } finally {
        setLoading(false);
      }
    };

    getWorkouts();
  }, []);

  return (
    <section
      id="library"
      className="border-b border-[#252932] bg-[#0b0c0e] px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Heading */}
        <div className="mb-10">
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
            THE LIBRARY
          </h2>

          <p className="mt-3 text-sm text-[#8b909a]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <span className="loading loading-spinner loading-lg text-[#ccff00]" />
          </div>
        )}

        {/* Workout Grid */}
        {!loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <Link
                href={`/workouts/${workout.id}`}
                key={workout.id}
                className="group overflow-hidden rounded-2xl border border-[#252932] bg-[#14161b] transition hover:-translate-y-1 hover:border-[#3a3f48]"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#ccff00]">
                    {workout.muscleGroups[0]}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display text-2xl font-bold uppercase text-white">
                    {workout.name}
                  </h3>

                  <p className="mt-2 text-xs text-[#8b909a]">
                    {workout.equipment}
                  </p>

                  {/* Stats */}
                  <div className="mt-5 flex items-center justify-between border-t border-[#252932] pt-4 text-xs text-[#8b909a]">
                    <span>{workout.duration} min</span>
                    <span>{workout.caloriesBurned} kcal</span>
                    <span>★ {workout.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Library;