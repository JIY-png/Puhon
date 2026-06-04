"use client"

import { useState } from "react"
import {
  ScrollText,
  Plus,
  Edit2,
  Trash2,
  GripVertical,
  AlertTriangle,
  Shield,
  Heart,
  Users,
  MessageSquare,
  Ban,
  Star,
  ChevronUp,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

type RuleCategory = "general" | "conduct" | "voice" | "games" | "leadership" | "violations"

interface Rule {
  id: string
  title: string
  description: string
  category: RuleCategory
  priority: "low" | "medium" | "high" | "critical"
  order: number
  isActive: boolean
  imageUrl?: string
}

const categoryConfig: Record<RuleCategory, { label: string; icon: typeof ScrollText; color: string }> = {
  general: { label: "General", icon: ScrollText, color: "bg-blue-500/20 text-blue-400" },
  conduct: { label: "Conduct", icon: Heart, color: "bg-pink-500/20 text-pink-400" },
  voice: { label: "Voice Room", icon: MessageSquare, color: "bg-green-500/20 text-green-400" },
  games: { label: "Games", icon: Users, color: "bg-purple-500/20 text-purple-400" },
  leadership: { label: "Leadership", icon: Shield, color: "bg-primary/20 text-primary" },
  violations: { label: "Violations", icon: Ban, color: "bg-red-500/20 text-red-400" },
}

const priorityConfig: Record<string, { label: string; color: string }> = {
  low: { label: "Low", color: "bg-muted text-muted-foreground" },
  medium: { label: "Medium", color: "bg-blue-500/20 text-blue-400" },
  high: { label: "High", color: "bg-orange-500/20 text-orange-400" },
  critical: { label: "Critical", color: "bg-red-500/20 text-red-400" },
}

const initialRules: Rule[] = [
  {
    id: "1",
    title: "Respect All Members",
    description: "Treat every family member with respect regardless of rank, skill level, or time in the clan. No bullying, harassment, or discrimination of any kind.",
    category: "conduct",
    priority: "critical",
    order: 1,
    isActive: true,
    imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=respect%20all%20members%20unity%20in%20community%20friendly%20diverse%20group%20illustration&image_size=square",
  },
  {
    id: "2",
    title: "Stay Active",
    description: "Members must be active at least 3 times per week. Extended absences (7+ days) require notifying leadership. Inactive members may be removed.",
    category: "general",
    priority: "high",
    order: 2,
    isActive: true,
    imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=stay%20active%20clock%20calendar%20checkmark%20reminder%20illustration&image_size=square",
  },
  {
    id: "3",
    title: "No Toxicity in Voice",
    description: "Keep voice chat friendly and welcoming. No excessive shouting, offensive language, or disruptive behavior. Mute when there is background noise.",
    category: "voice",
    priority: "high",
    order: 3,
    isActive: true,
    imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=voice%20chat%20microphone%20mute%20friendly%20communication%20illustration&image_size=square",
  },
  {
    id: "4",
    title: "Fair Play Only",
    description: "Cheating, exploiting, or using unauthorized third-party tools is strictly prohibited. Play fair and maintain the integrity of our competitive spirit.",
    category: "games",
    priority: "critical",
    order: 4,
    isActive: true,
    imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=fair%20play%20sportsmanship%20trophy%20honest%20competition%20illustration&image_size=square",
  },
  {
    id: "5",
    title: "Follow Leadership Decisions",
    description: "Leadership decisions are final. If you disagree, discuss privately with a leader. Public arguments about decisions will not be tolerated.",
    category: "leadership",
    priority: "high",
    order: 5,
    isActive: true,
    imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=leadership%20decision%20crown%20shield%20authority%20illustration&image_size=square",
  },
  {
    id: "6",
    title: "Three Strike Policy",
    description: "First violation: Warning. Second violation: Temporary mute/restriction. Third violation: Removal from family. Severe violations may result in immediate removal.",
    category: "violations",
    priority: "critical",
    order: 6,
    isActive: true,
    imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=three%20strikes%20warning%20sign%20red%20alert%20illustration&image_size=square",
  },
  {
    id: "7",
    title: "Represent PUHON Proudly",
    description: "When wearing the PUHON tag, you represent the entire family. Maintain good sportsmanship in public games and interactions.",
    category: "general",
    priority: "medium",
    order: 7,
    isActive: true,
    imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=represent%20family%20pride%20badge%20logo%20honor%20illustration&image_size=square",
  },
  {
    id: "8",
    title: "No Recruiting for Other Clans",
    description: "Do not recruit PUHON members for other clans or families. This is grounds for immediate removal.",
    category: "violations",
    priority: "critical",
    order: 8,
    isActive: true,
    imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=no%20recruiting%20stop%20sign%20forbidden%20illustration&image_size=square",
  },
]

export default function RulesPage() {
  const [rules, setRules] = useState<Rule[]>(initialRules)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<Rule | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<RuleCategory | "all">("all")
  const [newRule, setNewRule] = useState<Partial<Rule>>({
    title: "",
    description: "",
    category: "general",
    priority: "medium",
    isActive: true,
    imageUrl: "",
  })

  const filteredRules = rules
    .filter((rule) => selectedCategory === "all" || rule.category === selectedCategory)
    .sort((a, b) => a.order - b.order)

  const handleAddRule = () => {
    if (newRule.title && newRule.description) {
      const rule: Rule = {
        id: Date.now().toString(),
        title: newRule.title,
        description: newRule.description,
        category: newRule.category as RuleCategory,
        priority: newRule.priority as Rule["priority"],
        order: rules.length + 1,
        isActive: newRule.isActive ?? true,
        imageUrl: newRule.imageUrl,
      }
      setRules([...rules, rule])
      setNewRule({
        title: "",
        description: "",
        category: "general",
        priority: "medium",
        isActive: true,
        imageUrl: "",
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditRule = () => {
    if (editingRule) {
      setRules(rules.map((r) => (r.id === editingRule.id ? editingRule : r)))
      setEditingRule(null)
    }
  }

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter((r) => r.id !== id))
  }

  const handleToggleActive = (id: string) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)))
  }

  const handleMoveRule = (id: string, direction: "up" | "down") => {
    const index = rules.findIndex((r) => r.id === id)
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === rules.length - 1)
    ) {
      return
    }

    const newRules = [...rules]
    const swapIndex = direction === "up" ? index - 1 : index + 1
    const tempOrder = newRules[index].order
    newRules[index].order = newRules[swapIndex].order
    newRules[swapIndex].order = tempOrder
    ;[newRules[index], newRules[swapIndex]] = [newRules[swapIndex], newRules[index]]
    setRules(newRules)
  }

  const getCategoryStats = () => {
    const stats: Record<string, number> = {}
    rules.forEach((rule) => {
      if (rule.isActive) {
        stats[rule.category] = (stats[rule.category] || 0) + 1
      }
    })
    return stats
  }

  const categoryStats = getCategoryStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold-gradient">Family Rules</h1>
          <p className="text-muted-foreground mt-1">
            Manage and organize the PUHON family guidelines
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Rule
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add New Rule</DialogTitle>
              <DialogDescription>
                Create a new rule for the PUHON family.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Rule Title</Label>
                <Input
                  id="title"
                  value={newRule.title}
                  onChange={(e) => setNewRule({ ...newRule, title: e.target.value })}
                  placeholder="Enter rule title"
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newRule.description}
                  onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                  placeholder="Describe the rule in detail"
                  className="bg-background border-border min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL (optional)</Label>
                <Input
                  id="imageUrl"
                  value={newRule.imageUrl}
                  onChange={(e) => setNewRule({ ...newRule, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="bg-background border-border"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={newRule.category}
                    onValueChange={(value) => setNewRule({ ...newRule, category: value as RuleCategory })}
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(categoryConfig).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          {config.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={newRule.priority}
                    onValueChange={(value) => setNewRule({ ...newRule, priority: value as Rule["priority"] })}
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(priorityConfig).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          {config.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="active">Active</Label>
                <Switch
                  id="active"
                  checked={newRule.isActive}
                  onCheckedChange={(checked) => setNewRule({ ...newRule, isActive: checked })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddRule} className="bg-primary text-primary-foreground">
                Add Rule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {Object.entries(categoryConfig).map(([key, config]) => {
          const Icon = config.icon
          return (
            <Card
              key={key}
              className={cn(
                "cursor-pointer transition-all hover:border-primary/50",
                selectedCategory === key && "border-primary gold-glow"
              )}
              onClick={() => setSelectedCategory(selectedCategory === key ? "all" : key as RuleCategory)}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div className={cn("p-2 rounded-lg", config.color)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{config.label}</p>
                  <p className="text-lg font-bold text-foreground">{categoryStats[key] || 0}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Active Filter Indicator */}
      {selectedCategory !== "all" && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-primary/20 text-primary">
            Showing: {categoryConfig[selectedCategory].label}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedCategory("all")}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear filter
          </Button>
        </div>
      )}

      {/* Rules List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <ScrollText className="h-5 w-5 text-primary" />
            Rules ({filteredRules.filter((r) => r.isActive).length} active)
          </CardTitle>
          <CardDescription>
            Drag to reorder or use arrows. Toggle rules on/off as needed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredRules.map((rule, index) => {
              const categoryInfo = categoryConfig[rule.category]
              const priorityInfo = priorityConfig[rule.priority]
              const CategoryIcon = categoryInfo.icon

              return (
                <div
                  key={rule.id}
                  className={cn(
                    "flex items-start gap-3 p-4 rounded-lg border transition-all",
                    rule.isActive
                      ? "bg-secondary/50 border-border hover:border-primary/30"
                      : "bg-muted/30 border-border/50 opacity-60"
                  )}
                >
                  {/* Drag Handle & Order Controls */}
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleMoveRule(rule.id, "up")}
                      disabled={index === 0}
                    >
                      <ChevronUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleMoveRule(rule.id, "down")}
                      disabled={index === filteredRules.length - 1}
                    >
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Rule Number */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{rule.order}</span>
                  </div>

                  {/* Rule Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Rule Image */}
                      {rule.imageUrl && (
                        <div className="shrink-0 w-full sm:w-32 h-24 rounded-lg overflow-hidden border border-border/50">
                          <img 
                            src={rule.imageUrl} 
                            alt={rule.title} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      )}
                      
                      {/* Rule Text */}
                      <div className="flex-1 min-w-0">
                        <h3 className={cn(
                          "font-semibold",
                          rule.isActive ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {rule.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {rule.description}
                        </p>

                        {/* Tags */}
                        <div className="flex items-center gap-2 mt-3 flex-wrap">
                          <Badge className={cn("text-xs", categoryInfo.color)}>
                            <CategoryIcon className="h-3 w-3 mr-1" />
                            {categoryInfo.label}
                          </Badge>
                          <Badge className={cn("text-xs", priorityInfo.color)}>
                            {rule.priority === "critical" && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {rule.priority === "high" && <Star className="h-3 w-3 mr-1" />}
                            {priorityInfo.label}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={rule.isActive}
                      onCheckedChange={() => handleToggleActive(rule.id)}
                    />
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-foreground"
                          onClick={() => setEditingRule(rule)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] bg-card border-border">
                        <DialogHeader>
                          <DialogTitle className="text-foreground">Edit Rule</DialogTitle>
                          <DialogDescription>
                            Modify the rule details below.
                          </DialogDescription>
                        </DialogHeader>
                        {editingRule && (
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-title">Rule Title</Label>
                              <Input
                                id="edit-title"
                                value={editingRule.title}
                                onChange={(e) =>
                                  setEditingRule({ ...editingRule, title: e.target.value })
                                }
                                className="bg-background border-border"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-description">Description</Label>
                              <Textarea
                                id="edit-description"
                                value={editingRule.description}
                                onChange={(e) =>
                                  setEditingRule({ ...editingRule, description: e.target.value })
                                }
                                className="bg-background border-border min-h-[100px]"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-imageUrl">Image URL (optional)</Label>
                              <Input
                                id="edit-imageUrl"
                                value={editingRule.imageUrl || ""}
                                onChange={(e) =>
                                  setEditingRule({ ...editingRule, imageUrl: e.target.value })
                                }
                                placeholder="https://example.com/image.jpg"
                                className="bg-background border-border"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Category</Label>
                                <Select
                                  value={editingRule.category}
                                  onValueChange={(value) =>
                                    setEditingRule({
                                      ...editingRule,
                                      category: value as RuleCategory,
                                    })
                                  }
                                >
                                  <SelectTrigger className="bg-background border-border">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Object.entries(categoryConfig).map(([key, config]) => (
                                      <SelectItem key={key} value={key}>
                                        {config.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Priority</Label>
                                <Select
                                  value={editingRule.priority}
                                  onValueChange={(value) =>
                                    setEditingRule({
                                      ...editingRule,
                                      priority: value as Rule["priority"],
                                    })
                                  }
                                >
                                  <SelectTrigger className="bg-background border-border">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Object.entries(priorityConfig).map(([key, config]) => (
                                      <SelectItem key={key} value={key}>
                                        {config.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setEditingRule(null)}>
                            Cancel
                          </Button>
                          <Button
                            onClick={handleEditRule}
                            className="bg-primary text-primary-foreground"
                          >
                            Save Changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => handleDeleteRule(rule.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}

            {filteredRules.length === 0 && (
              <div className="text-center py-12">
                <ScrollText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground">No rules found</h3>
                <p className="text-muted-foreground mt-1">
                  {selectedCategory !== "all"
                    ? "No rules in this category. Try a different filter."
                    : "Add your first family rule to get started."}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Reference Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Priority Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1">
              <Badge className={priorityConfig.critical.color}>Critical</Badge>
              <p className="text-xs text-muted-foreground">
                Zero tolerance. Immediate action required.
              </p>
            </div>
            <div className="space-y-1">
              <Badge className={priorityConfig.high.color}>High</Badge>
              <p className="text-xs text-muted-foreground">
                Important rules with serious consequences.
              </p>
            </div>
            <div className="space-y-1">
              <Badge className={priorityConfig.medium.color}>Medium</Badge>
              <p className="text-xs text-muted-foreground">
                Standard guidelines for smooth operations.
              </p>
            </div>
            <div className="space-y-1">
              <Badge className={priorityConfig.low.color}>Low</Badge>
              <p className="text-xs text-muted-foreground">
                Recommendations and best practices.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
