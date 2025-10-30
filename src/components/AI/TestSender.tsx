import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, CheckCircle2, Clock, MessageSquare } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface TestSenderProps {
  candidateName: string;
  onComplete: () => void;
}

export const TestSender = ({ candidateName, onComplete }: TestSenderProps) => {
  const [stage, setStage] = useState<"send" | "sent" | "reminder1" | "reminder2" | "completed">("send");

  const handleSend = () => {
    setStage("sent");
    setTimeout(() => setStage("reminder1"), 3000);
    setTimeout(() => setStage("reminder2"), 6000);
    setTimeout(() => setStage("completed"), 9000);
  };

  const handleTestComplete = () => {
    onComplete();
  };

  if (stage === "send") {
    return (
      <div className="glass-effect rounded-lg p-6">
        <h3 className="font-semibold mb-4">Send Technical Assessment</h3>
        
        <div className="space-y-4 mb-6">
          <div className="bg-secondary/10 rounded p-4">
            <p className="text-sm font-semibold mb-2">Test Details:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• AWS Development Assessment</li>
              <li>• Duration: 90 minutes</li>
              <li>• Topics: Python, ETL, AWS Services</li>
              <li>• Deadline: 48 hours from receipt</li>
            </ul>
          </div>

          <div className="bg-primary/10 rounded p-4">
            <p className="text-sm font-semibold mb-2">Email Preview:</p>
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>To:</strong> {candidateName}</p>
              <p><strong>Subject:</strong> Technical Assessment - Senior Backend Engineer</p>
              <p className="pt-2">Hi {candidateName},</p>
              <p>Congratulations on passing the initial screening! Please complete the technical assessment within 48 hours.</p>
              <p className="pt-2">
                <Button size="sm" variant="outline">Start Assessment</Button>
              </p>
            </div>
          </div>
        </div>

        <Button onClick={handleSend} className="w-full">
          <Mail className="w-4 h-4 mr-2" />
          Send Test & Enable Auto-Reminders
        </Button>
      </div>
    );
  }

  if (stage === "sent" || stage === "reminder1" || stage === "reminder2") {
    return (
      <div className="glass-effect rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 className="w-6 h-6 text-success" />
          <div>
            <h3 className="font-semibold">Test Sent Successfully</h3>
            <p className="text-sm text-muted-foreground">Tracking candidate progress...</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-success/10 rounded p-3">
            <Mail className="w-4 h-4 text-success mt-1" />
            <div className="text-sm">
              <p className="font-semibold">✓ Initial Email Sent</p>
              <p className="text-muted-foreground">Test link sent to {candidateName}</p>
              <p className="text-xs text-muted-foreground mt-1">Oct 28, 2025 at 2:30 PM</p>
            </div>
          </div>

          {(stage === "reminder1" || stage === "reminder2") && (
            <div className="flex items-start gap-3 bg-warning/10 rounded p-3">
              <MessageSquare className="w-4 h-4 text-warning mt-1" />
              <div className="text-sm">
                <p className="font-semibold">✓ Reminder 1 Sent (Email + WhatsApp)</p>
                <p className="text-muted-foreground">No activity detected - sent reminder</p>
                <p className="text-xs text-muted-foreground mt-1">Oct 29, 2025 at 2:30 PM (24h later)</p>
              </div>
            </div>
          )}

          {stage === "reminder2" && (
            <div className="flex items-start gap-3 bg-warning/10 rounded p-3">
              <MessageSquare className="w-4 h-4 text-warning mt-1" />
              <div className="text-sm">
                <p className="font-semibold">✓ Reminder 2 Sent (Email + BOTIM)</p>
                <p className="text-muted-foreground">Final reminder before deadline</p>
                <p className="text-xs text-muted-foreground mt-1">Oct 30, 2025 at 2:30 PM (48h later)</p>
              </div>
            </div>
          )}

          <div className={`flex items-start gap-3 rounded p-3 ${stage === "reminder2" ? "bg-primary/10 animate-pulse" : "bg-border/10"}`}>
            <Clock className={`w-4 h-4 mt-1 ${stage === "reminder2" ? "text-primary" : "text-muted-foreground"}`} />
            <div className="text-sm">
              <p className="font-semibold">⏳ Waiting for Completion</p>
              <p className="text-muted-foreground">Deadline: Oct 30, 2025 at 2:30 PM</p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Time elapsed</span>
            <span className="text-muted-foreground">48 hours remaining</span>
          </div>
          <Progress value={stage === "sent" ? 10 : stage === "reminder1" ? 50 : 90} className="h-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <CheckCircle2 className="w-8 h-8 text-success" />
        <div>
          <h3 className="font-semibold text-lg">Test Completed!</h3>
          <p className="text-sm text-muted-foreground">{candidateName} submitted the assessment</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3 bg-success/10 rounded p-3">
          <CheckCircle2 className="w-4 h-4 text-success mt-1" />
          <div className="text-sm flex-1">
            <p className="font-semibold">Assessment Results</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <p className="text-xs text-muted-foreground">Score</p>
                <p className="font-semibold text-success">87/100</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Time Taken</p>
                <p className="font-semibold">72 minutes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary/10 rounded p-4">
          <p className="text-sm font-semibold mb-2">✓ AI Analysis Complete</p>
          <p className="text-sm text-muted-foreground">
            Strong performance on Python and ETL questions. AWS knowledge is solid. 
            Recommended for technical interview round.
          </p>
        </div>

        <div className="bg-accent/10 rounded p-4">
          <p className="text-sm font-semibold mb-2">Next Step</p>
          <p className="text-sm text-muted-foreground mb-3">
            AI will now call the candidate to schedule a technical interview with the recruiter
          </p>
        </div>
      </div>

      <Button onClick={handleTestComplete} className="w-full">
        Proceed to Interview Scheduling
      </Button>
    </div>
  );
};
