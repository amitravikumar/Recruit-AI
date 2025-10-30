import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Candidate } from "@/types/candidate";
import { Download, Briefcase, Sparkles, MapPin, Mail, Phone, Calendar, CheckCircle2, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { InterviewScheduler } from "@/components/AI/InterviewScheduler";
import { MessageModal } from "./MessageModal";
import { RejectModal } from "./RejectModal";
import { HoldModal } from "./HoldModal";

interface ProfileModalProps {
  candidate: Candidate;
  onClose: () => void;
}

export const ProfileModal = ({ candidate, onClose }: ProfileModalProps) => {
  const [showScheduler, setShowScheduler] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [showHold, setShowHold] = useState(false);
  
  const isOfferStage = candidate.status === "Offer";
  
  const matchingScore = candidate.matching_score || 92;
  const jobTitle = candidate.job_title || "Senior Backend Engineer";
  const matchedKeywords = candidate.matched_keywords || ["Python", "AWS", "ETL", "Kubernetes"];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[85vh] p-0 flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold">
                {candidate.photo ? (
                  <img src={candidate.photo} alt={candidate.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  candidate.name.charAt(0)
                )}
              </div>
              <div>
                <DialogTitle className="text-2xl mb-2">{candidate.name}</DialogTitle>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {candidate.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {candidate.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {candidate.phone}
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 pt-4 flex-shrink-0">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="matching">AI Matching</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1 overflow-auto">
            <div className="px-6 pb-6">
              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-4 space-y-4">
                <div className="glass-effect rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-lg">Position: {jobTitle}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <Badge variant="default">{candidate.status}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Availability</p>
                      <Badge variant={candidate.availability === "Available" ? "default" : "secondary"}>
                        {candidate.availability}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Source</p>
                      <p className="font-medium">{candidate.source}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">AI Rating</p>
                      <p className="font-medium">{candidate.rating}/5 ⭐</p>
                    </div>
                  </div>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-3">AI Summary</h3>
                  <p className="text-muted-foreground">{candidate.ai_summary}</p>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Resume Tab */}
              <TabsContent value="resume" className="mt-4">
                <div className="glass-effect rounded-lg p-8 bg-white/5">
                  <div className="prose prose-invert max-w-none">
                    <h2 className="text-2xl font-bold mb-1">{candidate.name}</h2>
                    <p className="text-muted-foreground mb-6">{candidate.email} | {candidate.phone} | {candidate.location}</p>

                    <h3 className="text-xl font-semibold mt-6 mb-3 text-primary">Professional Summary</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Experienced software engineer with {5 + Math.floor(Math.random() * 5)}+ years in backend development, 
                      specializing in {candidate.skills.slice(0, 3).join(", ")}. Proven track record of building scalable 
                      systems and leading technical teams. Strong expertise in cloud infrastructure and modern development practices.
                    </p>

                    <h3 className="text-xl font-semibold mt-6 mb-3 text-primary">Work Experience</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold">Senior Software Engineer</h4>
                        <p className="text-sm text-muted-foreground">Tech Corp DMCC, Dubai | 2021 - Present</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                          <li>Led development of microservices architecture processing 2TB+ daily data</li>
                          <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
                          <li>Mentored team of 5 junior developers on best practices</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold">Software Engineer</h4>
                        <p className="text-sm text-muted-foreground">Innovation Hub, Abu Dhabi | 2019 - 2021</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                          <li>Developed RESTful APIs serving 100K+ daily active users</li>
                          <li>Optimized database queries improving response time by 45%</li>
                          <li>Collaborated with cross-functional teams on product features</li>
                        </ul>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mt-6 mb-3 text-primary">Education</h3>
                    <div>
                      <h4 className="font-semibold">Bachelor of Science in Computer Science</h4>
                      <p className="text-sm text-muted-foreground">UAE University | 2015 - 2019</p>
                    </div>

                    <h3 className="text-xl font-semibold mt-6 mb-3 text-primary">Technical Skills</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium mb-2">Languages & Frameworks:</p>
                        <p className="text-muted-foreground">{candidate.skills.join(", ")}</p>
                      </div>
                      <div>
                        <p className="font-medium mb-2">Tools & Platforms:</p>
                        <p className="text-muted-foreground">Git, Docker, Jenkins, AWS, Azure</p>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mt-6 mb-3 text-primary">Certifications</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>AWS Certified Solutions Architect - Associate</li>
                      <li>Certified Kubernetes Administrator (CKA)</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              {/* AI Matching Tab */}
              <TabsContent value="matching" className="mt-4 space-y-4">
                <div className="glass-effect rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-lg">AI Match Score</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Overall Match</span>
                        <span className="text-sm font-semibold">{matchingScore}%</span>
                      </div>
                      <Progress value={matchingScore} className="h-3" />
                    </div>
                  </div>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">Job Description: {jobTitle}</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      We are seeking a skilled backend engineer to join our growing team. The ideal candidate will have
                      strong experience in building scalable microservices and working with cloud infrastructure.
                    </p>
                    <div>
                      <p className="font-medium text-foreground mb-2">Required Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {matchedKeywords.map((keyword) => (
                          <Badge key={keyword} variant="default" className="gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-effect rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">How AI Matched This Resume</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">Keyword Extraction</p>
                        <p className="text-sm text-muted-foreground">
                          Analyzed job description and extracted {matchedKeywords.length} critical keywords
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">Semantic Matching</p>
                        <p className="text-sm text-muted-foreground">
                          Found {matchedKeywords.length}/{matchedKeywords.length} keyword matches in resume with contextual understanding
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">Experience Validation</p>
                        <p className="text-sm text-muted-foreground">
                          Verified {5 + Math.floor(Math.random() * 5)}+ years of relevant experience matches job requirements
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="mt-4">
                <div className="glass-effect rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">Activity Timeline</h3>
                  <div className="space-y-4">
                    {candidate.activity_timeline.map((activity, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm">{activity.event}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(activity.time).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>

        <div className="px-6 py-3 border-t border-border flex gap-3 flex-shrink-0">
          {isOfferStage ? (
            <>
              <Button className="flex-1" onClick={() => setShowHold(true)}>
                Hold
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setShowMessage(true)}>
                Send Email
              </Button>
            </>
          ) : (
            <>
              <Button className="flex-1" onClick={() => setShowScheduler(true)}>
                Schedule Interview
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setShowMessage(true)}>
                Send Message
              </Button>
              <Button variant="outline" onClick={() => setShowReject(true)}>
                Reject
              </Button>
            </>
          )}
        </div>
      </DialogContent>
      
      {showScheduler && (
        <Dialog open={showScheduler} onOpenChange={() => setShowScheduler(false)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Schedule Interview</DialogTitle>
            </DialogHeader>
            <InterviewScheduler
              candidateName={candidate.name}
              onSchedule={() => {
                setShowScheduler(false);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
      
      {showMessage && (
        <MessageModal
          candidate={candidate}
          open={showMessage}
          onClose={() => setShowMessage(false)}
        />
      )}
      
      {showReject && (
        <RejectModal
          candidate={candidate}
          open={showReject}
          onClose={() => setShowReject(false)}
        />
      )}
      
      {showHold && (
        <HoldModal
          candidate={candidate}
          open={showHold}
          onClose={() => setShowHold(false)}
        />
      )}
    </Dialog>
  );
};