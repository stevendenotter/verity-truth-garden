import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Shield, Coins, Rocket, ArrowRight, BookOpen, Users, Vote, Calendar, CheckCircle } from "lucide-react";

const tokenData = [
  { name: "Community", value: 50, fill: "hsl(var(--primary))" },
  { name: "Team (3y vest)", value: 20, fill: "hsl(var(--secondary))" },
  { name: "Development/Marketing", value: 20, fill: "hsl(var(--muted))" },
  { name: "Investors (2y vest)", value: 10, fill: "hsl(var(--accent))" },
];

const Launch = () => {
  const navigate = useNavigate();
  const [showWhitelist, setShowWhitelist] = useState(false);
  const [email, setEmail] = useState("");

  // SEO tags
  useEffect(() => {
    document.title = "Verity ICO – Decentralized Truth Token (VRT)";
    const metaDesc = document.querySelector('meta[name="description"]');
    const desc = "Join the Verity ICO. VRT powers decentralized truth verification with staking, governance, and rewards. Launch the demo app and read the mechanisms.";
    if (metaDesc) metaDesc.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }
    // Canonical
    const canonicalHref = `${window.location.origin}/launch`;
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonicalHref;
  }, []);

  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Verity",
    "url": `${window.location.origin}`,
    "logo": `${window.location.origin}/favicon.ico`,
    "sameAs": [],
  }), []);

  const faqJsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I join the ICO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use the Join Whitelist button on the launch page. We'll email steps and KYC details if applicable."
        }
      },
      {
        "@type": "Question",
        "name": "Where can I try the product?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Click Launch Demo App to use the live MVP right now."
        }
      },
      {
        "@type": "Question",
        "name": "Is the token utility real?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. VRT gates posting, powers staking and rewards, and grants governance voting rights."
        }
      }
    ]
  }), []);

  const handleWhitelist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const list = JSON.parse(localStorage.getItem("verity_whitelist") || "[]");
      list.push({ email, at: Date.now() });
      localStorage.setItem("verity_whitelist", JSON.stringify(list));
      setShowWhitelist(false);
      alert("You're on the whitelist! We'll be in touch soon.");
    } catch {
      alert("Thanks! You're on the whitelist.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main className="container mx-auto px-4 py-10">
        {/* Hero */}
        <section className="text-center mb-12">
          <Badge className="mb-4 bg-verity-blue/10 text-verity-blue border-verity-blue/20">
            <Rocket className="w-4 h-4 mr-2" /> Token Launch
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            VRT Token Launch – Powering Decentralized Truth
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Fund the movement for trustless, transparent information. Stake, vote, and govern the Verity protocol with VRT.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button onClick={() => navigate("/")} size="lg" className="bg-gradient-to-r from-verity-blue to-trust-green hover:from-verity-blue-dark hover:to-trust-green">
              Launch Demo App <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => setShowWhitelist(true)}>
              Join Whitelist
            </Button>
            <Button variant="ghost" size="lg" onClick={() => navigate("/mechanisms")}> 
              <BookOpen className="w-4 h-4 mr-2" /> Read Mechanisms
            </Button>
          </div>
        </section>

        {/* Highlights */}
        <section className="grid md:grid-cols-3 gap-4 mb-10">
          <Card className="glass-card"><CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2"><Shield className="w-5 h-5 text-verity-blue" /><h3 className="font-semibold">Trustless Transparency</h3></div>
            <p className="text-sm text-muted-foreground">Blockchain-recorded voting and reputation-weighted consensus.</p>
          </CardContent></Card>
          <Card className="glass-card"><CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2"><Vote className="w-5 h-5 text-trust-green" /><h3 className="font-semibold">Truth-Incentivized</h3></div>
            <p className="text-sm text-muted-foreground">Earn for correct votes, lose on misinformation. Align incentives to truth.</p>
          </CardContent></Card>
          <Card className="glass-card"><CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2"><Users className="w-5 h-5 text-verify-gold" /><h3 className="font-semibold">Community-Governed</h3></div>
            <p className="text-sm text-muted-foreground">1 VRT = 1 vote. 20% quorum. Reputation influences rewards.</p>
          </CardContent></Card>
        </section>

        {/* Tokenomics */}
        <section id="tokenomics" className="mb-10">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Coins className="w-5 h-5 text-verify-gold" /> Token Distribution</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6 items-center">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={tokenData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={4}>
                      {tokenData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between p-3 bg-muted/30 rounded">Community Rewards <Badge>50%</Badge></li>
                <li className="flex items-center justify-between p-3 bg-muted/30 rounded">Team (3-year vest) <Badge variant="secondary">20%</Badge></li>
                <li className="flex items-center justify-between p-3 bg-muted/30 rounded">Development & Marketing <Badge className="bg-verity-blue/10 text-verity-blue border-verity-blue/20">20%</Badge></li>
                <li className="flex items-center justify-between p-3 bg-muted/30 rounded">Investors (2-year vest) <Badge className="bg-verify-gold/10 text-verify-gold border-verify-gold/20">10%</Badge></li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Mechanisms Overview */}
        <section id="mechanisms-overview" className="mb-10">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-verity-blue" /> Mechanisms Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="m1">
                  <AccordionTrigger>Truth‑Incentivized Voting</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                      <li>Stake: 10 VRT per vote. Outcome by weighted consensus: <code>O = round(ΣW_i / ΣR_i)</code>.</li>
                      <li>Redistribution pool: <code>P = Σ(γ · S_i)</code>, with <code>γ = 0.2</code>.</li>
                      <li>Reward share: <code>B_i = P · (R_i / ΣR_j)</code>. Example reward ≈ 0.857 VRT for correct voters.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="m2">
                  <AccordionTrigger>Reputation System</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                      <li>Start at <code>R = 50</code>.</li>
                      <li>Correct vote: <code>R' = R + 0.05 · (100 − R)</code>.</li>
                      <li>Incorrect vote: <code>R' = R − 0.1 · R</code>.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="m3">
                  <AccordionTrigger>Token‑Gated Participation</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                      <li>1 VRT required to post/comment/like; optional 0.1 VRT action fees.</li>
                      <li>Aligns contribution quality with economic skin‑in‑the‑game.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="m4">
                  <AccordionTrigger>Decentralized Governance</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                      <li><code>1 VRT = 1 vote</code>; proposals require 20% quorum.</li>
                      <li>Community controls policy, parameters, and treasury.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="mt-4 flex justify-end">
                <Button variant="ghost" onClick={() => navigate("/mechanisms")}>Deep dive into mechanisms →</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Roadmap */}
        <section className="mb-10">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Roadmap</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-muted/30 rounded"><h4 className="font-semibold mb-1">Phase 1 (0-3m)</h4><p className="text-muted-foreground">MVP simulation, token-gated actions, referral system, web prototype.</p></div>
              <div className="p-4 bg-muted/30 rounded"><h4 className="font-semibold mb-1">Phase 2 (4-6m)</h4><p className="text-muted-foreground">Polygon testnet deploy, voting and governance testing.</p></div>
              <div className="p-4 bg-muted/30 rounded"><h4 className="font-semibold mb-1">Phase 3 (7-9m)</h4><p className="text-muted-foreground">Mainnet launch, growth, mobile prep.</p></div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="q1">
                  <AccordionTrigger>How do I join the ICO?</AccordionTrigger>
                  <AccordionContent>Use the Join Whitelist button above. Well email steps and KYC details if applicable.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2">
                  <AccordionTrigger>Where can I try the product?</AccordionTrigger>
                  <AccordionContent>Click Launch Demo App to use the live MVP right now.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="q3">
                  <AccordionTrigger>Is the token utility real?</AccordionTrigger>
                  <AccordionContent>Yes. VRT gates posting, powers staking and rewards, and grants governance voting rights.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Investor CTA */}
        <section className="text-center">
          <Card className="glass-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-2">Ready to back a truth-first internet?</h2>
              <p className="text-muted-foreground mb-4">Join early supporters and help launch Verity globally.</p>
              <div className="flex items-center justify-center gap-3">
                <Button onClick={() => setShowWhitelist(true)} className="bg-gradient-to-r from-verity-blue to-trust-green hover:from-verity-blue-dark hover:to-trust-green">
                  Join Whitelist <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" onClick={() => navigate("/")}>Launch Demo</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Simple Whitelist Modal */}
      {showWhitelist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="glass-card w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-trust-green" />
                <h3 className="font-semibold">Join Whitelist</h3>
              </div>
              <button aria-label="Close" onClick={() => setShowWhitelist(false)}>✕</button>
            </div>
            <form onSubmit={handleWhitelist} className="space-y-4">
              <label className="text-sm" htmlFor="email">Email</label>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded border bg-background" placeholder="you@domain.com" />
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setShowWhitelist(false)} className="flex-1">Cancel</Button>
                <Button type="submit" className="flex-1">Join</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Launch;
