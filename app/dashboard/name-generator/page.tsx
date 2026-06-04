"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Sparkles, User, Users, Crown } from "lucide-react"

const fontStylingMatrix = {
  bold: (text: string) => text.split('').map(char => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      // Uppercase A-Z -> Mathematical Bold Capital
      return String.fromCodePoint(code + 119743);
    } else if (code >= 97 && code <= 122) {
      // Lowercase a-z -> Mathematical Bold Small
      return String.fromCodePoint(code + 119737);
    }
    return char;
  }).join('')
};

export default function NameGeneratorPage() {
  const [rawInput, setRawInput] = useState('')
  const [nameMode, setNameMode] = useState<'main' | 'smurf'>('main')
  const [generatedName, setGeneratedName] = useState('')
  const [copied, setCopied] = useState(false)

  const handleGenerateIdentity = () => {
    if (!rawInput) return;

    // Standard Execution
    const stylizedBase = fontStylingMatrix.bold(rawInput);
    const finalName = nameMode === 'main' ? `🔅${stylizedBase}` : `🔅${stylizedBase}★`;
    setGeneratedName(finalName);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-primary" />
          Name Generator
        </h1>
        <p className="text-muted-foreground mt-2">
          Create official PUHON styled names for your WePlay profile.
        </p>
      </div>

      <div className="grid lg:grid-cols-1 gap-6">
        {/* Clan Name Generator */}
        <Card className="bg-card/50 border-border/50 glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Official Name Stylizer
            </CardTitle>
            <CardDescription>Format your name for Main or Smurf accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nickname">Your Nickname</Label>
              <Input 
                id="nickname" 
                placeholder="e.g., Finn" 
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                className="bg-background/50"
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant={nameMode === 'main' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => setNameMode('main')}
              >
                <Crown className="w-4 h-4 mr-2" />
                Main (🔅)
              </Button>
              <Button
                type="button"
                variant={nameMode === 'smurf' ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => setNameMode('smurf')}
              >
                <Users className="w-4 h-4 mr-2" />
                Smurf (★)
              </Button>
            </div>

            <Button 
              className="w-full font-bold" 
              onClick={handleGenerateIdentity}
              disabled={!rawInput}
            >
              Generate Name
            </Button>

            {generatedName && (
              <div className="mt-6 p-4 bg-background/80 rounded-lg border border-border/50 flex items-center justify-between group">
                <span className="text-xl font-mono text-gold-gradient tracking-widest">{generatedName}</span>
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => copyToClipboard(generatedName)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
