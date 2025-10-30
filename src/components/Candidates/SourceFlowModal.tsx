import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight, Search, Sparkles, Phone, FileCheck, Calendar, CheckCircle, FileText } from "lucide-react";

interface SourceFlowModalProps {
  onClose: () => void;
}

export const SourceFlowModal = ({ onClose }: SourceFlowModalProps) => {
  const flowSteps = [
    {
      icon: FileText,
      title: "Resume Sources",
      description: "Connect multiple job boards and sources for automated candidate discovery",
      details: ["LinkedIn", "Naukri Gulf", "Bayt", "Indeed", "Google Drive", "Manual upload"]
    },
    {
      icon: Search,
      title: "Source Matching",
      description: "AI searches platforms using keywords from job description or manual input",
      details: ["Keyword extraction from JD", "Multi-platform search", "Resume parsing"]
    },
    {
      icon: Sparkles,
      title: "AI Analysis",
      description: "AI analyzes resumes and calculates match score based on skills, experience, and job requirements",
      details: ["Semantic matching", "Experience validation", "Rating assignment (1-5 stars)"]
    },
    {
      icon: CheckCircle,
      title: "Auto-Queue",
      description: "Candidates with 5★ rating + Available status automatically pass to AI Queue for screening",
      details: ["Auto-filtering", "Priority assignment", "Activity logging"]
    },
    {
      icon: Phone,
      title: "AI Pre-screening",
      description: "AI conducts voice/video call with structured questions based on JD, psychometric assessment, and skill validation",
      details: ["JD-driven questions", "Real-time transcription", "Behavioral assessment"]
    },
    {
      icon: FileCheck,
      title: "Testing & Scoring",
      description: "AI sends technical tests, tracks completion, and generates comprehensive scorecard",
      details: ["Automated test dispatch", "Multi-channel reminders", "Score aggregation"]
    },
    {
      icon: Calendar,
      title: "Interview Scheduling",
      description: "AI schedules interviews based on recruiter's calendar availability and sends invites via email/WhatsApp/BOTIM",
      details: ["Calendar integration", "Multi-channel notifications", "Automated reminders"]
    }
  ];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Complete Candidate Journey</DialogTitle>
          <p className="text-muted-foreground">How AI sources, screens, and schedules candidates end-to-end</p>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-12rem)] pr-4">
          <div className="space-y-6 py-4">
            {flowSteps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                      <span className="text-xs text-muted-foreground">Step {idx + 1}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                    <ul className="space-y-1">
                      {step.details.map((detail, detailIdx) => (
                        <li key={detailIdx} className="text-xs text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {idx < flowSteps.length - 1 && (
                  <div className="absolute left-6 top-14 w-0.5 h-12 bg-gradient-to-b from-primary to-transparent" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-3 pt-4 border-t border-border">
          <Button onClick={onClose} className="flex-1">Got it!</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};