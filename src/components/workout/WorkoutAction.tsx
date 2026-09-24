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
        <div className="fixed right-4 top-20 z-50 flex items-center gap-3 rounded-xl border border-[var(--fitlog-border)] bg-[var(--fitlog-card)] px-5 py-3 text-sm font-medium text-white shadow-2xl sm:right-6">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--fitlog-accent)] text-sm font-bold text-black">
            ✓
          </span>
      
          <span>{message}</span>
        </div>
      )}


      

    </>
  );
};

export default WorkoutActions;
