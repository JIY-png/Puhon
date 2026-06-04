"use client"

import { useState } from "react"
import {
  Crown,
  ScrollText,
  ShieldCheck,
  MessageSquare,
  AlertTriangle,
  Swords,
  Heart,
  Ban,
  HandshakeIcon,
  Volume2,
  UserX,
  Clock,
  Scale,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const rulesSections = [
  {
    id: "general",
    title: "General Conduct",
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    rules: [
      {
        title: "Respect All Members",
        description: "Treat every family member with respect regardless of level, role, or skill. We are all here to have fun and grow together.",
        icon: Heart,
        imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=respect%20all%20members%20unity%20in%20community%20friendly%20diverse%20group%20illustration&image_size=square",
      },
      {
        title: "No Discrimination",
        description: "Discrimination based on race, gender, religion, nationality, or any other personal characteristic will not be tolerated.",
        icon: Ban,
        imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=no%20discrimination%20equality%20for%20all%20inclusive%20illustration&image_size=square",
      },
      {
        title: "Loyalty to the Family",
        description: "PUHON members should prioritize family events and activities. Dual membership in rival families is not allowed.",
        icon: HandshakeIcon,
        imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=family%20loyalty%20handshake%20unity%20teamwork%20illustration&image_size=square",
      },
      {
        title: "Represent with Pride",
        description: "When playing publicly, remember you represent PUHON. Maintain good sportsmanship and a positive attitude.",
        icon: Crown,
        imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=represent%20family%20pride%20badge%20logo%20honor%20illustration&image_size=square",
      },
    ],
  },
  {
    id: "ingame",
    title: "In-Game Rules",
    icon: Swords,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    rules: [
      {
        title: "No Cheating or Exploits",
        description: "Using hacks, cheats, mods, or exploits of any kind is strictly prohibited. Play fair, win fair.",
        icon: Ban,
        imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=fair%20play%20sportsmanship%20trophy%20honest%20competition%20illustration&image_size=square",
      },
      {
        title: "Follow Game Strategies",
        description: "During organized family events, follow the designated strategy leader's calls. Coordinate as a team.",
        icon: Swords,
        imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=game%20strategy%20teamwork%20coordination%20illustration&image_size=square",
      },
      {
        title: "Active Participation",
        description: "Members are expected to participate in at least 2 family events per month to maintain active status.",
        icon: Clock,
        imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=stay%20active%20clock%20calendar%20checkmark%20reminder%20illustration&image_size=square",
      },
      {
        title: "Fair Play in Internal Matches",
        description: "During internal tournaments and practice matches, maintain sportsmanship. No rage-quitting or intentional sabotage.",
        icon: Scale,
        imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=fair%20play%20balance%20scale%20sportsmanship%20illustration&image_size=square",
      },
    ],
  },
  {
    id: "communication",
    title: "Communication",
    icon: MessageSquare,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    rules: [
      {
        title: "Keep Chat Clean",
        description: "No excessive profanity, spam, or NSFW content in any family communication channels.",
        icon: MessageSquare,
        imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=clean%20chat%20friendly%20messages%20illustration&image_size=square",
      },
      {
        title: "Voice Chat Etiquette",
        description: "Minimize background noise, don't talk over others, and keep voice volume at a reasonable level during group sessions.",
        icon: Volume2,
        imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=voice%20chat%20microphone%20mute%20friendly%20communication%20illustration&image_size=square",
      },
      {
        title: "Report Issues Privately",
        description: "If you have a conflict with another member, reach out to an Elder or Leader privately. Don't air grievances publicly.",
        icon: ShieldCheck,
        imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=report%20issues%20privately%20shield%20protection%20illustration&image_size=square",
      },
    ],
  },
  {
    id: "consequences",
    title: "Consequences",
    icon: AlertTriangle,
    color: "text-red-400",
    bg: "bg-red-400/10",
    rules: [
      {
        title: "Three-Strike System",
        description: "Minor infractions follow a three-strike system: 1st — Warning, 2nd — Temporary demotion, 3rd — Removal from family.",
        icon: AlertTriangle,
        imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=three%20strikes%20warning%20sign%20red%20alert%20illustration&image_size=square",
      },
      {
        title: "Zero Tolerance Offenses",
        description: "Cheating, severe harassment, or doxxing result in immediate removal with no appeal. These are non-negotiable.",
        icon: Ban,
        imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=zero%20tolerance%20stop%20sign%20forbidden%20illustration&image_size=square",
      },
      {
        title: "Inactivity Policy",
        description: "Members inactive for 30+ days without prior notice may be moved to Recruit rank. Extended absence (60+ days) may result in removal.",
        icon: UserX,
        imageUrl: "https://coresg-normal.trae.ai/api/ide/v1/text-to-image?prompt=inactivity%20policy%20clock%20timer%20illustration&image_size=square",
      },
    ],
  },
]

export default function DashboardRulesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-4">
            <ScrollText className="w-4 h-4" />
            Family Code
          </div>
          <h1 className="text-2xl font-bold text-foreground">The PUHON Rules</h1>
          <p className="text-muted-foreground">
            Our family is built on respect, fairness, and teamwork. These rules ensure everyone has a great time.
          </p>
        </div>
      </div>

      {/* Rules */}
      <div className="space-y-6">
        {rulesSections.map((section) => {
          const SectionIcon = section.icon
          return (
            <Card key={section.id} className="bg-card border-border">
              <CardContent className="p-0">
                {/* Section Header */}
                <div className={`flex items-center gap-3 px-6 py-4 border-b border-border ${section.bg}`}>
                  <div className={`w-10 h-10 rounded-lg ${section.bg} flex items-center justify-center border border-current/10`}>
                    <SectionIcon className={`w-5 h-5 ${section.color}`} />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
                  <span className="ml-auto text-sm text-muted-foreground">{section.rules.length} rules</span>
                </div>

                {/* Accordion Rules */}
                <Accordion type="multiple" className="px-2">
                  {section.rules.map((rule, index) => {
                    const RuleIcon = rule.icon
                    return (
                      <AccordionItem key={index} value={`${section.id}-${index}`} className="border-border/30">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30 rounded-lg">
                          <div className="flex items-center gap-3 text-left">
                            <div className={`w-8 h-8 rounded-md ${section.bg} flex items-center justify-center shrink-0`}>
                              <RuleIcon className={`w-4 h-4 ${section.color}`} />
                            </div>
                            <span className="font-medium text-foreground">{rule.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="pl-11 space-y-4">
                            {rule.imageUrl && (
                              <div className="w-full max-w-xs mx-auto">
                                <img 
                                  src={rule.imageUrl} 
                                  alt={rule.title} 
                                  className="rounded-lg border border-border/50 w-full h-40 object-cover"
                                />
                              </div>
                            )}
                            <p className="text-muted-foreground leading-relaxed">{rule.description}</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Bottom Note */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6 text-center">
          <Crown className="w-8 h-8 text-primary mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            These rules are maintained by the PUHON leadership team and may be updated as needed.
            <br />
            Last updated: May 2024
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
