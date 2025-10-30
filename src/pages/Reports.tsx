import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Calendar, TrendingUp, Users, Clock, Target, Award, DollarSign } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";

const timeToHireData = [
  { position: "Backend Engineer", days: 18, target: 21 },
  { position: "Frontend Dev", days: 15, target: 21 },
  { position: "DevOps Engineer", days: 22, target: 21 },
  { position: "Data Scientist", days: 25, target: 28 },
  { position: "Product Manager", days: 30, target: 35 },
];

const costPerHireData = [
  { month: "Jan", cost: 2800, hires: 12 },
  { month: "Feb", cost: 2650, hires: 15 },
  { month: "Mar", cost: 2400, hires: 18 },
  { month: "Apr", cost: 2200, hires: 22 },
  { month: "May", cost: 2100, hires: 26 },
  { month: "Jun", cost: 1950, hires: 30 },
];

const aiPerformanceData = [
  { metric: "Screening Accuracy", value: 94, target: 90 },
  { metric: "Auto-qualification Rate", value: 68, target: 65 },
  { metric: "Interview Show Rate", value: 87, target: 80 },
  { metric: "Offer Acceptance", value: 82, target: 75 },
];

const sourceROIData = [
  { source: "LinkedIn", cost: 12500, hires: 42, costPerHire: 298 },
  { source: "Naukri Gulf", cost: 8200, hires: 28, costPerHire: 293 },
  { source: "Indeed", cost: 5400, hires: 18, costPerHire: 300 },
  { source: "Referrals", cost: 2400, hires: 12, costPerHire: 200 },
];

const diversityData = [
  { month: "Jan", female: 32, male: 68 },
  { month: "Feb", female: 35, male: 65 },
  { month: "Mar", female: 38, male: 62 },
  { month: "Apr", female: 41, male: 59 },
  { month: "May", female: 43, male: 57 },
  { month: "Jun", female: 45, male: 55 },
];

