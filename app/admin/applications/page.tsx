"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  UserPlus,
  Check,
  X,
  Clock,
  Eye,
  MessageSquare,
  Gamepad2,
  Search,
  Filter,
} from "lucide-react"

type ApplicationStatus = "pending" | "approved" | "rejected"

interface Application {
  id: string
  name: string
  weplayId: string
  level: number
  games: string[]
  reason: string
  experience: string
  submittedAt: string
  status: ApplicationStatus
  notes?: string
}

const initialApplications: Application[] = [
  {
    id: "1",
    name: "GamerPro99",
    weplayId: "WP98765432",
    level: 45,
    games: ["Space Werewolf", "Mic Grab"],
    reason: "Looking for an active family with friendly members to enjoy games together",
    experience: "Been playing WePlay for 6 months, previously in StarGazers family",
    submittedAt: "2024-03-14T10:30:00",
    status: "pending",
  },
  {
    id: "2",
    name: "NightOwl22",
    weplayId: "WP87654321",
    level: 38,
    games: ["Space Werewolf"],
    reason: "Heard great things about PUHON from friends, want to join competitive events",
    experience: "New to family gaming but very active player",
    submittedAt: "2024-03-13T18:45:00",
    status: "pending",
  },
  {
    id: "3",
    name: "StarPlayer",
    weplayId: "WP76543210",
    level: 52,
    games: ["Space Werewolf", "Mic Grab", "Other"],
    reason: "Looking for a family that values both competition and community",
    experience: "2 years on WePlay, was co-leader in previous family",
    submittedAt: "2024-03-12T09:15:00",
    status: "pending",
  },
  {
    id: "4",
    name: "CasualGamer",
    weplayId: "WP65432109",
    level: 25,
    games: ["Mic Grab"],
    reason: "Just want to have fun with friendly people",
    experience: "Casual player, 3 months on WePlay",
    submittedAt: "2024-03-11T14:20:00",
    status: "pending",
  },
  {
    id: "5",
    name: "ProPlayer123",
    weplayId: "WP54321098",
    level: 60,
    games: ["Space Werewolf", "Mic Grab"],
    reason: "Looking for top-tier competitive family",
    experience: "Tournament winner, 1.5 years experience",
    submittedAt: "2024-03-10T11:00:00",
    status: "approved",
    notes: "Excellent candidate, added to Elite roster",
  },
  {
    id: "6",
    name: "NewPlayer",
    weplayId: "WP43210987",
    level: 10,
    games: ["Other"],
    reason: "Just started playing",
    experience: "1 week on WePlay",
    submittedAt: "2024-03-09T16:30:00",
    status: "rejected",
    notes: "Level too low, suggested to reapply after reaching Level 30",
  },
]

const statusConfig = {
  pending: { color: "text-yellow-400", bgColor: "bg-yellow-400/10", label: "Pending" },
  approved: { color: "text-green-400", bgColor: "bg-green-400/10", label: "Approved" },
  rejected: { color: "text-red-400", bgColor: "bg-red-400/10", label: "Rejected" },
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>(initialApplications)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [actionNotes, setActionNotes] = useState("")

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.weplayId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const pendingCount = applications.filter((a) => a.status === "pending").length
  const approvedCount = applications.filter((a) => a.status === "approved").length
  const rejectedCount = applications.filter((a) => a.status === "rejected").length

  const handleApprove = (applicationId: string, notes: string) => {
    setApplications(
      applications.map((a) =>
        a.id === applicationId ? { ...a, status: "approved" as ApplicationStatus, notes } : a
      )
    )
    setIsDetailDialogOpen(false)
    setActionNotes("")
  }

  const handleReject = (applicationId: string, notes: string) => {
    setApplications(
      applications.map((a) =>
        a.id === applicationId ? { ...a, status: "rejected" as ApplicationStatus, notes } : a
      )
    )
    setIsDetailDialogOpen(false)
    setActionNotes("")
  }

  const openApplicationDetail = (application: Application) => {
    setSelectedApplication(application)
    setActionNotes(application.notes || "")
    setIsDetailDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Applications</h1>
          <p className="text-muted-foreground">
            Review and manage member join requests
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <UserPlus className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{applications.length}</p>
                <p className="text-xs text-muted-foreground">Total Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-yellow-400/10 p-2">
                <Clock className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
                <p className="text-xs text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-400/10 p-2">
                <Check className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{approvedCount}</p>
                <p className="text-xs text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-red-400/10 p-2">
                <X className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{rejectedCount}</p>
                <p className="text-xs text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or WePlay ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary border-border"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-secondary border-border">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Application Queue</CardTitle>
          <CardDescription>Click on an application to review details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredApplications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No applications found
              </div>
            ) : (
              filteredApplications.map((application) => {
                const config = statusConfig[application.status]
                const submittedDate = new Date(application.submittedAt)

                return (
                  <div
                    key={application.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                    onClick={() => openApplicationDetail(application)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">
                          {application.name[0]}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{application.name}</h3>
                          <Badge className={`${config.bgColor} ${config.color} border-none`}>
                            {config.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {application.weplayId} • Level {application.level}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Gamepad2 className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {application.games.join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden md:block">
                        <p className="text-sm text-muted-foreground">
                          {submittedDate.toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {submittedDate.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {application.status === "pending" ? (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleApprove(application.id, "")
                            }}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleReject(application.id, "")
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Application Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="bg-card border-border max-w-2xl">
          {selectedApplication && (
            <>
              <DialogHeader>
                <DialogTitle className="text-foreground flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">
                      {selectedApplication.name[0]}
                    </span>
                  </div>
                  {selectedApplication.name}
                  <Badge
                    className={`${statusConfig[selectedApplication.status].bgColor} ${
                      statusConfig[selectedApplication.status].color
                    } border-none ml-auto`}
                  >
                    {statusConfig[selectedApplication.status].label}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  Application submitted on{" "}
                  {new Date(selectedApplication.submittedAt).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">WePlay ID</Label>
                    <p className="font-mono text-foreground">{selectedApplication.weplayId}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">Level</Label>
                    <p className="text-foreground">{selectedApplication.level}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Games</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplication.games.map((game) => (
                      <Badge key={game} variant="secondary">
                        {game}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Why do you want to join?</Label>
                  <p className="text-foreground text-sm bg-secondary/50 p-3 rounded-lg">
                    {selectedApplication.reason}
                  </p>
                </div>

                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Experience</Label>
                  <p className="text-foreground text-sm bg-secondary/50 p-3 rounded-lg">
                    {selectedApplication.experience}
                  </p>
                </div>

                {selectedApplication.status === "pending" && (
                  <div className="space-y-2">
                    <Label htmlFor="notes">Admin Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={actionNotes}
                      onChange={(e) => setActionNotes(e.target.value)}
                      placeholder="Add notes about this application..."
                      className="bg-secondary border-border"
                      rows={2}
                    />
                  </div>
                )}

                {selectedApplication.notes && selectedApplication.status !== "pending" && (
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      Admin Notes
                    </Label>
                    <p className="text-foreground text-sm bg-secondary/50 p-3 rounded-lg">
                      {selectedApplication.notes}
                    </p>
                  </div>
                )}
              </div>

              <DialogFooter>
                {selectedApplication.status === "pending" ? (
                  <>
                    <Button
                      variant="outline"
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                      onClick={() => handleReject(selectedApplication.id, actionNotes)}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button
                      className="bg-green-500 hover:bg-green-600 text-white"
                      onClick={() => handleApprove(selectedApplication.id, actionNotes)}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                    Close
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
