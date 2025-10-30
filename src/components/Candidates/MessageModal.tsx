import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { toast } from "sonner";
import { Candidate } from "@/types/candidate";

interface MessageModalProps {
  candidate: Candidate;
  open: boolean;
  onClose: () => void;
}

export const MessageModal = ({ candidate, open, onClose }: MessageModalProps) => {
  const [channel, setChannel] = useState<string>("email");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    toast.success(`Message sent via ${channel}!`, {
      description: `Your message has been sent to ${candidate.name}`
    });
    onClose();
    setMessage("");
  };

  const channelIcons = {
    email: <Mail className="w-4 h-4" />,
    whatsapp: <MessageSquare className="w-4 h-4" />,
    sms: <Phone className="w-4 h-4" />
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Send Message to {candidate.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Channel</Label>
            <Select value={channel} onValueChange={setChannel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email - {candidate.email}
                  </div>
                </SelectItem>
                <SelectItem value="whatsapp">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp - {candidate.phone}
                  </div>
                </SelectItem>
                <SelectItem value="sms">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    SMS - {candidate.phone}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
            />
          </div>

          <div className="bg-accent/50 p-3 rounded-lg text-xs text-muted-foreground">
            <p>💡 Quick templates: Request additional info, Schedule follow-up, Share job details</p>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSend} disabled={!message.trim()}>
              Send Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
