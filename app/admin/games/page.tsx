"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Gamepad2,
  Plus,
  Edit,
  Trash2,
  Settings,
  Star,
  Users,
  Trophy,
  Mic,
  Swords,
  Puzzle,
} from "lucide-react"

interface Game {
  id: string
  name: string
  description: string
  icon: string
  active: boolean
  playerCount: number
  tournamentCount: number
  featured: boolean
}

const initialGames: Game[] = [
  {
    id: "1",
    name: "Space Werewolf",
    description: "Social deduction game where players identify impostors among the crew",
    icon: "werewolf",
    active: true,
    playerCount: 45,
    tournamentCount: 12,
    featured: true,
  },
  {
    id: "2",
    name: "Mic Grab",
    description: "Karaoke-style singing competition where players perform songs",
    icon: "mic",
    active: true,
    playerCount: 38,
    tournamentCount: 8,
    featured: true,
  },
  {
    id: "3",
    name: "Draw & Guess",
    description: "Drawing game where players sketch clues for others to guess",
    icon: "puzzle",
    active: true,
    playerCount: 28,
    tournamentCount: 5,
    featured: false,
  },
  {
    id: "4",
    name: "Word Chain",
    description: "Fast-paced word association game testing vocabulary skills",
    icon: "puzzle",
    active: false,
    playerCount: 15,
    tournamentCount: 2,
    featured: false,
  },
]

const iconMap: Record<string, typeof Gamepad2> = {
  werewolf: Swords,
  mic: Mic,
  puzzle: Puzzle,
  default: Gamepad2,
}

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>(initialGames)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingGame, setEditingGame] = useState<Game | null>(null)
  const [newGame, setNewGame] = useState({
    name: "",
    description: "",
    icon: "default",
  })

  const activeGames = games.filter((g) => g.active)
  const totalPlayers = games.reduce((acc, g) => acc + g.playerCount, 0)
  const totalTournaments = games.reduce((acc, g) => acc + g.tournamentCount, 0)

  const handleAddGame = () => {
    const game: Game = {
      id: Date.now().toString(),
      name: newGame.name,
      description: newGame.description,
      icon: newGame.icon,
      active: true,
      playerCount: 0,
      tournamentCount: 0,
      featured: false,
    }
    setGames([...games, game])
    setNewGame({ name: "", description: "", icon: "default" })
    setIsAddDialogOpen(false)
  }

  const handleDeleteGame = (gameId: string) => {
    setGames(games.filter((g) => g.id !== gameId))
  }

  const handleToggleActive = (gameId: string) => {
    setGames(games.map((g) => (g.id === gameId ? { ...g, active: !g.active } : g)))
  }

  const handleToggleFeatured = (gameId: string) => {
    setGames(games.map((g) => (g.id === gameId ? { ...g, featured: !g.featured } : g)))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Games</h1>
          <p className="text-muted-foreground">
            Manage supported games and their settings
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Game
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add New Game</DialogTitle>
              <DialogDescription>
                Add a new game to the PUHON family roster.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Game Name</Label>
                <Input
                  id="name"
                  value={newGame.name}
                  onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
                  placeholder="e.g., Trivia Night"
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newGame.description}
                  onChange={(e) => setNewGame({ ...newGame, description: e.target.value })}
                  placeholder="Brief description of the game..."
                  className="bg-secondary border-border"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Icon</Label>
                <div className="flex gap-2">
                  {Object.entries(iconMap).map(([key, Icon]) => (
                    <Button
                      key={key}
                      type="button"
                      variant={newGame.icon === key ? "default" : "outline"}
                      size="icon"
                      className={newGame.icon === key ? "bg-primary text-primary-foreground" : "border-border"}
                      onClick={() => setNewGame({ ...newGame, icon: key })}
                    >
                      <Icon className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-border">
                Cancel
              </Button>
              <Button
                onClick={handleAddGame}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!newGame.name}
              >
                Add Game
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card border-border">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Gamepad2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{games.length}</p>
                <p className="text-xs text-muted-foreground">Total Games</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-400/10 p-2">
                <Gamepad2 className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeGames.length}</p>
                <p className="text-xs text-muted-foreground">Active Games</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-400/10 p-2">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalPlayers}</p>
                <p className="text-xs text-muted-foreground">Active Players</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-purple-400/10 p-2">
                <Trophy className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalTournaments}</p>
                <p className="text-xs text-muted-foreground">Tournaments Held</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Games */}
      <Card className="bg-card border-border border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            <CardTitle className="text-foreground">Featured Games</CardTitle>
          </div>
          <CardDescription>Games highlighted on the public site</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {games
              .filter((g) => g.featured)
              .map((game) => {
                const Icon = iconMap[game.icon] || iconMap.default
                return (
                  <div
                    key={game.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20"
                  >
                    <div className="rounded-xl bg-primary/10 p-3">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{game.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {game.playerCount} players • {game.tournamentCount} tournaments
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleToggleFeatured(game.id)}
                    >
                      <Star className="h-4 w-4 text-primary fill-primary" />
                    </Button>
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>

      {/* All Games */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">All Games</CardTitle>
          <CardDescription>Manage game settings and visibility</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {games.map((game) => {
              const Icon = iconMap[game.icon] || iconMap.default
              return (
                <div
                  key={game.id}
                  className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                    game.active ? "bg-secondary/50" : "bg-secondary/20 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-xl p-3 ${
                        game.active ? "bg-primary/10" : "bg-muted"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          game.active ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{game.name}</h3>
                        {game.featured && (
                          <Star className="h-4 w-4 text-primary fill-primary" />
                        )}
                        {!game.active && (
                          <Badge variant="secondary" className="text-xs">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {game.description}
                      </p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {game.playerCount} players
                        </span>
                        <span className="flex items-center gap-1">
                          <Trophy className="h-3 w-3" />
                          {game.tournamentCount} tournaments
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={game.active}
                        onCheckedChange={() => handleToggleActive(game.id)}
                      />
                      <Label className="text-xs text-muted-foreground">
                        {game.active ? "Active" : "Inactive"}
                      </Label>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                        onClick={() => handleToggleFeatured(game.id)}
                      >
                        <Star
                          className={`h-4 w-4 ${
                            game.featured ? "text-primary fill-primary" : ""
                          }`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <Settings className="h-4 w-4" />
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
                        onClick={() => handleDeleteGame(game.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
