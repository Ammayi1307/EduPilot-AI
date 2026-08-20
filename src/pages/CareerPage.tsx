import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Target,
  TrendingUp,
  ArrowRight,
  Check,
  Sparkles,
  AlertCircle,
  BookOpen,
  Code,
  GraduationCap,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Misc';
import { ProgressBar } from '@/components/ui/Progress';
import { useApp } from '@/context/AppContext';
import { careerSkills, careerSkillGaps, careerRoadmapStages } from '@/data/mockData';
import { generateCareerRoadmap } from '@/services/aiService';
import { AIThinking } from '@/components/ui/Misc';

export function CareerPage() {
  const { profile, showToast } = useApp();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState<{ stage: string; topic: string; description: string; completed: boolean }[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    const result = await generateCareerRoadmap(profile.goal);
    setRoadmap(result);
    setLoading(false);
    showToast('success', 'Career roadmap generated!');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold font-display text-white">Career Copilot</h1>
        <p className="mt-2 text-gray-400">Identify skill gaps and build a roadmap to your dream career.</p>
      </div>

      {/* Goal & Readiness */}
      <div className="grid lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="!p-5">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-4 h-4 text-brand-400" />
              <span className="text-xs text-gray-400">Career Goal</span>
            </div>
            <p className="text-lg font-semibold text-white">{profile.goal}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="!p-5">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-electric-400" />
              <span className="text-xs text-gray-400">Career Readiness</span>
            </div>
            <p className="text-lg font-semibold text-white">{profile.careerReadiness}%</p>
            <div className="mt-2">
              <ProgressBar value={profile.careerReadiness} showValue={false} color="from-electric-500 to-cyan-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="!p-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-error-400" />
              <span className="text-xs text-gray-400">Skill Gaps</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {careerSkillGaps.map((gap) => (
                <Badge key={gap} color="error">{gap}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills */}
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold text-white mb-4">Career Skills Breakdown</h3>
          <div className="space-y-3">
            {careerSkills.map((skill) => (
              <div key={skill.subject}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-300">{skill.subject}</span>
                  <span className="text-sm font-semibold text-white">{skill.score}%</span>
                </div>
                <ProgressBar
                  value={skill.score}
                  showValue={false}
                  color={skill.score >= 70 ? 'from-success-500 to-emerald-500' : skill.score >= 40 ? 'from-warning-500 to-orange-500' : 'from-error-500 to-red-500'}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generate Roadmap */}
      {!roadmap && !loading && (
        <Card glow>
          <CardContent className="text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-brand-500/30 to-accent-500/30 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-brand-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Generate your AI career roadmap</h3>
            <p className="text-sm text-gray-400 mb-4 max-w-md mx-auto">
              EduPilot will analyze your skills and create a personalized path to {profile.goal}.
            </p>
            <Button icon={Sparkles} onClick={handleGenerate}>Generate Career Roadmap</Button>
          </CardContent>
        </Card>
      )}

      {/* Loading */}
      {loading && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <AIThinking text="Generating your career roadmap..." />
          </CardContent>
        </Card>
      )}

      {/* Roadmap */}
      <AnimatePresence>
        {roadmap && !loading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <Card>
              <CardContent>
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-5 h-5 text-brand-400" />
                  <h3 className="text-lg font-semibold text-white">Your Career Roadmap to {profile.goal}</h3>
                </div>
                <div className="space-y-2">
                  {roadmap.map((stage, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        {/* Connector line */}
                        {i > 0 && <div className="absolute ml-[19px] -mt-2 w-0.5 h-2 bg-brand-500/30" />}
                        {/* Stage indicator */}
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          stage.completed
                            ? 'bg-success-500/20'
                            : i === roadmap.findIndex((s) => !s.completed)
                            ? 'bg-gradient-to-br from-brand-500 to-accent-500 glow-border'
                            : 'bg-white/5'
                        }`}>
                          {stage.completed ? (
                            <Check className="w-5 h-5 text-success-400" />
                          ) : (
                            <span className="text-xs font-bold text-white">{i + 1}</span>
                          )}
                        </div>
                        {/* Content */}
                        <div className="flex-1 glass rounded-xl p-3.5">
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <h4 className={`text-sm font-medium ${stage.completed ? 'text-gray-500' : 'text-white'}`}>
                                {stage.stage}
                              </h4>
                              <p className="text-xs text-gray-400 mt-0.5">{stage.description}</p>
                            </div>
                            {!stage.completed && (
                              <div className="flex gap-1.5 shrink-0">
                                <button
                                  onClick={() => navigate(`/learning-resources?topic=${encodeURIComponent(stage.topic)}`)}
                                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg glass text-xs text-brand-300 hover:text-white hover:bg-white/10 transition-all"
                                >
                                  <BookOpen className="w-3 h-3" /> Resources
                                </button>
                                <button
                                  onClick={() => navigate('/coding-lab')}
                                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg glass text-xs text-electric-300 hover:text-white hover:bg-white/10 transition-all"
                                >
                                  <Code className="w-3 h-3" /> Practice
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