export const Reports = () => {
  const [timeRange, setTimeRange] = useState("last-30-days");
  const [department, setDepartment] = useState("all");

  const handleExport = (reportType: string) => {
    // Simulate export
    console.log(`Exporting ${reportType} report...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive recruitment insights for leadership</p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-90-days">Last 90 Days</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          <TabsTrigger value="cost">Cost Analysis</TabsTrigger>
          <TabsTrigger value="diversity">Diversity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Executive Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 glass-effect">
              <div className="flex items-center justify-between mb-3">
                <Users className="w-8 h-8 text-primary" />
                <span className="text-sm text-success font-semibold">↑ 23%</span>
              </div>
              <h3 className="text-3xl font-bold mb-1">1,247</h3>
              <p className="text-sm text-muted-foreground">Total Candidates</p>
              <p className="text-xs text-muted-foreground mt-2">vs. 1,013 last period</p>
            </Card>

            <Card className="p-6 glass-effect">
              <div className="flex items-center justify-between mb-3">
                <Clock className="w-8 h-8 text-secondary" />
                <span className="text-sm text-success font-semibold">↓ 15%</span>
              </div>
              <h3 className="text-3xl font-bold mb-1">18 days</h3>
              <p className="text-sm text-muted-foreground">Avg Time to Hire</p>
              <p className="text-xs text-muted-foreground mt-2">Target: 21 days</p>
            </Card>

            <Card className="p-6 glass-effect">
              <div className="flex items-center justify-between mb-3">
                <DollarSign className="w-8 h-8 text-accent" />
                <span className="text-sm text-success font-semibold">↓ 31%</span>
              </div>
              <h3 className="text-3xl font-bold mb-1">$1,950</h3>
              <p className="text-sm text-muted-foreground">Cost per Hire</p>
              <p className="text-xs text-muted-foreground mt-2">vs. $2,800 in Jan</p>
            </Card>

            <Card className="p-6 glass-effect">
              <div className="flex items-center justify-between mb-3">
                <Award className="w-8 h-8 text-success" />
                <span className="text-sm text-success font-semibold">↑ 12%</span>
              </div>
              <h3 className="text-3xl font-bold mb-1">82%</h3>
              <p className="text-sm text-muted-foreground">Offer Acceptance</p>
              <p className="text-xs text-muted-foreground mt-2">Target: 75%</p>
            </Card>
          </div>

          {/* Time to Hire by Position */}
          <Card className="p-6 glass-effect">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Time to Hire by Position
              </h3>
              <Button variant="outline" size="sm" onClick={() => handleExport('time-to-hire')}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timeToHireData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="position" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={120} />
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
                <Bar dataKey="days" fill="#1EA7FF" name="Actual Days" radius={[0, 8, 8, 0]} />
                <Bar dataKey="target" fill="#7C5CFF" name="Target Days" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        {/* Efficiency Tab */}
        <TabsContent value="efficiency" className="space-y-6">
          {/* AI Performance Metrics */}
          <Card className="p-6 glass-effect">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                AI Screening Performance
              </h3>
              <Button variant="outline" size="sm" onClick={() => handleExport('ai-performance')}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={aiPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
                <Bar dataKey="value" fill="#00C48C" name="Actual %" radius={[8, 8, 0, 0]} />
                <Bar dataKey="target" fill="#FFB86B" name="Target %" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Source ROI Table */}
          <Card className="p-6 glass-effect">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Source ROI Analysis
              </h3>
              <Button variant="outline" size="sm" onClick={() => handleExport('source-roi')}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Source</th>
                    <th className="text-right py-3 px-4 font-semibold">Total Cost</th>
                    <th className="text-right py-3 px-4 font-semibold">Hires</th>
                    <th className="text-right py-3 px-4 font-semibold">Cost per Hire</th>
                    <th className="text-right py-3 px-4 font-semibold">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {sourceROIData.map((source, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-accent/50 transition-colors">
                      <td className="py-3 px-4 font-medium">{source.source}</td>
                      <td className="text-right py-3 px-4">${source.cost.toLocaleString()}</td>
                      <td className="text-right py-3 px-4">{source.hires}</td>
                      <td className="text-right py-3 px-4">${source.costPerHire}</td>
                      <td className="text-right py-3 px-4">
                        <span className={`font-semibold ${source.costPerHire < 250 ? 'text-success' : 'text-warning'}`}>
                          {source.costPerHire < 250 ? 'Excellent' : 'Good'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Cost Analysis Tab */}
        <TabsContent value="cost" className="space-y-6">
          <Card className="p-6 glass-effect">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Cost per Hire Trend
              </h3>
              <Button variant="outline" size="sm" onClick={() => handleExport('cost-trend')}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={costPerHireData}>
                <defs>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1EA7FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1EA7FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
                <Area 
                  type="monotone" 
                  dataKey="cost" 
                  stroke="#1EA7FF" 
                  fillOpacity={1} 
                  fill="url(#colorCost)" 
                  name="Cost per Hire ($)"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="hires" 
                  stroke="#00C48C" 
                  strokeWidth={2} 
                  name="Total Hires"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-success/10 rounded-lg">
              <p className="text-sm font-semibold text-success">
                💡 Cost Savings: $850 per hire compared to January (31% reduction)
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                AI automation has significantly reduced screening time and improved candidate quality
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Diversity Tab */}
        <TabsContent value="diversity" className="space-y-6">
          <Card className="p-6 glass-effect">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Gender Diversity Trend
              </h3>
              <Button variant="outline" size="sm" onClick={() => handleExport('diversity')}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={diversityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
                <Line type="monotone" dataKey="female" stroke="#FF6B9D" strokeWidth={2} name="Female %" />
                <Line type="monotone" dataKey="male" stroke="#1EA7FF" strokeWidth={2} name="Male %" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-primary/10 rounded-lg">
              <p className="text-sm font-semibold text-primary">
                📈 Progress: Female representation increased from 32% to 45% (6 months)
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                AI-driven sourcing has improved gender balance across technical roles
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
