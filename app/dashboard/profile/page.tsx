"use client"

import { useState } from "react"
import {
  User,
  Crown,
  Calendar,
  Gamepad2,
  Save,
  Edit3,
  Plus,
  Trash2,
  Clock,
  Shield,
  Key,
  Lock,
  CheckCircle2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuth } from "@/components/auth-provider"
import { updateSelf } from "@/lib/user-actions"
import type { User as UserType } from "@/lib/users"

interface SmurfAccount {
  id: string
  name: string
  weplayId: string
}

interface Profile {
  displayName: string
  weplayId: string
  bio: string
  favoriteGame: string
  status: string
  smurfAccounts: SmurfAccount[]
}

export default function ProfilePage() {
  const { user, isLoading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [saved, setSaved] = useState(false)
  const [passwordSaved, setPasswordSaved] = useState(false)
  const [profile, setProfile] = useState<Profile>({
    displayName: user?.displayName || "CrystalFang",
    weplayId: user?.weplayId || "WP123456",
    bio: "Space Werewolf enthusiast and proud PUHON family member. Always hunting for the wolves! 🐺",
    favoriteGame: user?.favoriteGame || "Space Werewolf",
    status: "Looking for team",
    smurfAccounts: [
      { id: "1", name: "CrystalSmurf1", weplayId: "WP456789" },
      { id: "2", name: "CrystalSmurf2", weplayId: "WP456790" },
    ],
  })
  const [editProfile, setEditProfile] = useState(profile)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleSave = () => {
    setProfile(editProfile)
    setIsEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handlePasswordChange = async () => {
    if (!user) return

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    await updateSelf(user.id, { password: passwordData.newPassword })

    setIsChangingPassword(false)
    setPasswordSaved(true)
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    setTimeout(() => setPasswordSaved(false), 3000)
  }

  const handleCancel = () => {
    setEditProfile(profile)
    setIsEditing(false)
  }

  const addSmurfAccount = () => {
    const newSmurf: SmurfAccount = {
      id: Date.now().toString(),
      name: "",
      weplayId: "",
    }
    setEditProfile({
      ...editProfile,
      smurfAccounts: [...editProfile.smurfAccounts, newSmurf],
    })
  }

  const removeSmurfAccount = (id: string) => {
    setEditProfile({
      ...editProfile,
      smurfAccounts: editProfile.smurfAccounts.filter((s) => s.id !== id),
    })
  }

  const updateSmurfAccount = (
    id: string,
    field: keyof SmurfAccount,
    value: string
  ) => {
    setEditProfile({
      ...editProfile,
      smurfAccounts: editProfile.smurfAccounts.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    })
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <User className="w-6 h-6 text-primary" />
            My Profile
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            View and edit your PUHON member profile.
          </p>
        </div>
        {!isEditing && (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      {saved && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-2">
          <Save className="w-4 h-4" />
          Profile saved successfully!
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="space-y-4">
          {/* Avatar */}
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-600 via-teal-500 to-emerald-400 flex items-center justify-center mx-auto mb-4 border-2 border-primary/30">
                <span className="text-4xl font-bold text-white">{user?.displayName[0] || "C"}</span>
              </div>
              <h2 className="text-xl font-bold">{user?.displayName || profile.displayName}</h2>
              <Badge className="mt-2 bg-blue-400/10 text-blue-400 border-blue-400/30">
                <Shield className="w-3 h-3 mr-1" />
                {user?.role || "Member"}
              </Badge>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-card border-border">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Joined
                </div>
                <span className="text-sm font-medium">Jun 2023</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Crown className="w-4 h-4" />
                  Level
                </div>
                <span className="text-sm font-bold text-gold-gradient">28</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  Days Active
                </div>
                <span className="text-sm font-medium">127</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Gamepad2 className="w-4 h-4" />
                  Events Attended
                </div>
                <span className="text-sm font-medium">34</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="md:col-span-2 space-y-4">
          {/* Password Change Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              {passwordSaved && (
                <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Password changed successfully!
                </div>
              )}
              
              {isChangingPassword ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Current Password</label>
                    <Input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">New Password</label>
                    <Input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confirm New Password</label>
                    <Input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <Button onClick={handlePasswordChange}>
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" onClick={() => {
                      setIsChangingPassword(false)
                      setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      })
                    }}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button onClick={() => setIsChangingPassword(true)}>
                  <Key className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Profile Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  {/* WePlay ID */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">WePlay ID</label>
                    <Input
                      value={editProfile.weplayId}
                      onChange={(e) =>
                        setEditProfile({ ...editProfile, weplayId: e.target.value })
                      }
                      className="bg-background/50"
                    />
                  </div>

                  {/* Display Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Display Name/WePlay Name</label>
                    <Input
                      value={editProfile.displayName}
                      onChange={(e) =>
                        setEditProfile({ ...editProfile, displayName: e.target.value })
                      }
                      className="bg-background/50"
                    />
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bio</label>
                    <Textarea
                      value={editProfile.bio}
                      onChange={(e) =>
                        setEditProfile({ ...editProfile, bio: e.target.value })
                      }
                      className="bg-background/50 min-h-[100px]"
                    />
                  </div>

                  {/* Favorite Game */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Favorite Game</label>
                    <Select
                      value={editProfile.favoriteGame}
                      onValueChange={(v) =>
                        setEditProfile({ ...editProfile, favoriteGame: v })
                      }
                    >
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Space Werewolf">Space Werewolf</SelectItem>
                        <SelectItem value="Mic Grab">Mic Grab</SelectItem>
                        <SelectItem value="Party Games">Party Games</SelectItem>
                        <SelectItem value="All Games">All Games</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <Input
                      value={editProfile.status}
                      onChange={(e) =>
                        setEditProfile({ ...editProfile, status: e.target.value })
                      }
                      className="bg-background/50"
                      placeholder="What's on your mind?"
                    />
                  </div>

                  {/* Smurf Accounts */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Smurf Accounts</label>
                      <Button variant="ghost" size="sm" onClick={addSmurfAccount}>
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                    </div>
                    {editProfile.smurfAccounts.map((smurf) => (
                      <div key={smurf.id} className="flex gap-2 items-start">
                        <div className="flex-1 space-y-2">
                          <Input
                            placeholder="Display Name/WePlay Name"
                            value={smurf.name}
                            onChange={(e) =>
                              updateSmurfAccount(smurf.id, "name", e.target.value)
                            }
                            className="bg-background/50"
                          />
                          <Input
                            placeholder="WePlay ID"
                            value={smurf.weplayId}
                            onChange={(e) =>
                              updateSmurfAccount(smurf.id, "weplayId", e.target.value)
                            }
                            className="bg-background/50"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeSmurfAccount(smurf.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <Button onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">WePlay ID</p>
                      <p className="font-medium">{profile.weplayId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Display Name/WePlay Name</p>
                      <p className="font-medium">{profile.displayName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Bio</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{profile.bio}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Favorite Game</p>
                      <div className="flex items-center gap-2">
                        <Gamepad2 className="w-4 h-4 text-primary" />
                        <span className="font-medium">{profile.favoriteGame}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Status</p>
                      <p className="text-sm italic text-muted-foreground">&quot;{profile.status}&quot;</p>
                    </div>
                    {profile.smurfAccounts.length > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Smurf Accounts</p>
                        <div className="space-y-2">
                          {profile.smurfAccounts.map((smurf) => (
                            <div key={smurf.id} className="flex items-center gap-2 text-sm">
                              <span className="font-medium">{smurf.name}</span>
                              <span className="text-muted-foreground">({smurf.weplayId})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
