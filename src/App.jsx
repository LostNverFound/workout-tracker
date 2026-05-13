import React, { useState, useEffect } from 'react';
import { Dumbbell, TrendingUp, Library, Calendar, Plus, Check, RefreshCw, Zap, MessageSquare, X, CalendarDays, Activity, Heart, Moon, Thermometer, Footprints, Flame, Target, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const MILESTONE_DATE = new Date('2025-11-14'); // Your next milestone

const EXERCISE_LIBRARY = {
  chest: [
    { id: 1, name: 'Barbell Bench Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Chest', secondary: 'Triceps, Shoulders', description: 'King of chest exercises - focus on progressive overload.' },
    { id: 2, name: 'Incline Barbell Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Upper Chest', secondary: 'Shoulders, Triceps', description: 'Build upper chest thickness.' },
    { id: 3, name: 'Dumbbell Bench Press', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Chest', secondary: 'Triceps, Shoulders', description: 'Greater range of motion.' },
    { id: 4, name: 'Incline Dumbbell Press', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Upper Chest', secondary: 'Shoulders, Triceps', description: 'Target upper pecs with dumbbells.' },
    { id: 5, name: 'Dumbbell Flyes', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Chest', secondary: 'None', description: 'Chest isolation and stretch.' },
    { id: 6, name: 'Cable Flyes', equipment: 'Cable', difficulty: 'Beginner', primary: 'Chest', secondary: 'None', description: 'Constant tension on chest.' },
    { id: 7, name: 'Dips', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Chest', secondary: 'Triceps', description: 'Lower chest builder.' },
    { id: 8, name: 'Push-ups', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Chest', secondary: 'Triceps, Shoulders', description: 'Bodyweight chest burnout.' },
  ],
  back: [
    { id: 11, name: 'Deadlift', equipment: 'Barbell', difficulty: 'Advanced', primary: 'Back', secondary: 'Hamstrings, Glutes', description: 'Ultimate strength and mass builder.' },
    { id: 12, name: 'Pull-ups', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Lats', secondary: 'Biceps', description: 'Build back width.' },
    { id: 13, name: 'Bent-Over Barbell Row', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Back', secondary: 'Biceps', description: 'Back thickness builder.' },
    { id: 14, name: 'T-Bar Row', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Back', secondary: 'Biceps', description: 'Mid-back mass.' },
    { id: 15, name: 'Lat Pulldown', equipment: 'Cable', difficulty: 'Beginner', primary: 'Lats', secondary: 'Biceps', description: 'Pull-up alternative.' },
    { id: 16, name: 'Seated Cable Row', equipment: 'Cable', difficulty: 'Beginner', primary: 'Back', secondary: 'Biceps', description: 'Mid-back developer.' },
    { id: 17, name: 'Single-Arm Dumbbell Row', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Back', secondary: 'Biceps', description: 'Unilateral back work.' },
    { id: 18, name: 'Face Pulls', equipment: 'Cable', difficulty: 'Beginner', primary: 'Rear Delts', secondary: 'Upper Back', description: 'Shoulder health and rear delts.' },
  ],
  legs: [
    { id: 21, name: 'Barbell Squat', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Quads', secondary: 'Glutes, Hamstrings', description: 'King of leg exercises.' },
    { id: 22, name: 'Front Squat', equipment: 'Barbell', difficulty: 'Advanced', primary: 'Quads', secondary: 'Core', description: 'Quad-focused squat.' },
    { id: 23, name: 'Romanian Deadlift', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Hamstrings', secondary: 'Glutes, Lower Back', description: 'Hamstring and glute builder.' },
    { id: 24, name: 'Leg Press', equipment: 'Machine', difficulty: 'Beginner', primary: 'Quads', secondary: 'Glutes', description: 'Heavy leg loading.' },
    { id: 25, name: 'Leg Curl', equipment: 'Machine', difficulty: 'Beginner', primary: 'Hamstrings', secondary: 'None', description: 'Hamstring isolation.' },
    { id: 26, name: 'Leg Extension', equipment: 'Machine', difficulty: 'Beginner', primary: 'Quads', secondary: 'None', description: 'Quad isolation.' },
    { id: 27, name: 'Walking Lunges', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Quads', secondary: 'Glutes', description: 'Unilateral leg work.' },
    { id: 28, name: 'Bulgarian Split Squat', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Quads', secondary: 'Glutes', description: 'Single leg strength.' },
    { id: 29, name: 'Hip Thrusts', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Glutes', secondary: 'Hamstrings', description: 'Best glute builder.' },
    { id: 30, name: 'Calf Raises', equipment: 'Machine', difficulty: 'Beginner', primary: 'Calves', secondary: 'None', description: 'Calf development.' },
  ],
  shoulders: [
    { id: 31, name: 'Overhead Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Shoulders', secondary: 'Triceps', description: 'Shoulder mass builder.' },
    { id: 32, name: 'Dumbbell Shoulder Press', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Shoulders', secondary: 'Triceps', description: 'Natural pressing movement.' },
    { id: 33, name: 'Lateral Raises', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Side Delts', secondary: 'None', description: 'Build shoulder width.' },
    { id: 34, name: 'Cable Lateral Raises', equipment: 'Cable', difficulty: 'Beginner', primary: 'Side Delts', secondary: 'None', description: 'Constant tension laterals.' },
    { id: 35, name: 'Rear Delt Flyes', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Rear Delts', secondary: 'None', description: 'Rear delt isolation.' },
    { id: 36, name: 'Arnold Press', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Shoulders', secondary: 'Triceps', description: 'Full delt development.' },
    { id: 37, name: 'Front Raises', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Front Delts', secondary: 'None', description: 'Front delt focus.' },
  ],
  arms: [
    { id: 41, name: 'Barbell Curl', equipment: 'Barbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'None', description: 'Classic bicep builder.' },
    { id: 42, name: 'Dumbbell Curl', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'None', description: 'Bicep isolation.' },
    { id: 43, name: 'Hammer Curl', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'Forearms', description: 'Arm thickness.' },
    { id: 44, name: 'Preacher Curl', equipment: 'Barbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'None', description: 'Bicep peak development.' },
    { id: 45, name: 'Cable Curl', equipment: 'Cable', difficulty: 'Beginner', primary: 'Biceps', secondary: 'None', description: 'Constant tension biceps.' },
    { id: 46, name: 'Tricep Pushdown', equipment: 'Cable', difficulty: 'Beginner', primary: 'Triceps', secondary: 'None', description: 'Tricep isolation.' },
    { id: 47, name: 'Overhead Tricep Extension', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Triceps', secondary: 'None', description: 'Long head focus.' },
    { id: 48, name: 'Skull Crushers', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Triceps', secondary: 'None', description: 'Tricep mass builder.' },
    { id: 49, name: 'Rope Pushdown', equipment: 'Cable', difficulty: 'Beginner', primary: 'Triceps', secondary: 'None', description: 'Tricep isolation with rope.' },
    { id: 50, name: 'Close-Grip Bench Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Triceps', secondary: 'Chest', description: 'Compound tricep movement.' },
  ],
  abs: [
    { id: 51, name: 'Planks', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Core', secondary: 'None', description: 'Core foundation.' },
    { id: 52, name: 'Cable Crunches', equipment: 'Cable', difficulty: 'Intermediate', primary: 'Abs', secondary: 'None', description: 'Weighted abs.' },
    { id: 53, name: 'Bicycle Crunches', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Abs', secondary: 'Obliques', description: 'Full core work.' },
    { id: 54, name: 'Russian Twists', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Obliques', secondary: 'Abs', description: 'Rotational strength.' },
    { id: 55, name: 'Leg Raises', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Lower Abs', secondary: 'Hip Flexors', description: 'Lower ab focus.' },
    { id: 56, name: 'Hanging Leg Raises', equipment: 'Bodyweight', difficulty: 'Advanced', primary: 'Lower Abs', secondary: 'Hip Flexors', description: 'Advanced lower abs.' },
    { id: 57, name: 'Ab Wheel Rollout', equipment: 'Equipment', difficulty: 'Advanced', primary: 'Core', secondary: 'Shoulders', description: 'Elite core builder.' },
  ],
};

const WORKOUT_TEMPLATES = {
  monday: [ // CHEST + TRICEPS
    { exerciseId: 1, targetSets: 4, targetReps: '6-8' },
    { exerciseId: 2, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 3, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 5, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 6, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 50, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 46, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 47, targetSets: 3, targetReps: '12-15' },
    { exerciseId: 49, targetSets: 3, targetReps: '15-20' },
  ],
  tuesday: [ // BACK + BICEPS
    { exerciseId: 11, targetSets: 4, targetReps: '5-6' },
    { exerciseId: 12, targetSets: 4, targetReps: '6-10' },
    { exerciseId: 13, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 16, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 15, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 18, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 41, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 43, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 44, targetSets: 3, targetReps: '12-15' },
  ],
  wednesday: [ // LEGS (Quad Focus)
    { exerciseId: 21, targetSets: 5, targetReps: '6-8' },
    { exerciseId: 22, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 24, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 26, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 27, targetSets: 3, targetReps: '12 each' },
    { exerciseId: 30, targetSets: 4, targetReps: '15-20' },
  ],
  thursday: [ // SHOULDERS + ABS
    { exerciseId: 31, targetSets: 4, targetReps: '6-8' },
    { exerciseId: 32, targetSets: 4, targetReps: '8-10' },
    { exerciseId: 33, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 34, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 35, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 36, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 52, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 55, targetSets: 4, targetReps: '15-20' },
    { exerciseId: 51, targetSets: 3, targetReps: '60s' },
  ],
  friday: [ // CHEST + BACK (Volume Day)
    { exerciseId: 4, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 7, targetSets: 3, targetReps: '10-12' },
    { exerciseId: 6, targetSets: 4, targetReps: '15' },
    { exerciseId: 14, targetSets: 4, targetReps: '10-12' },
    { exerciseId: 17, targetSets: 4, targetReps: '10-12 each' },
    { exerciseId: 15, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 18, targetSets: 4, targetReps: '20' },
  ],
  saturday: [ // LEGS (Hamstring/Glute Focus)
    { exerciseId: 23, targetSets: 5, targetReps: '8-10' },
    { exerciseId: 29, targetSets: 5, targetReps: '10-12' },
    { exerciseId: 25, targetSets: 4, targetReps: '12-15' },
    { exerciseId: 28, targetSets: 4, targetReps: '10 each' },
    { exerciseId: 24, targetSets: 3, targetReps: '15-20' },
    { exerciseId: 30, targetSets: 4, targetReps: '20' },
    { exerciseId: 53, targetSets: 3, targetReps: '25' },
    { exerciseId: 54, targetSets: 3, targetReps: '25' },
  ],
  sunday: [], // REST DAY
};

const SetLogger = ({ setNumber, onLog, previousWeight, previousReps, loggedData }) => {
  const [weight, setWeight] = useState(loggedData?.weight?.toString() || previousWeight || '');
  const [reps, setReps] = useState(loggedData?.reps?.toString() || '');
  const [logged, setLogged] = useState(!!loggedData);

  const handleLog = () => {
    if (weight && reps) {
      onLog({ weight: parseFloat(weight), reps: parseInt(reps) });
      setLogged(true);
      setTimeout(() => setLogged(false), 1500);
    }
  };

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
        onClick={handleLog} 
        className={`ml-auto p-2 rounded-lg transition-all ${logged ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {logged ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
      </button>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [healthData, setHealthData] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(true);
  
  const [workoutHistory, setWorkoutHistory] = useState(() => {
    const saved = localStorage.getItem('workoutHistory');
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

  const getDaysUntilMilestone = () => {
    const today = new Date();
    const diffTime = MILESTONE_DATE - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDayOfWeek = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date().getDay()];
  };

  const currentDay = getDayOfWeek();
  const todayWorkout = WORKOUT_TEMPLATES[currentDay] || [];
  const daysUntilMilestone = getDaysUntilMilestone();

  // Fetch Apple Health data on mount
  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        // This would use the health_query_v0 tool in a real implementation
        // For now, showing the structure
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
        setLoadingHealth(false);
      } catch (error) {
        console.error('Error fetching health data:', error);
        setLoadingHealth(false);
      }
    };

    fetchHealthData();
  }, []);

  useEffect(() => {
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
  }, [workoutHistory]);

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
      [exerciseId]: [...history, { ...setData, date, setNumber }] 
    });
    
    const key = `${exerciseId}_${setNumber}`;
    setTodayLoggedSets({
      ...todayLoggedSets,
      [key]: setData
    });
  };

  const getSimilarExercises = (exerciseId) => {
    const exercise = getExerciseById(exerciseId);
    if (!exercise) return [];
    return getAllExercises()
      .filter(ex => ex.id !== exerciseId && (ex.primary === exercise.primary || ex.secondary.includes(exercise.primary)))
      .slice(0, 10);
  };

  const getTrainingRecommendation = () => {
    if (!healthData) return null;
    
    const { readiness, hrv, sleep, restingHR } = healthData;
    
    if (readiness.score >= 85) {
      return {
        type: 'optimal',
        message: 'Perfect day for heavy training! Your recovery is excellent.',
        icon: '💪',
        color: 'text-green-400'
      };
    } else if (readiness.score >= 70) {
      return {
        type: 'good',
        message: 'Good recovery. Train as planned, listen to your body.',
        icon: '👍',
        color: 'text-blue-400'
      };
    } else if (readiness.score >= 50) {
      return {
        type: 'moderate',
        message: 'Recovery is moderate. Consider lighter weights or reducing volume.',
        icon: '⚠️',
        color: 'text-yellow-400'
      };
    } else {
      return {
        type: 'low',
        message: 'Low recovery. Consider a rest day or very light active recovery.',
        icon: '🛑',
        color: 'text-red-400'
      };
    }
  };

  const getAIResponse = (message) => {
    const lowerMsg = message.toLowerCase();
    const exercise = selectedExercise ? getExerciseById(selectedExercise) : null;
    const recommendation = getTrainingRecommendation();
    
    if (lowerMsg.includes('recovery') || lowerMsg.includes('readiness') || lowerMsg.includes('train today')) {
      if (!healthData) return 'Connect your Apple Health to see recovery metrics and training recommendations!';
      
      return `Recovery Analysis:\n\n${recommendation.icon} ${recommendation.message}\n\n**Your Metrics:**\n• Readiness: ${healthData.readiness.score}%\n• HRV: ${healthData.hrv.value}ms (${healthData.hrv.status})\n• Sleep: ${healthData.sleep.hours} hours (${healthData.sleep.quality})\n• Resting HR: ${healthData.restingHR.value} bpm (${healthData.restingHR.status})\n\n**What This Means:**\n${healthData.readiness.score >= 85 ? '• Your body is fully recovered\n• Perfect for hitting PRs\n• Go heavy and push hard' : ''}\n${healthData.readiness.score >= 70 && healthData.readiness.score < 85 ? '• Decent recovery\n• Train as planned\n• Don\'t push beyond RPE 9' : ''}\n${healthData.readiness.score < 70 ? '• Body needs more recovery\n• Reduce weight by 10-20%\n• Focus on technique' : ''}\n\nListen to your body!`;
    }
    
    if (lowerMsg.includes('weight') && lowerMsg.includes('track')) {
      if (!healthData) return 'Connect Apple Health to track your weight automatically!';
      return `Weight Tracking:\n\n**Current:** ${healthData.weight.current} lbs\n**Trend:** ${healthData.weight.trend}\n\n**Goal Timeline:**\n• Target: 160 lbs\n• To gain: +8 lbs\n• Timeframe: 12-16 weeks\n• Rate: 0.5-0.75 lbs/week\n\n**Bulk Strategy:**\n• Eat +500 calories daily\n• 1g protein per lb bodyweight\n• Track weight every morning\n• Adjust if gaining too fast/slow\n\nYour Apple Health syncs weight automatically!`;
    }
    
    if (lowerMsg.includes('sleep') || lowerMsg.includes('oura')) {
      if (!healthData) return 'Connect your Oura Ring (via Apple Health) to see sleep data!';
      return `Sleep & Recovery:\n\n**Last Night:**\n• ${healthData.sleep.hours} hours total\n• Quality: ${healthData.sleep.quality}\n• Body Temp: ${healthData.bodyTemp.value}°F (${healthData.bodyTemp.deviation > 0 ? '+' : ''}${healthData.bodyTemp.deviation}°F deviation)\n\n**Sleep Tips:**\n• Aim for 7-9 hours nightly\n• Keep room cool (65-68°F)\n• Consistent bedtime\n• No caffeine after 2 PM\n• Oura tracks all this automatically!\n\n**Recovery Priority:**\nSleep > Nutrition > Training\nYour muscles grow during sleep!`;
    }
    
    if (lowerMsg.includes('form') || lowerMsg.includes('technique')) {
      if (exercise) {
        return `Form for ${exercise.name}:\n\n• Keep core tight and engaged\n• Control the weight - no momentum\n• Full range of motion\n• Squeeze at peak contraction\n• Breathe: exhale on exertion\n\n${exercise.primary === 'Chest' ? '• Retract shoulder blades\n• Elbows at 45 degrees\n• Lower until stretch' : ''}\n${exercise.primary === 'Back' ? '• Pull with back, not arms\n• Squeeze shoulder blades\n• Keep chest up' : ''}\n${exercise.primary === 'Shoulders' ? '• Press straight up\n• Don\'t arch lower back\n• Full lockout at top' : ''}\n${exercise.primary === 'Legs' ? '• Drive through heels\n• Knees track over toes\n• Keep back neutral' : ''}\n\nPerfect form = better gains!`;
      }
      return 'Click the lightning bolt next to an exercise to ask about its form!';
    }
    
    return `AI Fitness Coach:\n\n📊 Recovery Analysis\n🏋️ Training Recommendations\n⚖️ Weight Tracking Insights\n💤 Sleep & Recovery Tips\n📈 Progress Tracking\n🎯 Goal Setting\n\n${healthData ? `Today's Recommendation:\n${getTrainingRecommendation().icon} ${getTrainingRecommendation().message}` : 'Connect Apple Health for personalized insights!'}\n\nAsk me:\n• "Should I train hard today?"\n• "How's my recovery?"\n• "Weight tracking progress?"\n• "Sleep tips?"`;
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
    const dayMap = {
      'Monday': 'monday',
      'Tuesday': 'tuesday', 
      'Wednesday': 'wednesday',
      'Thursday': 'thursday',
      'Friday': 'friday',
      'Saturday': 'saturday',
      'Sunday': 'sunday'
    };
    return days.map(day => ({ 
      day, 
      workout: WORKOUT_TEMPLATES[dayMap[day]] || [],
      isToday: day.toLowerCase() === currentDay 
    }));
  };

  const getDayLabel = (day) => {
    const labels = {
      monday: 'Chest + Triceps',
      tuesday: 'Back + Biceps',
      wednesday: 'Legs (Quad Focus)',
      thursday: 'Shoulders + Abs',
      friday: 'Chest + Back Volume',
      saturday: 'Legs (Ham/Glute Focus)',
      sunday: 'REST & RECOVERY'
    };
    return labels[day] || '';
  };

  const recommendation = getTrainingRecommendation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="bg-slate-800/50 border-b border-slate-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Dumbbell className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold">Workout Tracker</h1>
              <p className="text-xs text-slate-400">6-Day Split with Health Integration</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
            {healthData && recommendation && (
              <div className={`text-xs font-semibold mt-1 ${recommendation.color}`}>
                {recommendation.icon} {recommendation.type.toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Health Metrics Dashboard */}
      {healthData && activeTab === 'today' && (
        <div className="bg-slate-800/30 border-b border-slate-700 px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-slate-400">Weight</span>
                </div>
                <p className="text-lg font-bold">{healthData.weight.current} lbs</p>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-slate-400">Readiness</span>
                </div>
                <p className="text-lg font-bold text-green-400">{healthData.readiness.score}%</p>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-xs text-slate-400">HRV</span>
                </div>
                <p className="text-lg font-bold">{healthData.hrv.value} ms</p>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-slate-400">Resting HR</span>
                </div>
                <p className="text-lg font-bold">{healthData.restingHR.value} bpm</p>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <Moon className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs text-slate-400">Sleep</span>
                </div>
                <p className="text-lg font-bold">{healthData.sleep.hours} hrs</p>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <Thermometer className="w-4 h-4 text-orange-400" />
                  <span className="text-xs text-slate-400">Temp</span>
                </div>
                <p className="text-lg font-bold">{healthData.bodyTemp.value}°F</p>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <Footprints className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-slate-400">Steps</span>
                </div>
                <p className="text-lg font-bold">{healthData.steps.today.toLocaleString()}</p>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-slate-400">Active Cal</span>
                </div>
                <p className="text-lg font-bold">{healthData.activeCalories.today}</p>
              </div>
            </div>
            
            {recommendation && (
              <div className={`mt-3 p-3 rounded-lg border ${
                recommendation.type === 'optimal' ? 'bg-green-900/20 border-green-600/30' :
                recommendation.type === 'good' ? 'bg-blue-900/20 border-blue-600/30' :
                recommendation.type === 'moderate' ? 'bg-yellow-900/20 border-yellow-600/30' :
                'bg-red-900/20 border-red-600/30'
              }`}>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <p className={`text-sm font-medium ${recommendation.color}`}>
                    {recommendation.message}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold">{currentDay.charAt(0).toUpperCase() + currentDay.slice(1)}'s Workout</h2>
                <p className="text-slate-400 mt-1">{getDayLabel(currentDay)}</p>
                <p className="text-sm text-green-400 mt-1">
                  {todayWorkout.length > 0 ? `${todayWorkout.length} exercises • High volume` : 'Rest day - recovery'}
                </p>
              </div>
              <button 
                onClick={() => setShowAIChat(true)} 
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 py-2 rounded-lg"
              >
                <MessageSquare className="w-5 h-5" />
                AI Coach
              </button>
            </div>

            {currentDay === 'sunday' ? (
              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 text-center">
                <h3 className="text-xl font-semibold mb-4">Rest & Recovery Day</h3>
                <p className="text-slate-400">Your muscles grow during rest. Take it easy today!</p>
                <p className="text-sm text-slate-500 mt-2">Light walking or stretching is fine</p>
              </div>
            ) : (
              todayWorkout.map((workout, idx) => {
                const exercise = getExerciseById(workout.exerciseId);
                if (!exercise) return null;
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
                          <span>•</span>
                          <span className="text-purple-400">{exercise.difficulty}</span>
                        </div>
                        {lastSession && (
                          <div className="text-sm text-green-400 mt-1">
                            Last: {lastSession.weight}lbs x {lastSession.reps} reps
                          </div>
                        )}
                      </div>
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
                    </div>
                    <div className="space-y-2">
                      {[...Array(workout.targetSets)].map((_, setIdx) => {
                        const setNumber = setIdx + 1;
                        const loggedData = todayLoggedSets[`${workout.exerciseId}_${setNumber}`];
                        return (
                          <SetLogger 
                            key={setIdx} 
                            setNumber={setNumber} 
                            onLog={(data) => logSet(workout.exerciseId, setNumber, data)} 
                            previousWeight={lastSession?.weight}
                            previousReps={lastSession?.reps}
                            loggedData={loggedData}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'health' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Health Dashboard</h2>
              <p className="text-slate-400 mt-2">Apple Health + Oura Ring Integration</p>
            </div>

            {!healthData ? (
              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 text-center">
                <Activity className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Connect Apple Health</h3>
                <p className="text-slate-400">
                  Enable Apple Health access to see weight tracking, sleep data, HRV, readiness scores, and personalized training recommendations.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Weight Tracking */}
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="w-6 h-6 text-blue-400" />
                      <h3 className="text-xl font-semibold">Weight Progress</h3>
                    </div>
                    <div className="text-3xl font-bold mb-2">{healthData.weight.current} lbs</div>
                    <p className="text-sm text-slate-400">Target: 160 lbs (+8 lbs to go)</p>
                    <p className="text-sm text-green-400 mt-1">Trend: {healthData.weight.trend}</p>
                  </div>

                  {/* Recovery Score */}
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

                  {/* Sleep */}
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center gap-2 mb-4">
                      <Moon className="w-6 h-6 text-indigo-400" />
                      <h3 className="text-xl font-semibold">Sleep Quality</h3>
                    </div>
                    <div className="text-3xl font-bold mb-2">{healthData.sleep.hours} hrs</div>
                    <p className="text-sm text-slate-400">Quality: {healthData.sleep.quality}</p>
                    <p className="text-xs text-slate-500 mt-1">From Oura Ring via Apple Health</p>
                  </div>

                  {/* Heart Rate Variability */}
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center gap-2 mb-4">
                      <Heart className="w-6 h-6 text-red-400" />
                      <h3 className="text-xl font-semibold">HRV</h3>
                    </div>
                    <div className="text-3xl font-bold mb-2">{healthData.hrv.value} ms</div>
                    <p className="text-sm text-slate-400">Status: {healthData.hrv.status}</p>
                    <p className="text-xs text-slate-500 mt-1">Recovery indicator</p>
                  </div>

                  {/* Resting Heart Rate */}
                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center gap-2 mb-4">
                      <Heart className="w-6 h-6 text-purple-400" />
                      <h3 className="text-xl font-semibold">Resting HR</h3>
                    </div>
                    <div className="text-3xl font-bold mb-2">{healthData.restingHR.value} bpm</div>
                    <p className="text-sm text-slate-400">Status: {healthData.restingHR.status}</p>
                    <p className="text-xs text-slate-500 mt-1">Fitness indicator</p>
                  </div>

                  {/* Body Temperature */}
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

                  {/* Steps */}
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

                  {/* Active Calories */}
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
              </>
            )}
          </div>
        )}

        {activeTab === 'week' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Weekly Split</h2>
              <p className="text-slate-400 mt-2">6-day bodybuilding program</p>
            </div>
            <div className="grid gap-4">
              {getWeekSchedule().map((schedule) => (
                <div 
                  key={schedule.day} 
                  className={`bg-slate-800/50 rounded-xl p-6 border ${
                    schedule.isToday ? 'border-blue-500' : 'border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {schedule.day}
                        {schedule.isToday && (
                          <span className="ml-3 text-sm bg-blue-600 px-2 py-1 rounded">Today</span>
                        )}
                      </h3>
                      <p className="text-slate-400 mt-1">{getDayLabel(schedule.day.toLowerCase())}</p>
                    </div>
                  </div>
                  
                  {schedule.workout.length > 0 ? (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-semibold text-blue-400 mb-3">
                        {schedule.workout.length} Exercises:
                      </p>
                      {schedule.workout.map((workout, idx) => {
                        const exercise = getExerciseById(workout.exerciseId);
                        if (!exercise) return null;
                        return (
                          <div 
                            key={idx} 
                            className="bg-slate-700/30 rounded-lg p-3 flex justify-between items-center"
                          >
                            <div>
                              <p className="font-medium text-sm">{exercise.name}</p>
                              <p className="text-xs text-slate-400">{exercise.primary}</p>
                            </div>
                            <p className="text-sm text-slate-400">
                              {workout.targetSets} × {workout.targetReps}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="mt-4 bg-slate-700/30 rounded-lg p-4 text-center">
                      <p className="text-slate-400">Rest and recovery day</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Progress</h2>
              <button
                onClick={() => {
                  if (window.confirm('Clear all workout history? This cannot be undone.')) {
                    setWorkoutHistory({});
                    localStorage.removeItem('workoutHistory');
                  }
                }}
                className="text-sm bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
              >
                Clear All Data
              </button>
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

            {todayWorkout.filter(w => getProgressData(w.exerciseId).length > 0).length === 0 && (
              <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 text-center">
                <p className="text-slate-400">No workout data yet. Start logging to track your progress!</p>
              </div>
            )}
            
            {todayWorkout.filter(w => getProgressData(w.exerciseId).length > 0).map(workout => {
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
              <p className="text-slate-400 mt-1">All exercises in your program</p>
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
                    onClick={() => {
                      setShowSwapModal(false);
                    }} 
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
                  <h3 className="text-xl font-bold">AI Fitness Coach</h3>
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
                  <p className="mb-4">Ask me about training, recovery, or your health metrics!</p>
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
                  placeholder="Ask about training, recovery, health..." 
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
