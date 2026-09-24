"use client";

import { useState } from "react";
import { useFitLog } from "@/context/LogContext";
import type { Workout } from "@/types/workout";

type Props = {
  workout: Workout;
};

const WorkoutActions = ({ workout }: Props) => {
  const { plan, saved, addToPlan, saveWorkout } = useFitLog();
  const [message, setMessage] = useState("");

  const isInPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);

  const showMessage = (text: string) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const handleAddToPlan = () => {
    if (isInPlan) {
      showMessage("Already in today's plan.");
      return;
    }

    addToPlan(workout);
    showMessage("Added to today's plan!");
  };

  const handleSave = () => {
    if (isSaved) {
      showMessage("Already saved.");
      return;
    }

    saveWorkout(workout);
    showMessage("Workout saved!");
  };

  return (
    <>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToPlan}
          className="flex-1 rounded-full bg-[var(--fitlog-accent)] px-6 py-4 text-sm font-bold uppercase text-black hover:opacity-90"
        >
          {isInPlan ? "✓ Added to today's plan" : "+ Add to today's plan"}
        </button>

        <button
          type="button"
          onClick={handleSave}
          className="flex-1 rounded-full border border-[var(--fitlog-border)] px-6 py-4 text-sm font-bold uppercase text-white hover:border-[var(--fitlog-accent)] hover:text-[var(--fitlog-accent)]"
        >
          {isSaved ? "♥ Saved" : "♡ Save for later"}
        </button>
      </div>

      {message && (
        <div className="mt-4 rounded-xl border border-[var(--fitlog-border)] bg-[var(--fitlog-card)] px-4 py-3 text-center text-sm text-white">
          {message}
        </div>
      )}
    </>
  );
};

export default WorkoutActions;
