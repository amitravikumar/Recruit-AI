import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Mail, CheckCircle2 } from "lucide-react";

interface TimeSlot {
  date: string;
  time: string;
  available: boolean;
}

interface InterviewSchedulerProps {
  candidateName: string;
  onSchedule: (slot: TimeSlot) => void;
}

const mockTimeSlots: TimeSlot[] = [
  { date: "2025-10-29", time: "10:00 AM", available: true },
  { date: "2025-10-29", time: "2:00 PM", available: true },
  { date: "2025-10-30", time: "11:00 AM", available: true },
  { date: "2025-10-30", time: "3:00 PM", available: false },
  { date: "2025-10-31", time: "9:00 AM", available: true },
  { date: "2025-10-31", time: "1:00 PM", available: true },
];

export const InterviewScheduler = ({ candidateName, onSchedule }: InterviewSchedulerProps) => {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [scheduled, setScheduled] = useState(false);

  const handleSchedule = () => {
    if (selectedSlot) {
      setScheduled(true);
      setTimeout(() => onSchedule(selectedSlot), 2000);
    }
  };

  if (scheduled) {
    return (
      <div className="space-y-4">
        <div className="glass-effect rounded-lg p-6 text-center">
          <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Interview Scheduled!</h3>
          <p className="text-muted-foreground mb-4">
            Interview with {candidateName} on {selectedSlot?.date} at {selectedSlot?.time}
          </p>
          
          <div className="space-y-3 text-left">
            <div className="flex items-start gap-3 bg-primary/10 rounded p-3">
              <Mail className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold mb-1">Email sent to candidate:</p>
                <p className="text-muted-foreground">Subject: Interview Invitation - Senior Backend Engineer</p>
                <p className="text-muted-foreground mt-1">Dear {candidateName}, Your interview is scheduled for {selectedSlot?.date} at {selectedSlot?.time}. Meeting link: https://meet.timeless.ai/xyz123</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-secondary/10 rounded p-3">
              <Mail className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold mb-1">Email sent to recruiter:</p>
                <p className="text-muted-foreground">Calendar invite added to your schedule with candidate details and meeting link.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-accent/10 rounded p-3">
              <Calendar className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-semibold mb-1">Calendar Integration:</p>
                <p className="text-muted-foreground">Google Calendar / Outlook event created with Zoom/Meet link</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="glass-effect rounded-lg p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Schedule Interview with {candidateName}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4">
          AI has analyzed your calendar and suggested available time slots
        </p>

        <div className="grid grid-cols-2 gap-3">
          {mockTimeSlots.map((slot, idx) => (
            <button
              key={idx}
              disabled={!slot.available}
              onClick={() => setSelectedSlot(slot)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                !slot.available
                  ? "opacity-40 cursor-not-allowed border-border"
                  : selectedSlot === slot
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">{slot.date}</span>
                {!slot.available && (
                  <Badge variant="secondary" className="text-xs">Unavailable</Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span className="text-sm">{slot.time}</span>
              </div>
            </button>
          ))}
        </div>

        <Button 
          onClick={handleSchedule} 
          disabled={!selectedSlot}
          className="w-full mt-6"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Confirm & Send Invites
        </Button>
      </div>
    </div>
  );
};
