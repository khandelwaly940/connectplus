import { GUEST_ROADMAP_STORAGE_KEY } from './session';

const GUEST_DOMAINS = ['Web', 'Python', 'DSA', 'ML'];

const guestTemplates = {
  Web: [
    {
      name: 'HTML & Semantic Structure',
      description: 'Build semantic page layouts and accessible markup.',
      estimated_time: 4,
      difficulty_level: 'beginner',
      resources: [
        {
          title: 'MDN HTML Basics',
          description: 'Core HTML concepts and semantic tags.',
          url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics',
          estimated_time: 2,
          difficulty_level: 'beginner',
          resource_type: 'documentation',
        },
        {
          title: 'freeCodeCamp HTML Course',
          description: 'Practice-first walkthrough of modern HTML.',
          url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
          estimated_time: 2,
          difficulty_level: 'beginner',
          resource_type: 'course',
        },
      ],
    },
    {
      name: 'CSS Layouts & Responsive Design',
      description: 'Use flexbox/grid and mobile-first styling.',
      estimated_time: 5,
      difficulty_level: 'beginner',
      resources: [
        {
          title: 'CSS Layout Guide',
          description: 'Practical flexbox and grid patterns.',
          url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
          estimated_time: 2,
          difficulty_level: 'beginner',
          resource_type: 'article',
        },
        {
          title: 'Responsive Design Patterns',
          description: 'Real-world responsive layout strategy.',
          url: 'https://web.dev/responsive-web-design-basics/',
          estimated_time: 2,
          difficulty_level: 'beginner',
          resource_type: 'documentation',
        },
      ],
    },
    {
      name: 'JavaScript Fundamentals',
      description: 'Variables, functions, DOM events, and async basics.',
      estimated_time: 6,
      difficulty_level: 'intermediate',
      resources: [
        {
          title: 'JavaScript.info Essentials',
          description: 'Clear fundamentals with examples.',
          url: 'https://javascript.info/first-steps',
          estimated_time: 3,
          difficulty_level: 'beginner',
          resource_type: 'documentation',
        },
        {
          title: 'DOM Manipulation Practice',
          description: 'Hands-on DOM and event exercises.',
          url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/',
          estimated_time: 3,
          difficulty_level: 'intermediate',
          resource_type: 'practice',
        },
      ],
    },
  ],
  Python: [
    {
      name: 'Python Core Syntax',
      description: 'Data types, conditions, loops, and functions.',
      estimated_time: 5,
      difficulty_level: 'beginner',
      resources: [
        {
          title: 'Official Python Tutorial',
          description: 'Language fundamentals directly from docs.',
          url: 'https://docs.python.org/3/tutorial/',
          estimated_time: 3,
          difficulty_level: 'beginner',
          resource_type: 'documentation',
        },
        {
          title: 'Python Practice Problems',
          description: 'Short practice tasks for beginner fluency.',
          url: 'https://www.hackerrank.com/domains/python',
          estimated_time: 2,
          difficulty_level: 'beginner',
          resource_type: 'practice',
        },
      ],
    },
    {
      name: 'Data Structures in Python',
      description: 'Lists, dicts, sets, tuples, and complexity basics.',
      estimated_time: 4,
      difficulty_level: 'beginner',
      resources: [
        {
          title: 'Python Data Structures',
          description: 'Deep dive into common container types.',
          url: 'https://docs.python.org/3/tutorial/datastructures.html',
          estimated_time: 2,
          difficulty_level: 'beginner',
          resource_type: 'documentation',
        },
      ],
    },
    {
      name: 'Modules, Files, and Error Handling',
      description: 'Structure programs and handle exceptions safely.',
      estimated_time: 4,
      difficulty_level: 'intermediate',
      resources: [
        {
          title: 'Real Python: Exceptions',
          description: 'Practical guide to robust error handling.',
          url: 'https://realpython.com/python-exceptions/',
          estimated_time: 2,
          difficulty_level: 'intermediate',
          resource_type: 'article',
        },
      ],
    },
  ],
  DSA: [
    {
      name: 'Big-O and Arrays',
      description: 'Complexity basics and array problem solving.',
      estimated_time: 4,
      difficulty_level: 'beginner',
      resources: [
        {
          title: 'Big-O Notation Explained',
          description: 'Understand runtime and space tradeoffs.',
          url: 'https://www.geeksforgeeks.org/analysis-algorithms-big-o-analysis/',
          estimated_time: 2,
          difficulty_level: 'beginner',
          resource_type: 'article',
        },
      ],
    },
    {
      name: 'Hashing and Strings',
      description: 'Frequency maps, two-pointer patterns, string handling.',
      estimated_time: 5,
      difficulty_level: 'intermediate',
      resources: [
        {
          title: 'NeetCode Patterns',
          description: 'Core interview patterns and examples.',
          url: 'https://neetcode.io/roadmap',
          estimated_time: 3,
          difficulty_level: 'intermediate',
          resource_type: 'practice',
        },
      ],
    },
    {
      name: 'Recursion and Backtracking',
      description: 'Recursive thinking and search tree exploration.',
      estimated_time: 5,
      difficulty_level: 'intermediate',
      resources: [
        {
          title: 'Backtracking Guide',
          description: 'Pattern-first explanation and exercises.',
          url: 'https://www.geeksforgeeks.org/backtracking-algorithms/',
          estimated_time: 3,
          difficulty_level: 'intermediate',
          resource_type: 'article',
        },
      ],
    },
  ],
  ML: [
    {
      name: 'Python for ML',
      description: 'Numpy, pandas basics, and data preparation.',
      estimated_time: 5,
      difficulty_level: 'beginner',
      resources: [
        {
          title: 'NumPy Quickstart',
          description: 'Fundamentals of numeric computing.',
          url: 'https://numpy.org/doc/stable/user/quickstart.html',
          estimated_time: 2,
          difficulty_level: 'beginner',
          resource_type: 'documentation',
        },
      ],
    },
    {
      name: 'Supervised Learning Basics',
      description: 'Regression/classification workflow and evaluation.',
      estimated_time: 6,
      difficulty_level: 'intermediate',
      resources: [
        {
          title: 'Scikit-learn User Guide',
          description: 'Practical models and validation patterns.',
          url: 'https://scikit-learn.org/stable/user_guide.html',
          estimated_time: 3,
          difficulty_level: 'intermediate',
          resource_type: 'documentation',
        },
      ],
    },
    {
      name: 'Model Iteration and Deployment Basics',
      description: 'Improve model quality and package simple inference APIs.',
      estimated_time: 5,
      difficulty_level: 'intermediate',
      resources: [
        {
          title: 'ML Lifecycle Intro',
          description: 'From experimentation to production.',
          url: 'https://developers.google.com/machine-learning/crash-course',
          estimated_time: 2,
          difficulty_level: 'intermediate',
          resource_type: 'course',
        },
      ],
    },
  ],
};

