import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Candidate } from "@/types/candidate";

interface RejectModalProps {
  candidate: Candidate;
  open: boolean;
  onClose: () => void;
}

export const RejectModal = ({ candidate, open, onClose }: RejectModalProps) => {
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [notifyCandidate, setNotifyCandidate] = useState(true);

  const handleReject = () => {
    toast.success("Candidate rejected", {
      description: `${candidate.name} has been moved to rejected candidates.`
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reject Candidate - {candidate.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Reason for Rejection *</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="skills">Skills don't match requirements</SelectItem>
                <SelectItem value="experience">Insufficient experience</SelectItem>
                <SelectItem value="expectations">Salary expectations too high</SelectItem>
                <SelectItem value="availability">Not available for required timeline</SelectItem>
                <SelectItem value="culture">Not a cultural fit</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Additional Feedback (Optional)</Label>
            <Textarea
              placeholder="Internal notes about why this candidate was rejected..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="notify"
              checked={notifyCandidate}
              onCheckedChange={(checked) => setNotifyCandidate(checked as boolean)}
            />
            <label
              htmlFor="notify"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Send rejection email to candidate
            </label>
          </div>

          <div className="bg-destructive/10 p-3 rounded-lg text-xs text-destructive">
            ⚠️ This action cannot be undone. The candidate will be moved to rejected status.
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={handleReject}
              disabled={!reason}
            >
              Reject Candidate
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
