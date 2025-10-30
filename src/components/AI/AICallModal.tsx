import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Candidate } from "@/types/candidate";
import { Mic, PhoneOff, MessageSquare, Phone, PhoneIncoming } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InterviewScheduler } from "./InterviewScheduler";
import { TestSender } from "./TestSender";

interface AICallModalProps {
  candidate: Candidate;
  onClose: () => void;
}

const mockQuestions = [
  {
    q: "Tell me about your most recent project involving Python and ETL workflows.",
    a: "I built a comprehensive data pipeline that consumed data from S3, used Apache Airflow for orchestration, and transformed data using pandas and PySpark. The pipeline processed over 2TB of data daily."
  },
  {
    q: "Can you describe a performance optimization you implemented?",
    a: "I implemented partitioning strategies and vectorized operations. I also reworked joins to minimize data shuffles, which improved processing time by 60%."
  },
  {
    q: "How do you handle conflicts with team members?",
    a: "I believe in direct but respectful communication. I schedule one-on-one discussions to understand their perspective and work together on finding common ground."
  }
];

const mockScores = {
  technical: 88,
  soft: 75,
  culture: 80
};

export const AICallModal = ({ candidate, onClose }: AICallModalProps) => {
  const [callState, setCallState] = useState<"intro" | "waiting" | "no-answer" | "connecting" | "questions" | "completed" | "test-send" | "scheduling">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [callAttempt, setCallAttempt] = useState(1);

  const startCall = () => {
    setCallState("waiting");
    
    // Simulate random no-answer scenario (30% chance)
    const willAnswer = Math.random() > 0.3;
    
    setTimeout(() => {
      if (willAnswer || callAttempt > 2) {
        setCallState("connecting");
        setTimeout(() => {
          setCallState("questions");
        }, 2000);
      } else {
        setCallState("no-answer");
      }
    }, 2500);
  };

  const retryCall = () => {
    setCallAttempt(callAttempt + 1);
    startCall();
  };
  
  const nextQuestion = () => {
    if (currentQ < mockQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setCallState("completed");
    }
  };

  const composite = Math.round((mockScores.technical * 0.5) + (mockScores.soft * 0.3) + (mockScores.culture * 0.2));

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>AI Screening Call - {candidate.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6">
          {/* Left: Video/Audio Area */}
          <div className="space-y-4">
            <div className="aspect-video bg-gradient-primary rounded-lg flex items-center justify-center relative overflow-hidden">
              {callState === "intro" && (
                <div className="text-center p-6">
                  <Mic className="w-16 h-16 mx-auto mb-4 text-white" />
                  <p className="text-white font-semibold">Ready to start AI screening?</p>
                  <p className="text-white/70 text-sm mt-2">AI will ask {mockQuestions.length} questions</p>
                </div>
              )}
              {callState === "waiting" && (
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
                  <p className="text-white font-semibold">Calling candidate...</p>
                  <p className="text-white/70 text-sm mt-2">Dialing {candidate.phone}</p>
                  <p className="text-white/50 text-xs mt-1">Attempt {callAttempt} of 3</p>
                </div>
              )}
              {callState === "no-answer" && (
                <div className="text-center p-6">
                  <PhoneOff className="w-16 h-16 mx-auto mb-4 text-warning" />
                  <p className="text-white font-semibold">No Answer</p>
                  <p className="text-white/70 text-sm mt-2">Candidate didn't pick up</p>
                  <p className="text-white/50 text-xs mt-1">Will auto-retry in 30 minutes</p>
                </div>
              )}
              {callState === "connecting" && (
                <div className="text-center p-6">
                  <Phone className="w-16 h-16 mx-auto mb-4 text-white animate-pulse" />
                  <p className="text-white font-semibold">Candidate connected!</p>
                  <p className="text-white/70 text-sm mt-2">Starting interview...</p>
                </div>
              )}
              {callState === "questions" && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/90 to-secondary/90">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full border-4 border-white/30 bg-white/10 mx-auto mb-4 flex items-center justify-center">
                      <Mic className="w-12 h-12 text-white animate-pulse" />
                    </div>
                    <p className="text-white font-semibold">In Progress</p>
                    <p className="text-white/70 text-sm mt-2">Question {currentQ + 1} of {mockQuestions.length}</p>
                  </div>
                </div>
              )}
              {callState === "completed" && (
                <div className="text-center p-6">
                  <div className="w-20 h-20 rounded-full bg-success mx-auto mb-4 flex items-center justify-center">
                    <MessageSquare className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-white font-semibold">Call Completed</p>
                  <p className="text-white/70 text-sm mt-2">Generating scorecard...</p>
                </div>
              )}
            </div>

            {callState === "intro" && (
              <Button onClick={startCall} className="w-full">
                <Mic className="w-4 h-4 mr-2" />
                Start AI Call
              </Button>
            )}

            {callState === "waiting" && (
              <Button disabled className="w-full">
                <Phone className="w-4 h-4 mr-2 animate-pulse" />
                Calling... (Attempt {callAttempt})
              </Button>
            )}

            {callState === "no-answer" && (
              <div className="space-y-2">
                <Button onClick={retryCall} className="w-full">
                  <PhoneIncoming className="w-4 h-4 mr-2" />
                  Retry Call (Attempt {callAttempt + 1})
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  AI will auto-retry every 30 minutes (max 3 attempts)
                </p>
              </div>
            )}

            {callState === "connecting" && (
              <Button disabled className="w-full">
                <Phone className="w-4 h-4 mr-2 animate-pulse" />
                Connecting...
              </Button>
            )}

            {callState === "questions" && (
              <Button onClick={nextQuestion} variant="destructive" className="w-full">
                <PhoneOff className="w-4 h-4 mr-2" />
                Next Question ({currentQ + 1}/{mockQuestions.length})
              </Button>
            )}
          </div>

          {/* Right: Transcript & Scores */}
          <div className="space-y-4">
            {(callState === "intro" || callState === "waiting" || callState === "no-answer" || callState === "connecting") && (
              <div className="glass-effect rounded-lg p-6">
                <h3 className="font-semibold mb-3">AI Screening Process</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs">1</span>
                    </div>
                    <p>JD-driven technical questions based on {candidate.job_title || "role requirements"}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs">2</span>
                    </div>
                    <p>Psychometric and behavioral assessment questions</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs">3</span>
                    </div>
                    <p>Real-time speech-to-text transcription and analysis</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs">4</span>
                    </div>
                    <p>Automated scoring on technical, soft skills, and cultural fit</p>
                  </div>
                </div>
              </div>
            )}
            
            {callState === "questions" && (
              <div className="glass-effect rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Live Transcript
                </h3>
                <ScrollArea className="h-64">
                  <div className="space-y-4">
                    {mockQuestions.slice(0, currentQ + 1).map((qa, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="bg-secondary/10 rounded p-3">
                          <p className="text-xs text-secondary mb-1">AI Question:</p>
                          <p className="text-sm">{qa.q}</p>
                        </div>
                        <div className="bg-primary/10 rounded p-3">
                          <p className="text-xs text-primary mb-1">Candidate Answer:</p>
                          <p className="text-sm">{qa.a}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {callState === "completed" && (
              <div className="glass-effect rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-lg mb-4">AI Scorecard</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Technical Skills</span>
                      <span className="text-sm font-semibold">{mockScores.technical}/100</span>
                    </div>
                    <Progress value={mockScores.technical} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Soft Skills</span>
                      <span className="text-sm font-semibold">{mockScores.soft}/100</span>
                    </div>
                    <Progress value={mockScores.soft} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Cultural Fit</span>
                      <span className="text-sm font-semibold">{mockScores.culture}/100</span>
                    </div>
                    <Progress value={mockScores.culture} className="h-2" />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Composite Score</span>
                    <Badge variant={composite >= 70 ? "default" : "secondary"} className="text-lg px-4 py-1">
                      {composite}/100
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {composite >= 70 ? "✓ Recommended for technical test" : "Needs human review"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" onClick={() => setCallState("test-send")}>
                    Send Technical Test
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setCallState("scheduling")}>
                    Schedule Interview Directly
                  </Button>
                </div>
              </div>
            )}

            {callState === "test-send" && (
              <TestSender 
                candidateName={candidate.name}
                onComplete={() => setCallState("scheduling")}
              />
            )}

            {callState === "scheduling" && (
              <InterviewScheduler 
                candidateName={candidate.name}
                onSchedule={() => {
                  setTimeout(() => onClose(), 2000);
                }}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
