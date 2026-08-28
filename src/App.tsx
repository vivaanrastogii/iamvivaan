import { useState } from 'react';
import { Copy, Check, Mail, ExternalLink, Sparkles, CheckCircle2, Instagram, Github } from 'lucide-react';
import WarpText from './components/WarpText';
import ScrollStack, { ScrollStackItem } from './components/ScrollStack';
import SpotlightCard from './components/SpotlightCard';
import CardNav from './components/CardNav';
import GradientWaves from './components/GradientWaves';
import HeroVideoBackground from './components/HeroVideoBackground';
import BackgroundAudio from './components/BackgroundAudio';
import ScrollVelocity from './components/ScrollVelocity';

export default function App() {
  const [openPrompt, setOpenPrompt] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showEggModal, setShowEggModal] = useState(false);
  const [showEmailFallback, setShowEmailFallback] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const navItems = [
    {
      label: "Explore",
      bgColor: "#1A1724",
      textColor: "#FFFFFF",
      links: [
        { label: "About Vivaan", href: "#about", ariaLabel: "About Section" },
        { label: "Tech Stack", href: "#stack", ariaLabel: "Tech Stack Section" },
        { label: "Currently Learning", href: "#learning", ariaLabel: "Learning Section" }
      ]
    },
    {
      label: "Creations",
      bgColor: "#141F2B",
      textColor: "#FFFFFF",
      links: [
        { label: "Things I've Built", href: "#projects", ariaLabel: "Projects Section" },
        { label: "AI Explorations", href: "#ai", ariaLabel: "AI Section" },
        { label: "The Vault & Music", href: "#vault", ariaLabel: "Vault Section" }
      ]
    },
    {
      label: "Connect",
      bgColor: "#291823",
      textColor: "#FFFFFF",
      links: [
        { label: "Prompt Lab", href: "#prompts", ariaLabel: "Prompts Section" },
        { label: "Get In Touch", href: "#contact", ariaLabel: "Contact Section" },
        { label: "Send Email", href: "mailto:vivaanrastogiofficial@gmail.com", ariaLabel: "Email Vivaan" }
      ]
    }
  ];

  const togglePrompt = (index: number) => {
    setOpenPrompt(openPrompt === index ? null : index);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('vivaanrastogiofficial@gmail.com').then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    });
  };

  const handleEmailClick = () => {
    setShowEmailFallback(true);
    window.location.href = 'mailto:vivaanrastogiofficial@gmail.com';
  };

  const prompts = [
    {
      name: 'Problem Solver',
      hint: 'structured thinking · root cause · action plan',
      text: `Act as a professional problem-solving coach and help me solve problems using structured thinking.

Here is how I want you to help me:

1️⃣ Ask me to clearly describe the problem I want to solve.
• Context • Constraints • Desired outcome

2️⃣ Help me break the problem into smaller parts.
• Root cause analysis • Key factors involved • What is controllable vs uncontrollable

3️⃣ Suggest multiple possible solutions.
• Pros and cons of each • Risks involved • Expected outcomes

4️⃣ Help me choose the best approach.
• Logical comparison • Trade-offs • Practical feasibility

5️⃣ Create a step-by-step action plan.
• First step • Execution strategy • Progress checkpoints

6️⃣ Suggest how to measure success.
• Clear results • Performance indicators • Improvement signals

7️⃣ End with reflection questions.
• What worked • What didn't • What to improve next time`
    },
    {
      name: '30-Day Skill Learner',
      hint: 'learn anything · weekly roadmap · daily tasks',
      text: `Act as an accelerated learning coach and help me learn the skill [SKILL NAME] in 30 days.

Here is how I want you to guide me:

1️⃣ Ask me my current level with [SKILL NAME].
• Beginner • Intermediate • Advanced

2️⃣ Identify the most important skills to focus on.
• The 20% knowledge that gives 80% results • Core fundamentals first

3️⃣ Break the skill into a 30-day roadmap.
• Week 1: Foundations • Week 2: Practice • Week 3: Real-world application • Week 4: Advanced usage

4️⃣ For each week:
• What to learn • What to practice • What to build or create

5️⃣ Give daily learning tasks.
• Short lessons • Practice exercises • Small challenges

6️⃣ Track my progress.
• Weekly review • Identify weak areas • Adjust learning plan

7️⃣ End with a final challenge.
• A real-world task using the skill • Something that proves I learned it`
    },
    {
      name: 'Job Hunt Strategist',
      hint: 'find roles · tailor resume · outreach messages',
      text: `Act as a job search strategist and help me find and apply for relevant jobs for [TARGET ROLE].

Here is how I want you to guide me:

1️⃣ Ask me about my background.
• Education • Experience • Skills • Preferred location or remote work

2️⃣ Identify job titles related to [TARGET ROLE].
• Primary roles • Alternative titles companies use

3️⃣ Suggest the best platforms to search for these jobs.
• Job boards • Company career pages • Professional networks

4️⃣ Help me build an effective job search strategy.
• Daily job search routine • Application tracking system • Target companies list

5️⃣ Help me tailor my resume for each application.
• Matching job description keywords • Highlighting relevant skills

6️⃣ Draft personalized job application messages.
• Recruiter outreach • Referral request • Follow-up messages

7️⃣ End with a weekly job search plan.
• Applications per week • Networking goals • Interview preparation steps`
    },
    {
      name: '30-Day Micro Roadmap',
      hint: 'quick · daily tasks · under 45 mins',
      text: 'Create a 30-day roadmap to learn [skill] with daily micro tasks I can finish in under 45 minutes.'
    },
    {
      name: 'Prompt Debugger',
      hint: 'improve any prompt · 3 fixes · better output',
      text: 'Analyze this prompt and suggest 3 improvements to get better model output. Input: [prompt].'
    }
  ];

  return (
    <div id="vivaan-root" className="min-h-screen bg-[#0D0D0D] text-[#F5F0E8] font-['DM_Sans',sans-serif] selection:bg-[#FFE03B] selection:text-[#0D0D0D]">
      {/* Background Music Player */}
      <BackgroundAudio />

      {/* Navigation */}
      <CardNav
        logo="/favicon.png"
        logoAlt="Vivaan Logo"
        logoText="vivaan."
        items={navItems}
        baseColor="#121214"
        menuColor="#ffffff"
        buttonBgColor="#FF4FA3"
        buttonTextColor="#ffffff"
        ctaText="Say Hello"
        ctaHref="#contact"
      />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[100vh] flex items-center justify-between px-6 md:px-16 pt-28 pb-20 overflow-hidden bg-[#000000]">
        {/* Animated Scroll-Reactive Video Background */}
        <HeroVideoBackground opacity={1.0} />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-center gap-8">
          {/* Text describing/portraying Vivaan Rastogi */}
          <div className="w-full max-w-3xl flex flex-col items-start text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 border border-white/10 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#00E5C0] animate-pulse"></span>
              <p className="text-[#00E5C0] text-xs font-mono tracking-widest uppercase font-semibold">
                ⚡ student · builder · musician · ai explorer
              </p>
            </div>

            <div className="w-full h-[220px] sm:h-[260px] md:h-[300px] flex justify-start items-center -ml-1">
              <WarpText
                text={"vivaan\nrastogi."}
                lineColors={['#F5F2EB', '#F0EAD6']}
                textAlign="left"
                warpStrength={0.08}
                warpScale={1.7}
                speed={0.55}
                pointerInfluence={0.42}
                pointerStrength={0.38}
                refraction={0.018}
                ripple
                fontSize="clamp(3.5rem, 8vw, 7.5rem)"
                fontWeight={800}
                fontFamily="Syne, sans-serif"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            <p className="text-gray-100 text-base md:text-lg font-light max-w-xl leading-relaxed text-left drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
              I build things on the internet, explore AI models, play guitar with my band, run Minecraft servers at midnight, and write horror stories.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold border border-[#FFE03B]/60 text-[#FFE03B] bg-black/40 backdrop-blur-md shadow-lg">Jaipur, India</span>
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold border border-[#00E5C0]/60 text-[#00E5C0] bg-black/40 backdrop-blur-md shadow-lg">Builder</span>
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold border border-[#FF5C38]/60 text-[#FF5C38] bg-black/40 backdrop-blur-md shadow-lg">Musician</span>
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold border border-[#FF4FA3]/60 text-[#FF4FA3] bg-black/40 backdrop-blur-md shadow-lg">Vibe Coder</span>
            </div>
          </div>
        </div>

        {/* Seamless bottom gradient texture transition into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-b from-transparent via-[#111111]/70 to-[#111111] pointer-events-none z-20"></div>

        <div className="absolute bottom-8 left-6 md:left-16 text-xs uppercase tracking-widest text-gray-300 flex items-center gap-3 pointer-events-none z-30 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          <div className="w-8 h-[1px] bg-gray-300/80 animate-pulse"></div>
          <span>scroll down</span>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 md:px-16 bg-[#111111]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#00E5C0] text-xs font-mono tracking-widest uppercase mb-2">01 — who am i</p>
          <h2 className="font-['Syne',sans-serif] text-3xl md:text-5xl font-extrabold mb-12">
            the basics, <br />
            <em className="not-italic text-[#FFE03B]">no fluff.</em>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: Quick Specs / Contact Info */}
            <div className="lg:col-span-5 bg-[#18181A] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-xs uppercase font-mono tracking-widest text-gray-400">Name</span>
                  <span className="text-sm sm:text-base text-gray-100 font-semibold">Vivaan Rastogi</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 pb-3 border-b border-white/5">
                  <span className="text-xs uppercase font-mono tracking-widest text-gray-400 shrink-0">Email</span>
                  <a 
                    href="mailto:vivaanrastogiofficial@gmail.com" 
                    className="text-xs sm:text-sm text-[#00E5C0] hover:text-[#33f3d5] hover:underline font-mono truncate transition-colors"
                    title="vivaanrastogiofficial@gmail.com"
                  >
                    vivaanrastogiofficial@gmail.com
                  </a>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-xs uppercase font-mono tracking-widest text-gray-400">Location</span>
                  <span className="text-sm sm:text-base text-gray-100 font-medium flex items-center gap-1.5">
                    Jaipur, Rajasthan <span className="text-base">🏰</span>
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs uppercase font-mono tracking-widest text-gray-400">Status</span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#00E5C0]/10 text-[#00E5C0] border border-[#00E5C0]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5C0] animate-pulse"></span>
                    Open to collabs
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-gray-400 font-mono">
                <span>// QUICK_INFO</span>
                <span>BUILDER & DEVELOPER</span>
              </div>
            </div>

            {/* Right Column: Fun Facts */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-['Syne',sans-serif] text-lg font-bold text-[#FFE03B] font-mono">// fun_facts.txt</h3>
                <span className="text-xs font-mono text-gray-400">4 items loaded</span>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                <div className="bg-[#18181A]/80 backdrop-blur-md border-l-4 border-[#00E5C0] border-y border-r border-y-[#2A2A2A] border-r-[#2A2A2A] rounded-r-2xl p-4 sm:p-5 text-sm text-gray-200 leading-relaxed transition-all hover:bg-[#1E1E22]/90 shadow-xl">
                  🐱 <span className="font-semibold text-white">Coding Buddy:</span> My orange cat walks on the keyboard and somehow improves the code.
                </div>
                <div className="bg-[#18181A]/80 backdrop-blur-md border-l-4 border-[#C850F0] border-y border-r border-y-[#2A2A2A] border-r-[#2A2A2A] rounded-r-2xl p-4 sm:p-5 text-sm text-gray-200 leading-relaxed transition-all hover:bg-[#1E1E22]/90 shadow-xl">
                  ⛏️ <span className="font-semibold text-white">Minecraft SMP:</span> I run Midnight SMP at <code className="bg-black/50 text-[#C850F0] px-2 py-0.5 rounded font-mono text-xs">ratri.enderman.cloud</code>
                </div>
                <div className="bg-[#18181A]/80 backdrop-blur-md border-l-4 border-[#FF5C38] border-y border-r border-y-[#2A2A2A] border-r-[#2A2A2A] rounded-r-2xl p-4 sm:p-5 text-sm text-gray-200 leading-relaxed transition-all hover:bg-[#1E1E22]/90 shadow-xl">
                  📖 <span className="font-semibold text-white">Horror Author:</span> Writing a supernatural horror story titled <em>The 3:33 Curse</em>, set in India.
                </div>
                <div className="bg-[#18181A]/80 backdrop-blur-md border-l-4 border-[#FFE03B] border-y border-r border-y-[#2A2A2A] border-r-[#2A2A2A] rounded-r-2xl p-4 sm:p-5 text-sm text-gray-200 leading-relaxed transition-all hover:bg-[#1E1E22]/90 shadow-xl">
                  🕵️ <span className="font-semibold text-white">Security & Linux:</span> Explored ethical hacking, phishing simulations, and Linux command lines early on.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stack Section */}
      <section id="stack" className="py-24 px-6 md:px-16 bg-[#0D0D0D]">
        <p className="text-[#C850F0] text-xs font-mono tracking-widest uppercase mb-2">02 — tech i've touched</p>
        <h2 className="font-['Syne',sans-serif] text-3xl md:text-5xl font-extrabold mb-8">
          my <span className="text-[#C850F0]">stack</span> &<br />explorations.
        </h2>

        <ScrollStack
          useWindowScroll={true}
          itemDistance={60}
          itemScale={0.03}
          itemStackDistance={25}
          stackPosition="20%"
          scaleEndPosition="10%"
          baseScale={0.88}
          blurAmount={1}
        >
          <ScrollStackItem itemClassName="bg-[#161618] border border-[#2A2A2A] text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#00E5C0] font-mono text-xs uppercase tracking-widest">// category 01</span>
              <span className="text-2xl">⚛️</span>
            </div>
            <h3 className="font-['Syne',sans-serif] text-2xl font-bold mb-3 text-white">Frontend & Web Engineering</h3>
            <p className="text-gray-400 text-xs mb-6 leading-relaxed">Building modern, responsive, and performant web interfaces with clean layouts.</p>
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'React', emoji: '⚛️' },
                { name: 'Next.js', emoji: '▲' },
                { name: 'Tailwind CSS', emoji: '🎨' },
                { name: 'JavaScript', emoji: '⚡' },
                { name: 'HTML / CSS', emoji: '🌍' },
                { name: 'Vercel', emoji: '▲' },
                { name: 'Netlify', emoji: '🌐' }
              ].map((tech, i) => (
                <span key={i} className="px-3.5 py-1.5 rounded-full bg-[#202022] border border-[#333] text-xs text-gray-200 flex items-center gap-1.5">
                  <span>{tech.emoji}</span> {tech.name}
                </span>
              ))}
            </div>
          </ScrollStackItem>

          <ScrollStackItem itemClassName="bg-[#18151f] border border-[#3B2556] text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#C850F0] font-mono text-xs uppercase tracking-widest">// category 02</span>
              <span className="text-2xl">🐍</span>
            </div>
            <h3 className="font-['Syne',sans-serif] text-2xl font-bold mb-3 text-white">Languages, Systems & Cloud</h3>
            <p className="text-gray-400 text-xs mb-6 leading-relaxed">Command line environments, automation scripts, and cloud deployment platforms.</p>
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'Python', emoji: '🐍' },
                { name: 'Linux', emoji: '🐧' },
                { name: 'Termux', emoji: '📱' },
                { name: 'VS Code', emoji: '💻' },
                { name: 'GitHub', emoji: '🐙' },
                { name: 'Replit', emoji: '🔁' }
              ].map((tech, i) => (
                <span key={i} className="px-3.5 py-1.5 rounded-full bg-[#231d2e] border border-[#482e6c] text-xs text-gray-200 flex items-center gap-1.5">
                  <span>{tech.emoji}</span> {tech.name}
                </span>
              ))}
            </div>
          </ScrollStackItem>

          <ScrollStackItem itemClassName="bg-[#131b24] border border-[#1d3852] text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#2B6FFF] font-mono text-xs uppercase tracking-widest">// category 03</span>
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="font-['Syne',sans-serif] text-2xl font-bold mb-3 text-white">AI Models & Prompting</h3>
            <p className="text-gray-400 text-xs mb-6 leading-relaxed">Exploring LLM capabilities, crafting precise prompts, and integrating generative AI tools.</p>
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'Claude AI', emoji: '🤖' },
                { name: 'Google AI Studio', emoji: '🔬' },
                { name: 'HuggingFace', emoji: '🤗' },
                { name: 'Custom GPTs', emoji: '⚙️' },
                { name: 'Prompt Eng', emoji: '💬' }
              ].map((tech, i) => (
                <span key={i} className="px-3.5 py-1.5 rounded-full bg-[#182636] border border-[#28496d] text-xs text-gray-200 flex items-center gap-1.5">
                  <span>{tech.emoji}</span> {tech.name}
                </span>
              ))}
            </div>
          </ScrollStackItem>

          <ScrollStackItem itemClassName="bg-[#241713] border border-[#522b1f] text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#FF5C38] font-mono text-xs uppercase tracking-widest">// category 04</span>
              <span className="text-2xl">🔐</span>
            </div>
            <h3 className="font-['Syne',sans-serif] text-2xl font-bold mb-3 text-white">Cybersecurity & Servers</h3>
            <p className="text-gray-400 text-xs mb-6 leading-relaxed">Ethical hacking concepts, phishing simulations, and managing custom Minecraft SMP servers.</p>
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'Ethical Hacking', emoji: '🔐' },
                { name: 'Phishing Sim', emoji: '🎣' },
                { name: 'Minecraft SMP', emoji: '⛏️' },
                { name: 'Mineflayer', emoji: '🔧' }
              ].map((tech, i) => (
                <span key={i} className="px-3.5 py-1.5 rounded-full bg-[#36211a] border border-[#6b3829] text-xs text-gray-200 flex items-center gap-1.5">
                  <span>{tech.emoji}</span> {tech.name}
                </span>
              ))}
            </div>
          </ScrollStackItem>

          <ScrollStackItem itemClassName="bg-[#242111] border border-[#544c1d] text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#FFE03B] font-mono text-xs uppercase tracking-widest">// category 05</span>
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="font-['Syne',sans-serif] text-2xl font-bold mb-3 text-white">Design & Creative Utilities</h3>
            <p className="text-gray-400 text-xs mb-6 leading-relaxed">Creating banners, logos, interface prototypes, and interactive web tools.</p>
            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'Canva', emoji: '🎨' },
                { name: 'Figma', emoji: '🖼️' },
                { name: 'CodePen', emoji: '✏️' },
                { name: '& Many More', emoji: '🚀' }
              ].map((tech, i) => (
                <span key={i} className="px-3.5 py-1.5 rounded-full bg-[#383319] border border-[#695f24] text-xs text-gray-200 flex items-center gap-1.5">
                  <span>{tech.emoji}</span> {tech.name}
                </span>
              ))}
            </div>
          </ScrollStackItem>
        </ScrollStack>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 md:px-16 bg-[#111111]">
        <p className="text-[#FF5C38] text-xs font-mono tracking-widest uppercase mb-2">03 — things i've built</p>
        <h2 className="font-['Syne',sans-serif] text-3xl md:text-5xl font-extrabold mb-12">
          my <span className="text-[#FF5C38]">projects.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { num: '01', title: 'ARYA Jewellers', desc: 'A luxury jewellery brand website with elegant design, product showcase, and refined visual identity.', link: 'https://fitmegym.my.canva.site/arya-jewellers', color: '#FFE03B' },
            { num: '02', title: 'Bookmark Your Web', desc: 'A web utility app to organize, save, and access your favorite websites and resources seamlessly.', link: 'https://bookmarkyourweb.vercel.app', color: '#00E5C0' },
            { num: '03', title: 'BuildQuest', desc: 'An interactive web application and project quest platform built for modern creators.', link: 'https://buildquest-211978012866.asia-southeast1.run.app', color: '#C850F0' },
            { num: '04', title: 'Cafe Uno', desc: 'A modern coffee shop and cafe experience platform with rich visual branding.', link: 'https://cafeuno.vercel.app', color: '#FF5C38' },
            { num: '05', title: 'CraftXWeb', desc: 'A web design agency concept site featuring clean layouts, services showcase, and modern UI.', link: 'https://craftxweb.netlify.app', color: '#2B6FFF' },
            { num: '06', title: 'FitME GYM', desc: 'A bold, high-energy gym website featuring membership info, fitness programs, and active visuals.', link: 'https://fitmegym.my.canva.site/fitme-gym', color: '#FF4FA3' },
            { num: '07', title: 'GuitarSense', desc: 'An interactive music web app for guitar enthusiasts to learn, practice, and explore chords.', link: 'https://guitarsense.vercel.app', color: '#FFE03B' },
            { num: '08', title: 'GuptLipi', desc: 'An innovative web tool inspired by ancient Indian scripts and secretive text encodings.', link: 'https://v0-guptlipi.vercel.app', color: '#00E5C0' },
            { num: '09', title: 'KOA Kitchen', desc: 'A modern culinary experience and cloud kitchen platform built with appetizing aesthetics.', link: 'https://koakitchen.vercel.app', color: '#FF5C38' },
            { num: '10', title: 'Navyug', desc: 'A modern youth-centric web portal and community platform with progressive design.', link: 'https://navyug-five.vercel.app', color: '#2B6FFF' },
            { num: '11', title: 'Ratri SMP', desc: 'The official Midnight Minecraft SMP community website featuring server details, rules, and join info.', link: 'https://ratrismp.netlify.app', color: '#C850F0' },
          ].map((proj, idx) => (
            <div
              key={idx}
              className="relative bg-[#151515] border border-[#2A2A2A] hover:translate-y-[-4px] transition-all rounded-2xl p-7 flex flex-col justify-between"
              style={{ borderTop: `3px solid ${proj.color}` }}
            >
              <div>
                <div className="font-['Syne',sans-serif] text-4xl font-extrabold opacity-10 mb-2">{proj.num}</div>
                <h3 className="font-['Syne',sans-serif] text-xl font-bold text-white mb-2">{proj.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">{proj.desc}</p>
              </div>
              <a
                href={proj.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider hover:underline"
                style={{ color: proj.color }}
              >
                view project <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Currently Learning */}
      <section id="learning" className="py-24 bg-[#0D0D0D] overflow-hidden">
        <div className="px-6 md:px-16 max-w-7xl mx-auto mb-8">
          <p className="text-[#2B6FFF] text-xs font-mono tracking-widest uppercase mb-2">04 — always growing</p>
          <h2 className="font-['Syne',sans-serif] text-3xl md:text-5xl font-extrabold mb-4">
            currently <span className="text-[#2B6FFF]">learning.</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
            Dynamic scroll velocity — scroll faster or reverse scroll direction to watch the stream accelerate.
          </p>
        </div>

        {/* Scroll Velocity Component Integration */}
        <div className="space-y-3 py-5 bg-[#111116] border-y border-white/10 my-4 shadow-2xl">
          <ScrollVelocity
            texts={[
              '⚡ Advanced JavaScript',
              '⚛️ React.js & Next.js',
              '🎸 Guitar & Music Theory',
              '🔐 Cybersecurity & CTFs'
            ]}
            velocity={80}
            className="text-[#00E5C0] uppercase font-['Syne',sans-serif] tracking-tight font-extrabold px-3 hover:text-white transition-colors"
          />
          <ScrollVelocity
            texts={[
              '💬 Prompt Engineering',
              '🤖 AI Models & Fine-tuning',
              '📖 Writing Horror Fiction',
              '🎙️ Vocals & Singing'
            ]}
            velocity={-80}
            className="text-[#FF4FA3] uppercase font-['Syne',sans-serif] tracking-tight font-extrabold px-3 hover:text-white transition-colors"
          />
        </div>
      </section>

      {/* Music Section */}
      <section id="music" className="relative py-28 px-6 md:px-16 bg-[#0a0a0a] overflow-hidden min-h-[460px] flex flex-col justify-center">
        {/* Background Image with Device-Friendly Aspect Cover & Dark Mask */}
        <div className="absolute inset-0 z-0">
          <img
            src="/music-guitar-bg.jpg"
            alt="Gibson Les Paul Electric Guitar Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center md:object-right opacity-35 filter contrast-125 brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-transparent to-[#0D0D0D]" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <p className="text-[#FF4FA3] text-xs font-mono tracking-widest uppercase mb-2 drop-shadow">05 — the other side of vivaan</p>
          <h2 className="font-['Syne',sans-serif] text-3xl md:text-5xl font-extrabold mb-8 drop-shadow-md">
            music is my <span className="text-[#FF4FA3]">aura.</span>
          </h2>

          <div className="space-y-6">
            <p className="text-gray-200 text-base md:text-lg leading-relaxed font-light drop-shadow">
              I don't just code — I play. Guitar is my main love, and I'm actively learning and improving every day. We're a full crew of music lovers who all sing, learn, and improve together.
            </p>
            <div className="border-l-4 border-[#FF4FA3] pl-4 italic text-white text-lg md:text-xl font-serif drop-shadow">
              "Music is the only place where I stop thinking about code — and somehow both feel the same when you're in the zone."
            </div>
          </div>
        </div>
      </section>

      {/* AI Explorer Section */}
      <section id="ai" className="py-24 px-6 md:px-16 bg-[#0D0D0D]">
        <p className="text-[#2B6FFF] text-xs font-mono tracking-widest uppercase mb-2">06 — deep in the rabbit hole</p>
        <h2 className="font-['Syne',sans-serif] text-3xl md:text-5xl font-extrabold mb-12">
          ai <span className="text-[#2B6FFF]">explorer.</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { name: 'Claude', sub: 'Anthropic', emoji: '🤖', color: 'rgba(217, 119, 6, 0.35)' },
            { name: 'ChatGPT', sub: 'OpenAI', emoji: '💬', color: 'rgba(16, 185, 129, 0.35)' },
            { name: 'Gemini', sub: 'Google', emoji: '♊', color: 'rgba(43, 111, 255, 0.35)' },
            { name: 'Google AI Studio', sub: 'Gemini API', emoji: '🔬', color: 'rgba(147, 51, 234, 0.35)' },
            { name: 'Blackbox AI', sub: 'Code focused', emoji: '📦', color: 'rgba(234, 179, 8, 0.35)' },
            { name: 'HuggingFace', sub: 'Open models', emoji: '🤗', color: 'rgba(249, 115, 22, 0.35)' },
            { name: 'Custom GPTs', sub: 'Self-built', emoji: '⚙️', color: 'rgba(0, 229, 192, 0.35)' },
            { name: '& many more', sub: 'always exploring', emoji: '🌐', color: 'rgba(255, 79, 163, 0.35)' },
          ].map((ai, idx) => (
            <SpotlightCard
              key={idx}
              spotlightColor={ai.color}
              className="!bg-[#151515] !border-[#222] hover:!border-[#2B6FFF] text-center transition-all cursor-default !p-5 !rounded-2xl"
            >
              <span className="text-3xl block mb-2">{ai.emoji}</span>
              <div className="text-sm font-semibold text-white">{ai.name}</div>
              <div className="text-[11px] text-gray-400 mt-0.5">{ai.sub}</div>
            </SpotlightCard>
          ))}
        </div>

        <SpotlightCard
          spotlightColor="rgba(43, 111, 255, 0.3)"
          className="!bg-gradient-to-br !from-[#0C0F1A] !to-[#0D0D0D] !border-[#2B6FFF]/30 !rounded-2xl !p-7"
        >
          <h3 className="font-['Syne',sans-serif] text-base font-bold text-[#2B6FFF] mb-2">// what i actually do with AI</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            I don't just use AI — I build with it. I've created custom GPTs for specific tasks, engineered hundreds of detailed prompts for real work, and explored models by actually using them daily. I'm learning prompt engineering seriously and treat AI as a tool I want to master, not just a chatbot to query.
          </p>
        </SpotlightCard>
      </section>

      {/* The Vault Section */}
      <section id="vault" className="py-24 px-6 md:px-16 bg-[#111111]">
        <p className="text-[#FFE03B] text-xs font-mono tracking-widest uppercase mb-2">07 — a gift from vivaan</p>
        <h2 className="font-['Syne',sans-serif] text-3xl md:text-5xl font-extrabold mb-4">
          the <span className="text-[#FFE03B]">vault.</span>
        </h2>
        <p className="text-gray-400 text-sm max-w-xl leading-relaxed mb-10">
          I save everything I discover. Years of exploring tech, AI, and the internet has built something real. Here's a piece of it — free, for you.
        </p>

        {/* Prompts Stash Accordion */}
        <div className="bg-[#13141A] border border-[#FFE03B]/30 rounded-2xl p-6 md:p-8 mb-8 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FFE03B]" /> words that work
              </div>
              <p className="text-xs text-gray-400 mt-1">Prompts I personally use — crafted with intent. Click to expand & copy.</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-[#FFE03B]/10 text-[#FFE03B] border border-[#FFE03B]/30 hidden md:inline-block">
              from vivaan's prompt stash
            </span>
          </div>

          <div className="space-y-3">
            {prompts.map((prompt, idx) => (
              <div
                key={idx}
                className={`bg-[#0D0D0D] border ${openPrompt === idx ? 'border-[#FFE03B]' : 'border-[#2A2A2A]'} rounded-xl overflow-hidden transition-all`}
              >
                <div
                  onClick={() => togglePrompt(idx)}
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-['Syne',sans-serif] font-extrabold text-[#FFE03B] text-base">0{idx + 1}</span>
                    <div>
                      <div className="text-sm font-semibold text-white">{prompt.name}</div>
                      <div className="text-[11px] text-gray-500">{prompt.hint}</div>
                    </div>
                  </div>
                  <span className={`text-lg text-gray-500 transition-transform ${openPrompt === idx ? 'rotate-180 text-[#FFE03B]' : ''}`}>
                    ↓
                  </span>
                </div>

                {openPrompt === idx && (
                  <div className="px-4 pb-4 border-t border-[#222] pt-3">
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">// copy & paste this prompt</div>
                    <pre className="bg-[#151515] border border-[#222] rounded-lg p-3 text-xs text-gray-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto mb-3">
                      {prompt.text}
                    </pre>
                    <button
                      onClick={() => copyToClipboard(prompt.text, idx)}
                      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        copiedIndex === idx
                          ? 'bg-[#00E5C0]/20 text-[#00E5C0] border border-[#00E5C0]/40'
                          : 'bg-[#FFE03B]/10 text-[#FFE03B] border border-[#FFE03B]/30 hover:bg-[#FFE03B]/20'
                      }`}
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> copied ✓
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> copy prompt
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Grid of Vault Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0C1A17] border border-[#00E5C0]/30 rounded-2xl p-6">
            <span className="text-3xl block mb-2">🗺️</span>
            <h3 className="font-['Syne',sans-serif] text-base font-bold text-white mb-2">the hidden internet</h3>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">5 tools most people walk past every day without knowing they exist.</p>
            <div className="space-y-2">
              {[
                { title: 'InfinityFree', desc: 'lifetime free web hosting', url: 'https://infinityfree.com' },
                { title: 'NotebookLM', desc: 'AI podcasts & research', url: 'https://notebooklm.google.com' },
                { title: 'AI Tool Directory', desc: 'find an AI for anything', url: 'https://theresanaiforthat.com' },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between bg-[#151515] p-2.5 rounded-lg border border-[#2A2A2A] hover:border-[#00E5C0] text-xs text-gray-200 transition-colors"
                >
                  <div>
                    <div className="font-semibold">{link.title}</div>
                    <div className="text-[10px] text-gray-500">{link.desc}</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-[#0C0F1A] border border-[#2B6FFF]/30 rounded-2xl p-6">
            <span className="text-3xl block mb-2">🧠</span>
            <h3 className="font-['Syne',sans-serif] text-base font-bold text-white mb-2">brains i built</h3>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">2 custom AI assistants I made for real-world tasks.</p>
            <div className="space-y-2">
              {[
                { title: 'AIONIX', desc: 'try it on ChatGPT →', url: 'https://chatgpt.com/g/g-p-69f37a0e29008191bf3b9affb14b0a33-aionix/project' },
                { title: 'Samajh AI', desc: 'try it on ChatGPT →', url: 'https://chatgpt.com/g/g-p-69f8cc2e1f208191a0f1ef6f650ffb97-samajh-ai/project' },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between bg-[#151515] p-2.5 rounded-lg border border-[#2A2A2A] hover:border-[#2B6FFF] text-xs text-gray-200 transition-colors"
                >
                  <div>
                    <div className="font-semibold">{link.title}</div>
                    <div className="text-[10px] text-gray-500">{link.desc}</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-[#160E1A] border border-[#C850F0]/30 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <span className="text-3xl block mb-2">🎓</span>
              <h3 className="font-['Syne',sans-serif] text-base font-bold text-white mb-2">50+ AI courses, on the house</h3>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                A full library of AI courses — curated, free, and actually worth your time. No paywalls, no signups.
              </p>
            </div>
            <a
              href="https://drive.google.com/file/d/1oRb0UbVcSS-XuPnmCcTg33ojHvi_-tJT/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#C850F0]/20 border border-[#C850F0]/40 text-[#C850F0] px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#C850F0]/30 transition-colors"
            >
              🎁 grab the courses <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 md:px-16 bg-[#111111] text-center">
        <p className="text-[#FF4FA3] text-xs font-mono tracking-widest uppercase mb-2">08 — let's connect</p>
        <h2 className="font-['Syne',sans-serif] text-4xl md:text-7xl font-extrabold mb-8 leading-tight">
          say <em className="not-italic text-[#FFE03B]">hello</em>,<br />
          don't be shy.
        </h2>

        <div className="flex flex-col items-center justify-center gap-4">
          <button
            onClick={handleEmailClick}
            className="inline-flex items-center gap-2 bg-[#FFE03B] text-[#0D0D0D] px-8 py-3.5 rounded-full font-semibold text-sm hover:scale-105 transition-transform"
          >
            <Mail className="w-4 h-4" /> email me
          </button>

          {showEmailFallback && (
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-5 py-3 text-xs text-[#00E5C0] flex items-center gap-3">
              <span>📋 <span className="select-all">vivaanrastogiofficial@gmail.com</span></span>
              <button
                onClick={copyEmail}
                className="bg-[#00E5C0]/20 border border-[#00E5C0]/40 text-[#00E5C0] px-2.5 py-1 rounded-md text-[11px] hover:bg-[#00E5C0]/30"
              >
                {copiedEmail ? 'copied ✓' : 'copy'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Social Links Section */}
      <div className="py-10 px-6 bg-[#0E0E10] border-t border-white/5 flex flex-col items-center justify-center">
        <p className="font-['Canva_Sans','DM_Sans',sans-serif] text-xs sm:text-sm font-semibold tracking-wider text-gray-300 uppercase mb-4 text-center">
          Let's Build Something
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Instagram */}
          <a
            id="social-instagram"
            href="https://instagram.com/vivaanrastogii"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @vivaanrastogii"
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#18181A] border border-[#2A2A2A] hover:border-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.35)] text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 shadow-md"
          >
            <Instagram className="w-4 h-4 text-[#E1306C] group-hover:text-white group-hover:scale-110 transition-transform transition-colors" />
            <span className="text-xs font-mono font-medium tracking-wide">vivaanrastogii</span>
          </a>

          {/* Threads */}
          <a
            id="social-threads"
            href="https://threads.net/@vivaanrastogii"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Threads @vivaanrastogii"
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#18181A] border border-[#2A2A2A] hover:border-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.35)] text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 shadow-md"
          >
            <svg
              className="w-4 h-4 text-white group-hover:scale-110 transition-transform fill-current shrink-0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.742 10.457c-.126-.14-.26-.27-.402-.39C16.94 7.6 15.118 6 12 6c-3.79 0-6.86 2.66-6.86 6.88 0 4.22 3.07 6.88 6.86 6.88 2.38 0 4.31-.95 5.51-2.69l-1.46-.99c-.93 1.35-2.38 2.08-4.05 2.08-2.85 0-5.11-1.99-5.11-5.28s2.26-5.28 5.11-5.28c2.25 0 3.67 1.13 4.02 2.94-1.2.35-2.27.93-3.13 1.72-1.39 1.28-2.09 2.92-2.09 4.89 0 2.87 2.07 4.75 4.89 4.75 2.09 0 3.73-.97 4.65-2.73.49-.93.75-2.03.75-3.23 0-1.89-.57-3.48-1.74-4.66zM13.25 18.25c-1.82 0-3.14-1.18-3.14-3.05 0-1.33.48-2.42 1.44-3.29.68-.61 1.54-1.07 2.53-1.35.34 1.77.87 3.55 1.62 5.17-.67 1.63-1.49 2.52-2.45 2.52z" />
            </svg>
            <span className="text-xs font-mono font-medium tracking-wide">vivaanrastogii</span>
          </a>

          {/* GitHub */}
          <a
            id="social-github"
            href="https://github.com/vivaanrastogii"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub @vivaanrastogii"
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#18181A] border border-[#2A2A2A] hover:border-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.35)] text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 shadow-md"
          >
            <Github className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
            <span className="text-xs font-mono font-medium tracking-wide">vivaanrastogii</span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 px-6 text-xs text-gray-600 tracking-wider">
        crafted with ☕ & chaos by vivaan rastogi · jaipur, india · 2025
      </footer>

      {/* Easter Egg Button */}
      <button
        onClick={() => setShowEggModal(true)}
        className="fixed bottom-6 right-6 w-11 h-11 bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#FFE03B] rounded-full flex items-center justify-center text-lg z-40 transition-all hover:scale-110 hover:rotate-12"
        title="psst..."
      >
        🥚
      </button>

      {/* Easter Egg Modal */}
      {showEggModal && (
        <div
          onClick={() => setShowEggModal(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#151515] border border-[#2A2A2A] rounded-3xl p-8 max-w-sm text-center relative"
          >
            <h2 className="font-['Syne',sans-serif] text-2xl font-extrabold text-[#FFE03B] mb-3">you found it! 🎉</h2>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              You're curious enough to click a random egg button on a website. That means you're the kind of person Vivaan wants to meet. Seriously, send him an email.
            </p>
            <button
              onClick={() => setShowEggModal(false)}
              className="bg-[#FFE03B] text-[#0D0D0D] font-bold text-xs px-6 py-2.5 rounded-full hover:bg-white transition-colors"
            >
              close ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

