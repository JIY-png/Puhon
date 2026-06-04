"use client"

import { useState } from "react"
import { Crown, UserPlus, CheckCircle2, ChevronRight, Gamepad2, ArrowLeft } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

const formSchema = z.object({
  weplayUsername: z.string().min(3, "Username must be at least 3 characters"),
  ageRange: z.string().min(1, "Please select your age range"),
  favoriteGames: z.array(z.string()).min(1, "Select at least one game"),
  whyJoin: z.string().min(20, "Please write at least 20 characters"),
  referral: z.string().optional(),
  agreeRules: z.boolean().refine((v) => v, "You must agree to the family rules"),
})

type FormData = z.infer<typeof formSchema>

const games = [
  "Space Werewolf",
  "Mic Grab",
  "Party Games",
  "Strategy Games",
  "Other",
]

export default function JoinPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weplayUsername: "",
      ageRange: "",
      favoriteGames: [],
      whyJoin: "",
      referral: "",
      agreeRules: false,
    },
  })

  const selectedGames = watch("favoriteGames")
  const agreeRules = watch("agreeRules")

  const onSubmit = async (_data: FormData) => {
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitted(true)
  }

  const toggleGame = (game: string) => {
    const current = selectedGames || []
    if (current.includes(game)) {
      setValue("favoriteGames", current.filter((g) => g !== game), { shouldValidate: true })
    } else {
      setValue("favoriteGames", [...current, game], { shouldValidate: true })
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[80vh] px-4 pt-16">
          <Card className="max-w-lg w-full bg-card/50 border-primary/20 glass-card">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Application Submitted!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for applying to join PUHON! Our leadership team will review your application.
                You&apos;ll receive a response within 48 hours.
              </p>
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Return to Home
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/rules">Read the Family Rules</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-24 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
              <UserPlus className="w-4 h-4" />
              Recruitment Open
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Join the <span className="text-gold-gradient">Family</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Fill out the form below and our leadership team will review your application.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card/50 border-border/50 glass-card">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-primary" />
                Application Form
              </CardTitle>
              <CardDescription>
                All fields marked with * are required
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* WePlay Username */}
                <div className="space-y-2">
                  <label htmlFor="weplayUsername" className="text-sm font-medium">
                    WePlay Username *
                  </label>
                  <Input
                    id="weplayUsername"
                    placeholder="Your WePlay username"
                    className="bg-background/50"
                    {...register("weplayUsername")}
                  />
                  {errors.weplayUsername && (
                    <p className="text-xs text-destructive">{errors.weplayUsername.message}</p>
                  )}
                </div>

                {/* Age Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Age Range *</label>
                  <Select onValueChange={(v) => setValue("ageRange", v, { shouldValidate: true })}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select your age range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="13-17">13 - 17</SelectItem>
                      <SelectItem value="18-24">18 - 24</SelectItem>
                      <SelectItem value="25-34">25 - 34</SelectItem>
                      <SelectItem value="35+">35+</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.ageRange && (
                    <p className="text-xs text-destructive">{errors.ageRange.message}</p>
                  )}
                </div>

                {/* Favorite Games */}
                <div className="space-y-3">
                  <label className="text-sm font-medium">Favorite Games *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {games.map((game) => {
                      const isSelected = selectedGames?.includes(game)
                      return (
                        <button
                          key={game}
                          type="button"
                          onClick={() => toggleGame(game)}
                          className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                            isSelected
                              ? "bg-primary/10 border-primary/40 text-primary"
                              : "bg-background/50 border-border/50 text-muted-foreground hover:border-primary/20"
                          }`}
                        >
                          {game}
                        </button>
                      )
                    })}
                  </div>
                  {errors.favoriteGames && (
                    <p className="text-xs text-destructive">{errors.favoriteGames.message}</p>
                  )}
                </div>

                {/* Why Join */}
                <div className="space-y-2">
                  <label htmlFor="whyJoin" className="text-sm font-medium">
                    Why do you want to join PUHON? *
                  </label>
                  <Textarea
                    id="whyJoin"
                    placeholder="Tell us about yourself and why you'd be a great fit for the family..."
                    className="bg-background/50 min-h-[120px]"
                    {...register("whyJoin")}
                  />
                  {errors.whyJoin && (
                    <p className="text-xs text-destructive">{errors.whyJoin.message}</p>
                  )}
                </div>

                {/* Referral */}
                <div className="space-y-2">
                  <label htmlFor="referral" className="text-sm font-medium">
                    Referred by (optional)
                  </label>
                  <Input
                    id="referral"
                    placeholder="Username of who referred you"
                    className="bg-background/50"
                    {...register("referral")}
                  />
                </div>

                {/* Agree to Rules */}
                <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <Checkbox
                    id="agreeRules"
                    checked={agreeRules}
                    onCheckedChange={(checked) => setValue("agreeRules", checked === true, { shouldValidate: true })}
                    className="mt-0.5"
                  />
                  <label htmlFor="agreeRules" className="text-sm leading-relaxed cursor-pointer">
                    I have read and agree to the{" "}
                    <Link href="/rules" className="text-primary hover:underline">
                      PUHON Family Rules
                    </Link>
                    . I understand that breaking these rules may result in removal from the family. *
                  </label>
                </div>
                {errors.agreeRules && (
                  <p className="text-xs text-destructive">{errors.agreeRules.message}</p>
                )}

                {/* Submit */}
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Submit Application
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
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
              <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
