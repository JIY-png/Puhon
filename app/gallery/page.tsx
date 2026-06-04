"use client"

import { useState } from "react"
import { Crown, Image, Lock, Download, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

type GalleryCategory = "PFP" | "Banner" | "Artwork"

interface GalleryItem {
  id: number
  title: string
  category: GalleryCategory
  creator: string
  gradient: string
  memberOnly: boolean
  emoji: string
}

const galleryItems: GalleryItem[] = [
  { id: 1, title: "Golden Crown PFP", category: "PFP", creator: "ShadowKing", gradient: "from-yellow-600 via-amber-500 to-yellow-400", memberOnly: false, emoji: "👑" },
  { id: 2, title: "Night Viper Avatar", category: "PFP", creator: "NightViper", gradient: "from-purple-700 via-violet-600 to-purple-400", memberOnly: false, emoji: "🐍" },
  { id: 3, title: "Blaze Hunter PFP", category: "PFP", creator: "BlazeHunter", gradient: "from-red-700 via-orange-600 to-red-400", memberOnly: false, emoji: "🔥" },
  { id: 4, title: "PUHON Banner v1", category: "Banner", creator: "LunarStrike", gradient: "from-primary/80 via-yellow-600 to-amber-500", memberOnly: false, emoji: "⚔️" },
  { id: 5, title: "PUHON Banner v2", category: "Banner", creator: "ShadowKing", gradient: "from-zinc-800 via-primary/60 to-zinc-700", memberOnly: true, emoji: "🏴" },
  { id: 6, title: "Crystal Fang PFP", category: "PFP", creator: "CrystalFang", gradient: "from-cyan-600 via-teal-500 to-emerald-400", memberOnly: true, emoji: "💎" },
  { id: 7, title: "Storm Warrior Art", category: "Artwork", creator: "StormBreaker", gradient: "from-blue-700 via-indigo-600 to-blue-400", memberOnly: false, emoji: "⚡" },
  { id: 8, title: "Phoenix Rising", category: "Artwork", creator: "EmberKnight", gradient: "from-orange-600 via-red-500 to-pink-500", memberOnly: true, emoji: "🦅" },
  { id: 9, title: "Lunar Eclipse PFP", category: "PFP", creator: "LunarStrike", gradient: "from-slate-800 via-blue-900 to-indigo-800", memberOnly: false, emoji: "🌙" },
  { id: 10, title: "Iron Wolf Sigil", category: "Artwork", creator: "IronWolf", gradient: "from-zinc-600 via-gray-500 to-zinc-400", memberOnly: true, emoji: "🐺" },
  { id: 11, title: "Phantom Ace PFP", category: "PFP", creator: "PhantomAce", gradient: "from-gray-800 via-slate-700 to-gray-500", memberOnly: false, emoji: "👻" },
  { id: 12, title: "Family Crest Banner", category: "Banner", creator: "ShadowKing", gradient: "from-yellow-700 via-amber-600 to-yellow-500", memberOnly: true, emoji: "🛡️" },
]

const categories: (GalleryCategory | "All")[] = ["All", "PFP", "Banner", "Artwork"]

export default function GalleryPage() {
  const [filter, setFilter] = useState<GalleryCategory | "All">("All")

  const filtered = galleryItems.filter((item) => {
    return filter === "All" || item.category === filter
  })

  const publicCount = galleryItems.filter((i) => !i.memberOnly).length

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
              <Image className="w-4 h-4" />
              {galleryItems.length} Creations
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              PFP <span className="text-gold-gradient">Gallery</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Profile pictures, banners, and artwork created by PUHON family members.
              <br />
              <span className="text-sm">
                {publicCount} public items • Login to access the full collection
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 pb-6">
        <div className="max-w-6xl mx-auto flex gap-2 flex-wrap justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card/50 text-muted-foreground hover:text-foreground border border-border/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <Card
              key={item.id}
              className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 group overflow-hidden glass-card"
            >
              <CardContent className="p-0">
                {/* Image Placeholder */}
                <div className="relative aspect-square overflow-hidden">
                  <div className={`w-full h-full bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                    <span className="text-5xl md:text-6xl opacity-80 group-hover:scale-110 transition-transform duration-300">
                      {item.emoji}
                    </span>
                  </div>

                  {/* Member Only Overlay */}
                  {item.memberOnly && (
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Lock className="w-6 h-6 text-primary mb-2" />
                      <span className="text-xs text-muted-foreground">Members Only</span>
                    </div>
                  )}

                  {/* View overlay for public items */}
                  {!item.memberOnly && (
                    <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Eye className="w-6 h-6 text-foreground" />
                    </div>
                  )}

                  {/* Category badge */}
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="text-xs bg-background/70 backdrop-blur">
                      {item.category}
                    </Badge>
                  </div>

                  {item.memberOnly && (
                    <div className="absolute top-2 right-2">
                      <Lock className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <h3 className="text-sm font-semibold truncate">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">by {item.creator}</p>
                  <div className="mt-2">
                    {item.memberOnly ? (
                      <Button variant="outline" size="sm" className="w-full text-xs h-8" disabled>
                        <Lock className="w-3 h-3 mr-1" />
                        Members Only
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="w-full text-xs h-8">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img 
                src="/Puhon_logo.png" 
                alt="PUHON Logo" 
                className="w-5 h-5 object-contain"
              />
              <span className="font-semibold text-gold-gradient">PUHON</span>
              <span className="text-muted-foreground">WePlay Family</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/members" className="hover:text-primary transition-colors">Members</Link>
              <Link href="/rules" className="hover:text-primary transition-colors">Rules</Link>
              <Link href="/join" className="hover:text-primary transition-colors">Join Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
