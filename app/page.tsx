import Link from "next/link"
import { Crown, Users, Trophy, Calendar, Shield, Gamepad2, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"

const stats = [
  { label: "Active Members", value: "50+", icon: Users },
  { label: "Family Level", value: "42", icon: Crown },
  { label: "Tournaments Won", value: "28", icon: Trophy },
  { label: "Events This Month", value: "12", icon: Calendar },
]

const features = [
  {
    icon: Users,
    title: "United Community",
    description: "Join a family of passionate gamers who support and grow together.",
  },
  {
    icon: Trophy,
    title: "Competitive Excellence",
    description: "Participate in tournaments and climb the ranks with skilled teammates.",
  },
  {
    icon: Shield,
    title: "Safe Environment",
    description: "Enjoy a respectful, inclusive space with clear rules and fair leadership.",
  },
  {
    icon: Gamepad2,
    title: "Multiple Games",
    description: "Play Space Werewolf, Mic Grab, and more with dedicated strategies.",
  },
]

const recentAchievements = [
  { title: "Reached Level 42", date: "May 2024", type: "milestone" },
  { title: "Won Space Werewolf Tournament", date: "April 2024", type: "trophy" },
  { title: "50 Active Members", date: "March 2024", type: "community" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-8">
              <Crown className="w-4 h-4" />
              WePlay Gaming Family
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
              Welcome to{" "}
              <span className="text-gold-gradient">PUHON</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              A premier WePlay gaming family where passion meets excellence. 
              Join our community of dedicated gamers and rise to glory together.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/join">
                  Join Our Family
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/members">View Members</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <Card key={stat.label} className="bg-card/50 border-border/50 backdrop-blur">
                <CardContent className="p-4 text-center">
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl md:text-3xl font-bold text-gold-gradient">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join PUHON?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are more than just a gaming group - we are a family that values growth, respect, and excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature) => (
              <Card key={feature.title} className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Achievements */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Recent Achievements</h2>
              <Button variant="ghost" asChild>
                <Link href="/members">
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {recentAchievements.map((achievement, index) => (
                <Card key={index} className="bg-card/50 border-border/50">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Star className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-sm text-muted-foreground">{achievement.date}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 via-card to-card border-primary/20">
            <CardContent className="p-8 md:p-12 text-center">
              <Crown className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Join the Family?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Apply now and become part of PUHON. We welcome dedicated gamers who share our values of respect, teamwork, and excellence.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/join">
                    Apply Now
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/rules">Read Our Rules</Link>
                </Button>
              </div>
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
              <Link href="/rules" className="hover:text-primary transition-colors">Rules</Link>
              <Link href="/members" className="hover:text-primary transition-colors">Members</Link>
              <Link href="/join" className="hover:text-primary transition-colors">Join Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
