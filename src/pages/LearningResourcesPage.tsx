import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Heart,
  Check,
  ExternalLink,
  Play,
  GraduationCap,
  BookOpen,
  FileText,
  Code,
  PenTool,
  Sparkles,
  Bookmark,
  Clock,
  Filter,
  X,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Misc';
import { useApp } from '@/context/AppContext';
import { resources } from '@/data/resources';
import { getResourceIcon, getThumbnailGradient } from '@/components/ui/ResourceIcons';
import { getRecommendedResources } from '@/services/aiService';
import type { Resource, Difficulty, ResourceType, Subject } from '@/types';
import { Modal } from '@/components/ui/Modal';

const subjects: Subject[] = [
  'Python', 'Java', 'JavaScript', 'DSA', 'SQL', 'DBMS',
  'Operating Systems', 'Computer Networks', 'Machine Learning',
  'Deep Learning', 'Generative AI', 'Web Development',
  'Interview Preparation', 'Aptitude', 'Communication',
];

const levels: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced'];
const types: ResourceType[] = ['Video', 'Course', 'Tutorial', 'Documentation', 'Practice', 'Article'];

export function LearningResourcesPage() {
  const { savedResources, toggleSave, completedResources, toggleComplete, profile } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedSubject, setSelectedSubject] = useState<string>(searchParams.get('topic') || '');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    const topic = searchParams.get('topic');
    if (q) setSearchQuery(q);
    if (topic) setSelectedSubject(topic);
  }, [searchParams]);

  const recommended = useMemo(() => {
    const weakSubject = profile.weakAreas[0];
    return getRecommendedResources(weakSubject, resources);
  }, [profile.weakAreas]);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchSearch = !searchQuery ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSubject = !selectedSubject || r.topic === selectedSubject;
      const matchLevel = !selectedLevel || r.difficulty === selectedLevel;
      const matchType = !selectedType || r.type === selectedType;
      return matchSearch && matchSubject && matchLevel && matchType;
    });
  }, [searchQuery, selectedSubject, selectedLevel, selectedType]);

  const savedList = useMemo(() => {
    return resources.filter((r) => savedResources.has(r.id));
  }, [savedResources]);

  function clearFilters() {
    setSelectedSubject('');
    setSelectedLevel('');
    setSelectedType('');
    setSearchQuery('');
    setSearchParams({});
  }

  function handleResourceClick(r: Resource) {
    setSelectedResource(r);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold font-display text-white">Learning Resources</h1>
        <p className="mt-2 text-gray-400">Discover curated educational content across {subjects.length} subjects.</p>
      </div>

      {/* AI Recommended */}
      {!selectedSubject && !searchQuery && (
        <Card glow>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-brand-400" />
              <h3 className="text-lg font-semibold text-white">Recommended For You</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Because <span className="text-warning-400 font-medium">{profile.weakAreas[0]}</span> is currently your weakest area
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {recommended.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleResourceClick(r)}
                  className="glass rounded-xl p-4 text-left glow-border-hover"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Badge color="brand"><Sparkles className="w-3 h-3" /> AI Recommended</Badge>
                  </div>
                  <h4 className="text-sm font-medium text-white mb-1">{r.title}</h4>
                  <p className="text-xs text-gray-400">{r.provider} · {r.duration}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search learning resources..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
            />
          </div>
          <Button
            variant={showFilters ? 'primary' : 'secondary'}
            icon={Filter}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
          <Button
            variant={showSaved ? 'primary' : 'secondary'}
            icon={Bookmark}
            onClick={() => setShowSaved(!showSaved)}
          >
            Saved ({savedList.length})
          </Button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Card>
                <CardContent className="!p-4 space-y-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-2">SUBJECT</p>
                    <div className="flex flex-wrap gap-2">
                      <FilterChip label="All" active={!selectedSubject} onClick={() => setSelectedSubject('')} />
                      {subjects.map((s) => (
                        <FilterChip key={s} label={s} active={selectedSubject === s} onClick={() => setSelectedSubject(s)} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-2">LEVEL</p>
                    <div className="flex flex-wrap gap-2">
                      <FilterChip label="All" active={!selectedLevel} onClick={() => setSelectedLevel('')} />
                      {levels.map((l) => (
                        <FilterChip key={l} label={l} active={selectedLevel === l} onClick={() => setSelectedLevel(l)} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-2">TYPE</p>
                    <div className="flex flex-wrap gap-2">
                      <FilterChip label="All" active={!selectedType} onClick={() => setSelectedType('')} />
                      {types.map((t) => (
                        <FilterChip key={t} label={t} active={selectedType === t} onClick={() => setSelectedType(t)} />
                      ))}
                    </div>
                  </div>
                  {(selectedSubject || selectedLevel || selectedType) && (
                    <Button size="sm" variant="ghost" icon={X} onClick={clearFilters}>Clear Filters</Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results */}
      <div>
        <p className="text-sm text-gray-400 mb-4">
          {showSaved
            ? `${savedList.length} saved resource${savedList.length !== 1 ? 's' : ''}`
            : `${filtered.length} resource${filtered.length !== 1 ? 's' : ''} found`}
        </p>

        {showSaved && savedList.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Bookmark className="w-10 h-10 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No saved resources yet. Click the heart icon on any resource to save it.</p>
            </CardContent>
          </Card>
        )}

        {!showSaved && filtered.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="w-10 h-10 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No resources found. Try adjusting your search or filters.</p>
            </CardContent>
          </Card>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(showSaved ? savedList : filtered).map((r, i) => (
            <ResourceCard
              key={r.id}
              resource={r}
              onClick={() => handleResourceClick(r)}
              saved={savedResources.has(r.id)}
              completed={completedResources.has(r.id)}
              onToggleSave={() => toggleSave(r.id)}
              onToggleComplete={() => toggleComplete(r.id)}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Resource Modal */}
      <ResourceModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
        saved={selectedResource ? savedResources.has(selectedResource.id) : false}
        completed={selectedResource ? completedResources.has(selectedResource.id) : false}
        onToggleSave={() => selectedResource && toggleSave(selectedResource.id)}
        onToggleComplete={() => selectedResource && toggleComplete(selectedResource.id)}
      />
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        active
          ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-white'
          : 'glass text-gray-400 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}

function ResourceCard({
  resource,
  onClick,
  saved,
  completed,
  onToggleSave,
  onToggleComplete,
  index,
}: {
  resource: Resource;
  onClick: () => void;
  saved: boolean;
  completed: boolean;
  onToggleSave: () => void;
  onToggleComplete: () => void;
  index: number;
}) {
  const Icon = getResourceIcon(resource.type);
  const gradient = getThumbnailGradient(resource.topic);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.5) }}
    >
      <Card hover className="h-full flex flex-col" >
        <div className="cursor-pointer flex-1" onClick={onClick}>
          {/* Thumbnail */}
          <div className={`h-32 bg-gradient-to-br ${gradient} rounded-t-2xl flex items-center justify-center relative overflow-hidden`}>
            <Icon className="w-12 h-12 text-white/70" />
            <div className="absolute top-3 left-3">
              <Badge color="electric">{resource.type}</Badge>
            </div>
            {completed && (
              <div className="absolute top-3 right-3">
                <div className="w-6 h-6 rounded-full bg-success-500/30 flex items-center justify-center">
                  <Check className="w-4 h-4 text-success-400" />
                </div>
              </div>
            )}
          </div>
          <CardContent className="!p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge>{resource.topic}</Badge>
              <Badge color={resource.difficulty === 'Beginner' ? 'success' : resource.difficulty === 'Advanced' ? 'error' : 'warning'}>
                {resource.difficulty}
              </Badge>
            </div>
            <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">{resource.title}</h3>
            <p className="text-xs text-gray-400 line-clamp-2 mb-3">{resource.description}</p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>{resource.provider}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{resource.duration}</span>
            </div>
          </CardContent>
        </div>
        <div className="px-4 pb-4 flex gap-2">
          <Button size="sm" variant="secondary" className="flex-1" onClick={onClick}>
            {resource.type === 'Video' ? 'Watch Now' : 'Open Resource'}
          </Button>
          <button
            onClick={onToggleSave}
            className={`p-2 rounded-lg glass transition-all ${saved ? 'text-error-400' : 'text-gray-400 hover:text-white'}`}
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </Card>
    </motion.div>
  );
}

function ResourceModal({
  resource,
  onClose,
  saved,
  completed,
  onToggleSave,
  onToggleComplete,
}: {
  resource: Resource | null;
  onClose: () => void;
  saved: boolean;
  completed: boolean;
  onToggleSave: () => void;
  onToggleComplete: () => void;
}) {
  const Icon = resource ? getResourceIcon(resource.type) : Play;
  const gradient = resource ? getThumbnailGradient(resource.topic) : '';

  return (
    <Modal open={!!resource} onClose={onClose} maxWidth="max-w-2xl">
      {resource && (
        <div>
          {/* Thumbnail */}
          <div className={`h-48 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-5 relative overflow-hidden`}>
            <Icon className="w-16 h-16 text-white/60" />
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge color="electric">{resource.type}</Badge>
              <Badge>{resource.topic}</Badge>
            </div>
          </div>

          <h2 className="text-xl font-bold font-display text-white mb-2">{resource.title}</h2>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">{resource.description}</p>

          {/* Meta */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <MetaItem label="Topic" value={resource.topic} />
            <MetaItem label="Difficulty" value={resource.difficulty} />
            <MetaItem label="Duration" value={resource.duration} />
            <MetaItem label="Provider" value={resource.provider} />
          </div>

          {/* AI Recommendation */}
          <div className="glass rounded-xl p-4 mb-5 border border-brand-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span className="text-sm font-semibold text-white">Why EduPilot recommends this</span>
            </div>
            <p className="text-sm text-gray-400">
              Your recent performance indicates that {resource.topic} needs additional practice. This resource targets your current knowledge gap.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full" iconRight={ExternalLink}>
                {resource.type === 'Video' ? 'Watch on YouTube' : 'Open Resource'}
              </Button>
            </a>
            <Button
              variant={completed ? 'primary' : 'secondary'}
              icon={Check}
              onClick={onToggleComplete}
            >
              {completed ? 'Completed' : 'Mark as Completed'}
            </Button>
            <Button
              variant="secondary"
              icon={Heart}
              onClick={onToggleSave}
              className={saved ? 'text-error-400' : ''}
            >
              {saved ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-lg p-3">
      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-white">{value}</p>
    </div>
  );
}
