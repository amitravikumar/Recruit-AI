import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Moon, Sun, Bell, User, Shield, Palette, Save } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { toast } from "sonner";
import { useState } from "react";

export const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [aiAutoPass, setAiAutoPass] = useState(true);

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and application settings</p>
      </div>

      {/* Appearance */}
      <Card className="p-6 glass-effect">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Appearance</h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Theme</Label>
              <p className="text-sm text-muted-foreground">
                Choose between light and dark mode
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("light")}
                className="gap-2"
              >
                <Sun className="w-4 h-4" />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("dark")}
                className="gap-2"
              >
                <Moon className="w-4 h-4" />
                Dark
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label>Background Style</Label>
            <Select defaultValue="gradient">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gradient">Corporate Gradient</SelectItem>
                <SelectItem value="solid">Solid Color</SelectItem>
                <SelectItem value="pattern">Subtle Pattern</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6 glass-effect">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Notifications</h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates about candidates and interviews via email
              </p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get instant notifications for urgent updates
              </p>
            </div>
            <Switch
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
        </div>
      </Card>

      {/* AI Settings */}
      <Card className="p-6 glass-effect">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">AI & Automation</h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Auto-pass 5★ Candidates to AI Queue</Label>
              <p className="text-sm text-muted-foreground">
                Automatically queue high-rated candidates for AI screening
              </p>
            </div>
            <Switch
              checked={aiAutoPass}
              onCheckedChange={setAiAutoPass}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <Label>AI Screening Threshold</Label>
            <Select defaultValue="70">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="60">60% - More candidates</SelectItem>
                <SelectItem value="70">70% - Balanced (Recommended)</SelectItem>
                <SelectItem value="80">80% - Strict filtering</SelectItem>
                <SelectItem value="90">90% - Very strict</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Profile */}
      <Card className="p-6 glass-effect">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">Profile Information</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input defaultValue="Sarah Johnson" />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue="sarah.johnson@doodlele.com" type="email" />
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <Select defaultValue="recruiter">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recruiter">Recruiter</SelectItem>
                <SelectItem value="hiring-manager">Hiring Manager</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg" onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};
