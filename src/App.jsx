import React, { useState, useEffect } from 'react';
import { Dumbbell, TrendingUp, Library, Calendar, Plus, Check, RefreshCw, Zap, MessageSquare, X, CalendarDays, RotateCcw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EXERCISE_LIBRARY = {
  chest: [
    { id: 1, name: 'Barbell Bench Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Chest', secondary: 'Triceps, Shoulders', description: 'The king of chest exercises.' },
    { id: 2, name: 'Dumbbell Bench Press', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Chest', secondary: 'Triceps, Shoulders', description: 'Great for stability.' },
    { id: 3, name: 'Incline Barbell Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Upper Chest', secondary: 'Shoulders, Triceps', description: 'Targets upper pectorals.' },
    { id: 4, name: 'Incline Dumbbell Press', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Upper Chest', secondary: 'Shoulders, Triceps', description: 'Upper chest with dumbbells.' },
    { id: 5, name: 'Decline Bench Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Lower Chest', secondary: 'Triceps', description: 'Lower chest focus.' },
    { id: 6, name: 'Dumbbell Flyes', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Chest', secondary: 'None', description: 'Chest isolation exercise.' },
    { id: 7, name: 'Cable Flyes', equipment: 'Cable', difficulty: 'Beginner', primary: 'Chest', secondary: 'None', description: 'Constant tension flyes.' },
    { id: 8, name: 'Push-ups', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Chest', secondary: 'Triceps, Shoulders', description: 'Classic bodyweight chest.' },
    { id: 9, name: 'Dips', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Chest', secondary: 'Triceps', description: 'Lower chest builder.' },
    { id: 10, name: 'Pec Deck Machine', equipment: 'Machine', difficulty: 'Beginner', primary: 'Chest', secondary: 'None', description: 'Chest isolation.' },
    { id: 301, name: 'Incline Cable Flyes', equipment: 'Cable', difficulty: 'Beginner', primary: 'Upper Chest', secondary: 'None', description: 'Upper chest isolation.' },
    { id: 302, name: 'Decline Dumbbell Press', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Lower Chest', secondary: 'Triceps', description: 'Lower chest development.' },
    { id: 303, name: 'Machine Chest Press', equipment: 'Machine', difficulty: 'Beginner', primary: 'Chest', secondary: 'Triceps', description: 'Controlled chest work.' },
    { id: 304, name: 'Landmine Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Chest', secondary: 'Shoulders', description: 'Unique pressing angle.' },
    { id: 305, name: 'Squeeze Press', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Chest', secondary: 'None', description: 'Inner chest focus.' },
    { id: 306, name: 'Svend Press', equipment: 'Plate', difficulty: 'Beginner', primary: 'Chest', secondary: 'None', description: 'Plate squeeze press.' },
    { id: 307, name: 'Deficit Push-ups', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Chest', secondary: 'Triceps', description: 'Increased ROM push-ups.' },
    { id: 308, name: 'Decline Push-ups', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Upper Chest', secondary: 'Shoulders', description: 'Elevated feet push-ups.' },
    { id: 309, name: 'Wide Grip Bench Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Chest', secondary: 'Shoulders', description: 'Outer chest emphasis.' },
    { id: 310, name: 'Single Arm Cable Press', equipment: 'Cable', difficulty: 'Intermediate', primary: 'Chest', secondary: 'Core', description: 'Unilateral chest work.' },
  ],
  back: [
    { id: 11, name: 'Deadlift', equipment: 'Barbell', difficulty: 'Advanced', primary: 'Back', secondary: 'Hamstrings, Glutes', description: 'Ultimate strength builder.' },
    { id: 12, name: 'Pull-ups', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Lats', secondary: 'Biceps', description: 'Back width builder.' },
    { id: 13, name: 'Bent-Over Barbell Row', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Back', secondary: 'Biceps', description: 'Back thickness builder.' },
    { id: 14, name: 'T-Bar Row', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Back', secondary: 'Biceps', description: 'Mid-back thickness.' },
    { id: 15, name: 'Lat Pulldown', equipment: 'Cable', difficulty: 'Beginner', primary: 'Lats', secondary: 'Biceps', description: 'Pull-up alternative.' },
    { id: 16, name: 'Seated Cable Row', equipment: 'Cable', difficulty: 'Beginner', primary: 'Back', secondary: 'Biceps', description: 'Mid-back developer.' },
    { id: 17, name: 'Single-Arm Dumbbell Row', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Back', secondary: 'Biceps', description: 'Unilateral back work.' },
    { id: 18, name: 'Face Pulls', equipment: 'Cable', difficulty: 'Beginner', primary: 'Rear Delts', secondary: 'Upper Back', description: 'Shoulder health exercise.' },
    { id: 19, name: 'Chin-ups', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Lats', secondary: 'Biceps', description: 'Bicep-focused pull-up.' },
    { id: 20, name: 'Chest-Supported Row', equipment: 'Machine', difficulty: 'Beginner', primary: 'Back', secondary: 'Biceps', description: 'Isolates back muscles.' },
    { id: 311, name: 'Wide Grip Pull-ups', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Lats', secondary: 'Biceps', description: 'Lat width focus.' },
    { id: 312, name: 'Neutral Grip Pull-ups', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Lats', secondary: 'Biceps', description: 'Joint-friendly variation.' },
    { id: 313, name: 'Pendlay Row', equipment: 'Barbell', difficulty: 'Advanced', primary: 'Back', secondary: 'Biceps', description: 'Explosive rowing.' },
    { id: 314, name: 'Meadows Row', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Back', secondary: 'Biceps', description: 'Unilateral landmine row.' },
    { id: 315, name: 'Seal Row', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Back', secondary: 'Biceps', description: 'Eliminates momentum.' },
    { id: 316, name: 'Inverted Row', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Back', secondary: 'Biceps', description: 'Horizontal pulling.' },
    { id: 317, name: 'Machine High Row', equipment: 'Machine', difficulty: 'Beginner', primary: 'Upper Back', secondary: 'Rear Delts', description: 'Upper back isolation.' },
    { id: 318, name: 'Cable Pullover', equipment: 'Cable', difficulty: 'Beginner', primary: 'Lats', secondary: 'None', description: 'Lat isolation.' },
    { id: 319, name: 'Dumbbell Pullover', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Lats', secondary: 'Chest', description: 'Classic lat stretch.' },
    { id: 320, name: 'Rack Pulls', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Back', secondary: 'Traps', description: 'Partial deadlift variation.' },
    { id: 321, name: 'Shrugs', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Traps', secondary: 'None', description: 'Trap builder.' },
    { id: 322, name: 'Barbell Shrugs', equipment: 'Barbell', difficulty: 'Beginner', primary: 'Traps', secondary: 'None', description: 'Heavy trap work.' },
  ],
  legs: [
    { id: 21, name: 'Barbell Squat', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Quads', secondary: 'Glutes, Hamstrings', description: 'King of leg exercises.' },
    { id: 22, name: 'Front Squat', equipment: 'Barbell', difficulty: 'Advanced', primary: 'Quads', secondary: 'Core', description: 'Quad-focused squat.' },
    { id: 23, name: 'Romanian Deadlift', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Hamstrings', secondary: 'Glutes, Lower Back', description: 'Hamstring builder.' },
    { id: 24, name: 'Leg Press', equipment: 'Machine', difficulty: 'Beginner', primary: 'Quads', secondary: 'Glutes', description: 'Safe heavy loading.' },
    { id: 25, name: 'Leg Curl', equipment: 'Machine', difficulty: 'Beginner', primary: 'Hamstrings', secondary: 'None', description: 'Hamstring isolation.' },
    { id: 26, name: 'Leg Extension', equipment: 'Machine', difficulty: 'Beginner', primary: 'Quads', secondary: 'None', description: 'Quad isolation.' },
    { id: 27, name: 'Walking Lunges', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Quads', secondary: 'Glutes', description: 'Unilateral leg work.' },
    { id: 28, name: 'Bulgarian Split Squat', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Quads', secondary: 'Glutes', description: 'Unilateral strength.' },
    { id: 29, name: 'Calf Raises', equipment: 'Machine', difficulty: 'Beginner', primary: 'Calves', secondary: 'None', description: 'Calf developer.' },
    { id: 30, name: 'Hack Squat', equipment: 'Machine', difficulty: 'Intermediate', primary: 'Quads', secondary: 'Glutes', description: 'Machine squat variation.' },
    { id: 108, name: 'Hip Thrusts', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Glutes', secondary: 'Hamstrings', description: 'Best glute builder.' },
    { id: 109, name: 'Goblet Squat', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Quads', secondary: 'Glutes', description: 'Beginner-friendly squat.' },
    { id: 110, name: 'Nordic Curls', equipment: 'Bodyweight', difficulty: 'Advanced', primary: 'Hamstrings', secondary: 'None', description: 'Elite hamstring exercise.' },
    { id: 323, name: 'Box Squat', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Quads', secondary: 'Glutes', description: 'Controlled depth squats.' },
    { id: 324, name: 'Zercher Squat', equipment: 'Barbell', difficulty: 'Advanced', primary: 'Quads', secondary: 'Core', description: 'Unique loading position.' },
    { id: 325, name: 'Sumo Deadlift', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Glutes', secondary: 'Hamstrings, Adductors', description: 'Wide stance deadlift.' },
    { id: 326, name: 'Stiff-Leg Deadlift', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Hamstrings', secondary: 'Lower Back', description: 'Hamstring stretch.' },
    { id: 327, name: 'Single-Leg RDL', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Hamstrings', secondary: 'Glutes, Balance', description: 'Unilateral hamstring work.' },
    { id: 328, name: 'Step-ups', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Quads', secondary: 'Glutes', description: 'Functional leg exercise.' },
    { id: 329, name: 'Reverse Lunges', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Quads', secondary: 'Glutes', description: 'Knee-friendly lunges.' },
    { id: 330, name: 'Sissy Squat', equipment: 'Bodyweight', difficulty: 'Advanced', primary: 'Quads', secondary: 'None', description: 'Quad isolation.' },
    { id: 331, name: 'Cable Pull-Through', equipment: 'Cable', difficulty: 'Beginner', primary: 'Glutes', secondary: 'Hamstrings', description: 'Hip hinge pattern.' },
    { id: 332, name: 'Glute Bridge', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Glutes', secondary: 'Hamstrings', description: 'Basic glute work.' },
    { id: 333, name: 'Single-Leg Hip Thrust', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Glutes', secondary: 'Hamstrings', description: 'Unilateral glute work.' },
    { id: 334, name: 'Good Mornings', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Hamstrings', secondary: 'Lower Back', description: 'Hip hinge development.' },
    { id: 335, name: 'Seated Calf Raise', equipment: 'Machine', difficulty: 'Beginner', primary: 'Calves', secondary: 'None', description: 'Soleus focus.' },
    { id: 336, name: 'Donkey Calf Raise', equipment: 'Machine', difficulty: 'Beginner', primary: 'Calves', secondary: 'None', description: 'Calf stretch position.' },
  ],
  shoulders: [
    { id: 31, name: 'Overhead Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Shoulders', secondary: 'Triceps', description: 'Shoulder mass builder.' },
    { id: 32, name: 'Dumbbell Shoulder Press', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Shoulders', secondary: 'Triceps', description: 'Natural movement.' },
    { id: 33, name: 'Lateral Raises', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Side Delts', secondary: 'None', description: 'Shoulder width builder.' },
    { id: 34, name: 'Cable Lateral Raises', equipment: 'Cable', difficulty: 'Beginner', primary: 'Side Delts', secondary: 'None', description: 'Constant tension laterals.' },
    { id: 35, name: 'Rear Delt Flyes', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Rear Delts', secondary: 'None', description: 'Rear delt isolation.' },
    { id: 36, name: 'Arnold Press', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Shoulders', secondary: 'Triceps', description: 'Full delt development.' },
    { id: 37, name: 'Front Raises', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Front Delts', secondary: 'None', description: 'Front delt focus.' },
    { id: 337, name: 'Seated Overhead Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Shoulders', secondary: 'Triceps', description: 'Strict pressing.' },
    { id: 338, name: 'Push Press', equipment: 'Barbell', difficulty: 'Advanced', primary: 'Shoulders', secondary: 'Legs, Triceps', description: 'Explosive shoulder power.' },
    { id: 339, name: 'Bradford Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Shoulders', secondary: 'None', description: 'Continuous tension press.' },
    { id: 340, name: 'Machine Shoulder Press', equipment: 'Machine', difficulty: 'Beginner', primary: 'Shoulders', secondary: 'Triceps', description: 'Controlled pressing.' },
    { id: 341, name: 'Upright Row', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Side Delts', secondary: 'Traps', description: 'Lateral delt builder.' },
    { id: 342, name: 'Cable Upright Row', equipment: 'Cable', difficulty: 'Intermediate', primary: 'Side Delts', secondary: 'Traps', description: 'Constant tension rows.' },
    { id: 343, name: 'Reverse Pec Deck', equipment: 'Machine', difficulty: 'Beginner', primary: 'Rear Delts', secondary: 'None', description: 'Rear delt isolation.' },
    { id: 344, name: 'Cable Rear Delt Flyes', equipment: 'Cable', difficulty: 'Beginner', primary: 'Rear Delts', secondary: 'None', description: 'Cable rear delt work.' },
    { id: 345, name: 'Y-Raises', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Shoulders', secondary: 'Upper Back', description: 'Complete shoulder health.' },
    { id: 346, name: 'Cuban Press', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Shoulders', secondary: 'Rotator Cuff', description: 'Shoulder stability.' },
    { id: 347, name: 'Landmine Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Shoulders', secondary: 'Core', description: 'Angled pressing.' },
  ],
  arms: [
    { id: 41, name: 'Barbell Curl', equipment: 'Barbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'None', description: 'Classic bicep builder.' },
    { id: 42, name: 'Dumbbell Curl', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'None', description: 'Bicep isolation.' },
    { id: 43, name: 'Hammer Curl', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'Forearms', description: 'Arm thickness.' },
    { id: 44, name: 'Preacher Curl', equipment: 'Barbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'None', description: 'Bicep peak.' },
    { id: 45, name: 'Cable Curl', equipment: 'Cable', difficulty: 'Beginner', primary: 'Biceps', secondary: 'None', description: 'Constant tension biceps.' },
    { id: 46, name: 'Tricep Pushdown', equipment: 'Cable', difficulty: 'Beginner', primary: 'Triceps', secondary: 'None', description: 'Tricep isolation.' },
    { id: 47, name: 'Overhead Tricep Extension', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Triceps', secondary: 'None', description: 'Long head focus.' },
    { id: 48, name: 'Skull Crushers', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Triceps', secondary: 'None', description: 'Tricep mass builder.' },
    { id: 49, name: 'Rope Pushdown', equipment: 'Cable', difficulty: 'Beginner', primary: 'Triceps', secondary: 'None', description: 'Tricep isolation with rope.' },
    { id: 50, name: 'Close-Grip Bench Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Triceps', secondary: 'Chest', description: 'Compound tricep.' },
    { id: 348, name: 'Concentration Curl', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'None', description: 'Strict bicep curl.' },
    { id: 349, name: 'Incline Dumbbell Curl', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'None', description: 'Stretched position curl.' },
    { id: 350, name: 'Spider Curl', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Biceps', secondary: 'None', description: 'Peak contraction curl.' },
    { id: 351, name: 'Zottman Curl', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Biceps', secondary: 'Forearms', description: 'Dual-phase curl.' },
    { id: 352, name: 'Drag Curl', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Biceps', secondary: 'None', description: 'Unique curl path.' },
    { id: 353, name: 'Cable Hammer Curl', equipment: 'Cable', difficulty: 'Beginner', primary: 'Biceps', secondary: 'Forearms', description: 'Cable variation.' },
    { id: 354, name: 'Diamond Push-ups', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Triceps', secondary: 'Chest', description: 'Bodyweight triceps.' },
    { id: 355, name: 'Bench Dips', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Triceps', secondary: 'Chest', description: 'Beginner tricep dips.' },
    { id: 356, name: 'Dumbbell Kickbacks', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Triceps', secondary: 'None', description: 'Tricep isolation.' },
    { id: 357, name: 'Cable Overhead Extension', equipment: 'Cable', difficulty: 'Beginner', primary: 'Triceps', secondary: 'None', description: 'Long head cable work.' },
    { id: 358, name: 'JM Press', equipment: 'Barbell', difficulty: 'Advanced', primary: 'Triceps', secondary: 'None', description: 'Powerlifter tricep builder.' },
    { id: 359, name: 'Tate Press', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Triceps', secondary: 'None', description: 'Unique elbow angle.' },
    { id: 360, name: 'Wrist Curls', equipment: 'Barbell', difficulty: 'Beginner', primary: 'Forearms', secondary: 'None', description: 'Forearm flexors.' },
    { id: 361, name: 'Reverse Wrist Curls', equipment: 'Barbell', difficulty: 'Beginner', primary: 'Forearms', secondary: 'None', description: 'Forearm extensors.' },
    { id: 362, name: 'Farmers Walk', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Forearms', secondary: 'Core, Traps', description: 'Grip strength.' },
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
    { id: 363, name: 'L-Sit Hold', equipment: 'Bodyweight', difficulty: 'Advanced', primary: 'Core', secondary: 'Hip Flexors', description: 'Isometric core.' },
    { id: 364, name: 'Copenhagen Plank', equipment: 'Bodyweight', difficulty: 'Advanced', primary: 'Obliques', secondary: 'Adductors', description: 'Advanced oblique work.' },
    { id: 365, name: 'Bear Crawl', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Core', secondary: 'Full Body', description: 'Dynamic core stability.' },
    { id: 366, name: 'Hanging Knee Raises', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Lower Abs', secondary: 'Hip Flexors', description: 'Easier hanging variation.' },
    { id: 367, name: 'Suitcase Carry', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Obliques', secondary: 'Core', description: 'Anti-lateral flexion.' },
    { id: 368, name: 'Turkish Get-Up', equipment: 'Kettlebell', difficulty: 'Advanced', primary: 'Core', secondary: 'Full Body', description: 'Full body stability.' },
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
    { id: 369, name: 'Sprint Intervals', equipment: 'Track', difficulty: 'Advanced', primary: 'Cardio', secondary: 'Legs', description: 'High-intensity sprints.' },
    { id: 370, name: 'Box Jumps', equipment: 'Box', difficulty: 'Intermediate', primary: 'Cardio', secondary: 'Legs, Power', description: 'Explosive power.' },
    { id: 371, name: 'Ski Erg', equipment: 'Machine', difficulty: 'Intermediate', primary: 'Cardio', secondary: 'Upper Body', description: 'Upper body conditioning.' },
    { id: 372, name: 'Kettlebell Swings', equipment: 'Kettlebell', difficulty: 'Intermediate', primary: 'Cardio', secondary: 'Glutes, Hamstrings', description: 'Power endurance.' },
    { id: 373, name: 'HIIT Sprints', equipment: 'Track/Treadmill', difficulty: 'Advanced', primary: 'Cardio', secondary: 'Legs', description: '30s sprint, 90s rest intervals.' },
    { id: 374, name: 'Jump Squats', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Cardio', secondary: 'Legs', description: 'Plyometric power.' },
  ],
};

// 4-week rotation system - now includes cardio/HIIT on more days
const WORKOUT_TEMPLATES = {
  push_aa: [
    { exerciseId: 1, targetSets: 4, targetReps: '6-8' },
    { exerciseId: 3, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 6, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 31, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 33, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 35, targetSets: 3, targetReps: '15-20' },
    { exerciseId: 46, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 47, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 51, targetSets: 3, targetReps: '60s' },
    { exerciseId: 60, targetSets: 3, targetReps: '15-20' },
  ],
  push_ab: [
    { exerciseId: 2, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 4, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 7, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 32, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 34, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 18, targetSets: 3, targetReps: '15-20' },
    { exerciseId: 50, targetSets: 3, targetReps: '8-10' },
    { exerciseId: 48, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 53, targetSets: 3, targetReps: '20' },
    { exerciseId: 119, targetSets: 3, targetReps: '12 each' },
    { exerciseId: 228, targetSets: 3, targetReps: '15 min HIIT' },
  ],
  push_ba: [
    { exerciseId: 303, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 301, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 305, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 36, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 37, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 343, targetSets: 3, targetReps: '15-20' },
    { exerciseId: 49, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 356, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 52, targetSets: 3, targetReps: '20' },
    { exerciseId: 54, targetSets: 3, targetReps: '20' },
  ],
  push_bb: [
    { exerciseId: 304, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 5, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 9, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 337, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 341, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 344, targetSets: 3, targetReps: '15-20' },
    { exerciseId: 354, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 357, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 215, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 222, targetSets: 3, targetReps: '15 each' },
    { exerciseId: 65, targetSets: 1, targetReps: '10 min' },
  ],
  push_ca: [
    { exerciseId: 309, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 302, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 310, targetSets: 3, targetReps: '10 each' },
    { exerciseId: 338, targetSets: 4, targetReps: '6-8' },
    { exerciseId: 342, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 35, targetSets: 3, targetReps: '15-20' },
    { exerciseId: 358, targetSets: 3, targetReps: '8-10' },
    { exerciseId: 47, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 59, targetSets: 3, targetReps: '12' },
    { exerciseId: 55, targetSets: 3, targetReps: '15' },
  ],
  push_cb: [
    { exerciseId: 8, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 307, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 7, targetSets: 3, targetReps: '15' },
    { exerciseId: 340, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 345, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 18, targetSets: 4, targetReps: '20' },
    { exerciseId: 355, targetSets: 3, targetReps: '15' },
    { exerciseId: 359, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 220, targetSets: 3, targetReps: '12' },
    { exerciseId: 363, targetSets: 3, targetReps: '30s' },
    { exerciseId: 374, targetSets: 3, targetReps: '12 min HIIT' },
  ],
  push_da: [
    { exerciseId: 306, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 308, targetSets: 3, targetReps: '15' },
    { exerciseId: 10, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 339, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 346, targetSets: 3, targetReps: '12' },
    { exerciseId: 344, targetSets: 3, targetReps: '15' },
    { exerciseId: 46, targetSets: 4, targetReps: '15' },
    { exerciseId: 48, targetSets: 3, targetReps: '12' },
    { exerciseId: 57, targetSets: 3, targetReps: '10' },
    { exerciseId: 225, targetSets: 3, targetReps: '45s' },
  ],
  push_db: [
    { exerciseId: 1, targetSets: 4, targetReps: '5-6' },
    { exerciseId: 3, targetSets: 4, targetReps: '6-8' },
    { exerciseId: 301, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 347, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 33, targetSets: 4, targetReps: '15' },
    { exerciseId: 343, targetSets: 3, targetReps: '20' },
    { exerciseId: 50, targetSets: 4, targetReps: '6-8' },
    { exerciseId: 356, targetSets: 3, targetReps: '15' },
    { exerciseId: 223, targetSets: 3, targetReps: '15' },
    { exerciseId: 367, targetSets: 3, targetReps: '45s each' },
    { exerciseId: 227, targetSets: 3, targetReps: '10 min' },
  ],
  pull_aa: [
    { exerciseId: 11, targetSets: 4, targetReps: '5-6' },
    { exerciseId: 12, targetSets: 4, targetReps: '6-10' },
    { exerciseId: 13, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 16, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 15, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 18, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 41, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 43, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 61, targetSets: 1, targetReps: '20 min' },
  ],
  pull_ab: [
    { exerciseId: 19, targetSets: 4, targetReps: '6-10' },
    { exerciseId: 14, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 17, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 20, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 318, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 321, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 44, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 45, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 63, targetSets: 1, targetReps: '15 min' },
  ],
  pull_ba: [
    { exerciseId: 320, targetSets: 4, targetReps: '5-6' },
    { exerciseId: 311, targetSets: 4, targetReps: '6-10' },
    { exerciseId: 313, targetSets: 4, targetReps: '6-8' },
    { exerciseId: 315, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 319, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 322, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 348, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 351, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 372, targetSets: 1, targetReps: '15 min' },
  ],
  pull_bb: [
    { exerciseId: 312, targetSets: 4, targetReps: '8-12' },
    { exerciseId: 314, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 316, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 317, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 15, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 18, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 349, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 350, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 373, targetSets: 1, targetReps: '20 min HIIT' },
  ],
  pull_ca: [
    { exerciseId: 12, targetSets: 4, targetReps: '8-12' },
    { exerciseId: 13, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 17, targetSets: 4, targetReps: '12 each' },
    { exerciseId: 16, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 318, targetSets: 3, targetReps: '15' },
    { exerciseId: 321, targetSets: 4, targetReps: '15' },
    { exerciseId: 42, targetSets: 3, targetReps: '12' },
    { exerciseId: 353, targetSets: 3, targetReps: '12' },
    { exerciseId: 64, targetSets: 1, targetReps: '25 min' },
  ],
  pull_cb: [
    { exerciseId: 11, targetSets: 3, targetReps: '8-10' },
    { exerciseId: 19, targetSets: 4, targetReps: '8-12' },
    { exerciseId: 14, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 20, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 319, targetSets: 3, targetReps: '15' },
    { exerciseId: 322, targetSets: 4, targetReps: '15' },
    { exerciseId: 352, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 43, targetSets: 3, targetReps: '12' },
    { exerciseId: 66, targetSets: 1, targetReps: '20 min' },
  ],
  pull_da: [
    { exerciseId: 320, targetSets: 4, targetReps: '6-8' },
    { exerciseId: 311, targetSets: 4, targetReps: '8-12' },
    { exerciseId: 315, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 16, targetSets: 3, targetReps: '15' },
    { exerciseId: 15, targetSets: 3, targetReps: '15' },
    { exerciseId: 18, targetSets: 4, targetReps: '20' },
    { exerciseId: 44, targetSets: 3, targetReps: '15' },
    { exerciseId: 360, targetSets: 3, targetReps: '15' },
    { exerciseId: 67, targetSets: 1, targetReps: '20 min' },
  ],
  pull_db: [
    { exerciseId: 316, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 314, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 17, targetSets: 4, targetReps: '12 each' },
    { exerciseId: 317, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 318, targetSets: 3, targetReps: '15' },
    { exerciseId: 321, targetSets: 4, targetReps: '15' },
    { exerciseId: 348, targetSets: 3, targetReps: '15' },
    { exerciseId: 362, targetSets: 3, targetReps: '60s' },
    { exerciseId: 371, targetSets: 1, targetReps: '15 min' },
  ],
  legs_aa: [
    { exerciseId: 21, targetSets: 4, targetReps: '6-8' },
    { exerciseId: 23, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 24, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 108, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 25, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 26, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 29, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 54, targetSets: 3, targetReps: '20' },
    { exerciseId: 55, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 226, targetSets: 1, targetReps: '20 min' },
  ],
  legs_ab: [
    { exerciseId: 22, targetSets: 4, targetReps: '6-8' },
    { exerciseId: 108, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 28, targetSets: 3, targetReps: '10 each' },
    { exerciseId: 27, targetSets: 3, targetReps: '12 each' },
    { exerciseId: 25, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 30, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 335, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 117, targetSets: 3, targetReps: '45s each' },
    { exerciseId: 118, targetSets: 3, targetReps: '30-45s' },
    { exerciseId: 369, targetSets: 1, targetReps: '15 min HIIT' },
  ],
  legs_ba: [
    { exerciseId: 109, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 325, targetSets: 4, targetReps: '6-8' },
    { exerciseId: 323, targetSets: 3, targetReps: '8-10' },
    { exerciseId: 333, targetSets: 4, targetReps: '12 each' },
    { exerciseId: 110, targetSets: 3, targetReps: '8-10' },
    { exerciseId: 328, targetSets: 3, targetReps: '12 each' },
    { exerciseId: 336, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 216, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 220, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 62, targetSets: 1, targetReps: '20 min' },
  ],
  legs_bb: [
    { exerciseId: 324, targetSets: 4, targetReps: '6-8' },
    { exerciseId: 334, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 329, targetSets: 3, targetReps: '12 each' },
    { exerciseId: 331, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 327, targetSets: 3, targetReps: '10 each' },
    { exerciseId: 24, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 29, targetSets: 4, targetReps: '20-25' },
    { exerciseId: 364, targetSets: 3, targetReps: '30s each' },
    { exerciseId: 365, targetSets: 3, targetReps: '45s' },
    { exerciseId: 120, targetSets: 1, targetReps: '12 min HIIT' },
  ],
  legs_ca: [
    { exerciseId: 21, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 326, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 30, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 332, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 25, targetSets: 3, targetReps: '15' },
    { exerciseId: 328, targetSets: 3, targetReps: '15 each' },
    { exerciseId: 335, targetSets: 4, targetReps: '20' },
    { exerciseId: 59, targetSets: 3, targetReps: '15' },
    { exerciseId: 218, targetSets: 3, targetReps: '30s' },
    { exerciseId: 66, targetSets: 1, targetReps: '25 min' },
  ],
  legs_cb: [
    { exerciseId: 22, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 23, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 27, targetSets: 3, targetReps: '15 each' },
    { exerciseId: 108, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 110, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 26, targetSets: 3, targetReps: '15-20' },
    { exerciseId: 29, targetSets: 4, targetReps: '25' },
    { exerciseId: 366, targetSets: 3, targetReps: '15' },
    { exerciseId: 51, targetSets: 3, targetReps: '90s' },
    { exerciseId: 370, targetSets: 1, targetReps: '15 min HIIT' },
  ],
  legs_da: [
    { exerciseId: 323, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 325, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 24, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 333, targetSets: 3, targetReps: '15 each' },
    { exerciseId: 327, targetSets: 3, targetReps: '12 each' },
    { exerciseId: 26, targetSets: 3, targetReps: '20' },
    { exerciseId: 336, targetSets: 4, targetReps: '20' },
    { exerciseId: 56, targetSets: 3, targetReps: '12' },
    { exerciseId: 367, targetSets: 3, targetReps: '60s each' },
    { exerciseId: 63, targetSets: 1, targetReps: '20 min' },
  ],
  legs_db: [
    { exerciseId: 109, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 331, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 329, targetSets: 3, targetReps: '15 each' },
    { exerciseId: 332, targetSets: 4, targetReps: '20-25' },
    { exerciseId: 25, targetSets: 3, targetReps: '20' },
    { exerciseId: 30, targetSets: 3, targetReps: '15' },
    { exerciseId: 335, targetSets: 4, targetReps: '25' },
    { exerciseId: 368, targetSets: 3, targetReps: '5 each' },
    { exerciseId: 219, targetSets: 3, targetReps: '20' },
    { exerciseId: 64, targetSets: 1, targetReps: '20 min' },
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
  const [workoutHistory, setWorkoutHistory] = useState(() => {
    const saved = localStorage.getItem('workoutHistory');
    return saved ? JSON.parse(saved) : {};
  });
  
  // Track the current training phase (week cycle)
  const [trainingPhase, setTrainingPhase] = useState(() => {
    const saved = localStorage.getItem('trainingPhase');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      startDate: new Date().toISOString().split('T')[0],
      currentPhase: 'a'
    };
  });
  
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapExerciseId, setSwapExerciseId] = useState(null);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [aiInput, setAiInput] = useState('');
  const [selectedLibraryExercise, setSelectedLibraryExercise] = useState(null);

  // Calculate current week and phase based on start date
  const getCurrentPhase = () => {
    const startDate = new Date(trainingPhase.startDate);
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weekNumber = Math.floor(diffDays / 7);
    const phaseIndex = weekNumber % 4;
    const phases = ['a', 'b', 'c', 'd'];
    return phases[phaseIndex];
  };

  const currentPhase = getCurrentPhase();
  const weeksInCurrentPhase = Math.floor((new Date() - new Date(trainingPhase.startDate)) / (1000 * 60 * 60 * 24 * 7)) % 4 + 1;

  // Save training phase when it changes
  useEffect(() => {
    localStorage.setItem('trainingPhase', JSON.stringify(trainingPhase));
  }, [trainingPhase]);

  const getDayOfWeek = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date().getDay()];
  };

  // Updated to include phase in workout type
  const getWorkoutType = (dayName) => {
    const baseSchedule = { 
      monday: 'push',
      tuesday: 'pull',
      wednesday: 'legs',
      thursday: 'push',
      friday: 'pull',
      saturday: 'legs',
      sunday: 'rest' 
    };
    
    const baseType = baseSchedule[dayName];
    if (baseType === 'rest') return 'rest';
    
    // For first occurrence in the week, use _a, for second use _b
    const isSecondOccurrence = ['thursday', 'friday', 'saturday'].includes(dayName);
    const variant = isSecondOccurrence ? 'b' : 'a';
    
    return `${baseType}_${currentPhase}${variant}`;
  };

  const currentDay = getDayOfWeek();
  const todayWorkoutType = getWorkoutType(currentDay);
  
  // Updated to better handle localStorage persistence
  const [todayWorkout, setTodayWorkout] = useState(() => {
    const saved = localStorage.getItem('todayWorkout');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Only use saved workout if it matches current day AND phase
        if (parsed.day === currentDay && parsed.phase === currentPhase) {
          return parsed.workout;
        }
      } catch (e) {
        console.error('Error parsing saved workout:', e);
      }
    }
    // Otherwise, use template
    return WORKOUT_TEMPLATES[todayWorkoutType] || [];
  });

  // Save workout history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
  }, [workoutHistory]);

  // Save today's workout to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('todayWorkout', JSON.stringify({
      day: currentDay,
      phase: currentPhase,
      workout: todayWorkout
    }));
  }, [todayWorkout, currentDay, currentPhase]);

  // Update workout when phase or day changes
  useEffect(() => {
    const saved = localStorage.getItem('todayWorkout');
    let shouldUpdate = false;
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // If day or phase changed, load new workout
        if (parsed.day !== currentDay || parsed.phase !== currentPhase) {
          shouldUpdate = true;
        }
      } catch (e) {
        shouldUpdate = true;
      }
    } else {
      shouldUpdate = true;
    }
    
    if (shouldUpdate) {
      const newWorkoutType = getWorkoutType(currentDay);
      const newWorkout = WORKOUT_TEMPLATES[newWorkoutType] || [];
      setTodayWorkout(newWorkout);
    }
  }, [currentPhase, currentDay]);

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
    return getAllExercises().filter(ex => ex.id !== exerciseId && (ex.primary === exercise.primary || ex.secondary.includes(exercise.primary))).slice(0, 10);
  };

  const swapExercise = (oldId, newId) => {
    setTodayWorkout(todayWorkout.map(ex => ex.exerciseId === oldId ? { ...ex, exerciseId: newId } : ex));
    setShowSwapModal(false);
  };

  const resetTrainingPhase = () => {
    if (window.confirm('This will reset your training cycle and start fresh with Phase A. Continue?')) {
      setTrainingPhase({
        startDate: new Date().toISOString().split('T')[0],
        currentPhase: 'a'
      });
    }
  };

  const getAIResponse = (message) => {
    const lowerMsg = message.toLowerCase();
    const exercise = selectedExercise ? getExerciseById(selectedExercise) : null;
    
    if (lowerMsg.includes('cardio') || lowerMsg.includes('hiit')) {
      return `Cardio & HIIT in Your Program:\n\n**Current Setup:**\n• All PULL days include 15-20 min cardio\n• All LEG days include 20-25 min cardio\n• Some PUSH days include 10-15 min HIIT/cardio\n\n**HIIT Sessions:**\n• Tuesday/Friday: Rowing, Treadmill, or Cycling\n• Wednesday/Saturday: Stair climber, Incline walking, or HIIT sprints\n• Thursday (some phases): Burpees or Jump squats\n\n**How to Do HIIT:**\n• Sprint: 30 seconds max effort\n• Rest: 60-90 seconds easy pace\n• Repeat: 8-12 rounds\n• Total time: 12-20 minutes\n\n**Steady State Cardio:**\n• Moderate pace you can sustain\n• 60-70% max heart rate\n• Focus on endurance\n• Do AFTER your strength training\n\n**Benefits:**\n• Burns fat while preserving muscle\n• Improves cardiovascular health\n• Increases work capacity\n• Aids recovery between sets\n\nYou're already hitting 4-6 cardio sessions per week!`;
    }
    
    if (lowerMsg.includes('phase') || lowerMsg.includes('rotation') || lowerMsg.includes('cycle')) {
      return `Training Phase System:\n\n**Current Status:**\n• You're in Phase ${currentPhase.toUpperCase()}\n• Week ${weeksInCurrentPhase} of this phase\n• Phases rotate every 4 weeks automatically\n\n**How It Works:**\n• Phase A (Weeks 1-4): Foundation exercises\n• Phase B (Weeks 5-8): Variation for different angles\n• Phase C (Weeks 9-12): Advanced variations\n• Phase D (Weeks 13-16): Unique movements\n\n**Benefits:**\n• Prevents adaptation and plateaus\n• Keeps training interesting and fresh\n• Reduces overuse injury risk\n• Develops muscles from all angles\n• Automatic progression built-in\n\nAfter 16 weeks, the cycle repeats but you'll be stronger!`;
    }
    
    if (lowerMsg.includes('form') || lowerMsg.includes('technique') || lowerMsg.includes('how')) {
      if (exercise) {
        return `Great question about ${exercise.name}!\n\nKey Form Points:\n• Keep your core tight and engaged\n• Control the weight - no swinging or momentum\n• Full range of motion for maximum muscle activation\n• Breathe properly: exhale on exertion, inhale on the way down\n• Start lighter to perfect form before adding weight\n\n${exercise.primary === 'Chest' ? '• Retract shoulder blades and keep them pinned\n• Keep elbows at about 45 degrees\n• Lower until you feel a stretch' : ''}\n${exercise.primary === 'Back' ? '• Pull with your back muscles, not your arms\n• Squeeze shoulder blades together at peak\n• Keep chest up and core braced' : ''}\n${exercise.primary === 'Shoulders' ? '• Keep core tight to protect lower back\n• Press straight up, not forward\n• Full lockout at the top' : ''}\n${exercise.primary === 'Cardio' ? '• Warm up for 3-5 minutes\n• Maintain proper form even when tired\n• Cool down for 3-5 minutes\n• Stay hydrated' : ''}\n\nWant tips on a specific part of the movement?`;
      }
      return 'Ask me about form for any exercise! Click the lightning bolt icon next to an exercise, then ask me about it.';
    }
    
    if (lowerMsg.includes('substitute') || lowerMsg.includes('alternative') || lowerMsg.includes('swap') || lowerMsg.includes('different')) {
      if (exercise) {
        const similar = getSimilarExercises(selectedExercise);
        return `Great alternatives to ${exercise.name}:\n\n${similar.slice(0, 5).map(ex => `• ${ex.name} (${ex.equipment})`).join('\n')}\n\nAll of these target similar muscles. Use the refresh button to swap exercises easily!`;
      }
      return 'Click the lightning bolt next to any exercise to get alternatives for it!';
    }
    
    if (lowerMsg.includes('weight') || lowerMsg.includes('heavy') || lowerMsg.includes('start') || lowerMsg.includes('much')) {
      return `Weight Selection Guide:\n\n• For Strength (4-6 reps): Use 85-90% of your max, rest 3-5 min\n• For Hypertrophy (8-12 reps): Use 70-80% of your max, rest 2-3 min\n• For Endurance (15+ reps): Use 60-70% of your max, rest 1-2 min\n\nStarting Out:\n• Pick a weight you can do for 2-3 reps MORE than your target\n• If you can't complete your target reps, go lighter\n• If you complete all sets easily, increase by 5-10% next time\n\nProgression:\n• Add 5lbs for upper body exercises\n• Add 10lbs for lower body exercises\n• When you hit the top of your rep range for all sets, increase weight!`;
    }
    
    if (lowerMsg.includes('progress') || lowerMsg.includes('plateau') || lowerMsg.includes('stuck') || lowerMsg.includes('gain')) {
      return `Breaking Through Plateaus:\n\n**Progressive Overload Strategies:**\n• Increase weight by 5-10% when you hit rep targets\n• Add 1-2 more reps per set\n• Add an extra set\n• Decrease rest time by 15-30 seconds\n• Slow down the eccentric (lowering) phase\n\n**Your Program Already Helps:**\n• Exercises rotate every 4 weeks automatically\n• This prevents adaptation and keeps progress coming\n• Different phases work muscles from new angles\n• Cardio improves work capacity\n\n**Recovery & Nutrition:**\n• Get 7-9 hours of quality sleep\n• Eat 0.8-1g protein per pound of bodyweight\n• Stay in a slight caloric surplus for muscle gain\n• Take a deload week every 4-6 weeks (reduce weight by 40-50%)\n\nThe rotation system is designed to keep you progressing!`;
    }
    
    if (lowerMsg.includes('split') || lowerMsg.includes('routine') || lowerMsg.includes('program') || lowerMsg.includes('schedule') || lowerMsg.includes('variety')) {
      return `Your Advanced Program:\n\n**Push/Pull/Legs with 4-Week Rotation:**\n✅ Automatically changes exercises every 4 weeks!\n✅ Hits each muscle group twice per week\n✅ 4 different phases that rotate continuously\n✅ Over 200 exercises in the library\n✅ Cardio/HIIT integrated 4-6 days per week!\n\n**Weekly Split:**\n• Monday: Push (Chest, Shoulders, Triceps)\n• Tuesday: Pull (Back, Biceps) + Cardio\n• Wednesday: Legs (Quads, Hamstrings, Glutes) + Cardio\n• Thursday: Push (Different exercises) + Optional HIIT\n• Friday: Pull (Different exercises) + Cardio\n• Saturday: Legs (Different exercises) + Cardio\n• Sunday: Rest\n\n**Current Phase: ${currentPhase.toUpperCase()} (Week ${weeksInCurrentPhase})**\n\n**Why This Works:**\n• Prevents boredom and plateaus\n• Reduces overuse injuries\n• Develops complete muscle balance\n• Cardio improves endurance & fat loss\n• Constant variety keeps you motivated\n• Automatic progression system\n\nYour exercises will rotate to Phase ${currentPhase === 'd' ? 'A' : String.fromCharCode(currentPhase.charCodeAt(0) + 1).toUpperCase()} in ${4 - weeksInCurrentPhase} week(s)!`;
    }
    
    return `I'm your AI coach! I can help with:\n\n💪 Exercise Form & Technique\n🔄 Alternative Exercises\n⚖️ Weight Selection & Progression\n📊 Breaking Through Plateaus\n🏃 Cardio & HIIT Training\n💊 Nutrition & Diet\n😴 Recovery & Sleep\n📅 Program Design\n🔁 Training Phase System\n🏋️ Muscle Building Tips\n\nJust ask me anything! Try:\n• "Tell me about cardio in my program"\n• "How much weight should I use?"\n• "What phase am I in?"\n• "Tips for deadlift form?"`;
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
    if (type.startsWith('push')) return `Push (Phase ${currentPhase.toUpperCase()}) - Chest, Shoulders, Triceps`;
    if (type.startsWith('pull')) return `Pull (Phase ${currentPhase.toUpperCase()}) - Back, Biceps + Cardio`;
    if (type.startsWith('legs')) return `Legs (Phase ${currentPhase.toUpperCase()}) - Quads, Hamstrings, Glutes + Cardio`;
    return 'Rest Day';
  };

  const getWorkoutDisplayType = (type) => {
    if (type.startsWith('push')) return 'push';
    if (type.startsWith('pull')) return 'pull';
    if (type.startsWith('legs')) return 'legs';
    return 'rest';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="bg-slate-800/50 border-b border-slate-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Dumbbell className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold">AI Workout Tracker</h1>
              <p className="text-xs text-slate-400">Phase {currentPhase.toUpperCase()} • Week {weeksInCurrentPhase}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
            <div className="text-xs text-blue-400 mt-1">{Math.floor((new Date() - new Date(trainingPhase.startDate)) / (1000 * 60 * 60 * 24))} days into cycle</div>
          </div>
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
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">
                    {todayWorkoutType === 'rest' ? 'Rest Day' : getWorkoutDisplayType(todayWorkoutType).charAt(0).toUpperCase() + getWorkoutDisplayType(todayWorkoutType).slice(1) + ' Day'}
                  </h2>
                  <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
                    Phase {currentPhase.toUpperCase()}
                  </span>
                </div>
                <p className="text-slate-400 mt-1">
                  {getWorkoutDisplayType(todayWorkoutType) === 'push' && 'Chest, Shoulders, Triceps'}
                  {getWorkoutDisplayType(todayWorkoutType) === 'pull' && 'Back, Biceps + Cardio'}
                  {getWorkoutDisplayType(todayWorkoutType) === 'legs' && 'Quads, Hamstrings, Glutes + Cardio'}
                  {todayWorkoutType === 'rest' && 'Recovery day'}
                </p>
                <p className="text-xs text-slate-500 mt-1">Exercises rotate in {4 - weeksInCurrentPhase} week(s)</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowAIChat(true)} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 py-2 rounded-lg">
                  <MessageSquare className="w-5 h-5" />
                  AI Coach
                </button>
                <button onClick={resetTrainingPhase} className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg">
                  <RotateCcw className="w-5 h-5" />
                  Reset Cycle
                </button>
              </div>
            </div>

            {todayWorkoutType === 'rest' ? (
              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 text-center">
                <h3 className="text-xl font-semibold mb-4">Rest and Recovery</h3>
                <p className="text-slate-400">Focus on recovery today! Light stretching or walking is fine.</p>
              </div>
            ) : (
              todayWorkout.map((workout, idx) => {
                const exercise = getExerciseById(workout.exerciseId);
                if (!exercise) return null;
                const history = workoutHistory[workout.exerciseId] || [];
                const lastSession = history[history.length - 1];
                const isCardio = exercise.primary === 'Cardio';

                return (
                  <div key={idx} className={`bg-slate-800/50 rounded-xl p-6 border ${isCardio ? 'border-green-600/30 bg-green-900/10' : 'border-slate-700'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className={`text-xl font-semibold ${isCardio ? 'text-green-400' : 'text-blue-400'}`}>{exercise.name}</h3>
                          {isCardio && <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-xs font-semibold">CARDIO</span>}
                        </div>
                        <div className="flex gap-4 text-sm text-slate-400 mt-1">
                          <span>{exercise.equipment}</span>
                          <span>•</span>
                          <span>{workout.targetSets} {isCardio ? 'session' : 'sets'} x {workout.targetReps}</span>
                          <span>•</span>
                          <span className="text-purple-400">{exercise.difficulty}</span>
                        </div>
                        {lastSession && !isCardio && <div className="text-sm text-green-400 mt-1">Last: {lastSession.weight}lbs x {lastSession.reps}</div>}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { setSwapExerciseId(workout.exerciseId); setShowSwapModal(true); }} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg"><RefreshCw className="w-5 h-5" /></button>
                        <button onClick={() => { setSelectedExercise(workout.exerciseId); setShowAIChat(true); }} className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg"><Zap className="w-5 h-5" /></button>
                      </div>
                    </div>
                    {!isCardio && (
                      <div className="space-y-2">
                        {[...Array(workout.targetSets)].map((_, setIdx) => (
                          <SetLogger key={setIdx} setNumber={setIdx + 1} onLog={(data) => logSet(workout.exerciseId, data)} previousWeight={lastSession?.weight} />
                        ))}
                      </div>
                    )}
                    {isCardio && (
                      <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                        <p className="text-slate-300">{exercise.description}</p>
                        <p className="text-sm text-slate-400 mt-2">Complete after your strength training</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'week' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Weekly Plan - Phase {currentPhase.toUpperCase()}</h2>
              <p className="text-slate-400 mt-2">Week {weeksInCurrentPhase} of 4 • Exercises auto-rotate + Cardio/HIIT integrated</p>
            </div>
            <div className="grid gap-4">
              {getWeekSchedule().map((schedule) => {
                const dayWorkout = WORKOUT_TEMPLATES[schedule.type] || [];
                const hasCardio = dayWorkout.some(w => {
                  const ex = getExerciseById(w.exerciseId);
                  return ex && ex.primary === 'Cardio';
                });
                return (
                  <div key={schedule.day} className={`bg-slate-800/50 rounded-xl p-6 border ${schedule.isToday ? 'border-blue-500' : 'border-slate-700'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-semibold">
                            {schedule.day}
                            {schedule.isToday && <span className="ml-3 text-sm bg-blue-600 px-2 py-1 rounded">Today</span>}
                          </h3>
                          {hasCardio && <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-xs font-semibold">+ CARDIO</span>}
                        </div>
                        <p className="text-slate-400 mt-1">{getWorkoutLabel(schedule.type)}</p>
                      </div>
                    </div>
                    
                    {schedule.type !== 'rest' && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-semibold text-blue-400 mb-3">{dayWorkout.length} Exercises:</p>
                        {dayWorkout.map((workout, idx) => {
                          const exercise = getExerciseById(workout.exerciseId);
                          if (!exercise) return null;
                          const isCardio = exercise.primary === 'Cardio';
                          return (
                            <div key={idx} className={`rounded-lg p-3 flex justify-between items-center ${isCardio ? 'bg-green-900/20 border border-green-600/30' : 'bg-slate-700/30'}`}>
                              <div>
                                <p className={`font-medium text-sm ${isCardio ? 'text-green-400' : ''}`}>{exercise.name}</p>
                                <p className="text-xs text-slate-400">{exercise.primary} • {exercise.equipment}</p>
                              </div>
                              <p className="text-sm text-slate-400">{workout.targetSets} × {workout.targetReps}</p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    
                    {schedule.type === 'rest' && (
                      <div className="mt-4 bg-slate-700/30 rounded-lg p-4 text-center">
                        <p className="text-slate-400">Rest and recovery day</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Progress</h2>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear all workout history? This cannot be undone.')) {
                    setWorkoutHistory({});
                    localStorage.removeItem('workoutHistory');
                  }
                }}
                className="text-sm bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
              >
                Clear All Data
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <p className="text-slate-400 text-sm mb-1">Total Sets Logged</p>
                <p className="text-3xl font-bold text-blue-400">
                  {Object.values(workoutHistory).reduce((total, history) => total + history.length, 0)}
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <p className="text-slate-400 text-sm mb-1">Exercises Tracked</p>
                <p className="text-3xl font-bold text-green-400">
                  {Object.keys(workoutHistory).length}
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <p className="text-slate-400 text-sm mb-1">This Week</p>
                <p className="text-3xl font-bold text-purple-400">
                  {Object.values(workoutHistory).reduce((total, history) => {
                    const thisWeek = history.filter(entry => {
                      const entryDate = new Date(entry.date);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return entryDate >= weekAgo;
                    });
                    return total + thisWeek.length;
                  }, 0)} sets
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <p className="text-slate-400 text-sm mb-1">Current Phase</p>
                <p className="text-3xl font-bold text-orange-400">
                  {currentPhase.toUpperCase()} • W{weeksInCurrentPhase}
                </p>
              </div>
            </div>

            {todayWorkout.filter(w => {
              const ex = getExerciseById(w.exerciseId);
              return ex && ex.primary !== 'Cardio' && getProgressData(w.exerciseId).length > 0;
            }).length === 0 && (
              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 text-center">
                <p className="text-slate-400">No workout data yet. Start logging your sets to track progress!</p>
              </div>
            )}
            
            {todayWorkout.filter(w => {
              const ex = getExerciseById(w.exerciseId);
              return ex && ex.primary !== 'Cardio' && getProgressData(w.exerciseId).length > 0;
            }).map(workout => {
              const exercise = getExerciseById(workout.exerciseId);
              if (!exercise) return null;
              const data = getProgressData(workout.exerciseId);
              const allHistory = workoutHistory[workout.exerciseId] || [];
              const firstWeight = allHistory[0]?.weight || 0;
              const lastWeight = allHistory[allHistory.length - 1]?.weight || 0;
              const improvement = firstWeight > 0 ? ((lastWeight - firstWeight) / firstWeight * 100).toFixed(1) : 0;
              
              return (
                <div key={workout.exerciseId} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{exercise.name}</h3>
                      <p className="text-sm text-slate-400 mt-1">
                        {allHistory.length} sets logged • 
                        {improvement > 0 && <span className="text-green-400 ml-2">+{improvement}% strength gain</span>}
                        {improvement < 0 && <span className="text-red-400 ml-2">{improvement}% change</span>}
                      </p>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="session" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                      <Line type="monotone" dataKey="weight" stroke="#60a5fa" strokeWidth={2} />
                      <Line type="monotone" dataKey="volume" stroke="#34d399" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="flex gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-slate-400">Weight (lbs)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-slate-400">Volume (lbs × reps)</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'library' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Exercise Library</h2>
              <p className="text-slate-400 mt-1">Total Exercises: {getAllExercises().length}</p>
              <p className="text-slate-500 text-sm mt-1">Exercises automatically rotate every 4 weeks + Cardio/HIIT integrated</p>
            </div>
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
                        <span>•</span>
                        <span className="text-blue-400">{exercise.primary}</span>
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
                      <span>•</span>
                      <span className="text-blue-400">{exercise.primary}</span>
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
                <div>
                  <h3 className="text-xl font-bold">AI Coach</h3>
                  <p className="text-xs text-slate-400">Phase {currentPhase.toUpperCase()} • Week {weeksInCurrentPhase}</p>
                </div>
              </div>
              <button onClick={() => setShowAIChat(false)} className="p-2 hover:bg-slate-700 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {aiMessages.length === 0 && (
                <div className="text-center text-slate-400 mt-8">
                  <p className="mb-4">Ask me about your workout or training phase!</p>
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
                <input type="text" value={aiInput} onChange={(e) => setAiInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendAIMessage()} placeholder="Ask about form, weight, cardio, phases..." className="flex-1 bg-slate-700 rounded-lg px-4 py-3" />
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
