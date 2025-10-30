import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MessageSquare, Send, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your AI recruitment assistant. Ask me anything about candidates, job openings, hiring status, or recruitment metrics."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "candidates": "Currently, you have 6 active candidates across different stages: 3 in AI Queue, 1 Qualified, and 2 in New status. The top-rated candidates are Aisha Khan and Mohamed Ali, both with 5-star ratings.",
        "status": "Your hiring pipeline shows good progress. You have 3 candidates awaiting AI screening, 1 qualified candidate ready for interview, and 2 new candidates that need initial review.",
        "job": "You have 4 active job openings: Senior Backend Engineer (2 positions), Frontend Developer (3 positions with 1 filled), DevOps Engineer (1 position), and Data Engineer (2 positions).",
        "top": "Your top candidates based on ratings and matching scores are: Aisha Khan (92% match), Mohamed Ali (5-star), Omar Ibrahim (5-star), and Khaled Rahman (completed technical test)."
      };

      let response = "I can help you with information about candidates, job openings, hiring status, and recruitment metrics. Could you please be more specific about what you'd like to know?";
      
      for (const [key, value] of Object.entries(responses)) {
        if (userMessage.toLowerCase().includes(key)) {
          response = value;
          break;
        }
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "Show me top candidates",
    "What's the hiring status?",
    "List all job openings",
    "Who needs AI screening?"
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-8 right-28 h-14 w-14 rounded-full shadow-lg z-50"
        >
          <Sparkles className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            AI Recruitment Assistant
          </SheetTitle>
          <SheetDescription>
            Ask questions about candidates, jobs, and hiring metrics
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 pr-4 mt-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-2">
                  <p className="text-sm">Thinking...</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="space-y-3 mt-4 pt-4 border-t">
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  setInput(question);
                  setTimeout(handleSend, 100);
                }}
                className="text-xs"
              >
                {question}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="min-h-[60px] resize-none"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="h-[60px] w-[60px]"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
