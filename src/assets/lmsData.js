export const courses = [
  {
    id: 'react-pro', title: 'Modern React: From Basics to Production', instructor: 'Alex Johnson', role: 'Senior Frontend Engineer', category: 'Web Development', level: 'Intermediate', duration: '18h 20m', lessonsCount: 5, rating: 4.9, reviewsCount: 1284, enrolled: true,
    description: 'Build a strong React foundation, understand component architecture, and ship interfaces that feel ready for real products.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1000&q=85', accent: 'from-indigo-500 to-violet-500',
    lessons: [
      { id: 'react-1', title: 'Welcome to the course', duration: '08:24', type: 'video' },
      { id: 'react-2', title: 'Thinking in components', duration: '18:42', type: 'video' },
      { id: 'react-3', title: 'Props, state, and events', duration: '24:10', type: 'video' },
      { id: 'react-4', title: 'Effects and data flow', duration: '21:35', type: 'video' },
      { id: 'react-5', title: 'Build and ship a mini project', duration: '32:16', type: 'project' },
    ],
  },
  {
    id: 'ui-ux', title: 'UI/UX Design Fundamentals with Figma', instructor: 'Sarah Lee', role: 'Product Designer', category: 'Design', level: 'Beginner', duration: '12h 45m', lessonsCount: 5, rating: 4.8, reviewsCount: 936, enrolled: true,
    description: 'Learn to turn a rough idea into a thoughtful user experience with layout, hierarchy, components, and prototypes.',
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1000&q=85', accent: 'from-pink-500 to-orange-400',
    lessons: [
      { id: 'figma-1', title: 'Design thinking essentials', duration: '12:10', type: 'video' },
      { id: 'figma-2', title: 'Layout, spacing, and hierarchy', duration: '19:40', type: 'video' },
      { id: 'figma-3', title: 'Reusable components in Figma', duration: '26:25', type: 'video' },
      { id: 'figma-4', title: 'Prototype a user flow', duration: '20:00', type: 'video' },
      { id: 'figma-5', title: 'Portfolio-ready design challenge', duration: '35:10', type: 'project' },
    ],
  },
  {
    id: 'tailwind', title: 'Tailwind CSS: Build Better Interfaces', instructor: 'Michael Brown', role: 'Design Engineer', category: 'Frontend', level: 'All levels', duration: '9h 10m', lessonsCount: 4, rating: 4.7, reviewsCount: 642, enrolled: true,
    description: 'Create consistent responsive layouts with utility classes, design tokens, modern CSS, and accessible interaction states.',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=85', accent: 'from-cyan-500 to-blue-500',
    lessons: [
      { id: 'tw-1', title: 'Utility-first CSS mindset', duration: '10:32', type: 'video' },
      { id: 'tw-2', title: 'Responsive layout patterns', duration: '22:15', type: 'video' },
      { id: 'tw-3', title: 'Theme tokens and dark mode', duration: '18:55', type: 'video' },
      { id: 'tw-4', title: 'Build a responsive dashboard', duration: '40:10', type: 'project' },
    ],
  },
  {
    id: 'python-ai', title: 'Python for Data Science & AI', instructor: 'David Miller', role: 'Machine Learning Engineer', category: 'Data Science', level: 'Intermediate', duration: '22h 05m', lessonsCount: 5, rating: 4.9, reviewsCount: 2110, enrolled: true,
    description: 'Explore Python fundamentals, notebooks, data analysis, and the building blocks behind practical machine learning.',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=85', accent: 'from-emerald-500 to-teal-500',
    lessons: [
      { id: 'py-1', title: 'Python refresher', duration: '16:30', type: 'video' },
      { id: 'py-2', title: 'Working with datasets', duration: '23:45', type: 'video' },
      { id: 'py-3', title: 'Explore data with charts', duration: '27:20', type: 'video' },
      { id: 'py-4', title: 'Machine learning concepts', duration: '31:05', type: 'video' },
      { id: 'py-5', title: 'A small prediction project', duration: '42:00', type: 'project' },
    ],
  },
  {
    id: 'typescript', title: 'TypeScript for React Developers', instructor: 'Jordan Kim', role: 'Staff Software Engineer', category: 'Frontend', level: 'Intermediate', duration: '7h 30m', lessonsCount: 4, rating: 4.8, reviewsCount: 517, enrolled: false,
    description: 'Make React applications easier to maintain with practical types for props, hooks, events, and API responses.',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85', accent: 'from-blue-500 to-indigo-500',
    lessons: [
      { id: 'ts-1', title: 'Types, inference, and narrowing', duration: '15:00', type: 'video' },
      { id: 'ts-2', title: 'Typing React components', duration: '24:00', type: 'video' },
      { id: 'ts-3', title: 'Hooks, events, and forms', duration: '29:10', type: 'video' },
      { id: 'ts-4', title: 'Refactor a React feature', duration: '38:20', type: 'project' },
    ],
  },
  {
    id: 'productivity', title: 'Productivity Systems for Creators', instructor: 'Maya Patel', role: 'Learning Coach', category: 'Personal Growth', level: 'Beginner', duration: '5h 15m', lessonsCount: 4, rating: 4.6, reviewsCount: 382, enrolled: false,
    description: 'Design a sustainable learning routine, break down large goals, and track meaningful weekly progress.',
    thumbnail: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1000&q=85', accent: 'from-amber-500 to-rose-500',
    lessons: [
      { id: 'pr-1', title: 'Set a direction that matters', duration: '12:25', type: 'video' },
      { id: 'pr-2', title: 'Plan a focused week', duration: '17:10', type: 'video' },
      { id: 'pr-3', title: 'Build a repeatable routine', duration: '21:05', type: 'video' },
      { id: 'pr-4', title: 'Review and improve your system', duration: '25:45', type: 'project' },
    ],
  },
];

// Seed data only: progress is saved locally in the learner's browser.
export const initialCompletedLessons = ['react-1', 'react-2', 'react-3', 'figma-1', 'figma-2', 'tw-1', 'tw-2', 'tw-3', 'tw-4'];

export const upcomingClasses = [
  { id: 'session-1', title: 'React Server Components: Q&A', instructor: 'Alex Johnson', date: 'Today', time: '15:00', duration: '45 min', category: 'Web Development', status: 'Upcoming' },
  { id: 'session-2', title: 'Building Better UI Hierarchy', instructor: 'Sarah Lee', date: 'Tomorrow', time: '10:00', duration: '60 min', category: 'Design', status: 'Scheduled' },
  { id: 'session-3', title: 'Tailwind Responsive Patterns', instructor: 'Michael Brown', date: 'Oct 15', time: '13:30', duration: '50 min', category: 'Frontend', status: 'Scheduled' },
];

export const categories = ['All', 'Web Development', 'Design', 'Frontend', 'Data Science', 'Personal Growth'];
