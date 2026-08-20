import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Target, TrendingUp, Play, BookOpen, Sparkles, Clock, Check, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Misc';
import { ProgressBar } from '@/components/ui/Progress';
import { useApp } from '@/context/AppContext';

export function StudyPlannerPage() {
  const { studyPlan, showToast } = useApp();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold font-display text-white">Your AI Study Plan</h1>
        <p className="mt-2 text-gray-400">Adapted automatically based on your performance.</p>
      </div>

      {/* Plan Overview */}
      <div className="grid lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="!p-5">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-brand-400" />
              <span className="text-xs text-gray-400">Exam</span>
            </div>
            <p className="text-lg font-semibold text-white">{studyPlan.exam}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="!p-5">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-warning-400" />
              <span className="text-xs text-gray-400">Days Remaining</span>
            </div>
            <p className="text-lg font-semibold text-white">{studyPlan.daysRemaining} days</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="!p-5">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-electric-400" />
              <span className="text-xs text-gray-400">Target</span>
            </div>
            <p className="text-lg font-semibold text-white">{studyPlan.target}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="!p-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-success-400" />
              <span className="text-xs text-gray-400">Readiness</span>
            </div>
            <p className="text-lg font-semibold text-white">{studyPlan.readiness}%</p>
            <div className="mt-2">
              <ProgressBar value={studyPlan.readiness} showValue={false} color="from-success-500 to-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Study Timeline</h3>
            <Badge color="brand"><Sparkles className="w-3 h-3" /> AI Adapted</Badge>
          </div>
          <div className="space-y-3">
            {studyPlan.timeline.map((day, i) => (
              <motion.div
                key={`${day.day}-${day.title}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                  day.aiRecommended
                    ? 'glass border border-brand-500/30 glow-border'
                    : day.completed
                    ? 'glass opacity-60'
                    : 'glass'
                }`}>
                  {/* Day indicator */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    day.completed
                      ? 'bg-success-500/20'
                      : day.aiRecommended
                      ? 'bg-gradient-to-br from-brand-500 to-accent-500'
                      : 'bg-white/5'
                  }`}>
                    {day.completed ? (
                      <Check className="w-5 h-5 text-success-400" />
                    ) : (
                      <span className="text-sm font-bold text-white">{day.day}</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className={`text-sm font-medium ${day.completed ? 'text-gray-500 line-through' : 'text-white'}`}>
                        {day.title}
                      </h4>
                      {day.aiRecommended && (
                        <Badge color="brand"><Sparkles className="w-3 h-3" /> AI Recommended</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-400">{day.topic}</span>
                      <span className="text-xs text-gray-500">·</span>
                      <span className="text-xs text-gray-400">{day.duration}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  {!day.completed && (
                    <div className="flex gap-2 shrink-0">
                      <Button
                        size="sm"
                        variant="secondary"
                        icon={Play}
                        onClick={() => {
                          showToast('info', `Starting session: ${day.title}`);
                          navigate('/ai-tutor');
                        }}
                      >
                        Start Session
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        iconRight={ArrowRight}
                        onClick={() => navigate(`/learning-resources?topic=${encodeURIComponent(day.topic)}`)}
                      >
                        Resources
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Adaptation Notice */}
      {studyPlan.timeline.some((d) => d.aiRecommended) && (
        <Card glow>
          <CardContent>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500/30 to-accent-500/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">Your plan was adapted by AI</h3>
                <p className="text-sm text-gray-400">
                  EduPilot detected a knowledge gap in Backpropagation and automatically updated your study plan.
                  Day 3 was changed from CNN to Backpropagation Review, and Day 4 was updated to Backpropagation Challenge.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
