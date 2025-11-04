import React, { useState } from 'react';
import { Dumbbell, TrendingUp, Library, Calendar, Plus, Check, RefreshCw, Zap, MessageSquare, X, CalendarDays } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EXERCISE_LIBRARY = {
  chest: [
    { id: 1, name: 'Barbell Bench Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Chest', secondary: 'Triceps, Shoulders', description: 'The king of chest exercises.' },
    { id: 2, name: 'Dumbbell Bench Press', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Chest', secondary: 'Triceps, Shoulders', description: 'Greater range of motion.' },
    { id: 3, name: 'Incline Barbell Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Upper Chest', secondary: 'Shoulders, Triceps', description: 'Targets upper pectorals.' },
    { id: 4, name: 'Incline Dumbbell Press', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Upper Chest', secondary: 'Shoulders, Triceps', description: 'Upper chest focus.' },
    { id: 5, name: 'Decline Bench Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Lower Chest', secondary: 'Triceps', description: 'Lower chest emphasis.' },
    { id: 6, name: 'Dumbbell Flyes', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Chest', secondary: 'None', description: 'Chest isolation exercise.' },
    { id: 7, name: 'Cable Flyes', equipment: 'Cable', difficulty: 'Beginner', primary: 'Chest', secondary: 'None', description: 'Constant tension flyes.' },
    { id: 8, name: 'Push-ups', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Chest', secondary: 'Triceps, Core', description: 'Classic bodyweight.' },
    { id: 9, name: 'Chest Dips', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Lower Chest', secondary: 'Triceps', description: 'Lower chest mass.' },
    { id: 10, name: 'Pec Deck Machine', equipment: 'Machine', difficulty: 'Beginner', primary: 'Chest', secondary: 'None', description: 'Chest isolation.' },
    { id: 101, name: 'Low Cable Flyes', equipment: 'Cable', difficulty: 'Beginner', primary: 'Upper Chest', secondary: 'None', description: 'Upper chest cable work.' },
    { id: 102, name: 'Landmine Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Chest', secondary: 'Shoulders, Core', description: 'Natural pressing arc.' },
    { id: 201, name: 'Svend Press', equipment: 'Plate', difficulty: 'Beginner', primary: 'Inner Chest', secondary: 'None', description: 'Inner chest squeeze.' },
    { id: 202, name: 'Floor Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Chest', secondary: 'Triceps', description: 'Lockout strength.' },
    { id: 301, name: 'Smith Machine Bench', equipment: 'Machine', difficulty: 'Beginner', primary: 'Chest', secondary: 'Triceps', description: 'Controlled pressing.' },
    { id: 302, name: 'Incline Cable Flyes', equipment: 'Cable', difficulty: 'Beginner', primary: 'Upper Chest', secondary: 'None', description: 'Upper chest stretch.' },
    { id: 303, name: 'Decline Dumbbell Press', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Lower Chest', secondary: 'Triceps', description: 'Lower chest builder.' },
    { id: 304, name: 'Wide Push-ups', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Chest', secondary: 'Shoulders', description: 'Chest-focused pushup.' },
    { id: 305, name: 'Plate Press', equipment: 'Plate', difficulty: 'Beginner', primary: 'Chest', secondary: 'Triceps', description: 'Plate squeeze press.' },
    { id: 306, name: 'Dumbbell Pullover', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Chest', secondary: 'Lats', description: 'Chest expansion.' },
    { id: 307, name: 'Deficit Push-ups', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Chest', secondary: 'Triceps', description: 'Increased ROM.' },
    { id: 308, name: 'Machine Chest Press', equipment: 'Machine', difficulty: 'Beginner', primary: 'Chest', secondary: 'Triceps', description: 'Safe machine press.' },
  ],
  back: [
    { id: 11, name: 'Deadlift', equipment: 'Barbell', difficulty: 'Advanced', primary: 'Back', secondary: 'Hamstrings, Glutes', description: 'Ultimate strength builder.' },
    { id: 12, name: 'Pull-ups', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Lats', secondary: 'Biceps', description: 'Back width builder.' },
    { id: 13, name: 'Bent-Over Barbell Row', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Back', secondary: 'Biceps', description: 'Back thickness builder.' },
    { id: 14, name: 'Dumbbell Row', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Back', secondary: 'Biceps', description: 'Unilateral back work.' },
    { id: 15, name: 'Lat Pulldown', equipment: 'Cable', difficulty: 'Beginner', primary: 'Lats', secondary: 'Biceps', description: 'Pull-up alternative.' },
    { id: 16, name: 'Seated Cable Row', equipment: 'Cable', difficulty: 'Beginner', primary: 'Back', secondary: 'Biceps', description: 'Mid-back developer.' },
    { id: 17, name: 'T-Bar Row', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Back', secondary: 'Biceps', description: 'Heavy back row.' },
    { id: 18, name: 'Face Pulls', equipment: 'Cable', difficulty: 'Beginner', primary: 'Rear Delts', secondary: 'Upper Back', description: 'Shoulder health.' },
    { id: 19, name: 'Chin-ups', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Lats', secondary: 'Biceps', description: 'Bicep-focused pullup.' },
    { id: 20, name: 'Hyperextensions', equipment: 'Machine', difficulty: 'Beginner', primary: 'Lower Back', secondary: 'Glutes', description: 'Lower back strength.' },
    { id: 103, name: 'Pendlay Row', equipment: 'Barbell', difficulty: 'Advanced', primary: 'Back', secondary: 'Biceps', description: 'Explosive row.' },
    { id: 104, name: 'Chest Supported Row', equipment: 'Machine', difficulty: 'Beginner', primary: 'Back', secondary: 'Biceps', description: 'Strict form row.' },
    { id: 105, name: 'Straight Arm Pulldown', equipment: 'Cable', difficulty: 'Beginner', primary: 'Lats', secondary: 'None', description: 'Lat isolation.' },
    { id: 203, name: 'Meadows Row', equipment: 'Barbell', difficulty: 'Advanced', primary: 'Back', secondary: 'Biceps', description: 'Landmine row.' },
    { id: 204, name: 'Inverted Row', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Back', secondary: 'Biceps', description: 'Horizontal pullup.' },
    { id: 205, name: 'Rack Pulls', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Back', secondary: 'Traps', description: 'Partial deadlift.' },
    { id: 309, name: 'Wide Grip Pulldown', equipment: 'Cable', difficulty: 'Beginner', primary: 'Lats', secondary: 'Biceps', description: 'Width emphasis.' },
    { id: 310, name: 'Close Grip Pulldown', equipment: 'Cable', difficulty: 'Beginner', primary: 'Lats', secondary: 'Biceps', description: 'Thickness emphasis.' },
    { id: 311, name: 'Reverse Grip Pulldown', equipment: 'Cable', difficulty: 'Beginner', primary: 'Lats', secondary: 'Biceps', description: 'Underhand pulldown.' },
    { id: 312, name: 'Kroc Row', equipment: 'Dumbbell', difficulty: 'Advanced', primary: 'Back', secondary: 'Biceps', description: 'Heavy momentum row.' },
    { id: 313, name: 'Seal Row', equipment: 'Bench', difficulty: 'Intermediate', primary: 'Back', secondary: 'Biceps', description: 'Strict chest support.' },
    { id: 314, name: 'Cable Row High', equipment: 'Cable', difficulty: 'Beginner', primary: 'Upper Back', secondary: 'Rear Delts', description: 'Upper back focus.' },
    { id: 315, name: 'Cable Row Low', equipment: 'Cable', difficulty: 'Beginner', primary: 'Lats', secondary: 'Biceps', description: 'Lower lat focus.' },
    { id: 316, name: 'Machine Row', equipment: 'Machine', difficulty: 'Beginner', primary: 'Back', secondary: 'Biceps', description: 'Controlled rowing.' },
    { id: 317, name: 'Barbell Shrugs', equipment: 'Barbell', difficulty: 'Beginner', primary: 'Traps', secondary: 'None', description: 'Trap builder.' },
    { id: 318, name: 'Dumbbell Shrugs', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Traps', secondary: 'None', description: 'Trap isolation.' },
    { id: 319, name: 'Cable Shrugs', equipment: 'Cable', difficulty: 'Beginner', primary: 'Traps', secondary: 'None', description: 'Constant tension.' },
    { id: 320, name: 'Good Mornings', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Lower Back', secondary: 'Hamstrings', description: 'Lower back strength.' },
  ],
  legs: [
    { id: 21, name: 'Barbell Squat', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Quads', secondary: 'Glutes, Hamstrings', description: 'King of leg exercises.' },
    { id: 23, name: 'Romanian Deadlift', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Hamstrings', secondary: 'Glutes, Lower Back', description: 'Hamstring builder.' },
    { id: 24, name: 'Leg Press', equipment: 'Machine', difficulty: 'Beginner', primary: 'Quads', secondary: 'Glutes', description: 'Safe heavy loading.' },
    { id: 25, name: 'Leg Curl', equipment: 'Machine', difficulty: 'Beginner', primary: 'Hamstrings', secondary: 'None', description: 'Hamstring isolation.' },
    { id: 26, name: 'Leg Extension', equipment: 'Machine', difficulty: 'Beginner', primary: 'Quads', secondary: 'None', description: 'Quad isolation.' },
    { id: 27, name: 'Walking Lunges', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Quads', secondary: 'Glutes', description: 'Unilateral leg work.' },
    { id: 29, name: 'Calf Raises', equipment: 'Machine', difficulty: 'Beginner', primary: 'Calves', secondary: 'None', description: 'Calf developer.' },
    { id: 108, name: 'Hip Thrusts', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Glutes', secondary: 'Hamstrings', description: 'Best glute builder.' },
  ],
  shoulders: [
    { id: 31, name: 'Overhead Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Shoulders', secondary: 'Triceps', description: 'Shoulder mass builder.' },
    { id: 32, name: 'Dumbbell Shoulder Press', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Shoulders', secondary: 'Triceps', description: 'Natural movement.' },
    { id: 33, name: 'Lateral Raises', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Side Delts', secondary: 'None', description: 'Shoulder width.' },
    { id: 34, name: 'Front Raises', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Front Delts', secondary: 'None', description: 'Front delt isolation.' },
    { id: 35, name: 'Rear Delt Flyes', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Rear Delts', secondary: 'None', description: 'Rear delt isolation.' },
    { id: 36, name: 'Arnold Press', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Shoulders', secondary: 'Triceps', description: 'Rotating press.' },
    { id: 37, name: 'Cable Lateral Raises', equipment: 'Cable', difficulty: 'Beginner', primary: 'Side Delts', secondary: 'None', description: 'Constant tension.' },
    { id: 38, name: 'Upright Row', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Shoulders', secondary: 'Traps', description: 'Shoulder and trap.' },
    { id: 39, name: 'Military Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Shoulders', secondary: 'Triceps', description: 'Strict standing press.' },
    { id: 40, name: 'Shrugs', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Traps', secondary: 'None', description: 'Trap builder.' },
    { id: 111, name: 'Viking Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Shoulders', secondary: 'Triceps', description: 'Neutral grip press.' },
    { id: 112, name: 'Lu Raises', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Side Delts', secondary: 'Front Delts', description: 'Combined raise.' },
    { id: 210, name: 'Bradford Press', equipment: 'Barbell', difficulty: 'Advanced', primary: 'Shoulders', secondary: 'Triceps', description: 'Front to back press.' },
    { id: 211, name: 'Cuban Press', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Shoulders', secondary: 'Rotator Cuff', description: 'Shoulder health.' },
    { id: 321, name: 'Seated DB Press', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Shoulders', secondary: 'Triceps', description: 'Strict shoulder press.' },
    { id: 322, name: 'Machine Shoulder Press', equipment: 'Machine', difficulty: 'Beginner', primary: 'Shoulders', secondary: 'Triceps', description: 'Controlled pressing.' },
    { id: 323, name: 'Behind Neck Press', equipment: 'Barbell', difficulty: 'Advanced', primary: 'Shoulders', secondary: 'Triceps', description: 'Advanced press.' },
    { id: 324, name: 'Push Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Shoulders', secondary: 'Legs, Triceps', description: 'Explosive pressing.' },
    { id: 325, name: 'Cable Front Raises', equipment: 'Cable', difficulty: 'Beginner', primary: 'Front Delts', secondary: 'None', description: 'Constant tension.' },
    { id: 326, name: 'Cable Rear Delt Fly', equipment: 'Cable', difficulty: 'Beginner', primary: 'Rear Delts', secondary: 'None', description: 'Rear delt cable.' },
    { id: 327, name: 'Reverse Pec Deck', equipment: 'Machine', difficulty: 'Beginner', primary: 'Rear Delts', secondary: 'Upper Back', description: 'Rear delt machine.' },
    { id: 328, name: 'Band Pull Aparts', equipment: 'Band', difficulty: 'Beginner', primary: 'Rear Delts', secondary: 'Upper Back', description: 'Rear delt activation.' },
    { id: 329, name: 'Plate Raises', equipment: 'Plate', difficulty: 'Beginner', primary: 'Front Delts', secondary: 'None', description: 'Plate front raise.' },
    { id: 330, name: 'Leaning Lateral Raise', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Side Delts', secondary: 'None', description: 'Enhanced ROM.' },
    { id: 331, name: 'Y-Raises', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Shoulders', secondary: 'Upper Back', description: 'Y-position raise.' },
    { id: 332, name: 'W-Raises', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Rear Delts', secondary: 'Rotator Cuff', description: 'W-position raise.' },
  ],
  arms: [
    { id: 41, name: 'Barbell Curl', equipment: 'Barbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'None', description: 'Classic bicep builder.' },
    { id: 43, name: 'Hammer Curl', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'Forearms', description: 'Arm thickness.' },
    { id: 44, name: 'Preacher Curl', equipment: 'Barbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'None', description: 'Bicep peak.' },
    { id: 46, name: 'Tricep Pushdown', equipment: 'Cable', difficulty: 'Beginner', primary: 'Triceps', secondary: 'None', description: 'Tricep isolation.' },
    { id: 47, name: 'Overhead Tricep Extension', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Triceps', secondary: 'None', description: 'Long head focus.' },
    { id: 50, name: 'Close-Grip Bench Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Triceps', secondary: 'Chest', description: 'Compound tricep.' },
  ],
  abs: [
    { id: 51, name: 'Planks', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Core', secondary: 'None', description: 'Core foundation.' },
    { id: 52, name: 'Crunches', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Abs', secondary: 'None', description: 'Classic ab exercise.' },
    { id: 53, name: 'Bicycle Crunches', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Abs', secondary: 'Obliques', description: 'Full core work.' },
    { id: 54, name: 'Russian Twists', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Obliques', secondary: 'Abs', description: 'Rotational strength.' },
    { id: 55, name: 'Leg Raises', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Lower Abs', secondary: 'Hip Flexors', description: 'Lower ab focus.' },
    { id: 56, name: 'Hanging Leg Raises', equipment: 'Bodyweight', difficulty: 'Advanced', primary: 'Lower Abs', secondary: 'Hip Flexors', description: 'Advanced lower abs.' },
    { id: 57, name: 'Ab Wheel Rollout', equipment: 'Equipment', difficulty: 'Advanced', primary: 'Core', secondary: 'Shoulders', description: 'Elite core builder.' },
    { id: 58, name: 'Mountain Climbers', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Core', secondary: 'Cardio', description: 'Dynamic core work.' },
    { id: 59, name: 'Dead Bug', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Core', secondary: 'None', description: 'Core stability.' },
    { id: 60, name: 'Cable Crunches', equipment: 'Cable', difficulty: 'Intermediate', primary: 'Abs', secondary: 'None', description: 'Weighted abs.' },
    { id: 117, name: 'Side Plank', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Obliques', secondary: 'Core', description: 'Oblique strength.' },
    { id: 118, name: 'Hollow Body Hold', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Core', secondary: 'None', description: 'Gymnastic core.' },
    { id: 119, name: 'Pallof Press', equipment: 'Cable', difficulty: 'Intermediate', primary: 'Core', secondary: 'Obliques', description: 'Anti-rotation.' },
    { id: 215, name: 'V-Ups', equipment: 'Bodyweight', difficulty: 'Advanced', primary: 'Abs', secondary: 'None', description: 'Full ab contraction.' },
    { id: 216, name: 'Windshield Wipers', equipment: 'Bar', difficulty: 'Advanced', primary: 'Obliques', secondary: 'Core', description: 'Advanced obliques.' },
    { id: 217, name: 'Toes to Bar', equipment: 'Bar', difficulty: 'Advanced', primary: 'Lower Abs', secondary: 'Hip Flexors', description: 'Elite lower abs.' },
    { id: 218, name: 'Flutter Kicks', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Lower Abs', secondary: 'Hip Flexors', description: 'Lower ab endurance.' },
    { id: 219, name: 'Reverse Crunches', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Lower Abs', secondary: 'None', description: 'Lower ab isolation.' },
    { id: 220, name: 'Plank to Pike', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Core', secondary: 'Shoulders', description: 'Dynamic core.' },
    { id: 221, name: 'Dragon Flag', equipment: 'Bench', difficulty: 'Advanced', primary: 'Core', secondary: 'None', description: 'Bruce Lee favorite.' },
    { id: 222, name: 'Woodchoppers', equipment: 'Cable', difficulty: 'Intermediate', primary: 'Obliques', secondary: 'Core', description: 'Rotational power.' },
    { id: 223, name: 'Decline Sit-ups', equipment: 'Bench', difficulty: 'Intermediate', primary: 'Abs', secondary: 'Hip Flexors', description: 'Weighted abs option.' },
    { id: 224, name: 'Ab Crunch Machine', equipment: 'Machine', difficulty: 'Beginner', primary: 'Abs', secondary: 'None', description: 'Controlled resistance.' },
    { id: 225, name: 'Plank Jacks', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Core', secondary: 'Cardio', description: 'Core with cardio.' },
  ],
  cardio: [
    { id: 61, name: 'Treadmill Running', equipment: 'Machine', difficulty: 'Beginner', primary: 'Cardio', secondary: 'Legs', description: 'Classic cardio.' },
    { id: 62, name: 'Cycling', equipment: 'Machine', difficulty: 'Beginner', primary: 'Cardio', secondary: 'Legs', description: 'Low-impact cardio.' },
    { id: 63, name: 'Rowing Machine', equipment: 'Machine', difficulty: 'Intermediate', primary: 'Cardio', secondary: 'Back, Legs', description: 'Full-body cardio.' },
    { id: 64, name: 'Elliptical', equipment: 'Machine', difficulty: 'Beginner', primary: 'Cardio', secondary: 'Legs', description: 'Joint-friendly cardio.' },
    { id: 65, name: 'Jump Rope', equipment: 'Equipment', difficulty: 'Intermediate', primary: 'Cardio', secondary: 'Calves', description: 'High-intensity cardio.' },
    { id: 66, name: 'Stair Climber', equipment: 'Machine', difficulty: 'Intermediate', primary: 'Cardio', secondary: 'Legs, Glutes', description: 'Glute-focused cardio.' },
    { id: 67, name: 'Swimming', equipment: 'Pool', difficulty: 'Intermediate', primary: 'Cardio', secondary: 'Full Body', description: 'Zero-impact cardio.' },
    { id: 68, name: 'Battle Ropes', equipment: 'Equipment', difficulty: 'Intermediate', primary: 'Cardio', secondary: 'Arms, Core', description: 'HIIT cardio option.' },
    { id: 120, name: 'Assault Bike', equipment: 'Machine', difficulty: 'Advanced', primary: 'Cardio', secondary: 'Full Body', description: 'Brutal conditioning.' },
    { id: 121, name: 'Sled Push', equipment: 'Equipment', difficulty: 'Advanced', primary: 'Cardio', secondary: 'Legs, Core', description: 'Power conditioning.' },
    { id: 226, name: 'Incline Walking', equipment: 'Treadmill', difficulty: 'Beginner', primary: 'Cardio', secondary: 'Glutes, Legs', description: 'Low-impact fat burn.' },
    { id: 227, name: 'Shadow Boxing', equipment: 'None', difficulty: 'Beginner', primary: 'Cardio', secondary: 'Shoulders', description: 'Fun cardio option.' },
    { id: 228, name: 'Burpees', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Cardio', secondary: 'Full Body', description: 'Full-body conditioning.' },
    { id: 229, name: 'Mountain Climbers', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Cardio', secondary: 'Core', description: 'Core and cardio.' },
  ],
  hiit: [
    { id: 69, name: 'Burpees', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Full Body', secondary: 'Cardio', description: 'Ultimate conditioning.' },
  ],
};

const WORKOUT_TEMPLATES = {
  push: [
    { exerciseId: 1, targetSets: 4, targetReps: '6-8' },
    { exerciseId: 3, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 6, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 7, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 31, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 33, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 35, targetSets: 3, targetReps: '15-20' },
    { exerciseId: 46, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 47, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 51, targetSets: 3, targetReps: '60s' },
    { exerciseId: 60, targetSets: 3, targetReps: '15-20' },
    { exerciseId: 53, targetSets: 3, targetReps: '20' },
    { exerciseId: 55, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 119, targetSets: 3, targetReps: '12 each' },
  ],
  pull: [
    { exerciseId: 11, targetSets: 4, targetReps: '5-6' },
    { exerciseId: 12, targetSets: 4, targetReps: '6-10' },
    { exerciseId: 13, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 16, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 15, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 18, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 41, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 43, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 44, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 61, targetSets: 1, targetReps: '20 min' },
  ],
  legs: [
    { exerciseId: 21, targetSets: 4, targetReps: '6-8' },
    { exerciseId: 23, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 24, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 108, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 25, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 26, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 27, targetSets: 3, targetReps: '12 each' },
    { exerciseId: 29, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 54, targetSets: 3, targetReps: '20' },
    { exerciseId: 117, targetSets: 3, targetReps: '45s each' },
    { exerciseId: 219, targetSets: 3, targetReps: '15-20' },
    { exerciseId: 118, targetSets: 3, targetReps: '30-45s' },
    { exerciseId: 63, targetSets: 1, targetReps: '15 min' },
  ],
  rest: [],
};

const SetLogger = ({ setNumber, onLog, previousWeight }) => {
  const [weight, setWeight] = useState(previousWeight || '');
  const [reps, setReps] = useState('');
  const [logged, setLogged] = useState(false);

  const handleLog = () => {
    if (weight && reps) {
      onLog({ weight: parseFloat(weight), reps: parseInt(reps) });
      setLogged(true);
      setTimeout(() => setLogged(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-3 bg-slate-700/30 rounded-lg p-3">
      <span className="text-slate-400 w-16">Set {setNumber}</span>
      <input type="number" placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-24 bg-slate-700 rounded px-3 py-2 text-sm" />
      <span className="text-slate-400">lbs</span>
      <input type="number" placeholder="Reps" value={reps} onChange={(e) => setReps(e.target.value)} className="w-20 bg-slate-700 rounded px-3 py-2 text-sm" />
      <span className="text-slate-400">reps</span>
      <button onClick={handleLog} className={`ml-auto p-2 rounded-lg transition-all ${logged ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
        {logged ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
      </button>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [workoutHistory, setWorkoutHistory] = useState({});
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapExerciseId, setSwapExerciseId] = useState(null);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [aiInput, setAiInput] = useState('');
  const [selectedLibraryExercise, setSelectedLibraryExercise] = useState(null);

  const getDayOfWeek = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date().getDay()];
  };

  const getWorkoutType = (dayName) => {
    const schedule = { monday: 'push', tuesday: 'pull', wednesday: 'legs', thursday: 'push', friday: 'pull', saturday: 'legs', sunday: 'rest' };
    return schedule[dayName] || 'rest';
  };

  const currentDay = getDayOfWeek();
  const todayWorkoutType = getWorkoutType(currentDay);
  const [todayWorkout, setTodayWorkout] = useState(WORKOUT_TEMPLATES[todayWorkoutType] || []);

  const getAllExercises = () => Object.values(EXERCISE_LIBRARY).flat();
  const getExerciseById = (id) => getAllExercises().find(ex => ex.id === id);

  const getProgressData = (exerciseId) => {
    const history = workoutHistory[exerciseId] || [];
    return history.slice(-10).map((entry, idx) => ({ session: idx + 1, weight: entry.weight, volume: entry.weight * entry.reps }));
  };

  const logSet = (exerciseId, setData) => {
    const date = new Date().toISOString().split('T')[0];
    const history = workoutHistory[exerciseId] || [];
    setWorkoutHistory({ ...workoutHistory, [exerciseId]: [...history, { ...setData, date }] });
  };

  const getSimilarExercises = (exerciseId) => {
    const exercise = getExerciseById(exerciseId);
    if (!exercise) return [];
    return getAllExercises().filter(ex => ex.id !== exerciseId && (ex.primary === exercise.primary || ex.secondary.includes(exercise.primary))).slice(0, 8);
  };

  const swapExercise = (oldId, newId) => {
    setTodayWorkout(todayWorkout.map(ex => ex.exerciseId === oldId ? { ...ex, exerciseId: newId } : ex));
    setShowSwapModal(false);
  };

  const getAIResponse = (message) => {
    return 'I can help with: Exercise form, Alternative exercises, Weight selection, Programming advice. What would you like to know?';
  };

  const sendAIMessage = () => {
    if (!aiInput.trim()) return;
    const userMsg = { sender: 'user', text: aiInput };
    const aiMsg = { sender: 'ai', text: getAIResponse(aiInput) };
    setAiMessages([...aiMessages, userMsg, aiMsg]);
    setAiInput('');
  };

  const getWeekSchedule = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days.map(day => ({ day, type: getWorkoutType(day.toLowerCase()), isToday: day.toLowerCase() === currentDay }));
  };

  const getWorkoutLabel = (type) => {
    if (type === 'push') return 'Push - Chest, Shoulders, Triceps';
    if (type === 'pull') return 'Pull - Back, Biceps';
    if (type === 'legs') return 'Legs - Quads, Hamstrings, Glutes';
    return 'Rest Day';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="bg-slate-800/50 border-b border-slate-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Dumbbell className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold">AI Workout Tracker</h1>
          </div>
          <div className="text-sm text-slate-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
        </div>
      </div>

      <div className="bg-slate-800/30 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6 overflow-x-auto">
            {[
              { id: 'today', icon: Calendar, label: 'Today' },
              { id: 'week', icon: CalendarDays, label: 'Weekly Plan' },
              { id: 'progress', icon: TrendingUp, label: 'Progress' },
              { id: 'library', icon: Library, label: 'Library' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id ? 'border-blue-400 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}>
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'today' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold">{todayWorkoutType === 'rest' ? 'Rest Day' : todayWorkoutType.charAt(0).toUpperCase() + todayWorkoutType.slice(1) + ' Day'}</h2>
                <p className="text-slate-400 mt-1">
                  {todayWorkoutType === 'push' && 'Chest, Shoulders, Triceps'}
                  {todayWorkoutType === 'pull' && 'Back, Biceps'}
                  {todayWorkoutType === 'legs' && 'Quads, Hamstrings, Glutes'}
                  {todayWorkoutType === 'rest' && 'Recovery day'}
                </p>
              </div>
              <button onClick={() => setShowAIChat(true)} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 py-2 rounded-lg">
                <MessageSquare className="w-5 h-5" />
                AI Coach
              </button>
            </div>

            {todayWorkoutType === 'rest' ? (
              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 text-center">
                <h3 className="text-xl font-semibold mb-4">Rest and Recovery</h3>
                <p className="text-slate-400">Focus on recovery today!</p>
              </div>
            ) : (
              todayWorkout.map((workout, idx) => {
                const exercise = getExerciseById(workout.exerciseId);
                const history = workoutHistory[workout.exerciseId] || [];
                const lastSession = history[history.length - 1];

                return (
                  <div key={idx} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-blue-400">{exercise.name}</h3>
                        <div className="flex gap-4 text-sm text-slate-400 mt-1">
                          <span>{exercise.equipment}</span>
                          <span>•</span>
                          <span>{workout.targetSets} sets x {workout.targetReps}</span>
                        </div>
                        {lastSession && <div className="text-sm text-green-400 mt-1">Last: {lastSession.weight}lbs x {lastSession.reps}</div>}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setSwapExerciseId(workout.exerciseId); setShowSwapModal(true); }} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg"><RefreshCw className="w-5 h-5" /></button>
                        <button onClick={() => { setSelectedExercise(workout.exerciseId); setShowAIChat(true); }} className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg"><Zap className="w-5 h-5" /></button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[...Array(workout.targetSets)].map((_, setIdx) => (
                        <SetLogger key={setIdx} setNumber={setIdx + 1} onLog={(data) => logSet(workout.exerciseId, data)} previousWeight={lastSession?.weight} />
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'week' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Weekly Plan</h2>
            <div className="grid gap-4">
              {getWeekSchedule().map((schedule) => (
                <div key={schedule.day} className={`bg-slate-800/50 rounded-xl p-6 border ${schedule.isToday ? 'border-blue-500' : 'border-slate-700'}`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">{schedule.day}{schedule.isToday && <span className="ml-3 text-sm bg-blue-600 px-2 py-1 rounded">Today</span>}</h3>
                      <p className="text-slate-400 mt-1">{getWorkoutLabel(schedule.type)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Your Progress</h2>
            {todayWorkout.filter(w => getProgressData(w.exerciseId).length > 0).map(workout => {
              const exercise = getExerciseById(workout.exerciseId);
              const data = getProgressData(workout.exerciseId);
              return (
                <div key={workout.exerciseId} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl font-semibold mb-4">{exercise.name}</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="session" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                      <Line type="monotone" dataKey="weight" stroke="#60a5fa" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'library' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Exercise Library</h2>
            <p className="text-slate-400">Total Exercises: {getAllExercises().length}</p>
            {Object.entries(EXERCISE_LIBRARY).map(([category, exercises]) => (
              <div key={category} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-semibold capitalize mb-2 text-blue-400">{category} ({exercises.length} exercises)</h3>
                <div className="grid gap-3 mt-4">
                  {exercises.map(exercise => (
                    <button key={exercise.id} onClick={() => setSelectedLibraryExercise(exercise)} className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition-colors text-left">
                      <h4 className="font-semibold">{exercise.name}</h4>
                      <div className="flex gap-3 text-sm text-slate-400 mt-1">
                        <span>{exercise.equipment}</span>
                        <span>•</span>
                        <span>{exercise.difficulty}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showSwapModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-slate-700">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-bold">Swap Exercise</h3>
              <button onClick={() => setShowSwapModal(false)} className="p-2 hover:bg-slate-700 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid gap-3">
                {getSimilarExercises(swapExerciseId).map(exercise => (
                  <button key={exercise.id} onClick={() => swapExercise(swapExerciseId, exercise.id)} className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition-colors text-left">
                    <h4 className="font-semibold">{exercise.name}</h4>
                    <div className="flex gap-3 text-sm text-slate-400 mt-1">
                      <span>{exercise.equipment}</span>
                      <span>•</span>
                      <span>{exercise.difficulty}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showAIChat && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl max-w-2xl w-full h-[600px] flex flex-col border border-slate-700">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold">AI Coach</h3>
              </div>
              <button onClick={() => setShowAIChat(false)} className="p-2 hover:bg-slate-700 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {aiMessages.length === 0 && (
                <div className="text-center text-slate-400 mt-8">
                  <p className="mb-4">Ask me about your workout!</p>
                </div>
              )}
              {aiMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-4 ${msg.sender === 'user' ? 'bg-blue-600' : 'bg-slate-700'}`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-slate-700">
              <div className="flex gap-3">
                <input type="text" value={aiInput} onChange={(e) => setAiInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendAIMessage()} placeholder="Ask about form, weight, alternatives..." className="flex-1 bg-slate-700 rounded-lg px-4 py-3" />
                <button onClick={sendAIMessage} className="bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-3">Send</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedLibraryExercise && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-slate-700">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-bold">{selectedLibraryExercise.name}</h3>
              <button onClick={() => setSelectedLibraryExercise(null)} className="p-2 hover:bg-slate-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="flex gap-4 mb-4 flex-wrap">
                <div className="bg-slate-700/50 rounded-lg px-3 py-2 text-sm">
                  <span className="text-slate-400">Equipment: </span>
                  <span className="text-white">{selectedLibraryExercise.equipment}</span>
                </div>
                <div className="bg-slate-700/50 rounded-lg px-3 py-2 text-sm">
                  <span className="text-slate-400">Difficulty: </span>
                  <span className="text-white">{selectedLibraryExercise.difficulty}</span>
                </div>
                <div className="bg-slate-700/50 rounded-lg px-3 py-2 text-sm">
                  <span className="text-slate-400">Primary: </span>
                  <span className="text-white">{selectedLibraryExercise.primary}</span>
                </div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-blue-400">Description</h4>
                <p className="text-slate-300 leading-relaxed">{selectedLibraryExercise.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

