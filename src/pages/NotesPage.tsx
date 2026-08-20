import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Upload,
  Sparkles,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  MessageSquare,
  Send,
  Check,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, AIThinking } from '@/components/ui/Misc';
import { analyzeDocument } from '@/services/aiService';
import { demoNotes } from '@/data/mockData';

type AnalysisResult = {
  summary: string;
  concepts: string[];
  examQuestions: string[];
  weakAreas: string[];
};

export function NotesPage() {
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [askInput, setAskInput] = useState('');
  const [askResponse, setAskResponse] = useState<string | null>(null);
  const [askLoading, setAskLoading] = useState(false);

  async function selectNote(name: string) {
    setSelectedNote(name);
    setAnalysis(null);
    setAskResponse(null);
    setLoading(true);
    const result = await analyzeDocument(name);
    setAnalysis(result);
    setLoading(false);
  }

  async function askNotes() {
    if (!askInput.trim() || !selectedNote) return;
    setAskLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setAskResponse(
      `Based on your uploaded notes (${selectedNote}), here's the explanation:\n\nThe key concept here involves understanding the fundamental relationship between the data structures and their operations. Your notes cover this in Unit 3, specifically in the section about algorithmic complexity.\n\nThis answer is grounded in your uploaded material and references the concepts you've already studied.`
    );
    setAskLoading(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold font-display text-white">Talk to Your Notes</h1>
        <p className="mt-2 text-gray-400">Upload your study material and learn directly from it.</p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Upload className="w-5 h-5 text-brand-400" />
            <h3 className="text-lg font-semibold text-white">Upload Notes</h3>
            <Badge color="electric">PDF, PPT, TXT</Badge>
          </div>
          <input
            type="file"
            accept=".pdf,.ppt,.txt"
            className="hidden"
            id="file-upload"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) selectNote(file.name);
            }}
          />
          <label
            htmlFor="file-upload"
            className="block border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-brand-500/30 transition-colors cursor-pointer"
          >
            <FileText className="w-10 h-10 text-gray-500 mx-auto mb-3" />
            <p className="text-sm text-gray-400">Drag and drop your notes here, or click to browse</p>
            <p className="text-xs text-gray-600 mt-1">Supports PDF, PPT, and TXT files</p>
          </label>
        </CardContent>
      </Card>

      {/* Demo Files */}
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-3">Demo Files</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {demoNotes.map((note) => (
            <button
              key={note.id}
              onClick={() => selectNote(note.name)}
              className={`glass rounded-xl p-4 text-left transition-all glow-border-hover ${
                selectedNote === note.name ? 'border-brand-500/40 glow-border' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-error-500/20 to-orange-500/20 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-error-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{note.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{note.type} · {note.size}</p>
                </div>
              </div>
              {selectedNote === note.name && (
                <div className="mt-2 flex items-center gap-1 text-xs text-success-400">
                  <Check className="w-3 h-3" /> Selected
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Analysis */}
      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <AIThinking text="Analyzing your notes..." />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {analysis && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Summary */}
          <Card>
            <CardContent>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-brand-400" />
                <h3 className="text-lg font-semibold text-white">AI Summary</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">{analysis.summary}</p>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-4">
            {/* Important Concepts */}
            <Card>
              <CardContent>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-electric-400" />
                  <h3 className="text-sm font-semibold text-white">Important Concepts</h3>
                </div>
                <ul className="space-y-2">
                  {analysis.concepts.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-brand-400 mt-0.5">•</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Exam Questions */}
            <Card>
              <CardContent>
                <div className="flex items-center gap-2 mb-3">
                  <HelpCircle className="w-4 h-4 text-warning-400" />
                  <h3 className="text-sm font-semibold text-white">Exam Questions</h3>
                </div>
                <ul className="space-y-2">
                  {analysis.examQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-warning-400 mt-0.5">{i + 1}.</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Weak Areas */}
            <Card>
              <CardContent>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-error-400" />
                  <h3 className="text-sm font-semibold text-white">Weak Areas</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.weakAreas.map((w, i) => (
                    <Badge key={i} color="error">{w}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ask Your Notes */}
          <Card>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-accent-400" />
                <h3 className="text-lg font-semibold text-white">Ask Your Notes</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Ask any question and get an answer grounded in your uploaded material.
              </p>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={askInput}
                  onChange={(e) => setAskInput(e.target.value)}
                  placeholder="Explain backpropagation using only my uploaded notes."
                  className="flex-1 px-4 py-2.5 rounded-xl glass text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
                />
                <Button onClick={askNotes} disabled={!askInput.trim() || askLoading} icon={Send}>
                  Ask
                </Button>
              </div>
              {askLoading && <AIThinking text="Searching your notes..." />}
              {askResponse && !askLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-xl p-4 border border-accent-500/20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Badge color="success"><Check className="w-3 h-3" /> Answer grounded in your uploaded material</Badge>
                  </div>
                  <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">{askResponse}</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
