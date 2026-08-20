import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { TrendingUp, Clock, Brain, Target, Sparkles, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge, AIThinking } from '@/components/ui/Misc';
import {
  weeklyStudyData,
  subjectPerformanceData,
  knowledgeGrowthData,
  weakTopicTrendData,
} from '@/data/mockData';
import { generateWeeklyReport } from '@/services/aiService';

export function InsightsPage() {
  const [report, setReport] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateWeeklyReport().then((r) => {
      setReport(r);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold font-display text-white">AI Insights</h1>
        <p className="mt-2 text-gray-400">Deep analytics on your learning progress and performance.</p>
      </div>

      {/* Weekly AI Report */}
      <Card glow>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500/30 to-accent-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-brand-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Weekly AI Report</h3>
            <Badge color="brand">Auto-generated</Badge>
          </div>
          {loading ? (
            <AIThinking text="Generating your weekly report..." />
          ) : (
            <div className="space-y-2">
              {report?.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-brand-400 mt-1">•</span>
                  <p className="text-sm text-gray-200">{line}</p>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Charts grid */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Learning Progress */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-brand-400" />
              <h3 className="text-sm font-semibold text-white">Learning Progress</h3>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={knowledgeGrowthData}>
                  <defs>
                    <linearGradient id="insightsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="week" tick={{ fill: '#8a8aa8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#8a8aa8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'rgba(10,10,26,0.95)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="coverage" stroke="#8b5cf6" strokeWidth={2} fill="url(#insightsGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Subject Performance */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-4 h-4 text-accent-400" />
              <h3 className="text-sm font-semibold text-white">Subject Performance</h3>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="subject" tick={{ fill: '#8a8aa8', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#8a8aa8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'rgba(10,10,26,0.95)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '12px' }} cursor={{ fill: 'rgba(139,92,246,0.1)' }} />
                  <Bar dataKey="score" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Study Time */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-electric-400" />
              <h3 className="text-sm font-semibold text-white">Weekly Study Time</h3>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyStudyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" tick={{ fill: '#8a8aa8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#8a8aa8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'rgba(10,10,26,0.95)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '12px' }} cursor={{ fill: 'rgba(96,165,250,0.1)' }} />
                  <Bar dataKey="hours" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weak Topic Trends */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-warning-400" />
              <h3 className="text-sm font-semibold text-white">Weak Topic Trends</h3>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weakTopicTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="week" tick={{ fill: '#8a8aa8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#8a8aa8', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'rgba(10,10,26,0.95)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="DBMS" stroke="#ef4444" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Graphs" stroke="#f59e0b" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Probability" stroke="#3b82f6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
