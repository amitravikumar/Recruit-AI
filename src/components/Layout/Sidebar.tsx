import { LayoutDashboard, Users, Sparkles, KanbanSquare, BarChart3, Settings, Server } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import logo from "@/assets/logo.gif";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Candidates", path: "/candidates" },
  { icon: Sparkles, label: "AI Queue", path: "/ai-queue" },
  { icon: KanbanSquare, label: "Kanban", path: "/kanban" },
  { icon: BarChart3, label: "Reports", path: "/reports" },
  { icon: Server, label: "IT Admin", path: "/admin" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-sidebar fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-sidebar-border flex items-center gap-4">
        <img src={logo} alt="doodle logo" className="w-14 h-14" />
        <div>
          <h1 className="text-xl font-bold text-foreground">
            doodle
          </h1>
          <p className="text-sm text-muted-foreground tracking-wide">Recruit world</p>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth hover:bg-sidebar-accent group",
                isActive && "bg-sidebar-accent shadow-glow"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-smooth",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                <span
                  className={cn(
                    "text-sm font-medium transition-smooth",
                    isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )}
                >
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