const safeParse = (value) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch (error) {
    return null;
  }
};

export const getGuestRoadmap = () => safeParse(localStorage.getItem(GUEST_ROADMAP_STORAGE_KEY));

export const getGuestRoadmaps = () => {
  const roadmap = getGuestRoadmap();
  return roadmap ? [roadmap] : [];
};

const saveGuestRoadmap = (roadmap) => {
  localStorage.setItem(GUEST_ROADMAP_STORAGE_KEY, JSON.stringify(roadmap));
  return roadmap;
};

export const deleteGuestRoadmap = () => {
  localStorage.removeItem(GUEST_ROADMAP_STORAGE_KEY);
};

export const hasGuestRoadmap = () => Boolean(getGuestRoadmap());

const getStartDateByOffset = (offsetDays) => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + offsetDays);
  return date;
};

const formatISODate = (date) => date.toISOString().slice(0, 10);

const buildSkillRows = (domain, timelineWeeks) => {
  const template = guestTemplates[domain] || guestTemplates.Web;
  const start = getStartDateByOffset(1);
  const totalDays = Math.max(7, Number(timelineWeeks || 4) * 7);
  const chunkDays = Math.max(7, Math.floor(totalDays / template.length));

  return template.slice(0, 3).map((skill, index) => {
    const startDate = new Date(start);
    startDate.setDate(start.getDate() + index * chunkDays);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + chunkDays - 1);

    return {
      id: `guest-skill-${index + 1}`,
      order: index + 1,
      completed: false,
      notes: [],
      start_date: formatISODate(startDate),
      end_date: formatISODate(endDate),
      skill: {
        id: `guest-domain-skill-${domain}-${index + 1}`,
        name: skill.name,
        description: skill.description,
        estimated_time: skill.estimated_time,
        difficulty_level: skill.difficulty_level,
        learning_resources: skill.resources.map((resource, resourceIndex) => ({
          id: `guest-res-${index + 1}-${resourceIndex + 1}`,
          ...resource,
        })),
      },
    };
  });
};

