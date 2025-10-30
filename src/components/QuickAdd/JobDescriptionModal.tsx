import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface JobDescriptionModalProps {
  open: boolean;
  onClose: () => void;
  mode: "paste" | "upload";
}

export const JobDescriptionModal = ({ open, onClose, mode }: JobDescriptionModalProps) => {
  const [jdText, setJdText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("AI is analyzing the job description and finding matching candidates...", {
        description: "Found 12 potential matches. Auto-passing 5★ candidates to AI Queue."
      });
      onClose();
      setJdText("");
      setFile(null);
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "paste" ? "Paste Job Description" : "Upload Job Description"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {mode === "paste" ? (
            <div className="space-y-2">
              <Label>Job Description</Label>
              <Textarea
                placeholder="Paste the complete job description here..."
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                className="min-h-[300px]"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Upload JD File</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileChange}
                  className="max-w-xs mx-auto"
                />
                {file && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Selected: {file.name}
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="bg-accent/50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium text-sm">AI Will Analyze:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Required skills and keywords</li>
                  <li>• Experience level and qualifications</li>
                  <li>• Search across all integrated sources</li>
                  <li>• Auto-pass 5★ matches to AI Queue</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button 
              onClick={handleSubmit}
              disabled={mode === "paste" ? !jdText.trim() : !file || isProcessing}
            >
              {isProcessing ? "Processing..." : "Find Matching Candidates"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
