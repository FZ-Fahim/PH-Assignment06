import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Workout } from "@/types/workout";
import WorkoutAction from "@/components/workout/WorkoutAction";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
};

async function getWorkout(id: string): Promise<Workout | null> {
  const response = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function WorkoutDetails({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const { from } = await searchParams;

  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="flex-1">
      <section className="border-b border-[var(--fitlog-border)] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-[1400px]">
          {/* Back Button */}
          <Link
            href={from === "my-plan" ? "/my-plan" : "/#library"}
            className="mb-7 inline-block text-xs font-semibold uppercase tracking-wide text-[var(--fitlog-muted)] transition-colors hover:text-[var(--fitlog-accent)]"
          >
            ← {from === "my-plan" ? "Back to My Plan" : "Back to Library"}
          </Link>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            {/* Workout Image */}
            <div className="relative min-h-[400px] overflow-hidden rounded-2xl border border-[var(--fitlog-border)] bg-[var(--fitlog-card)] lg:min-h-[650px]">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Workout Information */}
            <div className="flex flex-col">
              {/* Title */}
              <h1 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {workout.name}
              </h1>

              {/* Description */}
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--fitlog-muted)] sm:text-base">
                {workout.description}
              </p>

              {/* Muscle Groups */}
              <div className="mt-5 flex flex-wrap gap-2">
                {workout.muscleGroups.map((muscle) => (
                  <span
                    key={muscle}
                    className="rounded-full border border-[var(--fitlog-accent)] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--fitlog-accent)]"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

              {/* Key Specs */}
              <div className="mt-7 rounded-2xl border border-[var(--fitlog-border)] bg-[var(--fitlog-card)] p-5">
                <h2 className="mb-2 font-display text-2xl font-bold uppercase text-white">
                  Key Specs
                </h2>

                <Spec
                  label="Equipment"
                  value={workout.equipment}
                />

                <Spec
                  label="Difficulty"
                  value={workout.difficulty}
                />

                <Spec
                  label="Sets"
                  value={String(workout.sets)}
                />

                <Spec
                  label="Reps"
                  value={workout.reps}
                />

                <Spec
                  label="Duration"
                  value={`${workout.duration} min`}
                />

                <Spec
                  label="Calories"
                  value={`${workout.caloriesBurned} kcal`}
                />

                <Spec
                  label="Rating"
                  value={`★ ${workout.rating}`}
                />
              </div>

              {/* Instructions */}
              <div className="mt-7">
                <h2 className="font-display text-2xl font-bold uppercase text-white">
                  Instructions
                </h2>

                <ol className="mt-4 space-y-3">
                  {workout.instructions.map((instruction, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-sm leading-6 text-[var(--fitlog-muted)]"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--fitlog-accent)] text-xs font-bold text-black">
                        {index + 1}
                      </span>

                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Buttons */}
              <WorkoutAction workout={workout} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Spec({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-t border-[var(--fitlog-border)] py-2.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-[var(--fitlog-muted)]">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-white">
        {value}
      </span>
    </div>
  );
}