export const createGuestRoadmap = (input) => {
  const category = GUEST_DOMAINS.includes(input.category) ? input.category : 'Web';
  const roadmap = {
    id: 'guest-roadmap',
    title: input.title || `${category} Guest Roadmap`,
    description: input.description || `A focused ${category} roadmap in guest mode.`,
    category,
    timeline: Number(input.timeline || 4),
    hours_per_week: Number(input.hoursPerWeek || 4),
    current_level: input.currentLevel || 'beginner',
    target_level: input.targetLevel || 'intermediate',
    created_at: new Date().toISOString(),
    target_unreachable: false,
    completed: false,
    skills: buildSkillRows(category, input.timeline),
  };

  return saveGuestRoadmap(roadmap);
};

export const toggleGuestSkillCompletion = (roadmapSkillId) => {
  const roadmap = getGuestRoadmap();
  if (!roadmap) {
    return null;
  }

  const updated = {
    ...roadmap,
    skills: roadmap.skills.map((skill) =>
      String(skill.id) === String(roadmapSkillId)
        ? { ...skill, completed: !skill.completed }
        : skill
    ),
  };

  return saveGuestRoadmap(updated);
};

export const addGuestNote = (roadmapSkillId, content) => {
  const roadmap = getGuestRoadmap();
  if (!roadmap) {
    return null;
  }

  const newNote = {
    id: `guest-note-${Date.now()}`,
    content,
    created_at: new Date().toISOString(),
  };

  const updated = {
    ...roadmap,
    skills: roadmap.skills.map((skill) =>
      String(skill.id) === String(roadmapSkillId)
        ? { ...skill, notes: [...(skill.notes || []), newNote] }
        : skill
    ),
  };

  return saveGuestRoadmap(updated);
};

export const deleteGuestNote = (roadmapSkillId, noteId) => {
  const roadmap = getGuestRoadmap();
  if (!roadmap) {
    return null;
  }

  const updated = {
    ...roadmap,
    skills: roadmap.skills.map((skill) =>
      String(skill.id) === String(roadmapSkillId)
        ? { ...skill, notes: (skill.notes || []).filter((note) => String(note.id) !== String(noteId)) }
        : skill
    ),
  };

  return saveGuestRoadmap(updated);
};

export const markGuestRoadmapCompleted = () => {
  const roadmap = getGuestRoadmap();
  if (!roadmap) {
    return null;
  }

  const updated = {
    ...roadmap,
    completed: true,
    skills: roadmap.skills.map((skill) => ({ ...skill, completed: true })),
  };

  return saveGuestRoadmap(updated);
};

export const getGuestDomainOptions = () => GUEST_DOMAINS;

