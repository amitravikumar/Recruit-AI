import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Agent } from "@/types/candidate";
import { Activity, RefreshCw } from "lucide-react";

interface AgentModalProps {
  agent: Agent;
  onClose: () => void;
}

export const AgentModal = ({ agent, onClose }: AgentModalProps) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-primary" />
            {agent.name}
            <Badge variant={agent.status === "active" ? "default" : "secondary"}>
              {agent.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="glass-effect rounded-lg p-4">
            <h3 className="font-semibold mb-3">Agent Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Agent ID</p>
                <p className="font-mono">{agent.id}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Type</p>
                <p className="capitalize">{agent.type}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Last Run</p>
                <p>{new Date(agent.last_run).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Status</p>
                <Badge variant={agent.status === "active" ? "default" : "secondary"}>
                  {agent.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="glass-effect rounded-lg p-4">
            <h3 className="font-semibold mb-3">Activity Logs</h3>
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {agent.logs.map((log, idx) => (
                  <div key={idx} className="flex gap-3 pb-3 border-b border-border last:border-0">
                    <div className="w-1 h-1 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">{log.msg}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(log.t).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Re-run Agent
            </Button>
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
