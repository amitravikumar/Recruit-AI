import { useState } from "react";
import { Plus, UserPlus, FileText, Upload, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SourceFlowModal } from "@/components/Candidates/SourceFlowModal";
import { JobDescriptionModal } from "@/components/QuickAdd/JobDescriptionModal";
import { ManualAddModal } from "@/components/QuickAdd/ManualAddModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const QuickAddButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFlowModal, setShowFlowModal] = useState(false);
  const [showJDModal, setShowJDModal] = useState<"paste" | "upload" | null>(null);
  const [showManualAdd, setShowManualAdd] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            size="lg"
            className={cn(
              "w-14 h-14 rounded-full shadow-glow hover:scale-110 transition-all",
              isOpen && "rotate-45"
            )}
          >
            <Plus className="w-6 h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuItem onClick={() => setShowFlowModal(true)}>
            <Info className="w-4 h-4 mr-2" />
            <div>
              <p className="font-medium">How It Works</p>
              <p className="text-xs text-muted-foreground">See complete candidate journey</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => { setIsOpen(false); setShowJDModal("paste"); }}>
            <FileText className="w-4 h-4 mr-2" />
            <div>
              <p className="font-medium">Paste Job Description</p>
              <p className="text-xs text-muted-foreground">AI finds matching candidates</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setIsOpen(false); setShowJDModal("upload"); }}>
            <Upload className="w-4 h-4 mr-2" />
            <div>
              <p className="font-medium">Upload Job Description</p>
              <p className="text-xs text-muted-foreground">AI extracts & matches candidates</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setIsOpen(false); setShowManualAdd(true); }}>
            <UserPlus className="w-4 h-4 mr-2" />
            <div>
              <p className="font-medium">Add Manually</p>
              <p className="text-xs text-muted-foreground">Enter candidate details</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {showFlowModal && (
        <SourceFlowModal onClose={() => setShowFlowModal(false)} />
      )}
      
      {showJDModal && (
        <JobDescriptionModal 
          open={!!showJDModal}
          onClose={() => setShowJDModal(null)}
          mode={showJDModal}
        />
      )}
      
      {showManualAdd && (
        <ManualAddModal 
          open={showManualAdd}
          onClose={() => setShowManualAdd(false)}
        />
      )}
    </div>
  );
};
