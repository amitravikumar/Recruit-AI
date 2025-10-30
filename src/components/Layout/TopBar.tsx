import { useState } from "react";
import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchResultsModal } from "@/components/Search/SearchResultsModal";

export const TopBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchResults(true);
    }
  };

  return (
    <>
      <header className="h-16 bg-card border-b border-border fixed top-0 right-0 left-64 z-10 flex items-center justify-between px-6">
        <div className="flex-1 max-w-xl">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidates, jobs, or keywords..."
              className="pl-10 bg-background border-border"
            />
          </form>
        </div>
      
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <SearchResultsModal
        open={showSearchResults}
        onClose={() => setShowSearchResults(false)}
        searchQuery={searchQuery}
      />
    </>
  );
};
