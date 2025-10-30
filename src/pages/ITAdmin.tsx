import { useState } from "react";
import { Activity, AlertCircle, CheckCircle, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Agent } from "@/types/candidate";
import { AgentModal } from "@/components/Admin/AgentModal";

const mockAgents: Agent[] = [
  {
    id: "agent_matcher",
    name: "Resume Matcher",
    type: "matcher",
    status: "active",
    last_run: "2025-10-27T11:00Z",
    logs: [
      { t: "2025-10-27T11:00Z", msg: "Fetched 12 profiles from LinkedIn" },
      { t: "2025-10-27T10:55Z", msg: "Fetched 8 profiles from Naukri Gulf" },
      { t: "2025-10-27T10:50Z", msg: "Matching completed for 5 candidates" },
    ]
  },
  {
    id: "agent_screener",
    name: "AI Screener",
    type: "screener",
    status: "active",
    last_run: "2025-10-27T10:45Z",
    logs: [
      { t: "2025-10-27T10:45Z", msg: "Completed screening for candidate cand_001" },
      { t: "2025-10-27T10:30Z", msg: "Started screening session" },
    ]
  },
  {
    id: "agent_tester",
    name: "Test Distributor",
    type: "tester",
    status: "active",
    last_run: "2025-10-27T09:30Z",
    logs: [
      { t: "2025-10-27T09:30Z", msg: "Sent test to 3 candidates" },
      { t: "2025-10-27T09:00Z", msg: "Reminder sent to 2 candidates" },
    ]
  },
  {
    id: "agent_scheduler",
    name: "Interview Scheduler",
    type: "scheduler",
    status: "inactive",
    last_run: "2025-10-26T16:00Z",
    logs: [
      { t: "2025-10-26T16:00Z", msg: "Scheduled 1 interview" },
    ]
  },
];

export const ITAdmin = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const activeCount = mockAgents.filter(a => a.status === "active").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">IT Admin Console</h1>
        <p className="text-muted-foreground">Monitor and manage AI agents and integrations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Server className="w-8 h-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{mockAgents.length}</p>
              <p className="text-sm text-muted-foreground">Total Agents</p>
            </div>
          </div>
        </div>

        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-8 h-8 text-success" />
            <div>
              <p className="text-2xl font-bold">{activeCount}</p>
              <p className="text-sm text-muted-foreground">Active Agents</p>
            </div>
          </div>
        </div>

        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-8 h-8 text-warning" />
            <div>
              <p className="text-2xl font-bold">98.5%</p>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-effect rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">AI Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockAgents.map((agent) => (
            <div
              key={agent.id}
              className="glass-effect rounded-lg p-4 hover:shadow-glow transition-smooth cursor-pointer"
              onClick={() => setSelectedAgent(agent)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Server className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{agent.name}</h3>
                    <p className="text-xs text-muted-foreground capitalize">{agent.type}</p>
                  </div>
                </div>
                <Badge variant={agent.status === "active" ? "default" : "secondary"}>
                  {agent.status === "active" ? (
                    <CheckCircle className="w-3 h-3 mr-1" />
                  ) : (
                    <AlertCircle className="w-3 h-3 mr-1" />
                  )}
                  {agent.status}
                </Badge>
              </div>
              
              <div className="text-xs text-muted-foreground">
                Last run: {new Date(agent.last_run).toLocaleString()}
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-3">
                View Logs
              </Button>
            </div>
          ))}
        </div>
      </div>

      {selectedAgent && (
        <AgentModal
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </div>
  );
};
