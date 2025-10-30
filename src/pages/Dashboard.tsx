import { Card } from "@/components/ui/card";
import { Users, BrainCircuit, Clock, TrendingUp, CheckCircle2, Calendar, Target, FileText } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const kpiData = [
  { label: "Total Candidates", value: "1,247", change: "+12%", icon: Users, color: "text-primary" },
  { label: "In AI Queue", value: "89", change: "+8%", icon: BrainCircuit, color: "text-secondary" },
  { label: "Avg Time to Hire", value: "18 days", change: "-15%", icon: Clock, color: "text-success" },
  { label: "AI Efficiency", value: "94%", change: "+5%", icon: TrendingUp, color: "text-accent" },
];

const hiringFunnelData = [
  { stage: "Sourced", count: 1247, color: "#1EA7FF" },
  { stage: "AI Screened", count: 856, color: "#7C5CFF" },
  { stage: "Test Sent", count: 432, color: "#00C48C" },
  { stage: "Interviewed", count: 234, color: "#FFB86B" },
  { stage: "Offered", count: 89, color: "#FF6B9D" },
  { stage: "Hired", count: 67, color: "#00D9FF" },
];

const weeklyTrendData = [
  { week: "Week 1", sourced: 280, screened: 195, hired: 12 },
  { week: "Week 2", sourced: 310, screened: 220, hired: 15 },
  { week: "Week 3", sourced: 295, screened: 210, hired: 14 },
  { week: "Week 4", sourced: 362, screened: 231, hired: 26 },
];

const sourceEffectivenessData = [
  { name: "LinkedIn", value: 42, candidates: 524 },
  { name: "Naukri Gulf", value: 28, candidates: 349 },
  { name: "Indeed", value: 18, candidates: 224 },
  { name: "Referrals", value: 12, candidates: 150 },
];

const COLORS = ["#1EA7FF", "#7C5CFF", "#00C48C", "#FFB86B"];

const recentActivity = [
  { type: "hired", candidate: "Mohammed Ali", position: "Senior Backend Engineer", time: "2 hours ago" },
  { type: "interview", candidate: "Fatima Hassan", position: "DevOps Engineer", time: "4 hours ago" },
  { type: "test", candidate: "Ahmed Khan", position: "Full Stack Developer", time: "6 hours ago" },
  { type: "screened", candidate: "Layla Ibrahim", position: "Frontend Developer", time: "8 hours ago" },
  { type: "sourced", candidate: "Omar Farooq", position: "Data Engineer", time: "10 hours ago" },
];

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your recruitment pipeline and key metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <Card key={kpi.label} className="p-6 glass-effect hover-scale">
            <div className="flex items-center justify-between mb-4">
              <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
              <span className={`text-sm font-semibold ${kpi.change.startsWith('+') ? 'text-success' : 'text-primary'}`}>
                {kpi.change}
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{kpi.value}</h3>
            <p className="text-sm text-muted-foreground">{kpi.label}</p>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hiring Funnel */}
        <Card className="p-6 glass-effect">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Hiring Funnel
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hiringFunnelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="stage" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))"
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {hiringFunnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Source Effectiveness */}
        <Card className="p-6 glass-effect">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Source Effectiveness
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sourceEffectivenessData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {sourceEffectivenessData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))"
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Weekly Trend */}
      <Card className="p-6 glass-effect">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Weekly Recruitment Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))"
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              itemStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Legend />
            <Line type="monotone" dataKey="sourced" stroke="#1EA7FF" strokeWidth={2} name="Sourced" />
            <Line type="monotone" dataKey="screened" stroke="#7C5CFF" strokeWidth={2} name="AI Screened" />
            <Line type="monotone" dataKey="hired" stroke="#00C48C" strokeWidth={2} name="Hired" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6 glass-effect">
        <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-start gap-4 pb-4 border-b border-border last:border-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                activity.type === 'hired' ? 'bg-success/20' :
                activity.type === 'interview' ? 'bg-primary/20' :
                activity.type === 'test' ? 'bg-secondary/20' :
                activity.type === 'screened' ? 'bg-accent/20' :
                'bg-muted'
              }`}>
                {activity.type === 'hired' && <CheckCircle2 className="w-5 h-5 text-success" />}
                {activity.type === 'interview' && <Calendar className="w-5 h-5 text-primary" />}
                {activity.type === 'test' && <FileText className="w-5 h-5 text-secondary" />}
                {activity.type === 'screened' && <BrainCircuit className="w-5 h-5 text-accent" />}
                {activity.type === 'sourced' && <Users className="w-5 h-5 text-muted-foreground" />}
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.candidate}</p>
                <p className="text-sm text-muted-foreground">{activity.position}</p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
