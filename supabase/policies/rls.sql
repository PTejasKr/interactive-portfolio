-- Row Level Security Policies

-- Enable RLS on all tables
ALTER TABLE profile_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE github_cache ENABLE ROW LEVEL SECURITY;

-- Profile Info Policies
CREATE POLICY "Public read access for profile" ON profile_info
  FOR SELECT USING (true);

CREATE POLICY "Admin write access for profile" ON profile_info
  FOR ALL USING (auth.role() = 'authenticated');

-- Skills Policies
CREATE POLICY "Public read access for skills" ON skills
  FOR SELECT USING (true);

CREATE POLICY "Admin write access for skills" ON skills
  FOR ALL USING (auth.role() = 'authenticated');

-- Projects Policies
CREATE POLICY "Public read access for projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Admin write access for projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

-- Interactions Policies (Anonymous can insert)
CREATE POLICY "Anyone can log interactions" ON interactions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin read access for interactions" ON interactions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Contact Messages Policies (Anonymous can insert)
CREATE POLICY "Anyone can send contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin read access for contact messages" ON contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin update access for contact messages" ON contact_messages
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Analytics Policies
CREATE POLICY "Anyone can log analytics" ON analytics
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin read access for analytics" ON analytics
  FOR SELECT USING (auth.role() = 'authenticated');

-- GitHub Cache Policies
CREATE POLICY "Public read access for github cache" ON github_cache
  FOR SELECT USING (true);

CREATE POLICY "Service write access for github cache" ON github_cache
  FOR ALL USING (auth.role() = 'service_role');
