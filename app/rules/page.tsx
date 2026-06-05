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
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

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
      },
      {
        title: "No Discrimination",
        description: "Discrimination based on race, gender, religion, nationality, or any other personal characteristic will not be tolerated.",
        icon: Ban,
      },
      {
        title: "Loyalty to the Family",
        description: "PUHON members should prioritize family events and activities. Dual membership in rival families is not allowed.",
        icon: HandshakeIcon,
      },
      {
        title: "Represent with Pride",
        description: "When playing publicly, remember you represent PUHON. Maintain good sportsmanship and a positive attitude.",
        icon: Crown,
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
      },
      {
        title: "Follow Game Strategies",
        description: "During organized family events, follow the designated strategy leader's calls. Coordinate as a team.",
        icon: Swords,
      },
      {
        title: "Active Participation",
        description: "Members are expected to participate in at least 2 family events per month to maintain active status.",
        icon: Clock,
      },
      {
        title: "Fair Play in Internal Matches",
        description: "During internal tournaments and practice matches, maintain sportsmanship. No rage-quitting or intentional sabotage.",
        icon: Scale,
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
      },
      {
        title: "Voice Chat Etiquette",
        description: "Minimize background noise, don't talk over others, and keep voice volume at a reasonable level during group sessions.",
        icon: Volume2,
      },
      {
        title: "Report Issues Privately",
        description: "If you have a conflict with another member, reach out to an Elder or Leader privately. Don't air grievances publicly.",
        icon: ShieldCheck,
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
      },
      {
        title: "Zero Tolerance Offenses",
        description: "Cheating, severe harassment, or doxxing result in immediate removal with no appeal. These are non-negotiable.",
        icon: Ban,
      },
      {
        title: "Inactivity Policy",
        description: "Members inactive for 30+ days without prior notice may be moved to Recruit rank. Extended absence (60+ days) may result in removal.",
        icon: UserX,
      },
    ],
  },
]

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
              <ScrollText className="w-4 h-4" />
              Family Code
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              The <span className="text-gold-gradient">PUHON</span> Rules
            </h1>
            <p className="text-muted-foreground text-lg">
              Our family is built on respect, fairness, and teamwork. These rules ensure everyone has a great time.
            </p>
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {rulesSections.map((section) => {
            const SectionIcon = section.icon
            return (
              <Card key={section.id} className="bg-card/50 border-border/50 overflow-hidden glass-card">
                <CardContent className="p-0">
                  <div className={`flex items-center gap-3 px-6 py-4 border-b border-border/50 ${section.bg}`}>
                    <div className={`w-10 h-10 rounded-lg ${section.bg} flex items-center justify-center border border-current/10`}>
                      <SectionIcon className={`w-5 h-5 ${section.color}`} />
                    </div>
                    <h2 className="text-xl font-bold">{section.title}</h2>
                    <span className="ml-auto text-sm text-muted-foreground">{section.rules.length} rules</span>
                  </div>

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
                              <span className="font-medium">{rule.title}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4">
                            <div className="pl-11">
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

        <div className="max-w-4xl mx-auto mt-8">
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
              <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
              <Link href="/join" className="hover:text-primary transition-colors">Join Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
