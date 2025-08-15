import yaml from 'js-yaml';

export interface ProfileData {
  profile: {
    name: string;
    bio: string;
    education: Array<{
      institution: string;
      program: string;
      year: number;
      gpa: number;
    }>;
    skills: {
      hard: string[];
      soft: string[];
      languages: string[];
    };
    honors: Array<{
      title: string;
      year: number;
      link?: string;
      eventDescription: string;
      myExperience: string;
      images: string[];
    }>;
    projects: Array<{
      title: string;
      years: string;
      description: string;
      skills: string[];
      images?: string[];
      links?: Array<{
        title: string;
        url: string;
        type?: 'github' | 'demo' | 'video' | 'website' | 'document' | 'other';
      }>;
      sections?: Array<{
        title: string;
        content: string;
      }>;
      tags?: string[];
      achievements?: string[];
      duration?: string;
      team?: string[];
      technologies?: string[];
    }>;
  };
  roadmap: Array<{
    title: string;
    date: string;
    category: string;
    skills: string[];
    experience: string;
  }>;
}

let cachedData: ProfileData | null = null;

export async function loadProfileData(): Promise<ProfileData> {
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch('/data.yaml');
    if (!response.ok) {
      throw new Error(`Failed to load data.yaml: ${response.statusText}`);
    }
    
    const yamlText = await response.text();
    const rawData = yaml.load(yamlText) as any;
    
    // Convert Date objects back to strings for React compatibility
    const processData = (obj: any): any => {
      if (obj instanceof Date) {
        return obj.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
      } else if (Array.isArray(obj)) {
        return obj.map(processData);
      } else if (obj && typeof obj === 'object') {
        const processed: any = {};
        for (const [key, value] of Object.entries(obj)) {
          processed[key] = processData(value);
        }
        return processed;
      }
      return obj;
    };
    
    const data = processData(rawData) as ProfileData;
    cachedData = data;
    return data;
  } catch (error) {
    console.error('Error loading YAML data:', error);
    // Fallback to JSON if YAML fails
    try {
      const response = await fetch('/data.json');
      const data = await response.json();
      cachedData = data;
      return data;
    } catch (jsonError) {
      console.error('Error loading JSON fallback:', jsonError);
      throw new Error('Failed to load profile data from both YAML and JSON sources');
    }
  }
}

// Export individual data sections for convenience
export async function getProfile() {
  const data = await loadProfileData();
  return data.profile;
}

export async function getRoadmap() {
  const data = await loadProfileData();
  return data.roadmap;
}

export async function getHonors() {
  const data = await loadProfileData();
  return data.profile.honors;
}

export async function getProjects() {
  const data = await loadProfileData();
  return data.profile.projects;
}
