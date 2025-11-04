import React, { useState } from 'react';
import { Dumbbell, TrendingUp, Library, Calendar, Plus, Check, RefreshCw, Zap, MessageSquare, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EXERCISE_LIBRARY = {
  chest: [
    { id: 1, name: 'Barbell Bench Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Chest', secondary: 'Triceps, Shoulders', description: 'Lie on a flat bench and lower the barbell to your chest, then press it back up. Keep your shoulder blades retracted and feet planted. The king of chest exercises for building overall mass and strength.' },
    { id: 2, name: 'Dumbbell Bench Press', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Chest', secondary: 'Triceps, Shoulders', description: 'Similar to barbell bench but with dumbbells, allowing for greater range of motion and independent arm movement. Excellent for addressing muscle imbalances and achieving a deeper stretch.' },
    { id: 3, name: 'Incline Barbell Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Upper Chest', secondary: 'Shoulders, Triceps', description: 'Performed on a 30-45 degree incline bench. Targets the upper portion of the pectorals. Essential for building a full, well-rounded chest and preventing the "saggy chest" look.' },
    { id: 4, name: 'Incline Dumbbell Press', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Upper Chest', secondary: 'Shoulders, Triceps', description: 'Incline press with dumbbells for greater range of motion. Allows for natural wrist rotation and better upper chest activation. Great for muscle symmetry and definition.' },
    { id: 5, name: 'Decline Bench Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Lower Chest', secondary: 'Triceps', description: 'Performed on a decline bench (head lower than feet). Emphasizes the lower chest. Often allows you to press more weight than flat bench due to favorable mechanics.' },
    { id: 6, name: 'Dumbbell Flyes', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Chest', secondary: 'None', description: 'Isolation exercise where you arc dumbbells out to the sides with slightly bent elbows. Excellent for chest stretch and activation. Focus on the squeeze at the top and controlled negative.' },
    { id: 7, name: 'Cable Flyes', equipment: 'Cable', difficulty: 'Beginner', primary: 'Chest', secondary: 'None', description: 'Flyes performed with cables for constant tension throughout the movement. Superior pump and mind-muscle connection. Adjust cable height to target different chest regions.' },
    { id: 8, name: 'Push-ups', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Chest', secondary: 'Triceps, Core', description: 'Classic bodyweight exercise. Keep your body in a straight line and lower until chest nearly touches the ground. Can be modified with elevation or weighted vest for progression.' },
    { id: 9, name: 'Chest Dips', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Lower Chest', secondary: 'Triceps', description: 'Lean forward on parallel bars and lower yourself down, then press back up. Excellent for lower chest and overall chest mass. Add weight when bodyweight becomes easy.' },
    { id: 10, name: 'Pec Deck Machine', equipment: 'Machine', difficulty: 'Beginner', primary: 'Chest', secondary: 'None', description: 'Machine-based chest fly. Excellent for isolating the chest with minimal stabilizer involvement. Perfect for finishing sets and achieving a strong pump.' },
    { id: 101, name: 'Low Cable Flyes', equipment: 'Cable', difficulty: 'Beginner', primary: 'Upper Chest', secondary: 'None', description: 'Cable flyes performed from a low position, bringing cables up and together. Specifically targets upper chest fibers with constant tension throughout the movement.' },
    { id: 102, name: 'Landmine Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Chest', secondary: 'Shoulders, Core', description: 'Press the end of a barbell anchored in a landmine attachment. Natural arc of motion that is shoulder-friendly while still building chest strength and size.' },
  ],
  back: [
    { id: 11, name: 'Deadlift', equipment: 'Barbell', difficulty: 'Advanced', primary: 'Back', secondary: 'Hamstrings, Glutes', description: 'The ultimate full-body strength builder. Lift the barbell from the ground to hip level. Engages entire posterior chain. Master proper form before adding weight - hinge at hips, keep back neutral, and drive through heels.' },
    { id: 12, name: 'Pull-ups', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Lats', secondary: 'Biceps', description: 'Hang from a bar with overhand grip and pull yourself up until chin clears the bar. Gold standard for back width. Use assistance or negatives if you cannot do full reps yet.' },
    { id: 13, name: 'Bent-Over Barbell Row', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Back', secondary: 'Biceps', description: 'Hinge at hips and row the barbell to your lower chest/upper abs. Builds back thickness. Keep core tight and avoid using momentum - control the weight.' },
    { id: 14, name: 'Dumbbell Row', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Back', secondary: 'Biceps', description: 'One-arm row with dumbbell while bracing on bench. Excellent for unilateral strength and addressing imbalances. Pull elbow back and up, squeeze at the top.' },
    { id: 15, name: 'Lat Pulldown', equipment: 'Cable', difficulty: 'Beginner', primary: 'Lats', secondary: 'Biceps', description: 'Seated cable exercise pulling bar down to upper chest. Great pull-up alternative and lat builder. Focus on pulling with elbows, not just hands. Lean back slightly.' },
    { id: 16, name: 'Seated Cable Row', equipment: 'Cable', difficulty: 'Beginner', primary: 'Back', secondary: 'Biceps', description: 'Pull cable handle to your torso while seated. Excellent for mid-back thickness. Maintain upright posture and squeeze shoulder blades together at the end of each rep.' },
    { id: 17, name: 'T-Bar Row', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Back', secondary: 'Biceps', description: 'Row a barbell anchored at one end. Allows for heavy loading and great back thickness. Keep chest up and pull the bar toward your sternum.' },
    { id: 18, name: 'Face Pulls', equipment: 'Cable', difficulty: 'Beginner', primary: 'Rear Delts', secondary: 'Upper Back', description: 'Pull rope attachment toward your face, separating hands at the end. Essential for shoulder health and rear delt development. Pull high and apart for maximum benefit.' },
    { id: 19, name: 'Chin-ups', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Lats', secondary: 'Biceps', description: 'Like pull-ups but with underhand grip. Allows for greater bicep involvement and often more reps. Excellent for overall back development and arm growth.' },
    { id: 20, name: 'Hyperextensions', equipment: 'Machine', difficulty: 'Beginner', primary: 'Lower Back', secondary: 'Glutes', description: 'Bend at hips on hyperextension bench and raise torso back up. Strengthens lower back and prevents injury. Can be loaded with weight plate across chest.' },
    { id: 103, name: 'Pendlay Row', equipment: 'Barbell', difficulty: 'Advanced', primary: 'Back', secondary: 'Biceps', description: 'Explosive barbell row where the bar returns to the floor between each rep. Builds explosive power and back strength. Named after Olympic weightlifting coach Glenn Pendlay.' },
    { id: 104, name: 'Chest Supported Row', equipment: 'Machine', difficulty: 'Beginner', primary: 'Back', secondary: 'Biceps', description: 'Row while lying chest-down on an inclined bench. Eliminates lower back strain and allows for strict form. Perfect for isolating back muscles without fatigue.' },
    { id: 105, name: 'Straight Arm Pulldown', equipment: 'Cable', difficulty: 'Beginner', primary: 'Lats', secondary: 'None', description: 'Pull cable bar down with straight arms in an arc motion. Isolation exercise for lats. Excellent for learning to engage lats and great for finishing back workouts.' },
  ],
  legs: [
    { id: 21, name: 'Barbell Squat', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Quads', secondary: 'Glutes, Hamstrings', description: 'The king of leg exercises. Bar on upper back, squat down until thighs are parallel or below. Builds overall leg mass and strength. Keep chest up, knees tracking over toes, and drive through heels.' },
    { id: 22, name: 'Front Squat', equipment: 'Barbell', difficulty: 'Advanced', primary: 'Quads', secondary: 'Core', description: 'Bar rests on front of shoulders. More quad-dominant and core-intensive than back squat. Requires good mobility but easier on the lower back. Excellent for athletic development.' },
    { id: 23, name: 'Romanian Deadlift', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Hamstrings', secondary: 'Glutes, Lower Back', description: 'Lower barbell by pushing hips back while keeping legs relatively straight. Premier hamstring exercise. Feel the stretch in hamstrings and drive hips forward to return.' },
    { id: 24, name: 'Leg Press', equipment: 'Machine', difficulty: 'Beginner', primary: 'Quads', secondary: 'Glutes', description: 'Push platform away with feet. Allows for heavy loading without spinal compression. Great for quad development. Foot placement affects muscle emphasis - high for glutes, low for quads.' },
    { id: 25, name: 'Leg Curl', equipment: 'Machine', difficulty: 'Beginner', primary: 'Hamstrings', secondary: 'None', description: 'Curl weight up by bending knees against resistance. Direct hamstring isolation. Control the negative and avoid using momentum. Essential for balanced leg development.' },
    { id: 26, name: 'Leg Extension', equipment: 'Machine', difficulty: 'Beginner', primary: 'Quads', secondary: 'None', description: 'Extend legs against resistance from seated position. Pure quad isolation. Great for pre-exhaust or finishing exercise. Squeeze at the top for maximum activation.' },
    { id: 27, name: 'Walking Lunges', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Quads', secondary: 'Glutes', description: 'Step forward into lunge position alternating legs. Builds single-leg strength and balance. Keep torso upright and push through front heel. Excellent for athletic performance.' },
    { id: 28, name: 'Bulgarian Split Squat', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Quads', secondary: 'Glutes', description: 'Rear foot elevated on bench, lunge down on front leg. Unilateral leg builder that addresses imbalances. Challenging but extremely effective for leg development.' },
    { id: 29, name: 'Calf Raises', equipment: 'Machine', difficulty: 'Beginner', primary: 'Calves', secondary: 'None', description: 'Rise up on toes against resistance. Can be done standing or seated. Full range of motion is key - deep stretch at bottom, high rise on toes at top. Train both heavy and high rep.' },
    { id: 30, name: 'Goblet Squat', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Quads', secondary: 'Glutes', description: 'Hold dumbbell at chest and squat. Perfect for learning squat mechanics. Keeps torso upright naturally. Great warm-up or beginner exercise before progressing to barbell squats.' },
    { id: 106, name: 'Hack Squat', equipment: 'Machine', difficulty: 'Intermediate', primary: 'Quads', secondary: 'Glutes', description: 'Machine squat with back against pad. Intense quad focus with reduced lower back stress. Allows for deep range of motion and heavy loading safely.' },
    { id: 107, name: 'Nordic Curls', equipment: 'Bodyweight', difficulty: 'Advanced', primary: 'Hamstrings', secondary: 'None', description: 'Kneel with ankles anchored, lower body forward with control. Elite hamstring developer and injury prevention exercise. Use assistance if needed - very challenging.' },
    { id: 108, name: 'Hip Thrusts', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Glutes', secondary: 'Hamstrings', description: 'Upper back on bench, drive hips up with barbell across hips. The best glute builder. Squeeze glutes hard at top. Use pad for comfort with heavy weights.' },
    { id: 109, name: 'Step-ups', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Quads', secondary: 'Glutes', description: 'Step up onto elevated platform alternating legs. Functional movement that builds unilateral strength. Drive through the heel of the elevated leg.' },
    { id: 110, name: 'Sissy Squats', equipment: 'Bodyweight', difficulty: 'Advanced', primary: 'Quads', secondary: 'None', description: 'Lean back while bending knees, keeping hips extended. Intense quad isolation exercise. Requires good knee health. Excellent for developing the quad sweep.' },
  ],
  shoulders: [
    { id: 31, name: 'Overhead Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Shoulders', secondary: 'Triceps', description: 'Press barbell overhead from shoulders. The ultimate shoulder mass builder. Keep core tight and avoid excessive back arch. Can be done seated or standing.' },
    { id: 32, name: 'Dumbbell Shoulder Press', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Shoulders', secondary: 'Triceps', description: 'Press dumbbells overhead. Allows for natural shoulder movement and addresses imbalances. Can rotate palms as you press for varied stimulus.' },
    { id: 33, name: 'Lateral Raises', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Side Delts', secondary: 'None', description: 'Raise dumbbells out to sides. The key exercise for shoulder width. Use lighter weight and control - no swinging. Lead with elbows, not hands.' },
    { id: 34, name: 'Front Raises', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Front Delts', secondary: 'None', description: 'Raise dumbbells forward to shoulder height. Targets front delts. Often gets enough work from pressing, so use sparingly unless front delts are lagging.' },
    { id: 35, name: 'Rear Delt Flyes', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Rear Delts', secondary: 'None', description: 'Bent over, fly dumbbells out to sides. Essential for rear delt development and shoulder health. Most undertrained shoulder muscle - prioritize this.' },
    { id: 36, name: 'Arnold Press', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Shoulders', secondary: 'Triceps', description: 'Rotate dumbbells from front to overhead while pressing. Named after Arnold Schwarzenegger. Hits all three delt heads with more front delt emphasis.' },
    { id: 37, name: 'Cable Lateral Raises', equipment: 'Cable', difficulty: 'Beginner', primary: 'Side Delts', secondary: 'None', description: 'Lateral raises with cable for constant tension. Superior mind-muscle connection compared to dumbbells. Excellent for metabolic stress and pump.' },
    { id: 38, name: 'Upright Row', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Shoulders', secondary: 'Traps', description: 'Pull barbell up along body to chin level. Builds shoulders and traps. Use wider grip if you have shoulder issues. Stop at chest height if uncomfortable.' },
    { id: 39, name: 'Military Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Shoulders', secondary: 'Triceps', description: 'Strict standing overhead press with feet together. Classic strength movement. No leg drive - pure shoulder and tricep power. Demands excellent core stability.' },
    { id: 40, name: 'Shrugs', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Traps', secondary: 'None', description: 'Elevate shoulders straight up. Builds trap size and thickness. Hold peak contraction. Can also be done with barbell or on Smith machine.' },
    { id: 111, name: 'Viking Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Shoulders', secondary: 'Triceps', description: 'Press using a landmine or Viking press attachment. Neutral grip pressing pattern that is very shoulder-friendly. Great alternative to traditional overhead pressing.' },
    { id: 112, name: 'Lu Raises', equipment: 'Dumbbell', difficulty: 'Intermediate', primary: 'Side Delts', secondary: 'Front Delts', description: 'Lateral raise transitioning into front raise. Named after weightlifter Lu Xiaojun. Comprehensive delt exercise hitting multiple angles in one movement.' },
  ],
  arms: [
    { id: 41, name: 'Barbell Curl', equipment: 'Barbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'None', description: 'Curl barbell from thighs to shoulders. Classic bicep mass builder. Keep elbows tucked and avoid swinging. Squeeze biceps at the top of each rep.' },
    { id: 42, name: 'Dumbbell Curl', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'None', description: 'Curl dumbbells with supinated grip. Allows for full range of motion and supination at top. Can be done alternating or together.' },
    { id: 43, name: 'Hammer Curl', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'Forearms', description: 'Curl with neutral grip (palms facing each other). Targets brachialis and adds arm thickness. Also builds forearm strength.' },
    { id: 44, name: 'Preacher Curl', equipment: 'Barbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'None', description: 'Curl with upper arms braced on preacher bench. Strict form prevents cheating. Excellent bicep peak developer. Control the negative.' },
    { id: 45, name: 'Tricep Dips', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Triceps', secondary: 'Chest', description: 'Lower and raise body on parallel bars. Stay upright for tricep focus. Elite tricep mass builder. Add weight when bodyweight becomes easy.' },
    { id: 46, name: 'Tricep Pushdown', equipment: 'Cable', difficulty: 'Beginner', primary: 'Triceps', secondary: 'None', description: 'Push cable attachment down by extending elbows. Excellent tricep isolation. Try different attachments for variety. Keep elbows pinned to sides.' },
    { id: 47, name: 'Overhead Tricep Extension', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Triceps', secondary: 'None', description: 'Extend dumbbell overhead. Emphasizes long head of triceps. Keep elbows pointing forward. Great stretch at bottom position.' },
    { id: 48, name: 'Skull Crushers', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Triceps', secondary: 'None', description: 'Lower barbell to forehead/behind head while lying. Premier tricep mass builder. Use controlled tempo and moderate weight to protect elbows.' },
    { id: 49, name: 'Cable Curl', equipment: 'Cable', difficulty: 'Beginner', primary: 'Biceps', secondary: 'None', description: 'Curl with cable attachment. Constant tension throughout movement. Excellent for pump and mind-muscle connection. Great finishing exercise.' },
    { id: 50, name: 'Close-Grip Bench Press', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Triceps', secondary: 'Chest', description: 'Bench press with narrow grip. Compound tricep builder that allows heavy loading. Keep elbows tucked. One of the best overall tricep exercises.' },
    { id: 113, name: 'Concentration Curl', equipment: 'Dumbbell', difficulty: 'Beginner', primary: 'Biceps', secondary: 'None', description: 'Seated, curl one arm while bracing elbow on thigh. Maximum bicep isolation and peak contraction. Slow and controlled for best results.' },
    { id: 114, name: 'Spider Curl', equipment: 'Barbell', difficulty: 'Intermediate', primary: 'Biceps', secondary: 'None', description: 'Curl over incline bench with chest against pad. Eliminates momentum completely. Strict bicep isolation that builds peak.' },
    { id: 115, name: 'Rope Tricep Extension', equipment: 'Cable', difficulty: 'Beginner', primary: 'Triceps', secondary: 'None', description: 'Pushdown with rope attachment, separating rope at bottom. Better lateral head activation than straight bar. Excellent pump exercise.' },
    { id: 116, name: 'Diamond Push-ups', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Triceps', secondary: 'Chest', description: 'Push-ups with hands forming diamond shape. Intense tricep emphasis. Can be modified on knees if too challenging initially.' },
  ],
  abs: [
    { id: 51, name: 'Planks', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Core', secondary: 'None', description: 'Hold rigid body position on forearms and toes. Foundation of core strength. Keep body straight - no sagging or piking. Progress by adding time or weight.' },
    { id: 52, name: 'Crunches', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Abs', secondary: 'None', description: 'Lift shoulders off ground by contracting abs. Basic but effective. Focus on quality over quantity. Exhale at top and squeeze abs hard.' },
    { id: 53, name: 'Bicycle Crunches', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Abs', secondary: 'Obliques', description: 'Alternating elbow-to-opposite-knee crunch. Works entire core with oblique emphasis. Slow and controlled - no rushing through reps.' },
    { id: 54, name: 'Russian Twists', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Obliques', secondary: 'Abs', description: 'Seated rotation side to side. Add weight for progression. Great for rotational core strength. Keep torso at 45 degrees throughout.' },
    { id: 55, name: 'Leg Raises', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Lower Abs', secondary: 'Hip Flexors', description: 'Raise legs from lying position. Premier lower ab exercise. Control the descent - no dropping legs. Press lower back into floor.' },
    { id: 56, name: 'Hanging Leg Raises', equipment: 'Bodyweight', difficulty: 'Advanced', primary: 'Lower Abs', secondary: 'Hip Flexors', description: 'Raise legs while hanging from bar. Elite lower ab and grip developer. Avoid swinging. Raise knees to chest for easier variation.' },
    { id: 57, name: 'Ab Wheel Rollout', equipment: 'Equipment', difficulty: 'Advanced', primary: 'Core', secondary: 'Shoulders', description: 'Roll wheel forward and back from knees or standing. One of the most challenging core exercises. Start from knees and progress slowly.' },
    { id: 58, name: 'Mountain Climbers', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Core', secondary: 'Cardio', description: 'Alternate driving knees to chest in plank position. Dynamic core work with cardio benefit. Great for HIIT or ab finishers.' },
    { id: 59, name: 'Dead Bug', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Core', secondary: 'None', description: 'Lie on back, lower opposite arm and leg. Excellent for core stability and preventing lower back issues. Focus on keeping lower back pressed to floor.' },
    { id: 60, name: 'Cable Crunches', equipment: 'Cable', difficulty: 'Intermediate', primary: 'Abs', secondary: 'None', description: 'Crunch against cable resistance while kneeling. Allows progressive overload. Round spine and squeeze abs. One of the best weighted ab exercises.' },
    { id: 117, name: 'Side Plank', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Obliques', secondary: 'Core', description: 'Hold plank position on one forearm. Essential for oblique strength and lateral core stability. Balance time on each side.' },
    { id: 118, name: 'Hollow Body Hold', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Core', secondary: 'None', description: 'Hold curved body position with lower back pressed to floor. Gymnastics-based core exercise. Develops incredible core strength and control.' },
    { id: 119, name: 'Pallof Press', equipment: 'Cable', difficulty: 'Intermediate', primary: 'Core', secondary: 'Obliques', description: 'Press cable straight out while resisting rotation. Anti-rotation core exercise. Excellent for functional core strength and sports performance.' },
  ],
  cardio: [
    { id: 61, name: 'Treadmill Running', equipment: 'Machine', difficulty: 'Beginner', primary: 'Cardio', secondary: 'Legs', description: 'Classic cardio. Adjust speed and incline for intensity. Great for steady state or intervals. Start with moderate pace and build endurance.' },
    { id: 62, name: 'Cycling', equipment: 'Machine', difficulty: 'Beginner', primary: 'Cardio', secondary: 'Legs', description: 'Low-impact cardio excellent for active recovery. Adjust resistance for intensity. Easy on joints while building leg endurance.' },
    { id: 63, name: 'Rowing Machine', equipment: 'Machine', difficulty: 'Intermediate', primary: 'Cardio', secondary: 'Back, Legs', description: 'Full-body cardio that builds back and leg strength. Proper form is crucial - drive with legs first, then lean back, then pull with arms.' },
    { id: 64, name: 'Elliptical', equipment: 'Machine', difficulty: 'Beginner', primary: 'Cardio', secondary: 'Legs', description: 'Low-impact alternative to running. Easier on knees and joints. Good for longer duration steady state cardio sessions.' },
    { id: 65, name: 'Jump Rope', equipment: 'Equipment', difficulty: 'Intermediate', primary: 'Cardio', secondary: 'Calves', description: 'High-intensity portable cardio. Builds coordination and calf endurance. Start with short intervals and build up time.' },
    { id: 66, name: 'Stair Climber', equipment: 'Machine', difficulty: 'Intermediate', primary: 'Cardio', secondary: 'Legs, Glutes', description: 'Continuous stair climbing motion. Intense for glutes and legs. Maintain upright posture and avoid leaning on rails.' },
    { id: 67, name: 'Swimming', equipment: 'Pool', difficulty: 'Intermediate', primary: 'Cardio', secondary: 'Full Body', description: 'Total body workout with zero impact. Excellent for recovery days. Different strokes work different muscle groups.' },
    { id: 68, name: 'Battle Ropes', equipment: 'Equipment', difficulty: 'Intermediate', primary: 'Cardio', secondary: 'Arms, Core', description: 'Wave heavy ropes in various patterns. High-intensity cardio that builds shoulder endurance. Great for conditioning finishers.' },
    { id: 120, name: 'Assault Bike', equipment: 'Machine', difficulty: 'Advanced', primary: 'Cardio', secondary: 'Full Body', description: 'Fan bike with arm movement. Brutal full-body conditioning. The harder you go, the harder it gets. Elite cardio tool for interval training.' },
    { id: 121, name: 'Sled Push', equipment: 'Equipment', difficulty: 'Advanced', primary: 'Cardio', secondary: 'Legs, Core', description: 'Push weighted sled forward. Builds power and conditioning without eccentric stress. Excellent for athletic development and leg strength.' },
  ],
  hiit: [
    { id: 69, name: 'Burpees', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Full Body', secondary: 'Cardio', description: 'Drop to pushup, jump feet in, jump up. The ultimate full-body conditioning exercise. Dreaded but incredibly effective for fat loss and conditioning.' },
    { id: 70, name: 'Jump Squats', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Legs', secondary: 'Cardio', description: 'Squat down and explode up into jump. Builds explosive power and leg strength. Land softly to protect knees.' },
    { id: 71, name: 'Box Jumps', equipment: 'Equipment', difficulty: 'Intermediate', primary: 'Legs', secondary: 'Power', description: 'Jump onto elevated platform. Develops explosive leg power. Step down to minimize impact. Focus on quality over speed.' },
    { id: 72, name: 'Kettlebell Swings', equipment: 'Kettlebell', difficulty: 'Intermediate', primary: 'Glutes', secondary: 'Hamstrings, Core', description: 'Swing kettlebell from between legs to chest level. Powerful posterior chain exercise. Drive with hips, not arms. Excellent for power and conditioning.' },
    { id: 73, name: 'High Knees', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Cardio', secondary: 'Legs', description: 'Run in place bringing knees high. Simple but effective cardio move. Great for warm-ups or HIIT intervals.' },
    { id: 74, name: 'Sprints', equipment: 'None', difficulty: 'Intermediate', primary: 'Cardio', secondary: 'Legs', description: 'Maximum effort running. The most effective cardio for fat loss and speed development. Proper warm-up is essential to prevent injury.' },
    { id: 75, name: 'Slam Ball', equipment: 'Medicine Ball', difficulty: 'Intermediate', primary: 'Full Body', secondary: 'Core', description: 'Lift ball overhead and slam down forcefully. Explosive full-body movement. Great for releasing stress while building power.' },
    { id: 76, name: 'Thrusters', equipment: 'Dumbbell', difficulty: 'Advanced', primary: 'Full Body', secondary: 'Cardio', description: 'Front squat into overhead press in one motion. Brutal full-body conditioning exercise. Burns calories and builds strength simultaneously.' },
    { id: 122, name: 'Tuck Jumps', equipment: 'Bodyweight', difficulty: 'Intermediate', primary: 'Legs', secondary: 'Power', description: 'Jump and bring knees to chest mid-air. Develops explosive power and coordination. High impact - use sparingly.' },
    { id: 123, name: 'Plank Jacks', equipment: 'Bodyweight', difficulty: 'Beginner', primary: 'Core', secondary: 'Cardio', description: 'Jump feet out and in while holding plank. Combines core stability with cardio. Keep hips level throughout movement.' },
  ],
};

const DEFAULT_WORKOUT = [
  { exerciseId: 1, targetSets: 4, targetReps: '8-10' },
  { exerciseId: 3, targetSets: 4, targetReps: '10-12' },
  { exerciseId: 6, targetSets: 3, targetReps: '12-15' },
  { exerciseId: 7, targetSets: 3, targetReps: '12-15' },
  { exerciseId: 46, targetSets: 3, targetReps: '10-12' },
  { exerciseId: 47, targetSets: 3, targetReps: '10-12' },
  { exerciseId: 51, targetSets: 3, targetReps: '60s hold' },
  { exerciseId: 53, targetSets: 3, targetReps: '20' },
  { exerciseId: 61, targetSets: 1, targetReps: '20 min' },
];

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
      <input
        type="number"
        placeholder="Weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="w-24 bg-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span className="text-slate-400">lbs</span>
      <input
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className="w-20 bg-slate-700 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span className="text-slate-400">reps</span>
      <button
        onClick={handleLog}
        className={`ml-auto p-2 rounded-lg transition-all ${
          logged 
            ? 'bg-green-600' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {logged ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
      </button>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [todayWorkout, setTodayWorkout] = useState(DEFAULT_WORKOUT);
  const [workoutHistory, setWorkoutHistory] = useState({});
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapExerciseId, setSwapExerciseId] = useState(null);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [aiInput, setAiInput] = useState('');
  const [selectedLibraryExercise, setSelectedLibraryExercise] = useState(null);

  const getAllExercises = () => {
    return Object.values(EXERCISE_LIBRARY).flat();
  };

  const getExerciseById = (id) => {
    return getAllExercises().find(ex => ex.id === id);
  };

  const getProgressData = (exerciseId) => {
    const history = workoutHistory[exerciseId] || [];
    return history.slice(-10).map((entry, idx) => ({
      session: idx + 1,
      weight: entry.weight,
      volume: entry.weight * entry.reps,
    }));
  };

  const logSet = (exerciseId, setData) => {
    const date = new Date().toISOString().split('T')[0];
    const history = workoutHistory[exerciseId] || [];
    setWorkoutHistory({
      ...workoutHistory,
      [exerciseId]: [...history, { ...setData, date }]
    });
  };

  const getSimilarExercises = (exerciseId) => {
    const exercise = getExerciseById(exerciseId);
    if (!exercise) return [];
    
    return getAllExercises().filter(ex => 
      ex.id !== exerciseId && 
      (ex.primary === exercise.primary || ex.secondary.includes(exercise.primary))
    ).slice(0, 8);
  };

  const swapExercise = (oldId, newId) => {
    setTodayWorkout(todayWorkout.map(ex => 
      ex.exerciseId === oldId ? { ...ex, exerciseId: newId } : ex
    ));
    setShowSwapModal(false);
  };

  const getAIResponse = (message) => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('form') || lowerMsg.includes('technique')) {
      const exercise = selectedExercise ? getExerciseById(selectedExercise) : null;
      if (exercise) {
        return 'Great question about form for ' + exercise.name + '!\n\nKey points:\n• Keep core engaged\n• Controlled movements\n• Start with lighter weight\n• Proper breathing\n\nWant specific cues?';
      }
    }
    
    if (lowerMsg.includes('substitute') || lowerMsg.includes('alternative')) {
      if (selectedExercise) {
        const similar = getSimilarExercises(selectedExercise);
        return 'Here are great alternatives:\n\n' + similar.slice(0, 5).map(ex => '• ' + ex.name).join('\n') + '\n\nUse the swap button to switch!';
      }
    }
    
    if (lowerMsg.includes('weight') || lowerMsg.includes('heavy')) {
      return 'For optimal strength:\n\n• Start with 8-10 rep weight\n• Increase if doing 12+ easily\n• Progress by 5-10%\n• Rest 2-3 min between sets\n\nForm over ego!';
    }
    
    if (lowerMsg.includes('progress') || lowerMsg.includes('plateau')) {
      return 'Break through plateaus:\n\n• Progressive overload\n• Vary exercises every 4-6 weeks\n• Adequate protein\n• 7-9 hours sleep\n• Deload periodically';
    }
    
    if (lowerMsg.includes('cardio') || lowerMsg.includes('hiit')) {
      return 'Cardio strategy:\n\n• HIIT: 20-30 min, 2-3x/week\n• Steady state on rest days\n• Post-workout timing\n• Balance with strength\n\nKey is consistency!';
    }

    return 'I can help with:\n\n• Exercise form\n• Alternative exercises\n• Weight selection\n• Plateau breaking\n• Cardio guidance\n• Programming advice\n\nWhat would you like to know?';
  };

  const sendAIMessage = () => {
    if (!aiInput.trim()) return;
    
    const userMsg = { sender: 'user', text: aiInput };
    const aiMsg = { sender: 'ai', text: getAIResponse(aiInput) };
    
    setAiMessages([...aiMessages, userMsg, aiMsg]);
    setAiInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="bg-slate-800/50 border-b border-slate-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Dumbbell className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold">AI Workout Tracker</h1>
          </div>
          <div className="text-sm text-slate-400">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      <div className="bg-slate-800/30 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6">
            {[
              { id: 'today', icon: Calendar, label: 'Today' },
              { id: 'progress', icon: TrendingUp, label: 'Progress' },
              { id: 'library', icon: Library, label: 'Library' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-400 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
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
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Todays Workout</h2>
              <button
                onClick={() => setShowAIChat(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 py-2 rounded-lg transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                AI Coach
              </button>
            </div>

            {todayWorkout.map((workout, idx) => {
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
                        <span>{exercise.primary}</span>
                        <span>•</span>
                        <span>{workout.targetSets} sets x {workout.targetReps} reps</span>
                      </div>
                      {lastSession && (
                        <div className="text-sm text-green-400 mt-1">
                          Last: {lastSession.weight}lbs x {lastSession.reps} reps
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSwapExerciseId(workout.exerciseId);
                          setShowSwapModal(true);
                        }}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedExercise(workout.exerciseId);
                          setShowAIChat(true);
                        }}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        <Zap className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[...Array(workout.targetSets)].map((_, setIdx) => (
                      <SetLogger
                        key={setIdx}
                        setNumber={setIdx + 1}
                        onLog={(data) => logSet(workout.exerciseId, data)}
                        previousWeight={lastSession?.weight}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Your Progress</h2>
            {todayWorkout.map(workout => {
              const exercise = getExerciseById(workout.exerciseId);
              const data = getProgressData(workout.exerciseId);
              
              if (data.length === 0) return null;

              return (
                <div key={workout.exerciseId} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-xl font-semibold mb-4">{exercise.name}</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="session" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                        labelStyle={{ color: '#94a3b8' }}
                      />
                      <Line type="monotone" dataKey="weight" stroke="#60a5fa" strokeWidth={2} />
                      <Line type="monotone" dataKey="volume" stroke="#34d399" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="flex gap-6 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-slate-400">Weight</span>
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
            <h2 className="text-2xl font-bold">Exercise Library</h2>
            {Object.entries(EXERCISE_LIBRARY).map(([category, exercises]) => (
              <div key={category} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-semibold capitalize mb-4 text-blue-400">{category}</h3>
                <div className="grid gap-3">
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
                        <span>{exercise.primary}</span>
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
              <button
                onClick={() => setShowSwapModal(false)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid gap-3">
                {getSimilarExercises(swapExerciseId).map(exercise => (
                  <button
                    key={exercise.id}
                    onClick={() => swapExercise(swapExerciseId, exercise.id)}
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
                <h3 className="text-xl font-bold">AI Coach</h3>
              </div>
              <button
                onClick={() => setShowAIChat(false)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {aiMessages.length === 0 && (
                <div className="text-center text-slate-400 mt-8">
                  <p className="mb-4">Ask me anything about your workout!</p>
                  <div className="grid gap-2 text-sm">
                    <p>Try: How is my form on bench press?</p>
                    <p>Or: What weight should I use?</p>
                    <p>Or: Suggest alternatives</p>
                  </div>
                </div>
              )}
              {aiMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      msg.sender === 'user'
                        ? 'bg-blue-600'
                        : 'bg-slate-700'
                    }`}
                  >
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
                  placeholder="Ask about form, weight, alternatives..."
                  className="flex-1 bg-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendAIMessage}
                  className="bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-3 transition-colors"
                >
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
              <button
                onClick={() => setSelectedLibraryExercise(null)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
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
                {selectedLibraryExercise.secondary !== 'None' && (
                  <div className="bg-slate-700/50 rounded-lg px-3 py-2 text-sm">
                    <span className="text-slate-400">Secondary: </span>
                    <span className="text-white">{selectedLibraryExercise.secondary}</span>
                  </div>
                )}
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