import { type Resource } from '@/types';
import { Play, BookOpen, FileText, Code, GraduationCap, PenTool, Youtube, FileCode } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export function getResourceIcon(type: string): LucideIcon {
  const map: Record<string, LucideIcon> = {
    Video: Play,
    Course: GraduationCap,
    Tutorial: BookOpen,
    Documentation: FileText,
    Practice: Code,
    Article: PenTool,
  };
  return map[type] || FileText;
}

export function getProviderIcon(provider: string): LucideIcon {
  if (provider.toLowerCase().includes('youtube') || provider.toLowerCase().includes('freecodecamp')) return Youtube;
  if (provider.toLowerCase().includes('geeks')) return FileCode;
  return BookOpen;
}

export function getThumbnailGradient(topic: string): string {
  const gradients: Record<string, string> = {
    Python: 'from-yellow-500/30 to-blue-500/30',
    Java: 'from-red-500/30 to-orange-500/30',
    JavaScript: 'from-yellow-400/30 to-amber-500/30',
    DSA: 'from-brand-500/30 to-accent-500/30',
    SQL: 'from-electric-500/30 to-cyan-500/30',
    DBMS: 'from-purple-500/30 to-pink-500/30',
    'Operating Systems': 'from-gray-500/30 to-blue-500/30',
    'Computer Networks': 'from-green-500/30 to-teal-500/30',
    'Machine Learning': 'from-brand-500/30 to-electric-500/30',
    'Deep Learning': 'from-accent-500/30 to-brand-500/30',
    'Generative AI': 'from-fuchsia-500/30 to-purple-500/30',
    'Web Development': 'from-orange-500/30 to-red-500/30',
    'Interview Preparation': 'from-emerald-500/30 to-green-500/30',
    Aptitude: 'from-cyan-500/30 to-blue-500/30',
    Communication: 'from-rose-500/30 to-pink-500/30',
  };
  return gradients[topic] || 'from-brand-500/30 to-accent-500/30';
}

export function formatResourceForCard(r: Resource) {
  return {
    icon: getResourceIcon(r.type),
    gradient: getThumbnailGradient(r.topic),
  };
}
