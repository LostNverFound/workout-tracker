import React, { useState, useEffect } from 'react';
import { Dumbbell, TrendingUp, Library, Calendar, Plus, Check, RefreshCw, Zap, MessageSquare, X, CalendarDays, Activity, Heart, Moon, Thermometer, Footprints, Flame, Target, AlertCircle, Edit2, History, ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MILESTONE_DATE = new Date('2025-11-14');

const EXERCISE_LIBRARY = {
  chest: [
    { id: 1, name: 'Barbell Bench Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Chest', secondary: 'Triceps, Shoulders' },
    { id: 2, name: 'Incline Barbell Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Upper Chest', secondary: 'Shoulders, Triceps' },
    { id: 3, name: 'Dumbbell Bench Press', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Chest', secondary: 'Triceps, Shoulders' },
    { id: 4, name: 'Incline Dumbbell Press', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Upper Chest', secondary: 'Shoulders, Triceps' },
    { id: 5, name: 'Dumbbell Flyes', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Chest', secondary: 'None' },
    { id: 6, name: 'Cable Flyes', equipment: 'Cable', difficulty: 'Beginner', primary: 'Chest', secondary: 'None' },
    { id: 7, name: 'Dips', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Chest', secondary: 'Triceps' },
    { id: 8, name: 'Decline Bench Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Lower Chest', secondary: 'Triceps' },
    { id: 9, name: 'Pec Deck', equipment: 'Machine', difficulty: 'Beginner', primary: 'Chest', secondary: 'None' },
    { id: 10, name: 'Push-ups', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Chest', secondary: 'Triceps' },
  ],
  back: [
    { id: 11, name: 'Deadlift', equipment: 'Barbell', difficulty: 'Advanced', primary: 'Back', secondary: 'Hamstrings, Glutes' },
    { id: 12, name: 'Pull-ups', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Lats', secondary: 'Biceps' },
    { id: 13, name: 'Bent-Over Barbell Row', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Back', secondary: 'Biceps' },
    { id: 14, name: 'T-Bar Row', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Back', secondary: 'Biceps' },
    { id: 15, name: 'Lat Pulldown', equipment: 'Cable', difficulty: 'Beginner', primary: 'Lats', secondary: 'Biceps' },
    { id: 16, name: 'Seated Cable Row', equipment: 'Cable', difficulty: 'Beginner', primary: 'Back', secondary: 'Biceps' },
    { id: 17, name: 'Single-Arm Dumbbell Row', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Back', secondary: 'Biceps' },
    { id: 18, name: 'Face Pulls', equipment: 'Cable', difficulty: 'Beginner', primary: 'Rear Delts', secondary: 'Upper Back' },
    { id: 19, name: 'Chest-Supported Row', equipment: 'Machine', difficulty: 'Beginner', primary: 'Back', secondary: 'Biceps' },
    { id: 20, name: 'Wide Grip Pull-ups', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Lats', secondary: 'Biceps' },
  ],
  legs: [
    { id: 21, name: 'Barbell Squat', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Quads', secondary: 'Glutes, Hamstrings' },
    { id: 22, name: 'Front Squat', equipment: 'Barbell', difficulty: 'Advanced', primary: 'Quads', secondary: 'Core' },
    { id: 23, name: 'Romanian Deadlift', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Hamstrings', secondary: 'Glutes, Lower Back' },
    { id: 24, name: 'Leg Press', equipment: 'Machine', difficulty: 'Beginner', primary: 'Quads', secondary: 'Glutes' },
    { id: 25, name: 'Leg Curl', equipment: 'Machine', difficulty: 'Beginner', primary: 'Hamstrings', secondary: 'None' },
    { id: 26, name: 'Leg Extension', equipment: 'Machine', difficulty: 'Beginner', primary: 'Quads', secondary: 'None' },
    { id: 27, name: 'Walking Lunges', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Quads', secondary: 'Glutes' },
    { id: 28, name: 'Bulgarian Split Squat', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Quads', secondary: 'Glutes' },
    { id: 29, name: 'Hip Thrusts', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Glutes', secondary: 'Hamstrings' },
    { id: 30, name: 'Hack Squat', equipment: 'Machine', difficulty: 'Intermediate', primary: 'Quads', secondary: 'Glutes' },
    { id: 31, name: 'Goblet Squat', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Quads', secondary: 'Glutes' },
    { id: 32, name: 'Stiff-Leg Deadlift', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Hamstrings', secondary: 'Lower Back' },
  ],
  shoulders: [
    { id: 41, name: 'Overhead Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Shoulders', secondary: 'Triceps' },
    { id: 42, name: 'Dumbbell Shoulder Press', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Shoulders', secondary: 'Triceps' },
    { id: 43, name: 'Lateral Raises', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Side Delts', secondary: 'None' },
    { id: 44, name: 'Cable Lateral Raises', equipment: 'Cable', difficulty: 'Beginner', primary: 'Side Delts', secondary: 'None' },
    { id: 45, name: 'Rear Delt Flyes', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Rear Delts', secondary: 'None' },
    { id: 46, name: 'Arnold Press', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Shoulders', secondary: 'Triceps' },
    { id: 47, name: 'Front Raises', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Front Delts', secondary: 'None' },
    { id: 48, name: 'Upright Row', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Side Delts', secondary: 'Traps' },
    { id: 49, name: 'Reverse Pec Deck', equipment: 'Machine', difficulty: 'Beginner', primary: 'Rear Delts', secondary: 'None' },
  ],
  arms: [
    { id: 51, name: 'Barbell Curl', equipment: 'Barbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'None' },
    { id: 52, name: 'Dumbbell Curl', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'None' },
    { id: 53, name: 'Hammer Curl', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'Forearms' },
    { id: 54, name: 'Preacher Curl', equipment: 'Barbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'None' },
    { id: 55, name: 'Cable Curl', equipment: 'Cable', difficulty: 'Beginner', primary: 'Biceps', secondary: 'None' },
    { id: 56, name: 'Concentration Curl', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'None' },
    { id: 57, name: 'Tricep Pushdown', equipment: 'Cable', difficulty: 'Beginner', primary: 'Triceps', secondary: 'None' },
    { id: 58, name: 'Overhead Tricep Extension', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Triceps', secondary: 'None' },
    { id: 59, name: 'Skull Crushers', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Triceps', secondary: 'None' },
    { id: 60, name: 'Rope Pushdown', equipment: 'Cable', difficulty: 'Beginner', primary: 'Triceps', secondary: 'None' },
    { id: 61, name: 'Close-Grip Bench Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Triceps', secondary: 'Chest' },
    { id: 62, name: 'Dips (Tricep Focus)', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Triceps', secondary: 'Chest' },
  ],
  abs: [
    { id: 71, name: 'Cable Crunches', equipment: 'Cable', difficulty: 'Intermediate', primary: 'Abs', secondary: 'None' },
    { id: 72, name: 'Hanging Leg Raises', equipment: 'Bar', difficulty: 'Advanced', primary: 'Lower Abs', secondary: 'Hip Flexors' },
    { id: 73, name: 'Planks', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Core', secondary: 'None' },
    { id: 74, name: 'Russian Twists', equipment: 'Weight', difficulty: 'Beginner', primary: 'Obliques', secondary: 'Abs' },
    { id: 75, name: 'Bicycle Crunches', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Abs', secondary: 'Obliques' },
    { id: 76, name: 'Ab Wheel Rollout', equipment: 'Equipment', difficulty: 'Advanced', primary: 'Core', secondary: 'Shoulders' },
    { id: 77, name: 'Leg Raises', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Lower Abs', secondary: 'Hip Flexors' },
    { id: 78, name: 'Mountain Climbers', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Core', secondary: 'Cardio' },
    { id: 79, name: 'Pallof Press', equipment: 'Cable', difficulty: 'Intermediate', primary: 'Core', secondary: 'Obliques' },
    { id: 80, name: 'Decline Sit-ups', equipment: 'Bench', difficulty: 'Intermediate', primary: 'Abs', secondary: 'Hip Flexors' },
    { id: 81, name: 'Dead Bug', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Core', secondary: 'None' },
    { id: 82, name: 'Side Plank', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Obliques', secondary: 'Core' },
  ],
  calves: [
    { id: 91, name: 'Standing Calf Raise', equipment: 'Machine', difficulty: 'Beginner', primary: 'Calves', secondary: 'None' },
    { id: 92, name: 'Seated Calf Raise', equipment: 'Machine', difficulty: 'Beginner', primary: 'Calves', secondary: 'None' },
    { id: 93, name: 'Calf Press on Leg Press', equipment: 'Machine', difficulty: 'Beginner', primary: 'Calves', secondary: 'None' },
  ],
  cardio: [
    { id: 101, name: 'Treadmill HIIT Sprints', equipment: 'Treadmill', difficulty: 'Advanced', primary: 'Cardio', secondary: 'Legs', duration: '15 min' },
    { id: 102, name: 'Rowing Machine', equipment: 'Machine', difficulty: 'Intermediate', primary: 'Cardio', secondary: 'Full Body', duration: '20 min' },
    { id: 103, name: 'Stair Climber', equipment: 'Machine', difficulty: 'Intermediate', primary: 'Cardio', secondary: 'Glutes, Legs', duration: '20 min' },
    { id: 104, name: 'Assault Bike HIIT', equipment: 'Bike', difficulty: 'Advanced', primary: 'Cardio', secondary: 'Full Body', duration: '12 min' },
    { id: 105, name: 'Incline Walking', equipment: 'Treadmill', difficulty: 'Beginner', primary: 'Cardio', secondary: 'Glutes', duration: '30 min' },
    { id: 106, name: 'Battle Ropes', equipment: 'Ropes', difficulty: 'Advanced', primary: 'Cardio', secondary: 'Arms, Shoulders', duration: '10 min' },
  ],
  traps: [
    { id: 111, name: 'Barbell Shrugs', equipment: 'Barbell', difficulty: 'Beginner', primary: 'Traps', secondary: 'None' },
    { id: 112, name: 'Dumbbell Shrugs', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Traps', secondary: 'None' },
    { id: 113, name: 'Farmer Walks', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Traps', secondary: 'Forearms, Core' },
  ],
};

const WORKOUT_TEMPLATES = {
  monday: [ 
    { exerciseId: 1, targetSets: 5, targetReps: '5-6', note: 'HEAVY' },
    { exerciseId: 2, targetSets: 4, targetReps: '6-8' },
    { exerciseId: 4, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 5, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 6, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 7, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 41, targetSets: 4, targetReps: '6-8' },
    { exerciseId: 43, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 44, targetSets: 3, targetReps: '15-20' },
    { exerciseId: 45, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 57, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 59, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 60, targetSets: 3, targetReps: '15-20' },
    { exerciseId: 71, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 72, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 73, targetSets: 3, targetReps: '60s' },
    { exerciseId: 74, targetSets: 3, targetReps: '20 each' },
  ],
  tuesday: [ 
    { exerciseId: 11, targetSets: 5, targetReps: '5-6', note: 'HEAVY' },
    { exerciseId: 12, targetSets: 4, targetReps: '6-10' },
    { exerciseId: 13, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 14, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 16, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 15, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 17, targetSets: 3, targetReps: '10-12 each' },
    { exerciseId: 18, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 49, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 51, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 53, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 54, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 55, targetSets: 3, targetReps: '15-20' },
    { exerciseId: 76, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 77, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 79, targetSets: 3, targetReps: '12 each' },
    { exerciseId: 82, targetSets: 3, targetReps: '45s each' },
    { exerciseId: 102, targetSets: 1, targetReps: '20 min', isCardio: true },
  ],
  wednesday: [ 
    { exerciseId: 21, targetSets: 5, targetReps: '6-8', note: 'HEAVY' },
    { exerciseId: 22, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 23, targetSets: 5, targetReps: '8-10', note: 'HEAVY' },
    { exerciseId: 24, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 29, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 26, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 25, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 28, targetSets: 3, targetReps: '10 each' },
    { exerciseId: 27, targetSets: 3, targetReps: '12 each' },
    { exerciseId: 91, targetSets: 5, targetReps: '15-20' },
    { exerciseId: 92, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 71, targetSets: 4, targetReps: '20' },
    { exerciseId: 75, targetSets: 4, targetReps: '25' },
    { exerciseId: 78, targetSets: 3, targetReps: '30s' },
    { exerciseId: 81, targetSets: 3, targetReps: '15' },
  ],
  thursday: [ 
    { exerciseId: 3, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 4, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 5, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 6, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 9, targetSets: 3, targetReps: '15-20' },
    { exerciseId: 10, targetSets: 3, targetReps: 'AMRAP' },
    { exerciseId: 51, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 52, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 56, targetSets: 3, targetReps: '15-20' },
    { exerciseId: 61, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 57, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 58, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 62, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 72, targetSets: 4, targetReps: '15' },
    { exerciseId: 73, targetSets: 3, targetReps: '90s' },
    { exerciseId: 74, targetSets: 4, targetReps: '25 each' },
    { exerciseId: 82, targetSets: 3, targetReps: '60s each' },
    { exerciseId: 104, targetSets: 1, targetReps: '12 min HIIT', isCardio: true },
  ],
  friday: [ 
    { exerciseId: 12, targetSets: 4, targetReps: '8-12' },
    { exerciseId: 20, targetSets: 4, targetReps: '8-12' },
    { exerciseId: 13, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 19, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 16, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 18, targetSets: 4, targetReps: '20' },
    { exerciseId: 42, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 46, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 43, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 47, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 48, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 111, targetSets: 5, targetReps: '12-15' },
    { exerciseId: 112, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 76, targetSets: 4, targetReps: '12' },
    { exerciseId: 77, targetSets: 4, targetReps: '20' },
    { exerciseId: 79, targetSets: 3, targetReps: '15 each' },
    { exerciseId: 75, targetSets: 3, targetReps: '30' },
    { exerciseId: 103, targetSets: 1, targetReps: '20 min', isCardio: true },
  ],
  saturday: [ 
    { exerciseId: 24, targetSets: 5, targetReps: '12-15', note: 'VOLUME' },
    { exerciseId: 30, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 31, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 32, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 29, targetSets: 5, targetReps: '12-15' },
    { exerciseId: 25, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 26, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 28, targetSets: 4, targetReps: '12 each' },
    { exerciseId: 91, targetSets: 5, targetReps: '20-25' },
    { exerciseId: 93, targetSets: 4, targetReps: '20-25' },
    { exerciseId: 71, targetSets: 4, targetReps: '25' },
    { exerciseId: 72, targetSets: 4, targetReps: '20' },
    { exerciseId: 80, targetSets: 4, targetReps: '20' },
    { exerciseId: 78, targetSets: 3, targetReps: '45s' },
    { exerciseId: 105, targetSets: 1, targetReps: '30 min', isCardio: true },
  ],
  sunday: [],
};

const SetLogger = ({ setNumber, onLog, onEdit, loggedData }) => {
  const [weight, setWeight] = useState(loggedData?.weight?.toString() || '');
  const [reps, setReps] = useState(loggedData?.reps?.toString() || '');
  const [isEditing, setIsEditing] = useState(!loggedData);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    if (weight && reps) {
      if (loggedData) {
        onEdit({ weight: parseFloat(weight), reps: parseInt(reps) });
      } else {
        onLog({ weight: parseFloat(weight), reps: parseInt(reps) });
      }
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
    }
  };

  if (!isEditing && loggedData) {
    return (
      <div className="flex items-center gap-3 bg-green-900/20 border border-green-600/30 rounded-lg p-3">
        <span className="text-slate-400 w-16">Set {setNumber}</span>
        <span className="text-white font-medium">{loggedData.weight} lbs × {loggedData.reps} reps</span>
        <button 
          onClick={() => setIsEditing(true)}
          className="ml-auto p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 bg-slate-700/30 rounded-lg p-3">
      <span className="text-slate-400 w-16">Set {setNumber}</span>
      <input 
        type="number" 
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="Weight" 
        value={weight} 
        onChange={(e) => setWeight(e.target.value)} 
        className="w-24 bg-slate-700 rounded px-3 py-2 text-sm" 
      />
      <span className="text-slate-400">lbs</span>
      <input 
        type="number" 
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="Reps" 
        value={reps} 
        onChange={(e) => setReps(e.target.value)} 
        className="w-20 bg-slate-700 rounded px-3 py-2 text-sm" 
      />
      <span className="text-slate-400">reps</span>
      <button 
        onClick={handleSave} 
        className={`ml-auto p-2 rounded-lg transition-all ${showSuccess ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {showSuccess ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
      </button>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [selectedDay, setSelectedDay] = useState(null); // null means use current day
  const [showDaySelector, setShowDaySelector] = useState(false);
  const [healthData, setHealthData] = useState(null);
  const [lastHealthUpdate, setLastHealthUpdate] = useState(null);
  const [refreshingHealth, setRefreshingHealth] = useState(false);
  
  const [workoutHistory, setWorkoutHistory] = useState(() => {
    const saved = localStorage.getItem('workoutHistory');
    return saved ? JSON.parse(saved) : {};
  });

  const [completedWorkouts, setCompletedWorkouts] = useState(() => {
    const saved = localStorage.getItem('completedWorkouts');
    return saved ? JSON.parse(saved) : {};
  });
  
  const [todayLoggedSets, setTodayLoggedSets] = useState(() => {
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem(`todayLoggedSets_${today}`);
    return saved ? JSON.parse(saved) : {};
  });
  
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapExerciseId, setSwapExerciseId] = useState(null);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [aiInput, setAiInput] = useState('');
  const [selectedLibraryExercise, setSelectedLibraryExercise] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyFilter, setHistoryFilter] = useState('all');

  const getDayOfWeek = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date().getDay()];
  };

  const currentDay = getDayOfWeek();
  const displayDay = selectedDay || currentDay;
  const todayWorkout = WORKOUT_TEMPLATES[displayDay] || [];

  // Fetch health data
  const fetchHealthData = async () => {
    setRefreshingHealth(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setHealthData({
        weight: { current: 152, trend: 'stable' },
        sleep: { hours: 7.5, quality: 'good' },
        hrv: { value: 65, status: 'good' },
        restingHR: { value: 58, status: 'excellent' },
        readiness: { score: 85, status: 'ready' },
        steps: { today: 8432, goal: 10000 },
        activeCalories: { today: 450, goal: 500 },
        bodyTemp: { value: 98.2, deviation: 0.1 }
      });
      setLastHealthUpdate(new Date());
    } catch (error) {
      console.error('Error fetching health data:', error);
    } finally {
      setRefreshingHealth(false);
    }
  };

  useEffect(() => {
    fetchHealthData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchHealthData();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
  }, [workoutHistory]);

  useEffect(() => {
    localStorage.setItem('completedWorkouts', JSON.stringify(completedWorkouts));
  }, [completedWorkouts]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`todayLoggedSets_${today}`, JSON.stringify(todayLoggedSets));
  }, [todayLoggedSets]);

  const getAllExercises = () => Object.values(EXERCISE_LIBRARY).flat();
  const getExerciseById = (id) => getAllExercises().find(ex => ex.id === id);

  const getProgressData = (exerciseId) => {
    const history = workoutHistory[exerciseId] || [];
    return history.slice(-10).map((entry, idx) => ({ 
      session: idx + 1, 
      weight: entry.weight, 
      volume: entry.weight * entry.reps 
    }));
  };

  const logSet = (exerciseId, setNumber, setData) => {
    const date = new Date().toISOString().split('T')[0];
    const history = workoutHistory[exerciseId] || [];
    setWorkoutHistory({ 
      ...workoutHistory, 
      [exerciseId]: [...history, { ...setData, date, setNumber, timestamp: new Date().toISOString() }] 
    });
    
    const key = `${exerciseId}_${setNumber}`;
    setTodayLoggedSets({
      ...todayLoggedSets,
      [key]: setData
    });
  };

  const editSet = (exerciseId, setNumber, setData) => {
    const date = new Date().toISOString().split('T')[0];
    const history = workoutHistory[exerciseId] || [];
    
    // Find and update the most recent entry for this set
    const updatedHistory = [...history];
    for (let i = updatedHistory.length - 1; i >= 0; i--) {
      if (updatedHistory[i].date === date && updatedHistory[i].setNumber === setNumber) {
        updatedHistory[i] = { ...setData, date, setNumber, timestamp: new Date().toISOString() };
        break;
      }
    }
    
    setWorkoutHistory({ 
      ...workoutHistory, 
      [exerciseId]: updatedHistory
    });
    
    const key = `${exerciseId}_${setNumber}`;
    setTodayLoggedSets({
      ...todayLoggedSets,
      [key]: setData
    });
  };

  const completeWorkout = () => {
    const date = new Date().toISOString().split('T')[0];
    const loggedCount = Object.keys(todayLoggedSets).length;
    
    if (loggedCount === 0) {
      alert('Log at least one set before completing the workout!');
      return;
    }
    
    setCompletedWorkouts({
      ...completedWorkouts,
      [date]: {
        day: displayDay,
        totalSets: loggedCount,
        completedAt: new Date().toISOString()
      }
    });
    
    alert(`Workout completed! ${loggedCount} sets logged for ${displayDay}.`);
  };

  const getSimilarExercises = (exerciseId) => {
    const exercise = getExerciseById(exerciseId);
    if (!exercise) return [];
    return getAllExercises()
      .filter(ex => ex.id !== exerciseId && (ex.primary === exercise.primary || ex.secondary?.includes(exercise.primary)))
      .slice(0, 10);
  };

  const getTrainingRecommendation = () => {
    if (!healthData) return null;
    const { readiness } = healthData;
    if (readiness.score >= 85) {
      return { type: 'optimal', message: 'Perfect day for heavy training! Go for PRs.', icon: '💪', color: 'text-green-400', show: false };
    } else if (readiness.score >= 70) {
      return { type: 'good', message: 'Good recovery. Train as planned.', icon: '👍', color: 'text-blue-400', show: false };
    } else if (readiness.score >= 50) {
      return { type: 'moderate', message: 'Moderate recovery. Consider reducing volume 20%.', icon: '⚠️', color: 'text-yellow-400', show: true };
    } else {
      return { type: 'low', message: 'Low recovery detected. Consider rest or active recovery.', icon: '🛑', color: 'text-red-400', show: true };
    }
  };

  const getAIResponse = (message) => {
    const lowerMsg = message.toLowerCase();
    const recommendation = getTrainingRecommendation();
    if (lowerMsg.includes('transform') || lowerMsg.includes('jacked') || lowerMsg.includes('program')) {
      return `Hardcore Transformation Program:\n\n**Your Split (6 Days):**\n• Mon: Chest+Shoulders+Triceps+Abs (17 exercises!)\n• Tue: Back+Biceps+Rear Delts+Abs+Cardio (18 exercises!)\n• Wed: Legs+Calves+Abs (15 exercises!)\n• Thu: Chest+Arms+Abs+HIIT (17 exercises!)\n• Fri: Back+Shoulders+Traps+Abs+Cardio (17 exercises!)\n• Sat: Legs Volume+Calves+Abs+Cardio (15 exercises!)\n• Sun: REST\n\n**Volume:**\n• 20-30 sets per workout\n• ABS EVERY DAY (4 exercises, 12-16 sets)\n• CARDIO 3x/week (20-30 min)\n• 100+ total sets per week\n\n**This will transform you!**`;
    }
    if (lowerMsg.includes('recovery') || lowerMsg.includes('readiness')) {
      if (!healthData) return 'Connect Apple Health for recovery insights!';
      return `Recovery Status:\n\n${recommendation.icon} ${recommendation.message}\n\n**Metrics:**\n• Readiness: ${healthData.readiness.score}%\n• HRV: ${healthData.hrv.value}ms\n• Sleep: ${healthData.sleep.hours}hrs\n• Resting HR: ${healthData.restingHR.value}bpm`;
    }
    return `AI Coach:\n\n💪 Transformation Strategy\n📊 Recovery Analysis\n🎯 Progressive Overload\n🔥 Nutrition Guidance\n\n${healthData ? `Today: ${recommendation.icon} ${recommendation.message}` : 'Connect Apple Health!'}\n\nAsk me anything!`;
  };

  const sendAIMessage = () => {
    if (!aiInput.trim()) return;
    const userMsg = { sender: 'user', text: aiInput };
    const aiMsg = { sender: 'ai', text: getAIResponse(aiInput) };
    setAiMessages([...aiMessages, userMsg, aiMsg]);
    setAiInput('');
  };

  const getDayLabel = (day) => {
    const labels = {
      monday: 'Chest + Shoulders + Triceps + Abs',
      tuesday: 'Back + Biceps + Rear Delts + Abs + Cardio',
      wednesday: 'Legs (Quads/Hams/Glutes) + Calves + Abs',
      thursday: 'Chest + Arms + Abs + HIIT',
      friday: 'Back + Shoulders + Traps + Abs + Cardio',
      saturday: 'Legs (Volume) + Calves + Abs + Cardio',
      sunday: 'REST & RECOVERY'
    };
    return labels[day] || '';
  };

  const getDayName = (day) => day.charAt(0).toUpperCase() + day.slice(1);

  const getAllHistoricalData = () => {
    const allData = [];
    Object.entries(workoutHistory).forEach(([exerciseId, history]) => {
      const exercise = getExerciseById(parseInt(exerciseId));
      history.forEach(entry => {
        allData.push({
          ...entry,
          exerciseId: parseInt(exerciseId),
          exerciseName: exercise?.name || 'Unknown',
          primary: exercise?.primary || 'Unknown'
        });
      });
    });
    return allData.sort((a, b) => new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date));
  };

  const getTimeSinceUpdate = () => {
    if (!lastHealthUpdate) return '';
    const now = new Date();
    const diff = Math.floor((now - lastHealthUpdate) / 1000 / 60);
    if (diff < 1) return 'Just now';
    if (diff === 1) return '1 min ago';
    if (diff < 60) return `${diff} mins ago`;
    const hours = Math.floor(diff / 60);
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };

  const recommendation = getTrainingRecommendation();
  const totalSetsToday = todayWorkout.length;
  const absExercises = todayWorkout.filter(w => {
    const ex = getExerciseById(w.exerciseId);
    return ex && ex.primary === 'Abs';
  }).length;
  const cardioExercises = todayWorkout.filter(w => w.isCardio).length;

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="bg-slate-800/50 border-b border-slate-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Dumbbell className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold">Workout Tracker</h1>
              <p className="text-xs text-slate-400">Hardcore Transformation Program</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/30 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6 overflow-x-auto">
            {[
              { id: 'today', icon: Calendar, label: 'Today' },
              { id: 'health', icon: Activity, label: 'Health' },
              { id: 'week', icon: CalendarDays, label: 'Weekly Plan' },
              { id: 'progress', icon: TrendingUp, label: 'Progress' },
              { id: 'library', icon: Library, label: 'Library' },
            ].map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)} 
                className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? 'border-blue-400 text-blue-400' : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
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
            {healthData && recommendation && recommendation.show && (
              <div className={`p-4 rounded-lg border ${
                recommendation.type === 'moderate' ? 'bg-yellow-900/20 border-yellow-600/30' :
                'bg-red-900/20 border-red-600/30'
              }`}>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <p className={`text-sm font-medium ${recommendation.color}`}>
                    {recommendation.icon} {recommendation.message}
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">{getDayName(displayDay)}'s Workout</h2>
                  <div className="relative">
                    <button
                      onClick={() => setShowDaySelector(!showDaySelector)}
                      className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg"
                    >
                      <span className="text-sm">{selectedDay ? 'Viewing different day' : 'Today'}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {showDaySelector && (
                      <div className="absolute top-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10 min-w-[200px]">
                        {days.map(day => (
                          <button
                            key={day}
                            onClick={() => {
                              setSelectedDay(day === currentDay ? null : day);
                              setShowDaySelector(false);
                            }}
                            className={`w-full text-left px-4 py-2 hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg ${
                              day === currentDay ? 'text-blue-400' : ''
                            } ${day === displayDay ? 'bg-slate-700' : ''}`}
                          >
                            {getDayName(day)} {day === currentDay && '(Today)'}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-slate-400 mt-1">{getDayLabel(displayDay)}</p>
                {displayDay !== 'sunday' && (
                  <div className="flex gap-4 mt-2 text-sm">
                    <span className="text-blue-400">• {totalSetsToday} exercises</span>
                    <span className="text-green-400">• {absExercises} ab exercises</span>
                    {cardioExercises > 0 && <span className="text-orange-400">• {cardioExercises} cardio</span>}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowHistoryModal(true)}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
                >
                  <History className="w-5 h-5" />
                  History
                </button>
                <button 
                  onClick={() => setShowAIChat(true)} 
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 py-2 rounded-lg"
                >
                  <MessageSquare className="w-5 h-5" />
                  AI Coach
                </button>
              </div>
            </div>

            {displayDay === 'sunday' ? (
              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 text-center">
                <h3 className="text-xl font-semibold mb-4">Rest & Recovery Day</h3>
                <p className="text-slate-400">Your muscles grow during rest. Take it easy today!</p>
                <p className="text-sm text-slate-500 mt-2">Light walking, stretching, or foam rolling recommended</p>
              </div>
            ) : (
              <>
                {todayWorkout.map((workout, idx) => {
                  const exercise = getExerciseById(workout.exerciseId);
                  if (!exercise) return null;
                  const history = workoutHistory[workout.exerciseId] || [];
                  const lastSession = history[history.length - 1];
                  const isCardio = workout.isCardio || exercise.primary === 'Cardio';

                  return (
                    <div key={idx} className={`bg-slate-800/50 rounded-xl p-6 border ${isCardio ? 'border-orange-600/30 bg-orange-900/10' : 'border-slate-700'}`}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className={`text-xl font-semibold ${isCardio ? 'text-orange-400' : 'text-blue-400'}`}>
                              {exercise.name}
                            </h3>
                            {workout.note && (
                              <span className="bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs font-bold">
                                {workout.note}
                              </span>
                            )}
                            {isCardio && (
                              <span className="bg-orange-600/20 text-orange-400 px-2 py-1 rounded text-xs font-bold">
                                CARDIO
                              </span>
                            )}
                          </div>
                          <div className="flex gap-4 text-sm text-slate-400 mt-1">
                            <span>{exercise.equipment}</span>
                            <span>•</span>
                            <span>{workout.targetSets} sets x {workout.targetReps}</span>
                            {exercise.duration && <span>• {exercise.duration}</span>}
                          </div>
                          {lastSession && !isCardio && (
                            <div className="text-sm text-green-400 mt-1">
                              Last: {lastSession.weight}lbs x {lastSession.reps} reps
                            </div>
                          )}
                        </div>
                        {!isCardio && (
                          <div className="flex gap-2">
                            <button 
                              onClick={() => { setSwapExerciseId(workout.exerciseId); setShowSwapModal(true); }} 
                              className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
                            >
                              <RefreshCw className="w-5 h-5" />
                            </button>
                            <button 
                              onClick={() => { setSelectedExercise(workout.exerciseId); setShowAIChat(true); }} 
                              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                            >
                              <Zap className="w-5 h-5" />
                            </button>
                          </div>
                        )}
                      </div>
                      {!isCardio ? (
                        <div className="space-y-2">
                          {[...Array(workout.targetSets)].map((_, setIdx) => {
                            const setNumber = setIdx + 1;
                            const loggedData = todayLoggedSets[`${workout.exerciseId}_${setNumber}`];
                            return (
                              <SetLogger 
                                key={setIdx} 
                                setNumber={setNumber} 
                                onLog={(data) => logSet(workout.exerciseId, setNumber, data)} 
                                onEdit={(data) => editSet(workout.exerciseId, setNumber, data)}
                                loggedData={loggedData}
                              />
                            );
                          })}
                        </div>
                      ) : (
                        <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                          <p className="text-slate-300 font-medium">{exercise.duration || workout.targetReps}</p>
                          <p className="text-sm text-slate-400 mt-1">Complete after strength training</p>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="bg-slate-800/50 rounded-xl p-6 border border-green-600/30">
                  <button
                    onClick={completeWorkout}
                    className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2"
                  >
                    <Check className="w-6 h-6" />
                    Complete Workout
                  </button>
                  <p className="text-sm text-slate-400 text-center mt-3">
                    Click to mark this workout as complete (even if you didn't finish all exercises)
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'health' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Health Dashboard</h2>
                <p className="text-slate-400 mt-2">Apple Health + Oura Ring Integration</p>
                {lastHealthUpdate && (
                  <p className="text-xs text-slate-500 mt-1">Last updated: {getTimeSinceUpdate()}</p>
                )}
              </div>
              <button
                onClick={fetchHealthData}
                disabled={refreshingHealth}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 rounded-lg"
              >
                <RefreshCw className={`w-5 h-5 ${refreshingHealth ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            {!healthData ? (
              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 text-center">
                <Activity className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Connect Apple Health</h3>
                <p className="text-slate-400">
                  Enable Apple Health access to see weight tracking, sleep data, HRV, readiness scores, and training recommendations.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-semibold">Weight Progress</h3>
                  </div>
                  <div className="text-3xl font-bold mb-2">{healthData.weight.current} lbs</div>
                  <p className="text-sm text-slate-400">Target: 160 lbs (+8 lbs to go)</p>
                  <p className="text-sm text-green-400 mt-1">Trend: {healthData.weight.trend}</p>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-6 h-6 text-green-400" />
                    <h3 className="text-xl font-semibold">Readiness Score</h3>
                  </div>
                  <div className="text-3xl font-bold mb-2 text-green-400">{healthData.readiness.score}%</div>
                  <p className="text-sm text-slate-400">Status: {healthData.readiness.status}</p>
                  {recommendation && (
                    <p className={`text-sm mt-2 ${recommendation.color}`}>
                      {recommendation.icon} {recommendation.message}
                    </p>
                  )}
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Moon className="w-6 h-6 text-indigo-400" />
                    <h3 className="text-xl font-semibold">Sleep Quality</h3>
                  </div>
                  <div className="text-3xl font-bold mb-2">{healthData.sleep.hours} hrs</div>
                  <p className="text-sm text-slate-400">Quality: {healthData.sleep.quality}</p>
                  <p className="text-xs text-slate-500 mt-1">From Oura Ring via Apple Health</p>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-6 h-6 text-red-400" />
                    <h3 className="text-xl font-semibold">HRV</h3>
                  </div>
                  <div className="text-3xl font-bold mb-2">{healthData.hrv.value} ms</div>
                  <p className="text-sm text-slate-400">Status: {healthData.hrv.status}</p>
                  <p className="text-xs text-slate-500 mt-1">Recovery indicator</p>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-6 h-6 text-purple-400" />
                    <h3 className="text-xl font-semibold">Resting HR</h3>
                  </div>
                  <div className="text-3xl font-bold mb-2">{healthData.restingHR.value} bpm</div>
                  <p className="text-sm text-slate-400">Status: {healthData.restingHR.status}</p>
                  <p className="text-xs text-slate-500 mt-1">Fitness indicator</p>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Thermometer className="w-6 h-6 text-orange-400" />
                    <h3 className="text-xl font-semibold">Body Temp</h3>
                  </div>
                  <div className="text-3xl font-bold mb-2">{healthData.bodyTemp.value}°F</div>
                  <p className="text-sm text-slate-400">
                    Deviation: {healthData.bodyTemp.deviation > 0 ? '+' : ''}{healthData.bodyTemp.deviation}°F
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Overtraining detection</p>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Footprints className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-xl font-semibold">Steps Today</h3>
                  </div>
                  <div className="text-3xl font-bold mb-2">{healthData.steps.today.toLocaleString()}</div>
                  <p className="text-sm text-slate-400">Goal: {healthData.steps.goal.toLocaleString()}</p>
                  <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                    <div 
                      className="bg-cyan-400 h-2 rounded-full" 
                      style={{ width: `${Math.min((healthData.steps.today / healthData.steps.goal) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <div className="flex items-center gap-2 mb-4">
                    <Flame className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-xl font-semibold">Active Calories</h3>
                  </div>
                  <div className="text-3xl font-bold mb-2">{healthData.activeCalories.today}</div>
                  <p className="text-sm text-slate-400">Goal: {healthData.activeCalories.goal}</p>
                  <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ width: `${Math.min((healthData.activeCalories.today / healthData.activeCalories.goal) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'week' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Weekly Split - Transformation Program</h2>
              <p className="text-slate-400 mt-2">High-volume 6-day split • Abs every day • Cardio 3x/week</p>
            </div>
            <div className="grid gap-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                const dayLower = day.toLowerCase();
                const workout = WORKOUT_TEMPLATES[dayLower] || [];
                const isToday = dayLower === currentDay;
                const absCount = workout.filter(w => {
                  const ex = getExerciseById(w.exerciseId);
                  return ex && ex.primary === 'Abs';
                }).length;
                const cardioCount = workout.filter(w => w.isCardio).length;

                return (
                  <div 
                    key={day} 
                    className={`bg-slate-800/50 rounded-xl p-6 border ${
                      isToday ? 'border-blue-500' : 'border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-semibold">
                            {day}
                            {isToday && <span className="ml-3 text-sm bg-blue-600 px-2 py-1 rounded">Today</span>}
                          </h3>
                        </div>
                        <p className="text-slate-400 mt-1">{getDayLabel(dayLower)}</p>
                        {workout.length > 0 && (
                          <div className="flex gap-3 mt-2 text-sm">
                            <span className="text-blue-400">{workout.length} exercises</span>
                            {absCount > 0 && <span className="text-green-400">{absCount} abs</span>}
                            {cardioCount > 0 && <span className="text-orange-400">{cardioCount} cardio</span>}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {workout.length === 0 ? (
                      <div className="mt-4 bg-slate-700/30 rounded-lg p-4 text-center">
                        <p className="text-slate-400">Rest and recovery day</p>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedDay(dayLower === currentDay ? null : dayLower);
                          setActiveTab('today');
                        }}
                        className="text-sm text-blue-400 hover:text-blue-300 mt-2"
                      >
                        View full workout →
                      </button>
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
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                <p className="text-slate-400 text-sm mb-1">Current Weight</p>
                <p className="text-3xl font-bold text-purple-400">
                  {healthData ? `${healthData.weight.current} lbs` : '-- lbs'}
                </p>
              </div>
            </div>

            {todayWorkout.filter(w => !w.isCardio && getProgressData(w.exerciseId).length > 0).length === 0 && (
              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 text-center">
                <p className="text-slate-400">No workout data yet. Start logging to track your progress!</p>
              </div>
            )}
            
            {todayWorkout.filter(w => !w.isCardio && getProgressData(w.exerciseId).length > 0).map(workout => {
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
                        {allHistory.length} sets logged
                        {improvement > 0 && <span className="text-green-400 ml-2">+{improvement}% strength gain 💪</span>}
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
                      <span className="text-slate-400">Volume</span>
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
              <p className="text-slate-400 mt-1">All exercises in your transformation program</p>
            </div>
            {Object.entries(EXERCISE_LIBRARY).map(([category, exercises]) => (
              <div key={category} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-semibold capitalize mb-2 text-blue-400">
                  {category} ({exercises.length} exercises)
                </h3>
                <div className="grid gap-3 mt-4">
                  {exercises.map(exercise => (
                    <button 
                      key={exercise.id} 
                      onClick={() => setSelectedLibraryExercise(exercise)} 
                      className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition-colors text-left"
                    >
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

      {showHistoryModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden border border-slate-700">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-bold">Workout History</h3>
              <button onClick={() => setShowHistoryModal(false)} className="p-2 hover:bg-slate-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <p className="text-sm text-slate-400 mb-4">All your logged sets and workouts</p>
              <div className="space-y-3">
                {getAllHistoricalData().slice(0, 50).map((entry, idx) => (
                  <div key={idx} className="bg-slate-700/30 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{entry.exerciseName}</p>
                        <p className="text-sm text-slate-400">{entry.primary}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{entry.weight} lbs × {entry.reps} reps</p>
                        <p className="text-xs text-slate-500">{new Date(entry.timestamp || entry.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {getAllHistoricalData().length === 0 && (
                  <p className="text-slate-400 text-center py-8">No history yet. Start logging workouts!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showSwapModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-slate-700">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-bold">Swap Exercise</h3>
              <button onClick={() => setShowSwapModal(false)} className="p-2 hover:bg-slate-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid gap-3">
                {getSimilarExercises(swapExerciseId).map(exercise => (
                  <button 
                    key={exercise.id} 
                    onClick={() => setShowSwapModal(false)} 
                    className="bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition-colors text-left"
                  >
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
                <div>
                  <h3 className="text-xl font-bold">AI Transformation Coach</h3>
                  <p className="text-xs text-slate-400">Powered by your health data</p>
                </div>
              </div>
              <button onClick={() => setShowAIChat(false)} className="p-2 hover:bg-slate-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {aiMessages.length === 0 && (
                <div className="text-center text-slate-400 mt-8">
                  <p className="mb-4">Ask me about the transformation program or your recovery!</p>
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
                <input 
                  type="text" 
                  value={aiInput} 
                  onChange={(e) => setAiInput(e.target.value)} 
                  onKeyPress={(e) => e.key === 'Enter' && sendAIMessage()} 
                  placeholder="Ask about the program, recovery, nutrition..." 
                  className="flex-1 bg-slate-700 rounded-lg px-4 py-3" 
                />
                <button onClick={sendAIMessage} className="bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-3">
                  Send
                </button>
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
            <div className="p-6">
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
