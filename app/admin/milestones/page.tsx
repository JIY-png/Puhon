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
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Trophy, Plus, Edit, Trash2, Star, TrendingUp, Award, Target } from "lucide-react"

type MilestoneType = "Level Up" | "Tournament Win" | "Achievement" | "Record" | "Special"

interface Milestone {
  id: string
  title: string
  description: string
  date: string
  type: MilestoneType
  featured: boolean
}

const initialMilestones: Milestone[] = [
  {
    id: "1",
    title: "Reached Family Level 7",
    description: "PUHON family officially reached Level 7, unlocking new perks and features",
    date: "2024-03-01",
    type: "Level Up",
    featured: true,
  },
  {
    id: "2",
    title: "Space Werewolf Tournament - 1st Place",
    description: "Won the weekly Space Werewolf tournament against 16 other families",
    date: "2024-02-25",
    type: "Tournament Win",
    featured: true,
  },
  {
    id: "3",
    title: "500 Total CP Milestone",
    description: "Family reached 500 total contribution points in a single week",
    date: "2024-02-20",
    type: "Achievement",
    featured: false,
  },
  {
    id: "4",
    title: "50 Member Milestone",
    description: "PUHON family grew to 50 active members",
    date: "2024-02-15",
    type: "Achievement",
    featured: false,
  },
  {
    id: "5",
    title: "Mic Grab Record - 12 Hour Stream",
    description: "Longest continuous Mic Grab session in PUHON history",
    date: "2024-02-10",
    type: "Record",
    featured: false,
  },
  {
    id: "6",
    title: "1 Year Anniversary",
    description: "PUHON family celebrates one year since founding",
    date: "2024-01-15",
    type: "Special",
    featured: true,
  },
]

const milestoneTypeConfig: Record<MilestoneType, { icon: typeof Trophy; color: string; bgColor: string }> = {
  "Level Up": { icon: TrendingUp, color: "text-primary", bgColor: "bg-primary/10" },
  "Tournament Win": { icon: Trophy, color: "text-blue-400", bgColor: "bg-blue-400/10" },
  Achievement: { icon: Award, color: "text-green-400", bgColor: "bg-green-400/10" },
  Record: { icon: Target, color: "text-purple-400", bgColor: "bg-purple-400/10" },
  Special: { icon: Star, color: "text-pink-400", bgColor: "bg-pink-400/10" },
}

export default function MilestonesPage() {
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newMilestone, setNewMilestone] = useState({
    title: "",
    description: "",
    date: "",
    type: "Achievement" as MilestoneType,
    featured: false,
  })

  const handleAddMilestone = () => {
    const milestone: Milestone = {
      id: Date.now().toString(),
      ...newMilestone,
    }
    setMilestones([milestone, ...milestones])
    setNewMilestone({ title: "", description: "", date: "", type: "Achievement", featured: false })
    setIsAddDialogOpen(false)
  }

  const handleDeleteMilestone = (milestoneId: string) => {
    setMilestones(milestones.filter((m) => m.id !== milestoneId))
  }

  const handleToggleFeatured = (milestoneId: string) => {
    setMilestones(
      milestones.map((m) =>
        m.id === milestoneId ? { ...m, featured: !m.featured } : m
      )
    )
  }

  const sortedMilestones = [...milestones].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const featuredMilestones = sortedMilestones.filter((m) => m.featured)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Milestones</h1>
          <p className="text-muted-foreground">
            Track and celebrate family achievements
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Milestone
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add New Milestone</DialogTitle>
              <DialogDescription>
                Record a new achievement for the PUHON family.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newMilestone.title}
                  onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                  placeholder="e.g., Reached Level 8"
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newMilestone.description}
                  onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                  placeholder="Describe the achievement..."
                  className="bg-secondary border-border"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date Achieved</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newMilestone.date}
                    onChange={(e) => setNewMilestone({ ...newMilestone, date: e.target.value })}
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={newMilestone.type}
                    onValueChange={(value: MilestoneType) =>
                      setNewMilestone({ ...newMilestone, type: value })
                    }
                  >
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Level Up">Level Up</SelectItem>
                      <SelectItem value="Tournament Win">Tournament Win</SelectItem>
                      <SelectItem value="Achievement">Achievement</SelectItem>
                      <SelectItem value="Record">Record</SelectItem>
                      <SelectItem value="Special">Special</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={newMilestone.featured}
                  onChange={(e) =>
                    setNewMilestone({ ...newMilestone, featured: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-border bg-secondary"
                />
                <Label htmlFor="featured" className="text-sm cursor-pointer">
                  Feature this milestone
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-border">
                Cancel
              </Button>
              <Button
                onClick={handleAddMilestone}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!newMilestone.title || !newMilestone.date}
              >
                Add Milestone
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="bg-card border-border">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{milestones.length}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        {(Object.entries(milestoneTypeConfig) as [MilestoneType, typeof milestoneTypeConfig[MilestoneType]][]).map(
          ([type, config]) => {
            const count = milestones.filter((m) => m.type === type).length
            return (
              <Card key={type} className="bg-card border-border">
                <CardContent className="py-4">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-full p-2 ${config.bgColor}`}>
                      <config.icon className={`h-5 w-5 ${config.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{count}</p>
                      <p className="text-xs text-muted-foreground">{type}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          }
        )}
      </div>

      {/* Featured Milestones */}
      {featuredMilestones.length > 0 && (
        <Card className="bg-card border-border border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <CardTitle className="text-foreground">Featured Milestones</CardTitle>
            </div>
            <CardDescription>Highlighted achievements displayed on the public site</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredMilestones.map((milestone) => {
                const config = milestoneTypeConfig[milestone.type]
                return (
                  <div
                    key={milestone.id}
                    className="relative p-4 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20"
                  >
                    <div className={`inline-flex rounded-lg ${config.bgColor} p-2 mb-3`}>
                      <config.icon className={`h-5 w-5 ${config.color}`} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {milestone.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(milestone.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => handleToggleFeatured(milestone.id)}
                    >
                      <Star className="h-4 w-4 text-primary fill-primary" />
                    </Button>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Milestone Timeline</CardTitle>
          <CardDescription>All achievements in chronological order</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-6">
              {sortedMilestones.map((milestone, index) => {
                const config = milestoneTypeConfig[milestone.type]
                return (
                  <div key={milestone.id} className="relative flex gap-4">
                    {/* Timeline dot */}
                    <div
                      className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${config.bgColor} border-4 border-background`}
                    >
                      <config.icon className={`h-5 w-5 ${config.color}`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">{milestone.title}</h3>
                            {milestone.featured && (
                              <Star className="h-4 w-4 text-primary fill-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {milestone.description}
                          </p>
                          <div className="flex items-center gap-3">
                            <Badge className={`${config.bgColor} ${config.color} border-none`}>
                              {milestone.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(milestone.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-primary"
                            onClick={() => handleToggleFeatured(milestone.id)}
                          >
                            <Star
                              className={`h-4 w-4 ${
                                milestone.featured ? "text-primary fill-primary" : ""
                              }`}
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => handleDeleteMilestone(milestone.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
