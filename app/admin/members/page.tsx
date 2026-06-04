"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  Crown,
  Users,
} from "lucide-react"
import type { User, UserRole } from "@/lib/users"
import { getAllUsers, createUser, editUser, removeUser } from "@/lib/user-actions"

const allRoles: UserRole[] = ["Leader", "Deputies", "Admins", "Members"]

const roleConfig: Record<UserRole, { icon: typeof Crown; color: string; bg: string }> = {
  Leader: { icon: Crown, color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30" },
  Deputies: { icon: Shield, color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/30" },
  Admins: { icon: Shield, color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/30" },
  Members: { icon: Users, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/30" },
}

export default function MembersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [newUser, setNewUser] = useState({
    username: "",
    displayName: "",
    password: "",
    role: "Members" as UserRole,
    weplayId: "",
    level: 1,
    favoriteGame: "",
    status: "offline" as "online" | "offline" | "in-game",
  })

  // Load users on mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getAllUsers()
        setUsers(data)
      } catch (e) {
        console.error("Failed to load users:", e)
      }
    }
    loadUsers()
  }, [])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.weplayId && user.weplayId.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesRole = roleFilter === "All" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const handleAddUser = async () => {
    try {
      await createUser(newUser)
      // Refresh the list
      const data = await getAllUsers()
      setUsers(data)
      setNewUser({ 
        username: "", 
        displayName: "", 
        password: "", 
        role: "Members", 
        weplayId: "",
        level: 1,
        favoriteGame: "",
        status: "offline",
      })
      setIsAddDialogOpen(false)
    } catch (e) {
      console.error("Failed to add user:", e)
    }
  }

  const handleEditUser = async () => {
    if (!editingUser) return
    try {
      await editUser(editingUser.id, {
        username: newUser.username,
        displayName: newUser.displayName,
        role: newUser.role,
        weplayId: newUser.weplayId,
        level: newUser.level,
        favoriteGame: newUser.favoriteGame,
        status: newUser.status,
        // Only update password if provided
        ...(newUser.password ? { password: newUser.password } : {}),
      })
      // Refresh the list
      const data = await getAllUsers()
      setUsers(data)
      setIsEditDialogOpen(false)
      setEditingUser(null)
    } catch (e) {
      console.error("Failed to edit user:", e)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      await removeUser(userId)
      // Refresh the list
      const data = await getAllUsers()
      setUsers(data)
    } catch (e) {
      console.error("Failed to delete user:", e)
    }
  }

  const openEditDialog = (user: User) => {
    setEditingUser(user)
    setNewUser({
      username: user.username,
      displayName: user.displayName,
      password: "",
      role: user.role,
 weplayId: user.weplayId || "",
      level: user.level || 1,
      favoriteGame: user.favoriteGame || "",
      status: user.status || "offline",
    })
    setIsEditDialogOpen(true)
  }

  const getStats = () => {
    const leader = users.filter(u => u.role === "Leader").length
    const deputies = users.filter(u => u.role === "Deputies").length
    const admins = users.filter(u => u.role === "Admins").length
    const members = users.filter(u => u.role === "Members").length
    return { total: users.length, leader, deputies, admins, members }
  }

  const stats = getStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Members</h1>
          <p className="text-muted-foreground">
            Manage your family roster, roles, and login credentials
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add New Member</DialogTitle>
              <DialogDescription>
                Add a new member with login credentials to the PUHON family.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={newUser.username}
                    onChange={(e) =>
                      setNewUser({ ...newUser, username: e.target.value })
                    }
                    placeholder="Username"
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={newUser.displayName}
                    onChange={(e) =>
                      setNewUser({ ...newUser, displayName: e.target.value })
                    }
                    placeholder="Display Name"
                    className="bg-secondary border-border"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  placeholder="Password"
                  className="bg-secondary border-border"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weplayId">WePlay ID</Label>
                  <Input
                    id="weplayId"
                    value={newUser.weplayId}
                    onChange={(e) =>
                      setNewUser({ ...newUser, weplayId: e.target.value })
                    }
                    placeholder="e.g., WP12345678"
                    className="bg-secondary border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Input
                    id="level"
                    type="number"
                    value={newUser.level}
                    onChange={(e) =>
                      setNewUser({ ...newUser, level: parseInt(e.target.value) || 1 })
                    }
                    className="bg-secondary border-border"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="favoriteGame">Favorite Game</Label>
                <Input
                  id="favoriteGame"
                  value={newUser.favoriteGame}
                  onChange={(e) =>
                    setNewUser({ ...newUser, favoriteGame: e.target.value })
                  }
                  placeholder="e.g., Space Werewolf"
                  className="bg-secondary border-border"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value: UserRole) =>
                      setNewUser({ ...newUser, role: value })
                    }
                  >
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {allRoles.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newUser.status}
                    onValueChange={(value: "online" | "offline" | "in-game") =>
                      setNewUser({ ...newUser, status: value })
                    }
                  >
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                      <SelectItem value="in-game">In Game</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
                className="border-border"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddUser}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!newUser.username || !newUser.displayName || !newUser.password}
              >
                Add Member
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground">Edit Member</DialogTitle>
            <DialogDescription>
              Update member details and credentials.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-username">Username</Label>
                <Input
                  id="edit-username"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-displayName">Display Name</Label>
                <Input
                  id="edit-displayName"
                  value={newUser.displayName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, displayName: e.target.value })
                  }
                  className="bg-secondary border-border"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-password">New Password (leave blank to keep current)</Label>
              <Input
                id="edit-password"
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                placeholder="New Password"
                className="bg-secondary border-border"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-weplayId">WePlay ID</Label>
                <Input
                  id="edit-weplayId"
                  value={newUser.weplayId}
                  onChange={(e) =>
                    setNewUser({ ...newUser, weplayId: e.target.value })
                  }
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-level">Level</Label>
                <Input
                  id="edit-level"
                  type="number"
                  value={newUser.level}
                  onChange={(e) =>
                    setNewUser({ ...newUser, level: parseInt(e.target.value) || 1 })
                  }
                  className="bg-secondary border-border"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-favoriteGame">Favorite Game</Label>
              <Input
                id="edit-favoriteGame"
                value={newUser.favoriteGame}
                onChange={(e) =>
                  setNewUser({ ...newUser, favoriteGame: e.target.value })
                }
                className="bg-secondary border-border"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value: UserRole) =>
                    setNewUser({ ...newUser, role: value })
                  }
                >
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {allRoles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={newUser.status}
                  onValueChange={(value: "online" | "offline" | "in-game") =>
                    setNewUser({ ...newUser, status: value })
                  }
                >
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                    <SelectItem value="in-game">In Game</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false)
                setEditingUser(null)
              }}
              className="border-border"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditUser}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-secondary border-border">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Roles</SelectItem>
                {allRoles.map(role => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-5">
        <Card className="bg-card border-border">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-yellow-400/10 p-2">
                <Crown className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.leader}</p>
                <p className="text-xs text-muted-foreground">Leader</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-orange-400/10 p-2">
                <Shield className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.deputies}</p>
                <p className="text-xs text-muted-foreground">Deputies</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-purple-400/10 p-2">
                <Shield className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.admins}</p>
                <p className="text-xs text-muted-foreground">Admins</p>
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
                <p className="text-2xl font-bold text-foreground">{stats.members}</p>
                <p className="text-xs text-muted-foreground">Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Members Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Member Roster</CardTitle>
          <CardDescription>
            Manage login credentials and roles for all members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-secondary/50">
                <TableHead className="text-muted-foreground">Member</TableHead>
                <TableHead className="text-muted-foreground">Username</TableHead>
                <TableHead className="text-muted-foreground">WePlay ID</TableHead>
                <TableHead className="text-muted-foreground">Role</TableHead>
                <TableHead className="text-muted-foreground">Level</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const config = roleConfig[user.role]
                const RoleIcon = config.icon
                return (
                  <TableRow
                    key={user.id}
                    className="border-border hover:bg-secondary/50"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold text-sm">
                            {user.displayName[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{user.displayName}</p>
                          <p className="text-xs text-muted-foreground">
                            Joined: {new Date(user.joinDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.username}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {user.weplayId || "-"}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${config.bg} border-none`}>
                        <RoleIcon className={`mr-1 h-3 w-3 ${config.color}`} />
                        <span className={config.color}>{user.role}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {user.level || 1}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => openEditDialog(user)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Member / Credentials
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
