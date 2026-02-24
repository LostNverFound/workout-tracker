import { useState, useEffect, useRef } from "react";
import {
  Dumbbell, TrendingUp, Library, Calendar, Plus, Check, RefreshCw,
  MessageSquare, X, ChevronDown, ChevronUp, Flame, Timer, Activity,
  Target, Award, BarChart2, Zap, Play, Pause, RotateCcw, Wind,
  Heart, ArrowRight, Info, ChevronLeft, ChevronRight
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

// ─────────────────────────────────────────────
// PROGRAM START DATE & RACE DATE
// ─────────────────────────────────────────────
const PROGRAM_START = new Date("2026-02-03");
const RACE_DATE = new Date("2026-05-02");

function getWeekNumber() {
  const now = new Date();
  const diff = Math.floor((now - PROGRAM_START) / (7 * 24 * 60 * 60 * 1000));
  return Math.max(1, Math.min(13, diff + 1));
}

function getProgramPhase(week) {
  if (week <= 4) return { name: "Base Building", color: "#22c55e", desc: "Focus on form and building aerobic base" };
  if (week <= 8) return { name: "Building Endurance", color: "#3b82f6", desc: "Increasing mileage and lifting intensity" };
  if (week <= 11) return { name: "Peak Training", color: "#f59e0b", desc: "Highest volume — protect your legs" };
  return { name: "Taper", color: "#a855f7", desc: "Reduce volume, stay sharp for race day" };
}

function getDayOfWeek() {
  // 0=Sun,1=Mon,...,6=Sat
  return new Date().getDay();
}

// ─────────────────────────────────────────────
// WEEKLY SCHEDULE (day index 1=Mon ... 6=Sat)
// ─────────────────────────────────────────────
const SCHEDULE = {
  1: { type: "lift", label: "Push Day", icon: "💪", color: "#3b82f6", description: "Chest / Shoulders / Triceps + Abs" },
  2: { type: "lift+run", label: "Pull + Easy Run", icon: "🏃", color: "#8b5cf6", description: "Back / Biceps + Easy afternoon run" },
  3: { type: "run", label: "Tempo Run", icon: "⚡", color: "#f59e0b", description: "Moderate tempo run — no lifting" },
  4: { type: "lift", label: "Upper Day", icon: "🔥", color: "#ef4444", description: "Strength-focused upper body + Abs" },
  5: { type: "run", label: "Easy Run", icon: "🌿", color: "#22c55e", description: "Easy recovery run — no lifting" },
  6: { type: "lift+run", label: "Legs + Long Run", icon: "🦵", color: "#f97316", description: "Long run (morning first!) then modified legs" },
  0: { type: "rest", label: "Rest Day", icon: "😴", color: "#6b7280", description: "Full rest or light stretching" },
};

// ─────────────────────────────────────────────
// RUN SCHEDULE BY WEEK
// ─────────────────────────────────────────────
function getRunSchedule(week) {
  const schedules = {
    1:  { tue: "3 mi easy", wed: "3 mi easy", fri: "3 mi easy", sat: "4 mi long" },
    2:  { tue: "3 mi easy", wed: "3-4 mi easy", fri: "3 mi easy", sat: "5 mi long" },
    3:  { tue: "3 mi easy", wed: "4 mi easy", fri: "3 mi easy", sat: "6 mi long" },
    4:  { tue: "3 mi easy", wed: "4 mi easy", fri: "3 mi easy", sat: "7 mi long" },
    5:  { tue: "4 mi easy", wed: "5 mi tempo", fri: "4 mi easy", sat: "8 mi long" },
    6:  { tue: "4 mi easy", wed: "5 mi tempo", fri: "4 mi easy", sat: "9 mi long" },
    7:  { tue: "4 mi easy", wed: "5 mi tempo", fri: "4 mi easy", sat: "10 mi long" },
    8:  { tue: "4 mi easy", wed: "4 mi easy", fri: "3 mi easy", sat: "8 mi recovery" },
    9:  { tue: "5 mi easy", wed: "6 mi w/ race pace", fri: "4 mi easy", sat: "10 mi long" },
    10: { tue: "5 mi easy", wed: "6 mi w/ race pace", fri: "4 mi easy", sat: "11 mi long" },
    11: { tue: "5 mi easy", wed: "6 mi w/ race pace", fri: "4 mi easy", sat: "12 mi long" },
    12: { tue: "4 mi easy", wed: "4 mi easy", fri: "3 mi easy", sat: "8 mi taper" },
    13: { tue: "3 mi easy", wed: "2 mi easy", fri: "REST", sat: "🏁 RACE DAY 13.1 mi" },
  };
  return schedules[week] || schedules[1];
}

// ─────────────────────────────────────────────
// LIFTING SCHEDULES
// ─────────────────────────────────────────────
const LIFT_SCHEDULES = {
  push: {
    label: "Push Day — Chest / Shoulders / Triceps",
    warmup: "5 min jump rope or row machine",
    cardioFinisher: "10 min assault bike at 80-85% effort",
    groups: [
      {
        label: "Main Lifts",
        exercises: [
          { name: "Barbell Bench Press", sets: 4, reps: "8", note: "Last set: drop 20% and go to failure", id: 1 },
          { name: "Incline Dumbbell Press", sets: 4, reps: "10", id: 4 },
        ]
      },
      {
        label: "Superset 1",
        isSuperset: true,
        exercises: [
          { name: "Cable Fly", sets: 3, reps: "12", id: 7 },
          { name: "Push-Ups", sets: 3, reps: "Failure", id: 8 },
        ]
      },
      {
        label: "Shoulders",
        exercises: [
          { name: "Seated Dumbbell Shoulder Press", sets: 4, reps: "10", id: 21 },
        ]
      },
      {
        label: "Superset 2",
        isSuperset: true,
        exercises: [
          { name: "Lateral Raise", sets: 3, reps: "12", id: 22 },
          { name: "Front Raise", sets: 3, reps: "12", id: 23 },
        ]
      },
      {
        label: "Superset 3 — Triceps",
        isSuperset: true,
        exercises: [
          { name: "Rope Tricep Pushdown", sets: 3, reps: "12", id: 31 },
          { name: "Overhead Tricep Extension", sets: 3, reps: "12", id: 32 },
        ]
      },
      {
        label: "Abs",
        exercises: [
          { name: "Hanging Leg Raises", sets: 3, reps: "15", id: 51 },
          { name: "Cable Crunch", sets: 3, reps: "15", id: 52 },
          { name: "Plank", sets: 3, reps: "45 sec", id: 53 },
        ]
      },
    ]
  },
  pull: {
    label: "Pull Day — Back / Biceps",
    warmup: "5 min row machine",
    cardioFinisher: "5 rounds: 200m sprint / 30 sec rest",
    groups: [
      {
        label: "Main Lifts",
        exercises: [
          { name: "Weighted Pull-Ups", sets: 4, reps: "6-8", note: "Add belt if doing 10+ unweighted", id: 11 },
          { name: "Barbell Bent-Over Row", sets: 4, reps: "8", note: "3-sec negative", id: 12 },
        ]
      },
      {
        label: "Superset 1",
        isSuperset: true,
        exercises: [
          { name: "Chest-Supported Dumbbell Row", sets: 3, reps: "10", id: 13 },
          { name: "Band Pull-Apart", sets: 3, reps: "15", id: 14 },
        ]
      },
      {
        label: "Back Accessories",
        exercises: [
          { name: "Lat Pulldown", sets: 3, reps: "12", id: 15 },
          { name: "Single-Arm Cable Row", sets: 3, reps: "10 each", id: 16 },
          { name: "Face Pull", sets: 3, reps: "15", id: 17 },
        ]
      },
      {
        label: "Superset — Biceps",
        isSuperset: true,
        exercises: [
          { name: "Barbell Curl", sets: 3, reps: "10", id: 41 },
          { name: "Hammer Curl", sets: 3, reps: "10", id: 42 },
        ]
      },
      {
        label: "Bicep Finisher",
        exercises: [
          { name: "Incline Dumbbell Curl", sets: 3, reps: "12", id: 43 },
        ]
      },
      {
        label: "Abs",
        exercises: [
          { name: "Ab Wheel Rollout", sets: 3, reps: "10", id: 54 },
          { name: "Bicycle Crunches", sets: 3, reps: "20", id: 55 },
          { name: "Dead Bug", sets: 3, reps: "10 each side", id: 56 },
        ]
      },
    ]
  },
  upper: {
    label: "Upper Day — Strength + Volume",
    warmup: "5 min jump rope",
    cardioFinisher: "3 rounds: 15 box jumps → 10 burpees → 20 jump rope → 30 sec rest",
    groups: [
      {
        label: "Strength Lifts",
        exercises: [
          { name: "Overhead Press (Barbell)", sets: 5, reps: "5", note: "Heavy — this is your strength press", id: 24 },
          { name: "Weighted Dips", sets: 4, reps: "8", id: 33 },
        ]
      },
      {
        label: "Back",
        exercises: [
          { name: "T-Bar Row", sets: 4, reps: "10", id: 18 },
        ]
      },
      {
        label: "Superset 1",
        isSuperset: true,
        exercises: [
          { name: "Incline Dumbbell Press", sets: 3, reps: "10", id: 4 },
          { name: "Dumbbell Pullover", sets: 3, reps: "10", id: 9 },
        ]
      },
      {
        label: "Shoulders",
        exercises: [
          { name: "Arnold Press", sets: 3, reps: "12", id: 25 },
        ]
      },
      {
        label: "Superset 2",
        isSuperset: true,
        exercises: [
          { name: "Upright Row", sets: 3, reps: "12", id: 26 },
          { name: "Barbell Shrugs", sets: 3, reps: "12", id: 27 },
        ]
      },
      {
        label: "Superset — Triceps",
        isSuperset: true,
        exercises: [
          { name: "EZ-Bar Skull Crushers", sets: 3, reps: "10", id: 34 },
          { name: "Close-Grip Bench Press", sets: 3, reps: "10", id: 35 },
        ]
      },
      {
        label: "Bicep Finisher",
        exercises: [
          { name: "Concentration Curl", sets: 3, reps: "12 each", id: 44 },
        ]
      },
      {
        label: "Abs",
        exercises: [
          { name: "Hanging Knee Raise", sets: 3, reps: "15", id: 57 },
          { name: "Russian Twists (weighted)", sets: 3, reps: "20", id: 58 },
          { name: "Hollow Body Hold", sets: 3, reps: "30 sec", id: 59 },
        ]
      },
    ]
  },
  legsA: {
    label: "Legs A — Quad / Hamstring / Glute / Calf",
    warmup: "5 min bike",
    cardioFinisher: "10 min Stairmaster at uncomfortable-but-sustainable pace",
    note: "⚠️ On long run weeks: cut to 3x8, skip calf burnout, skip cardio finisher",
    groups: [
      {
        label: "Main Lifts",
        exercises: [
          { name: "Barbell Back Squat", sets: 5, reps: "6", note: "Heavy — 3-sec descent", id: 61 },
          { name: "Romanian Deadlift", sets: 4, reps: "10", id: 62 },
          { name: "Leg Press", sets: 4, reps: "12", note: "Drop set on last set", id: 63 },
        ]
      },
      {
        label: "Volume",
        exercises: [
          { name: "Walking Lunges (weighted)", sets: 3, reps: "20 steps", id: 64 },
        ]
      },
      {
        label: "Superset — Isolation",
        isSuperset: true,
        exercises: [
          { name: "Leg Curl", sets: 3, reps: "12", id: 65 },
          { name: "Leg Extension", sets: 3, reps: "12", id: 66 },
        ]
      },
      {
        label: "Unilateral",
        exercises: [
          { name: "Bulgarian Split Squat", sets: 3, reps: "10 each", id: 67 },
        ]
      },
      {
        label: "Calves",
        exercises: [
          { name: "Standing Calf Raise", sets: 4, reps: "15", note: "Slow tempo, pause at top", id: 68 },
          { name: "Seated Calf Raise", sets: 3, reps: "15", id: 69 },
        ]
      },
      {
        label: "Abs",
        exercises: [
          { name: "Decline Sit-Ups", sets: 3, reps: "15", id: 60 },
          { name: "Pallof Press", sets: 3, reps: "12 each side", id: 71 },
          { name: "Side Plank", sets: 3, reps: "30 sec each", id: 72 },
        ]
      },
    ]
  },
  legsB: {
    label: "Legs B — Posterior Chain + Power",
    warmup: "5 min bike or dynamic stretching",
    cardioFinisher: "Hill sprints: 8x30 sec hard / 30 sec rest (10% incline)",
    note: "⚠️ On long run Saturdays: run first, then do this. Cut volume to 3x8 and skip finisher.",
    groups: [
      {
        label: "Power Lifts",
        exercises: [
          { name: "Conventional Deadlift", sets: 5, reps: "5", note: "Heavy — your main power lift", id: 73 },
          { name: "Hack Squat", sets: 4, reps: "10", id: 74 },
        ]
      },
      {
        label: "Posterior Chain",
        exercises: [
          { name: "Glute-Ham Raise", sets: 3, reps: "8", id: 75 },
          { name: "Sumo Deadlift", sets: 3, reps: "8", note: "Moderate weight — focus on glute activation", id: 76 },
        ]
      },
      {
        label: "Unilateral",
        exercises: [
          { name: "Single-Leg Press", sets: 3, reps: "12 each", id: 77 },
        ]
      },
      {
        label: "Hamstring Finisher",
        exercises: [
          { name: "Leg Curl", sets: 4, reps: "12", note: "Slow eccentric", id: 65 },
        ]
      },
      {
        label: "Calves",
        exercises: [
          { name: "Standing Calf Raise", sets: 4, reps: "15", id: 68 },
        ]
      },
      {
        label: "Abs",
        exercises: [
          { name: "Cable Woodchoppers", sets: 3, reps: "12 each side", id: 78 },
          { name: "Toes to Bar", sets: 3, reps: "10", id: 79 },
          { name: "Plank with Hip Dips", sets: 3, reps: "30 sec", id: 80 },
        ]
      },
    ]
  },
};

// Map day of week to lift plan
function getLiftForDay(dow) {
  if (dow === 1) return LIFT_SCHEDULES.push;
  if (dow === 2) return LIFT_SCHEDULES.pull;
  if (dow === 4) return LIFT_SCHEDULES.upper;
  if (dow === 6) return LIFT_SCHEDULES.legsB;
  return null;
}

// ─────────────────────────────────────────────
// EXERCISE LIBRARY
// ─────────────────────────────────────────────
const EXERCISE_LIBRARY = {
  chest: [
    { id: 1, name: "Barbell Bench Press", equipment: "Barbell", difficulty: "Intermediate", primary: "Chest", secondary: "Triceps, Shoulders", description: "King of chest exercises. Lie flat, grip shoulder-width, lower bar to mid-chest with controlled 3-sec descent, press explosively." },
    { id: 2, name: "Dumbbell Bench Press", equipment: "Dumbbell", difficulty: "Intermediate", primary: "Chest", secondary: "Triceps, Shoulders", description: "Greater ROM than barbell. Keep wrists neutral, elbows at 75° angle." },
    { id: 3, name: "Incline Barbell Press", equipment: "Barbell", difficulty: "Intermediate", primary: "Upper Chest", secondary: "Shoulders, Triceps", description: "Set bench to 30-45°. Targets upper pecs. Keep shoulder blades retracted." },
    { id: 4, name: "Incline Dumbbell Press", equipment: "Dumbbell", difficulty: "Intermediate", primary: "Upper Chest", secondary: "Shoulders, Triceps", description: "Upper chest emphasis with better stretch at bottom. Don't let elbows flare past 75°." },
    { id: 5, name: "Decline Bench Press", equipment: "Barbell", difficulty: "Intermediate", primary: "Lower Chest", secondary: "Triceps", description: "Lower chest emphasis. Lock feet in and keep core tight throughout." },
    { id: 6, name: "Dumbbell Flyes", equipment: "Dumbbell", difficulty: "Beginner", primary: "Chest", secondary: "None", description: "Excellent stretch and isolation. Slight bend in elbows, arc dumbbells like hugging a barrel." },
    { id: 7, name: "Cable Fly", equipment: "Cable", difficulty: "Beginner", primary: "Chest", secondary: "None", description: "Constant tension throughout. Great for pump. Adjust pulley height for different chest emphasis." },
    { id: 8, name: "Push-Ups", equipment: "Bodyweight", difficulty: "Beginner", primary: "Chest", secondary: "Triceps, Core", description: "Classic compound movement. Keep body rigid like a plank. Go to full failure for finisher sets." },
    { id: 9, name: "Dumbbell Pullover", equipment: "Dumbbell", difficulty: "Intermediate", primary: "Chest", secondary: "Back, Serratus", description: "Lie perpendicular on bench. Stretches chest and lats simultaneously. Keep slight elbow bend." },
    { id: 10, name: "Chest Dips", equipment: "Bodyweight", difficulty: "Intermediate", primary: "Lower Chest", secondary: "Triceps", description: "Lean forward to shift emphasis to chest. Go below parallel for full stretch." },
  ],
  back: [
    { id: 11, name: "Weighted Pull-Ups", equipment: "Bodyweight", difficulty: "Advanced", primary: "Back", secondary: "Biceps", description: "Gold standard for back width. Dead hang start, pull chest to bar. Add weight via belt once you can do 10+ clean reps." },
    { id: 12, name: "Barbell Bent-Over Row", equipment: "Barbell", difficulty: "Intermediate", primary: "Back", secondary: "Biceps, Core", description: "Hip hinge to ~45°, brace core hard, pull bar to lower chest. 3-sec negative builds serious thickness." },
    { id: 13, name: "Chest-Supported Dumbbell Row", equipment: "Dumbbell", difficulty: "Beginner", primary: "Back", secondary: "Biceps", description: "Chest on incline bench removes lower back from equation. Pure back isolation." },
    { id: 14, name: "Band Pull-Apart", equipment: "Band", difficulty: "Beginner", primary: "Rear Delt", secondary: "Upper Back", description: "Hold band at chest height, pull apart until arms are straight out. Great rear delt and posture work." },
    { id: 15, name: "Lat Pulldown", equipment: "Cable", difficulty: "Beginner", primary: "Lats", secondary: "Biceps", description: "Drive elbows down and back, not arms. Lean slightly back at top of movement." },
    { id: 16, name: "Single-Arm Cable Row", equipment: "Cable", difficulty: "Beginner", primary: "Back", secondary: "Biceps", description: "Allows full rotation and stretch. Pull elbow past your hip for maximum lat engagement." },
    { id: 17, name: "Face Pull", equipment: "Cable", difficulty: "Beginner", primary: "Rear Delt", secondary: "Rotator Cuff", description: "Set cable at face height. Pull to forehead with external rotation. Essential for shoulder health." },
    { id: 18, name: "T-Bar Row", equipment: "Barbell", difficulty: "Intermediate", primary: "Back", secondary: "Biceps", description: "Landmine or T-bar handle. Neutral grip with less spinal stress than barbell row. Great for back thickness." },
    { id: 19, name: "Seated Cable Row", equipment: "Cable", difficulty: "Beginner", primary: "Back", secondary: "Biceps", description: "Keep chest up, pull handle to lower chest. Squeeze shoulder blades together at peak." },
    { id: 20, name: "Hyperextensions", equipment: "Machine", difficulty: "Beginner", primary: "Lower Back", secondary: "Glutes, Hamstrings", description: "Erector spinae isolation. Hold at top 1 second. Add plate for resistance." },
  ],
  shoulders: [
    { id: 21, name: "Seated Dumbbell Shoulder Press", equipment: "Dumbbell", difficulty: "Intermediate", primary: "Shoulders", secondary: "Triceps", description: "Full overhead pressing strength. Seated removes leg drive. Keep core braced." },
    { id: 22, name: "Lateral Raise", equipment: "Dumbbell", difficulty: "Beginner", primary: "Side Delt", secondary: "None", description: "Lead with elbow, not wrist. Slight forward lean and bend for better side delt stretch." },
    { id: 23, name: "Front Raise", equipment: "Dumbbell", difficulty: "Beginner", primary: "Front Delt", secondary: "None", description: "Raise to eye level. Can alternate arms. Avoid swinging — use strict form." },
    { id: 24, name: "Overhead Press (Barbell)", equipment: "Barbell", difficulty: "Advanced", primary: "Shoulders", secondary: "Triceps, Core", description: "Standing press. Brace core like a plank, press straight up, squeeze glutes. Heavy compound movement." },
    { id: 25, name: "Arnold Press", equipment: "Dumbbell", difficulty: "Intermediate", primary: "Shoulders", secondary: "Triceps", description: "Start palms facing you, rotate to face forward as you press. Hits all three delt heads." },
    { id: 26, name: "Upright Row", equipment: "Barbell", difficulty: "Intermediate", primary: "Side Delt", secondary: "Traps", description: "Pull bar up chest with elbows flaring out. Stop at chin height. Use moderate weight." },
    { id: 27, name: "Barbell Shrugs", equipment: "Barbell", difficulty: "Beginner", primary: "Traps", secondary: "None", description: "Hold heavy, shrug straight up. Don't roll shoulders. Hold at top 1 second." },
    { id: 28, name: "Cable Lateral Raise", equipment: "Cable", difficulty: "Beginner", primary: "Side Delt", secondary: "None", description: "Cable provides constant tension at bottom of movement where dumbbells are easy. Great for pump." },
    { id: 29, name: "Rear Delt Fly", equipment: "Dumbbell", difficulty: "Beginner", primary: "Rear Delt", secondary: "Upper Back", description: "Hinge forward, raise dumbbells laterally. Crucial for balanced shoulder development and posture." },
    { id: 30, name: "Lu Raise", equipment: "Dumbbell", difficulty: "Intermediate", primary: "Shoulders", secondary: "None", description: "Front raise then lateral raise combo. Keep arms straight. Excellent full delt burnout." },
  ],
  triceps: [
    { id: 31, name: "Rope Tricep Pushdown", equipment: "Cable", difficulty: "Beginner", primary: "Triceps", secondary: "None", description: "Spread rope at bottom for extra contraction. Keep elbows pinned to sides throughout." },
    { id: 32, name: "Overhead Tricep Extension", equipment: "Cable", difficulty: "Beginner", primary: "Triceps", secondary: "None", description: "Long head emphasis — the largest part of the tricep. Keep elbows close to head." },
    { id: 33, name: "Weighted Dips", equipment: "Bodyweight", difficulty: "Advanced", primary: "Triceps", secondary: "Chest", description: "Stay upright to keep tension on triceps. Add weight via belt. Go to parallel." },
    { id: 34, name: "EZ-Bar Skull Crushers", equipment: "Barbell", difficulty: "Intermediate", primary: "Triceps", secondary: "None", description: "Lower bar to forehead with control. Keep elbows pointing straight up. Pair with close-grip bench." },
    { id: 35, name: "Close-Grip Bench Press", equipment: "Barbell", difficulty: "Intermediate", primary: "Triceps", secondary: "Chest", description: "Hands shoulder-width on bar. Keep elbows tucked, lower to sternum. Heavy compound tricep builder." },
    { id: 36, name: "Diamond Push-Ups", equipment: "Bodyweight", difficulty: "Intermediate", primary: "Triceps", secondary: "Chest", description: "Hands form diamond shape. Great bodyweight tricep burnout at end of session." },
  ],
  biceps: [
    { id: 41, name: "Barbell Curl", equipment: "Barbell", difficulty: "Beginner", primary: "Biceps", secondary: "Forearms", description: "Classic mass builder. Don't swing — strict form. Supinate wrist fully at top." },
    { id: 42, name: "Hammer Curl", equipment: "Dumbbell", difficulty: "Beginner", primary: "Biceps", secondary: "Brachialis, Forearms", description: "Neutral grip targets brachialis under the bicep — adds arm thickness. Keep elbows still." },
    { id: 43, name: "Incline Dumbbell Curl", equipment: "Dumbbell", difficulty: "Intermediate", primary: "Biceps", secondary: "None", description: "Greater stretch at bottom than standing. Lie back on incline bench, let arms hang fully." },
    { id: 44, name: "Concentration Curl", equipment: "Dumbbell", difficulty: "Beginner", primary: "Biceps", secondary: "None", description: "Elbow braced on inner thigh. Maximum isolation. Squeeze hard at top. No momentum." },
    { id: 45, name: "Cable Curl", equipment: "Cable", difficulty: "Beginner", primary: "Biceps", secondary: "None", description: "Constant tension. Keep elbows forward for a peak contraction squeeze." },
    { id: 46, name: "Preacher Curl", equipment: "Barbell", difficulty: "Intermediate", primary: "Biceps", secondary: "None", description: "Arm braced on preacher pad. Removes any cheating. Great lower bicep isolation." },
  ],
  legs: [
    { id: 61, name: "Barbell Back Squat", equipment: "Barbell", difficulty: "Advanced", primary: "Quads", secondary: "Glutes, Hamstrings, Core", description: "King of leg exercises. Bar on upper traps, 3-sec controlled descent, drive knees out, chest tall." },
    { id: 62, name: "Romanian Deadlift", equipment: "Barbell", difficulty: "Intermediate", primary: "Hamstrings", secondary: "Glutes, Lower Back", description: "Hinge at hip, soft knee bend, bar stays close to legs. Stretch hamstrings fully before driving hips through." },
    { id: 63, name: "Leg Press", equipment: "Machine", difficulty: "Beginner", primary: "Quads", secondary: "Glutes, Hamstrings", description: "Don't lock knees at top. High feet placement targets glutes/hams; low feet targets quads." },
    { id: 64, name: "Walking Lunges (weighted)", equipment: "Dumbbell", difficulty: "Intermediate", primary: "Quads", secondary: "Glutes, Hamstrings", description: "Keep torso upright, step long, front knee over ankle. 20 steps total. Brutal on the quads." },
    { id: 65, name: "Leg Curl", equipment: "Machine", difficulty: "Beginner", primary: "Hamstrings", secondary: "None", description: "Full ROM, slow eccentric. Keep hips down. Powerful hamstring isolation." },
    { id: 66, name: "Leg Extension", equipment: "Machine", difficulty: "Beginner", primary: "Quads", secondary: "None", description: "Full extension and hold 1 sec. Keep back flat against pad. Quad isolation." },
    { id: 67, name: "Bulgarian Split Squat", equipment: "Dumbbell", difficulty: "Advanced", primary: "Quads", secondary: "Glutes, Hamstrings", description: "Rear foot on bench. Devastating unilateral movement. Drop until front thigh is parallel." },
    { id: 68, name: "Standing Calf Raise", equipment: "Machine", difficulty: "Beginner", primary: "Calves", secondary: "None", description: "Full ROM — go low for stretch, rise high for peak. Slow tempo, pause at top." },
    { id: 69, name: "Seated Calf Raise", equipment: "Machine", difficulty: "Beginner", primary: "Calves", secondary: "None", description: "Targets soleus under the gastrocnemius. Different from standing — both needed for complete calves." },
    { id: 73, name: "Conventional Deadlift", equipment: "Barbell", difficulty: "Advanced", primary: "Full Body", secondary: "Hamstrings, Glutes, Back", description: "Hip-width stance, bar over mid-foot, lats engaged, drive floor away. The ultimate strength movement." },
    { id: 74, name: "Hack Squat", equipment: "Machine", difficulty: "Intermediate", primary: "Quads", secondary: "Glutes", description: "More quad-dominant than leg press. Feet low and narrow. Great squat alternative." },
    { id: 75, name: "Glute-Ham Raise", equipment: "Machine", difficulty: "Advanced", primary: "Hamstrings", secondary: "Glutes, Core", description: "Extremely difficult. Lower slowly under control. One of the best hamstring builders." },
    { id: 76, name: "Sumo Deadlift", equipment: "Barbell", difficulty: "Intermediate", primary: "Glutes", secondary: "Hamstrings, Quads", description: "Wide stance, toes pointed out, pull hips through at top. More glute emphasis than conventional." },
    { id: 77, name: "Single-Leg Press", equipment: "Machine", difficulty: "Intermediate", primary: "Quads", secondary: "Glutes", description: "One leg at a time for imbalance correction. Moderate weight, full ROM." },
    { id: 70, name: "Hip Thrusts", equipment: "Barbell", difficulty: "Intermediate", primary: "Glutes", secondary: "Hamstrings", description: "Back on bench, bar across hips, drive hips to ceiling. Best glute builder available." },
    { id: 81, name: "Goblet Squat", equipment: "Dumbbell", difficulty: "Beginner", primary: "Quads", secondary: "Glutes, Core", description: "Dumbbell at chest, squat deep. Great for mobility and warmup." },
  ],
  abs: [
    { id: 51, name: "Hanging Leg Raises", equipment: "Pull-Up Bar", difficulty: "Intermediate", primary: "Abs", secondary: "Hip Flexors", description: "Hang from bar, raise legs to 90° or higher. Don't swing. Exhale at top." },
    { id: 52, name: "Cable Crunch", equipment: "Cable", difficulty: "Beginner", primary: "Abs", secondary: "None", description: "Kneel, pull rope down while crunching. Weighted ab work for real strength." },
    { id: 53, name: "Plank", equipment: "Bodyweight", difficulty: "Beginner", primary: "Core", secondary: "Shoulders", description: "Elbows under shoulders, body rigid. Squeeze glutes and abs. Don't let hips sag." },
    { id: 54, name: "Ab Wheel Rollout", equipment: "Ab Wheel", difficulty: "Advanced", primary: "Abs", secondary: "Shoulders, Lats", description: "Start on knees, roll out until arms are extended, pull back using abs — not arms." },
    { id: 55, name: "Bicycle Crunches", equipment: "Bodyweight", difficulty: "Beginner", primary: "Abs", secondary: "Obliques", description: "Opposite elbow to knee, slow and controlled. Don't pull on your neck." },
    { id: 56, name: "Dead Bug", equipment: "Bodyweight", difficulty: "Beginner", primary: "Core", secondary: "None", description: "Lower back pressed to floor at all times. Extend opposite arm/leg slowly. Anti-rotation core work." },
    { id: 57, name: "Hanging Knee Raise", equipment: "Pull-Up Bar", difficulty: "Beginner", primary: "Abs", secondary: "Hip Flexors", description: "Easier version of hanging leg raises. Pull knees to chest, slow lower." },
    { id: 58, name: "Russian Twists (weighted)", equipment: "Dumbbell", difficulty: "Intermediate", primary: "Obliques", secondary: "Abs", description: "Lean back, feet off floor, rotate dumbbell side to side. Oblique destroyer." },
    { id: 59, name: "Hollow Body Hold", equipment: "Bodyweight", difficulty: "Intermediate", primary: "Core", secondary: "None", description: "Press lower back to floor, arms overhead, legs raised. Gymnastics-style core tension." },
    { id: 60, name: "Decline Sit-Ups", equipment: "Bench", difficulty: "Beginner", primary: "Abs", secondary: "Hip Flexors", description: "On decline bench. Full ROM from lying flat to upright. Can hold plate for resistance." },
    { id: 71, name: "Pallof Press", equipment: "Cable", difficulty: "Intermediate", primary: "Core", secondary: "Obliques", description: "Anti-rotation exercise. Press cable straight out and hold. Trains core stability." },
    { id: 72, name: "Side Plank", equipment: "Bodyweight", difficulty: "Beginner", primary: "Obliques", secondary: "Core", description: "Keep hips raised, body straight. Can add hip dips for intensity." },
    { id: 78, name: "Cable Woodchoppers", equipment: "Cable", difficulty: "Intermediate", primary: "Obliques", secondary: "Core", description: "High-to-low diagonal pull. Rotational power for the obliques." },
    { id: 79, name: "Toes to Bar", equipment: "Pull-Up Bar", difficulty: "Advanced", primary: "Abs", secondary: "Lats", description: "Hanging, raise straight legs to touch the bar. Maximum hip flexor and ab strength." },
    { id: 80, name: "Plank with Hip Dips", equipment: "Bodyweight", difficulty: "Intermediate", primary: "Obliques", secondary: "Core", description: "In forearm plank, rotate hips side to side. Targets obliques while maintaining core stability." },
  ],
  cardio: [
    { id: 91, name: "Treadmill Running", equipment: "Machine", difficulty: "Beginner", primary: "Cardio", secondary: "Legs", description: "Controlled environment running. Use for easy runs and tempo work. Incline 1-2% to simulate outdoor." },
    { id: 92, name: "Assault Bike", equipment: "Machine", difficulty: "Advanced", primary: "Cardio", secondary: "Full Body", description: "Full body cardio torture device. Ride at 80-85% for finishers. Go until you feel it everywhere." },
    { id: 93, name: "Rowing Machine", equipment: "Machine", difficulty: "Intermediate", primary: "Cardio", secondary: "Back, Legs", description: "Legs first, then lean back, then pull arms. Full body, low impact." },
    { id: 94, name: "Stairmaster", equipment: "Machine", difficulty: "Intermediate", primary: "Cardio", secondary: "Glutes, Calves", description: "Brutal after leg day. Set at uncomfortable-but-sustainable pace for 10 min finisher." },
    { id: 95, name: "Jump Rope", equipment: "Jump Rope", difficulty: "Intermediate", primary: "Cardio", secondary: "Calves", description: "High-intensity warm-up or finisher. Double unders for extra difficulty." },
    { id: 96, name: "Box Jumps", equipment: "Box", difficulty: "Intermediate", primary: "Power", secondary: "Legs, Cardio", description: "Explosive jump onto box, step down. Land softly with bent knees." },
    { id: 97, name: "Burpees", equipment: "Bodyweight", difficulty: "Intermediate", primary: "Cardio", secondary: "Full Body", description: "Drop to floor, push-up, jump up. Brutal conditioning. No rest until set is done." },
    { id: 98, name: "Hill Sprints", equipment: "Treadmill", difficulty: "Advanced", primary: "Cardio", secondary: "Legs", description: "8-10% incline, 30 sec all-out sprint, 30 sec rest. Builds lung capacity and leg power." },
  ],
};

// ─────────────────────────────────────────────
// TIMER COMPONENT
// ─────────────────────────────────────────────
function RestTimer({ onClose }) {
  const [seconds, setSeconds] = useState(60);
  const [active, setActive] = useState(true);
  const [original, setOriginal] = useState(60);
  useEffect(() => {
    if (!active || seconds <= 0) return;
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [active, seconds]);
  const pct = (seconds / original) * 100;
  const color = seconds > 30 ? "#22c55e" : seconds > 10 ? "#f59e0b" : "#ef4444";
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, background: "#1e293b", border: "1px solid #334155", borderRadius: 16, padding: "20px 24px", zIndex: 100, minWidth: 200, boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ color: "#94a3b8", fontSize: 13, fontFamily: "'Space Mono', monospace" }}>REST TIMER</span>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}><X size={16} /></button>
      </div>
      <div style={{ fontSize: 48, fontWeight: 700, color, textAlign: "center", fontFamily: "'Space Mono', monospace", lineHeight: 1 }}>
        {String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}
      </div>
      <div style={{ background: "#0f172a", borderRadius: 4, height: 6, margin: "12px 0" }}>
        <div style={{ width: `${pct}%`, height: 6, borderRadius: 4, background: color, transition: "width 1s linear, background 0.5s" }} />
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        {[30, 45, 60, 90].map(s => (
          <button key={s} onClick={() => { setOriginal(s); setSeconds(s); setActive(true); }}
            style={{ background: "#0f172a", border: "1px solid #334155", color: "#94a3b8", borderRadius: 8, padding: "4px 8px", fontSize: 12, cursor: "pointer", fontFamily: "'Space Mono', monospace" }}>
            {s}s
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 10, justifyContent: "center" }}>
        <button onClick={() => setActive(!active)} style={{ background: "#334155", border: "none", color: "#e2e8f0", borderRadius: 8, padding: "6px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
          {active ? <Pause size={14} /> : <Play size={14} />} {active ? "Pause" : "Resume"}
        </button>
        <button onClick={() => { setSeconds(original); setActive(true); }} style={{ background: "#334155", border: "none", color: "#e2e8f0", borderRadius: 8, padding: "6px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
          <RotateCcw size={14} /> Reset
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SET LOGGER
// ─────────────────────────────────────────────
function SetLogger({ exerciseId, exerciseName, targetSets, targetReps, onLog }) {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [logged, setLogged] = useState([]);

  const handleLog = () => {
    if (!weight && !reps) return;
    const entry = { weight: parseFloat(weight) || 0, reps: parseInt(reps) || 0, timestamp: Date.now() };
    const newLogged = [...logged, entry];
    setLogged(newLogged);
    onLog(exerciseId, entry);
    setWeight("");
    setReps("");
  };

  return (
    <div style={{ marginTop: 8 }}>
      {logged.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", color: "#22c55e", fontSize: 13, fontFamily: "'Space Mono', monospace" }}>
          <Check size={12} /> Set {i + 1}: {s.weight}lbs × {s.reps} reps
        </div>
      ))}
      {logged.length < targetSets && (
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
          <input value={weight} onChange={e => setWeight(e.target.value)} placeholder="lbs"
            style={{ width: 70, padding: "6px 10px", background: "#0f172a", border: "1px solid #334155", borderRadius: 8, color: "#e2e8f0", fontSize: 13, fontFamily: "'Space Mono', monospace" }} />
          <input value={reps} onChange={e => setReps(e.target.value)} placeholder={targetReps}
            style={{ width: 90, padding: "6px 10px", background: "#0f172a", border: "1px solid #334155", borderRadius: 8, color: "#e2e8f0", fontSize: 13, fontFamily: "'Space Mono', monospace" }} />
          <button onClick={handleLog} style={{ background: "#3b82f6", border: "none", color: "white", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
            <Plus size={14} /> Log Set {logged.length + 1}
          </button>
        </div>
      )}
      {logged.length === targetSets && (
        <div style={{ color: "#22c55e", fontSize: 12, marginTop: 4, fontFamily: "'Space Mono', monospace" }}>✓ All {targetSets} sets complete</div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// RUN LOGGER
// ─────────────────────────────────────────────
function RunLogger({ runGoal, onLogRun }) {
  const [distance, setDistance] = useState("");
  const [minutes, setMinutes] = useState("");
  const [notes, setNotes] = useState("");
  const [logged, setLogged] = useState(false);

  const handleLog = () => {
    if (!distance) return;
    const data = { distance: parseFloat(distance), minutes: parseInt(minutes) || 0, notes, date: new Date().toISOString() };
    onLogRun(data);
    setLogged(true);
  };

  if (logged) return (
    <div style={{ background: "#052e16", border: "1px solid #166534", borderRadius: 12, padding: 16, textAlign: "center" }}>
      <div style={{ color: "#22c55e", fontSize: 20, marginBottom: 4 }}>🏃 Run Logged!</div>
      <div style={{ color: "#86efac", fontSize: 13, fontFamily: "'Space Mono', monospace" }}>{distance} miles · {minutes} min</div>
    </div>
  );

  return (
    <div style={{ background: "#0f172a", border: "1px solid #1e3a2f", borderRadius: 12, padding: 16 }}>
      <div style={{ color: "#22c55e", fontWeight: 600, marginBottom: 4 }}>🏃 Log Your Run</div>
      <div style={{ color: "#64748b", fontSize: 12, marginBottom: 12, fontFamily: "'Space Mono', monospace" }}>Goal: {runGoal}</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <div>
          <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4 }}>DISTANCE (mi)</div>
          <input value={distance} onChange={e => setDistance(e.target.value)} placeholder="3.0"
            style={{ width: 90, padding: "8px 12px", background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#e2e8f0", fontFamily: "'Space Mono', monospace" }} />
        </div>
        <div>
          <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4 }}>TIME (min)</div>
          <input value={minutes} onChange={e => setMinutes(e.target.value)} placeholder="30"
            style={{ width: 90, padding: "8px 12px", background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#e2e8f0", fontFamily: "'Space Mono', monospace" }} />
        </div>
        <div style={{ flex: 1, minWidth: 120 }}>
          <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4 }}>NOTES</div>
          <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="How did it feel?"
            style={{ width: "100%", padding: "8px 12px", background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#e2e8f0", fontFamily: "'Space Mono', monospace", boxSizing: "border-box" }} />
        </div>
      </div>
      <button onClick={handleLog} style={{ marginTop: 12, background: "#22c55e", border: "none", color: "#052e16", fontWeight: 700, borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontFamily: "'Space Mono', monospace" }}>
        LOG RUN
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("today");
  const [week, setWeek] = useState(getWeekNumber());
  const [dow, setDow] = useState(getDayOfWeek());
  const [workoutHistory, setWorkoutHistory] = useState({});
  const [runHistory, setRunHistory] = useState([]);
  const [showTimer, setShowTimer] = useState(false);
  const [librarySearch, setLibrarySearch] = useState("");
  const [libraryCategory, setLibraryCategory] = useState("all");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [aiMessages, setAiMessages] = useState([{ role: "ai", text: "Hey Jake! I'm your AI coach. Ask me anything about today's workout, form, or your training plan." }]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const aiRef = useRef(null);

  const phase = getProgramPhase(week);
  const dayInfo = SCHEDULE[dow];
  const runSchedule = getRunSchedule(week);
  const liftPlan = getLiftForDay(dow);
  const runGoalMap = { 2: runSchedule.tue, 3: runSchedule.wed, 5: runSchedule.fri, 6: runSchedule.sat };
  const todayRunGoal = runGoalMap[dow];

  function logSet(exerciseId, data) {
    setWorkoutHistory(prev => ({
      ...prev,
      [exerciseId]: [...(prev[exerciseId] || []), { ...data, date: new Date().toISOString() }]
    }));
  }

  function logRun(data) {
    setRunHistory(prev => [...prev, data]);
  }

  function toggleGroup(key) {
    setExpandedGroups(prev => ({ ...prev, [key]: !prev[key] }));
  }

  // AI Chat
  async function sendAiMessage() {
    if (!aiInput.trim()) return;
    const userMsg = aiInput.trim();
    setAiMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setAiInput("");
    setAiLoading(true);

    const systemPrompt = `You are Jake's personal AI fitness coach inside his workout tracker app. 
Jake is training for a half marathon on May 2, 2026. He is currently in Week ${week} (${phase.name} phase) of his 13-week training program.
Today is ${["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dow]}.
Today's workout: ${dayInfo?.label}.
${liftPlan ? `Lifting focus: ${liftPlan.label}` : ""}
${todayRunGoal ? `Run goal today: ${todayRunGoal}` : ""}

Jake's program: Push/Pull/Legs/Upper/Lower lifting split + half marathon training integrated. Mon=Push, Tue=Pull+Easy Run, Wed=Tempo Run, Thu=Upper, Fri=Easy Run, Sat=Legs+Long Run, Sun=Rest.
Keep responses concise, helpful, and encouraging. You know Jake's full training context.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [
            ...aiMessages.filter(m => m.role !== "ai").map(m => ({ role: "user", content: m.text })),
            { role: "user", content: userMsg }
          ]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "Sorry, I couldn't get a response.";
      setAiMessages(prev => [...prev, { role: "ai", text }]);
    } catch {
      setAiMessages(prev => [...prev, { role: "ai", text: "Connection issue — try again!" }]);
    }
    setAiLoading(false);
    setTimeout(() => aiRef.current?.scrollTo({ top: 9999, behavior: "smooth" }), 100);
  }

  // Library
  const allExercises = Object.values(EXERCISE_LIBRARY).flat();
  const filteredExercises = allExercises.filter(ex => {
    const matchCat = libraryCategory === "all" || ex.primary.toLowerCase().includes(libraryCategory);
    const matchSearch = ex.name.toLowerCase().includes(librarySearch.toLowerCase());
    return matchCat && matchSearch;
  });

  // Progress data
  function getProgressData(id) {
    return (workoutHistory[id] || []).slice(-10).map((e, i) => ({ session: i + 1, weight: e.weight, volume: e.weight * e.reps }));
  }

  const runProgressData = runHistory.slice(-10).map((r, i) => ({ session: i + 1, miles: r.distance, pace: r.minutes && r.distance ? +(r.minutes / r.distance).toFixed(1) : 0 }));

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // ── STYLES
  const S = {
    app: { background: "#030712", minHeight: "100vh", color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif", paddingBottom: 80 },
    header: { background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", borderBottom: "1px solid #1e293b", padding: "20px 24px" },
    tabs: { display: "flex", gap: 4, background: "#0f172a", borderTop: "1px solid #1e293b", position: "fixed", bottom: 0, left: 0, right: 0, padding: "8px 12px", zIndex: 50 },
    tab: (active) => ({ flex: 1, padding: "8px 4px", background: active ? "#1e40af" : "transparent", border: "none", color: active ? "#fff" : "#64748b", borderRadius: 10, cursor: "pointer", fontSize: 11, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }),
    card: { background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: 20, marginBottom: 16 },
    sectionTitle: { fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Space Mono', monospace", marginBottom: 12 },
    badge: (color) => ({ background: color + "22", color, border: `1px solid ${color}44`, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontFamily: "'Space Mono', monospace" }),
    btn: (color = "#3b82f6") => ({ background: color, border: "none", color: "white", borderRadius: 10, padding: "10px 20px", cursor: "pointer", fontWeight: 600, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }),
    input: { width: "100%", padding: "12px 16px", background: "#1e293b", border: "1px solid #334155", borderRadius: 12, color: "#e2e8f0", fontSize: 14, fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" },
  };

  return (
    <div style={S.app}>
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap'); * { box-sizing: border-box; } input, button { outline: none; }`}</style>

      {/* HEADER */}
      <div style={S.header}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>Jake's Training</div>
              <span style={S.badge(phase.color)}>Week {week} · {phase.name}</span>
            </div>
            <div style={{ color: "#64748b", fontSize: 13, marginTop: 4 }}>{phase.desc}</div>
          </div>
          <button onClick={() => setShowTimer(true)} style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 12, padding: "8px 14px", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
            <Timer size={16} /> Timer
          </button>
        </div>
        {/* Week progress bar */}
        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#64748b", fontFamily: "'Space Mono', monospace", marginBottom: 6 }}>
            <span>WEEK {week} / 13</span>
            <span>RACE DAY MAY 2</span>
          </div>
          <div style={{ background: "#1e293b", borderRadius: 99, height: 6 }}>
            <div style={{ width: `${(week / 13) * 100}%`, height: 6, borderRadius: 99, background: `linear-gradient(90deg, ${phase.color}, ${phase.color}88)`, transition: "width 0.5s" }} />
          </div>
        </div>
      </div>

      {/* ── TODAY TAB ── */}
      {tab === "today" && (
        <div style={{ padding: "20px 16px" }}>
          {/* Day Banner */}
          <div style={{ background: `linear-gradient(135deg, ${dayInfo.color}22, #0f172a)`, border: `1px solid ${dayInfo.color}44`, borderRadius: 16, padding: 20, marginBottom: 20 }}>
            <div style={{ display: "flex", align: "center", gap: 12 }}>
              <div style={{ fontSize: 36 }}>{dayInfo.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{dayInfo.label}</div>
                <div style={{ color: "#94a3b8", fontSize: 14, marginTop: 2 }}>{dayInfo.description}</div>
                {dayInfo.type === "rest" && <div style={{ color: "#64748b", fontSize: 13, marginTop: 8 }}>Recovery is where muscle is built. Stretch, walk, and hydrate.</div>}
              </div>
            </div>
          </div>

          {/* RUN SECTION */}
          {todayRunGoal && todayRunGoal !== "REST" && (
            <div style={{ ...S.card, borderColor: "#1e3a2f" }}>
              <div style={S.sectionTitle}>🏃 Run — {todayRunGoal}</div>
              {dow === 6 && <div style={{ background: "#451a03", border: "1px solid #78350f", borderRadius: 10, padding: 12, marginBottom: 14, color: "#fbbf24", fontSize: 13 }}>⚠️ Run first this morning before lifting. Your legs will thank you.</div>}
              {dow === 3 && <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 12 }}>Tempo run: easy 1 mile warm-up → tempo pace middle miles → easy 1 mile cool-down. <strong style={{ color: "#f59e0b" }}>No lifting today.</strong></div>}
              {dow === 2 && <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 12 }}>Easy afternoon run after your pull session. Keep it conversational pace.</div>}
              {dow === 5 && <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 12 }}>Easy recovery run. No lifting today. Keep your heart rate low and enjoy it.</div>}
              <RunLogger runGoal={todayRunGoal} onLogRun={logRun} />
            </div>
          )}

          {/* LIFT SECTION */}
          {liftPlan && dayInfo.type !== "rest" && (
            <div>
              <div style={{ ...S.card, padding: "16px 20px", background: "#0a0f1e", borderColor: "#1e293b" }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{liftPlan.label}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                  <span style={S.badge("#3b82f6")}>🔥 Warm-up: {liftPlan.warmup}</span>
                  {week >= 12 && <span style={S.badge("#a855f7")}>⚡ TAPER WEEK — reduce volume 30%</span>}
                  {liftPlan.note && dow === 6 && <span style={S.badge("#f59e0b")}>{liftPlan.note}</span>}
                </div>
              </div>

              {liftPlan.groups.map((group, gi) => {
                const key = `${dow}-${gi}`;
                const expanded = expandedGroups[key] !== false; // default expanded
                return (
                  <div key={gi} style={{ ...S.card, padding: 0, overflow: "hidden" }}>
                    <button onClick={() => toggleGroup(key)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        {group.isSuperset && <span style={{ background: "#f59e0b22", color: "#f59e0b", border: "1px solid #f59e0b44", borderRadius: 6, padding: "2px 8px", fontSize: 10, fontFamily: "'Space Mono', monospace" }}>SUPERSET</span>}
                        <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 14 }}>{group.label}</span>
                      </div>
                      {expanded ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
                    </button>
                    {group.isSuperset && expanded && (
                      <div style={{ background: "#1a1500", borderTop: "1px solid #78350f22", padding: "6px 20px 0", fontSize: 12, color: "#fbbf24" }}>
                        ⚡ No rest between paired exercises. Rest 60s after completing both.
                      </div>
                    )}
                    {expanded && (
                      <div style={{ padding: "0 20px 16px" }}>
                        {group.exercises.map((ex, ei) => (
                          <div key={ei} style={{ borderTop: "1px solid #1e293b", paddingTop: 14, marginTop: 14 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                              <div>
                                <div style={{ fontWeight: 600, fontSize: 15 }}>{ex.name}</div>
                                <div style={{ color: "#64748b", fontSize: 12, fontFamily: "'Space Mono', monospace", marginTop: 2 }}>
                                  {ex.sets} × {ex.reps} {ex.note && <span style={{ color: "#f59e0b" }}>· {ex.note}</span>}
                                </div>
                              </div>
                              <button onClick={() => setSelectedExercise(EXERCISE_LIBRARY[Object.keys(EXERCISE_LIBRARY).find(k => EXERCISE_LIBRARY[k].find(e => e.id === ex.id))]?.find(e => e.id === ex.id))}
                                style={{ background: "none", border: "none", color: "#334155", cursor: "pointer", padding: 4 }}>
                                <Info size={16} />
                              </button>
                            </div>
                            <SetLogger exerciseId={ex.id} exerciseName={ex.name} targetSets={ex.sets} targetReps={ex.reps} onLog={logSet} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Cardio Finisher */}
              {liftPlan.cardioFinisher && !(dow === 6) && (
                <div style={{ ...S.card, background: "#1a0a0a", borderColor: "#7f1d1d33" }}>
                  <div style={S.sectionTitle}>⚡ Cardio Finisher</div>
                  <div style={{ color: "#fca5a5", fontSize: 14 }}>{liftPlan.cardioFinisher}</div>
                </div>
              )}
            </div>
          )}

          {/* Rest day */}
          {dayInfo.type === "rest" && (
            <div style={{ ...S.card, textAlign: "center", padding: 40 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>😴</div>
              <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Rest Day</div>
              <div style={{ color: "#64748b", fontSize: 14 }}>Recovery is productive. Stretch, foam roll, hydrate, and sleep well.</div>
            </div>
          )}
        </div>
      )}

      {/* ── SCHEDULE TAB ── */}
      {tab === "schedule" && (
        <div style={{ padding: "20px 16px" }}>
          <div style={S.card}>
            <div style={S.sectionTitle}>This Week at a Glance</div>
            {daysOfWeek.map((d, i) => {
              const info = SCHEDULE[i];
              const isToday = i === dow;
              const runMap = { 2: runSchedule.tue, 3: runSchedule.wed, 5: runSchedule.fri, 6: runSchedule.sat };
              return (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "12px 0", borderBottom: i < 6 ? "1px solid #1e293b" : "none", background: isToday ? "#1e293b33" : "transparent", borderRadius: 8, paddingLeft: isToday ? 8 : 0 }}>
                  <div style={{ width: 36, textAlign: "center" }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#64748b" }}>{d}</div>
                    <div style={{ fontSize: 18 }}>{info.icon}</div>
                    {isToday && <div style={{ fontSize: 9, color: info.color, fontFamily: "'Space Mono', monospace" }}>TODAY</div>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: isToday ? info.color : "#e2e8f0", fontSize: 14 }}>{info.label}</div>
                    <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{info.description}</div>
                    {runMap[i] && runMap[i] !== "REST" && <div style={{ color: "#22c55e", fontSize: 12, marginTop: 4, fontFamily: "'Space Mono', monospace" }}>🏃 {runMap[i]}</div>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Phase info */}
          <div style={{ ...S.card, borderColor: phase.color + "44" }}>
            <div style={S.sectionTitle}>Training Phase — Week {week}</div>
            <div style={{ fontWeight: 700, fontSize: 18, color: phase.color, marginBottom: 6 }}>{phase.name}</div>
            <div style={{ color: "#94a3b8", fontSize: 14, marginBottom: 16 }}>{phase.desc}</div>
            {week >= 9 && week <= 11 && (
              <div style={{ background: "#1c1917", border: "1px solid #78350f44", borderRadius: 10, padding: 12, color: "#fbbf24", fontSize: 13 }}>
                ⚠️ <strong>Peak Phase:</strong> Legs volume reduced to 3 sessions, no sprint finishers before long runs.
              </div>
            )}
            {week >= 12 && (
              <div style={{ background: "#1a0a1a", border: "1px solid #7e22ce44", borderRadius: 10, padding: 12, color: "#c084fc", fontSize: 13 }}>
                🏁 <strong>Taper Mode:</strong> Reduce all volume 30-40%. Protect your legs. No new stress — just stay sharp.
              </div>
            )}
          </div>

          {/* Week selector */}
          <div style={S.card}>
            <div style={S.sectionTitle}>Jump to Week</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button onClick={() => setWeek(w => Math.max(1, w - 1))} style={{ ...S.btn("#1e293b"), padding: "8px 14px" }}><ChevronLeft size={18} /></button>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 24, fontWeight: 700 }}>Week {week}</div>
                <div style={{ color: getProgramPhase(week).color, fontSize: 13 }}>{getProgramPhase(week).name}</div>
              </div>
              <button onClick={() => setWeek(w => Math.min(13, w + 1))} style={{ ...S.btn("#1e293b"), padding: "8px 14px" }}><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>
      )}

      {/* ── PROGRESS TAB ── */}
      {tab === "progress" && (
        <div style={{ padding: "20px 16px" }}>
          <div style={S.card}>
            <div style={S.sectionTitle}>Running Progress</div>
            {runHistory.length === 0 ? (
              <div style={{ color: "#64748b", fontSize: 14, textAlign: "center", padding: 20 }}>No runs logged yet. Get out there! 🏃</div>
            ) : (
              <>
                <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                  <div style={{ flex: 1, background: "#0f172a", borderRadius: 10, padding: 14, textAlign: "center" }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 22, color: "#22c55e", fontWeight: 700 }}>{runHistory.reduce((a, r) => a + r.distance, 0).toFixed(1)}</div>
                    <div style={{ color: "#64748b", fontSize: 11 }}>TOTAL MILES</div>
                  </div>
                  <div style={{ flex: 1, background: "#0f172a", borderRadius: 10, padding: 14, textAlign: "center" }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 22, color: "#3b82f6", fontWeight: 700 }}>{runHistory.length}</div>
                    <div style={{ color: "#64748b", fontSize: 11 }}>RUNS LOGGED</div>
                  </div>
                  <div style={{ flex: 1, background: "#0f172a", borderRadius: 10, padding: 14, textAlign: "center" }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 22, color: "#f59e0b", fontWeight: 700 }}>{runHistory.length > 0 ? (runHistory.reduce((a, r) => a + r.distance, 0) / runHistory.length).toFixed(1) : "0"}</div>
                    <div style={{ color: "#64748b", fontSize: 11 }}>AVG MILES</div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={runProgressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="session" tick={{ fill: "#64748b", fontSize: 11 }} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }} />
                    <Bar dataKey="miles" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </>
            )}
          </div>

          <div style={S.card}>
            <div style={S.sectionTitle}>Lifting Progress — Select Exercise</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {Object.entries(workoutHistory).filter(([, v]) => v.length > 0).map(([id]) => {
                const ex = Object.values(EXERCISE_LIBRARY).flat().find(e => e.id === parseInt(id));
                if (!ex) return null;
                return (
                  <button key={id} onClick={() => setSelectedExercise(ex)}
                    style={{ background: selectedExercise?.id === parseInt(id) ? "#3b82f6" : "#1e293b", border: "1px solid #334155", color: selectedExercise?.id === parseInt(id) ? "white" : "#94a3b8", borderRadius: 8, padding: "6px 12px", fontSize: 12, cursor: "pointer" }}>
                    {ex.name}
                  </button>
                );
              })}
              {Object.keys(workoutHistory).length === 0 && <div style={{ color: "#64748b", fontSize: 14 }}>Log some workouts to see progress charts.</div>}
            </div>
            {selectedExercise && workoutHistory[selectedExercise.id]?.length > 0 && (
              <>
                <div style={{ fontWeight: 600, marginBottom: 12 }}>{selectedExercise.name}</div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={getProgressData(selectedExercise.id)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="session" tick={{ fill: "#64748b", fontSize: 11 }} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8 }} />
                    <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6", r: 4 }} name="Weight (lbs)" />
                    <Line type="monotone" dataKey="volume" stroke="#22c55e" strokeWidth={2} dot={{ fill: "#22c55e", r: 4 }} name="Volume" />
                  </LineChart>
                </ResponsiveContainer>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── LIBRARY TAB ── */}
      {tab === "library" && (
        <div style={{ padding: "20px 16px" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <input value={librarySearch} onChange={e => setLibrarySearch(e.target.value)} placeholder="Search exercises..." style={{ ...S.input, marginBottom: 0 }} />
          </div>
          <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 16, paddingBottom: 4 }}>
            {["all", "chest", "back", "shoulder", "tricep", "bicep", "leg", "abs", "cardio"].map(cat => (
              <button key={cat} onClick={() => setLibraryCategory(cat)}
                style={{ background: libraryCategory === cat ? "#3b82f6" : "#1e293b", border: "1px solid #334155", color: libraryCategory === cat ? "white" : "#94a3b8", borderRadius: 20, padding: "6px 14px", fontSize: 12, cursor: "pointer", whiteSpace: "nowrap", textTransform: "capitalize" }}>
                {cat}
              </button>
            ))}
          </div>
          <div style={{ color: "#64748b", fontSize: 12, marginBottom: 12, fontFamily: "'Space Mono', monospace" }}>{filteredExercises.length} EXERCISES</div>
          {filteredExercises.map(ex => (
            <div key={ex.id} onClick={() => setSelectedExercise(selectedExercise?.id === ex.id ? null : ex)}
              style={{ ...S.card, cursor: "pointer", marginBottom: 8, borderColor: selectedExercise?.id === ex.id ? "#3b82f6" : "#1e293b" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{ex.name}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                    <span style={S.badge("#3b82f6")}>{ex.primary}</span>
                    <span style={S.badge("#64748b")}>{ex.equipment}</span>
                    <span style={S.badge(ex.difficulty === "Advanced" ? "#ef4444" : ex.difficulty === "Intermediate" ? "#f59e0b" : "#22c55e")}>{ex.difficulty}</span>
                  </div>
                </div>
                {selectedExercise?.id === ex.id ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
              </div>
              {selectedExercise?.id === ex.id && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #1e293b" }}>
                  <div style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>{ex.description}</div>
                  {ex.secondary && ex.secondary !== "None" && (
                    <div style={{ color: "#64748b", fontSize: 12, marginTop: 8 }}>Secondary: {ex.secondary}</div>
                  )}
                  {workoutHistory[ex.id]?.length > 0 && (
                    <div style={{ marginTop: 12, background: "#0f172a", borderRadius: 10, padding: 12 }}>
                      <div style={{ color: "#64748b", fontSize: 11, fontFamily: "'Space Mono', monospace", marginBottom: 8 }}>YOUR HISTORY</div>
                      {workoutHistory[ex.id].slice(-3).map((e, i) => (
                        <div key={i} style={{ color: "#22c55e", fontSize: 13, fontFamily: "'Space Mono', monospace" }}>
                          {e.weight}lbs × {e.reps} reps
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── AI COACH TAB ── */}
      {tab === "ai" && (
        <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", height: "calc(100vh - 140px)" }}>
          <div style={{ ...S.card, flex: 1, overflowY: "auto", marginBottom: 12 }} ref={aiRef}>
            {aiMessages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
                <div style={{ maxWidth: "80%", background: m.role === "user" ? "#1e40af" : "#1e293b", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding: "12px 16px", fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                  {m.role === "ai" && <div style={{ fontSize: 11, color: "#64748b", fontFamily: "'Space Mono', monospace", marginBottom: 6 }}>AI COACH</div>}
                  {m.text}
                </div>
              </div>
            ))}
            {aiLoading && (
              <div style={{ display: "flex", gap: 6, padding: 12 }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: 8, height: 8, background: "#3b82f6", borderRadius: "50%", animation: `pulse 1s ${i * 0.2}s infinite` }} />)}
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={aiInput} onChange={e => setAiInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendAiMessage()} placeholder="Ask your coach anything..." style={{ ...S.input, marginBottom: 0 }} />
            <button onClick={sendAiMessage} style={{ ...S.btn(), padding: "12px 18px", flexShrink: 0 }}>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* BOTTOM TABS */}
      <div style={S.tabs}>
        {[
          { key: "today", icon: <Flame size={18} />, label: "Today" },
          { key: "schedule", icon: <Calendar size={18} />, label: "Schedule" },
          { key: "progress", icon: <TrendingUp size={18} />, label: "Progress" },
          { key: "library", icon: <Library size={18} />, label: "Library" },
          { key: "ai", icon: <MessageSquare size={18} />, label: "AI Coach" },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={S.tab(tab === t.key)}>
            {t.icon}
            <span style={{ fontSize: 10 }}>{t.label}</span>
          </button>
        ))}
      </div>

      {/* TIMER OVERLAY */}
      {showTimer && <RestTimer onClose={() => setShowTimer(false)} />}

      {/* Exercise Detail Modal */}
      {selectedExercise && tab === "today" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "flex", alignItems: "flex-end" }} onClick={() => setSelectedExercise(null)}>
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "24px 24px 0 0", padding: 24, width: "100%", maxHeight: "60vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{selectedExercise.name}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
              <span style={S.badge("#3b82f6")}>{selectedExercise.primary}</span>
              <span style={S.badge("#64748b")}>{selectedExercise.equipment}</span>
              <span style={S.badge(selectedExercise.difficulty === "Advanced" ? "#ef4444" : "#f59e0b")}>{selectedExercise.difficulty}</span>
            </div>
            <div style={{ color: "#94a3b8", lineHeight: 1.7 }}>{selectedExercise.description}</div>
            {selectedExercise.secondary && <div style={{ color: "#64748b", fontSize: 13, marginTop: 10 }}>Also works: {selectedExercise.secondary}</div>}
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
