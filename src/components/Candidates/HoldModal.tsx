import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Candidate } from "@/types/candidate";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface HoldModalProps {
  candidate: Candidate;
  open: boolean;
  onClose: () => void;
}

export const HoldModal = ({ candidate, open, onClose }: HoldModalProps) => {
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const handleHold = () => {
    toast.success(`${candidate.name} has been put on hold`, {
      description: `Reason: ${reason || "No reason provided"}`,
    });
    onClose();
  };

  const holdReasons = [
    "Awaiting budget approval",
    "Position on hold",
    "Candidate requested more time",
    "Internal review required",
    "Waiting for references",
    "Other"
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Hold Candidate</DialogTitle>
          <DialogDescription>
            Put {candidate.name}'s application on hold. You can provide a reason and additional notes.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-3">
            <Label>Select Reason</Label>
            <RadioGroup value={reason} onValueChange={setReason}>
              {holdReasons.map((holdReason) => (
                <div key={holdReason} className="flex items-center space-x-2">
                  <RadioGroupItem value={holdReason} id={holdReason} />
                  <Label htmlFor={holdReason} className="font-normal cursor-pointer">
                    {holdReason}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional context or notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleHold} disabled={!reason}>
            Hold Candidate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
