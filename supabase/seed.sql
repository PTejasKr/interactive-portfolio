-- Seed Data for Interactive Portfolio

-- Profile Info
INSERT INTO profile_info (name, title, bio, avatar_url) VALUES
(
  'Developer',
  'Creative Frontend Developer',
  'Passionate about creating immersive digital experiences with code, creativity, and a fluffy mascot companion.',
  '/images/avatar.jpg'
);

-- Skills
INSERT INTO skills (name, level, category, icon_url) VALUES
('JavaScript', 90, 'Frontend', '/icons/javascript.svg'),
('TypeScript', 85, 'Frontend', '/icons/typescript.svg'),
('React', 88, 'Frontend', '/icons/react.svg'),
('Vue.js', 75, 'Frontend', '/icons/vue.svg'),
('Three.js', 80, 'Graphics', '/icons/threejs.svg'),
('GSAP', 85, 'Animation', '/icons/gsap.svg'),
('Node.js', 82, 'Backend', '/icons/nodejs.svg'),
('Python', 78, 'Backend', '/icons/python.svg'),
('PostgreSQL', 80, 'Database', '/icons/postgresql.svg'),
('Supabase', 75, 'Backend', '/icons/supabase.svg'),
('TailwindCSS', 90, 'Styling', '/icons/tailwind.svg'),
('Git', 88, 'Tools', '/icons/git.svg');

-- Sample Projects
INSERT INTO projects (github_repo, title, description, tech_stack, live_url, featured, stars, forks) VALUES
(
  'user/awesome-portfolio',
  'Interactive Portfolio',
  'A mascot-based portfolio with audio-visual interactions',
  ARRAY['TypeScript', 'Three.js', 'GSAP', 'Supabase'],
  'https://portfolio.example.com',
  TRUE,
  128,
  24
),
(
  'user/react-dashboard',
  'Analytics Dashboard',
  'Real-time data visualization dashboard built with React',
  ARRAY['React', 'D3.js', 'TailwindCSS', 'Node.js'],
  'https://dashboard.example.com',
  TRUE,
  89,
  15
),
(
  'user/api-server',
  'REST API Server',
  'High-performance REST API with authentication and caching',
  ARRAY['Node.js', 'Express', 'PostgreSQL', 'Redis'],
  NULL,
  FALSE,
  56,
  12
);

-- Sample Interactions (for testing)
INSERT INTO interactions (interaction_type, sound_triggered, metadata) VALUES
('mascot_click', TRUE, '{"emotion": "happy", "location": "belly"}'),
('section_view', FALSE, '{"section": "skills"}'),
('project_hover', TRUE, '{"project": "awesome-portfolio"}');
