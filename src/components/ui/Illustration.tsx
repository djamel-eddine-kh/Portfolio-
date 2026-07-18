"use client";

import { useState, useEffect } from "react";

const CODE_LINES = [
  "   $ git status",
  "",
  "   On branch main",
  "",
  "   Changes to be committed:",
  "     ✓ Spring AI integration",
  "     ✓ Caching optimization",
  "     ✓ SQL query improvements",
  "     ✓ Auth refactoring",
  "",
  '   $ git commit -m "Implement semantic search"',
  "",
  "   [main 4f2c8a1] Success",
];

function CodeDisplay() {
  const [displayText, setDisplayText] = useState("");
  const fullText = CODE_LINES.join("\n");

  useEffect(() => {
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i));
        i++;
        timer = setTimeout(tick, 35);
      } else {
        timer = setTimeout(() => {
          i = 0;
          setDisplayText("");
          timer = setTimeout(tick, 500);
        }, 1800);
      }
    }

    tick();
    return () => clearTimeout(timer);
  }, []);

  return (
    <pre
      style={{
        fontFamily: "var(--app-font-mono), monospace",
        fontSize: "7px",
        lineHeight: "10px",
        color: "hsl(var(--foreground))",
        whiteSpace: "pre",
        margin: 0,
        padding: "8px 8px 0 2px",
        boxSizing: "border-box",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {displayText}<span className="cursor">&nbsp;</span>
    </pre>
  );
}

export default function Illustration() {
  return (
    <div className="illustration-wrap relative w-full max-w-[690px] mx-auto">
      <svg
        width="100%"
        viewBox="0 0 690 490"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="illustration-title illustration-desc"
        className="w-full h-auto block"
        style={{ background: "transparent" }}
      >
        <title id="illustration-title">Software Engineer Illustration</title>
        <desc id="illustration-desc">
          Animated illustration of a software engineer's desk with a laptop showing a typewriter-animated Java method, surrounded by floating tech icons: brackets, terminal, gears, cloud, git branch, and coffee cup.
        </desc>

        <defs>
          <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <linearGradient id="deskGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--card))" />
            <stop offset="100%" stopColor="hsl(var(--background))" />
          </linearGradient>
        </defs>

        {/* ambient glow blobs */}
        <circle className="glow-blob b1" cx="90" cy="80" r="46" fill="hsl(var(--primary))" opacity="0.5" filter="url(#softBlur)" />
        <circle className="glow-blob b2" cx="600" cy="70" r="30" fill="hsl(var(--accent))" opacity="0.4" filter="url(#softBlur)" />
        <circle className="glow-blob b3" cx="630" cy="100" r="20" fill="hsl(var(--primary))" opacity="0.3" filter="url(#softBlur)" />

        {/* desk */}
        <rect x="60" y="400" width="560" height="24" rx="4" fill="url(#deskGradient)" stroke="hsl(var(--card-border))" strokeWidth="1" />
        <rect x="60" y="424" width="560" height="10" fill="hsl(var(--background))" />
        <rect x="60" y="400" width="560" height="2" fill="hsl(var(--primary))" opacity="0.18" />

        {/* laptop glow */}
        <rect className="screen-glow" x="195" y="110" width="290" height="210" rx="20" fill="hsl(var(--primary))" filter="url(#softBlur)" />

        {/* laptop / monitor */}
        <rect x="205" y="120" width="270" height="190" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--card-border))" strokeWidth="1.5" />
        <rect x="220" y="135" width="240" height="150" rx="4" fill="hsl(var(--background))" />

        {/* code typing */}
        <foreignObject x="222" y="138" width="236" height="144">
          <CodeDisplay />
        </foreignObject>

        <rect x="320" y="310" width="40" height="34" fill="hsl(var(--card))" stroke="hsl(var(--card-border))" strokeWidth="1" />
        <rect x="280" y="344" width="120" height="12" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--card-border))" strokeWidth="1" />
        <circle className="power-led" cx="340" cy="303" r="2.4" fill="hsl(var(--accent))" />

        {/* data particles */}
        <circle className="data-particle p1" cx="470" cy="115" r="2.5" fill="hsl(var(--primary))" />
        <circle className="data-particle p2" cx="490" cy="120" r="2" fill="hsl(var(--accent))" />
        <circle className="data-particle p3" cx="505" cy="112" r="2" fill="hsl(var(--primary))" />

        {/* <> icon */}
        <g className="code-icon">
          <text x="120" y="215" fontSize="34" fontWeight="700" fill="hsl(var(--primary))" fontFamily="var(--app-font-mono), monospace">
            {"></"}
          </text>
        </g>

        {/* terminal */}
        <g>
          <rect x="100" y="270" width="70" height="46" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--card-border))" strokeWidth="1" />
          <text className="terminal-prompt" x="112" y="299" fontSize="16" fill="hsl(var(--accent))" fontFamily="var(--app-font-mono), monospace">
            {">_"}
          </text>
        </g>

        {/* cloud */}
        <g className="cloud-group">
          <path d="M 442 100 C 442 88, 450 82, 460 82 C 465 72, 475 72, 480 82 C 485 72, 495 72, 500 82 C 510 82, 518 88, 518 100 C 518 110, 510 118, 500 118 L 460 118 C 450 118, 442 110, 442 100 Z" fill="hsl(var(--card))" stroke="hsl(var(--card-border))" strokeWidth="1" />
          <line x1="472" y1="120" x2="472" y2="130" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="480" y1="120" x2="480" y2="134" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="488" y1="120" x2="488" y2="130" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* coffee cup */}
        <g>
          <path className="steam s1" d="M508 318 q-4 -8 0 -16" stroke="hsl(var(--muted-foreground))" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0" />
          <path className="steam s2" d="M524 318 q4 -8 0 -16" stroke="hsl(var(--muted-foreground))" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0" />
          <rect x="500" y="330" width="40" height="46" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--card-border))" strokeWidth="1" />
          <path d="M540 340 q16 0 16 14 t-16 14" stroke="hsl(var(--card-border))" strokeWidth="5" fill="none" />
        </g>

        {/* git branch */}
        <g>
          <circle className="branch-dot d1" cx="70" cy="170" r="4" fill="hsl(var(--primary))" />
          <circle className="branch-dot d2" cx="70" cy="185" r="4" fill="hsl(var(--primary))" />
          <circle className="branch-dot d3" cx="90" cy="200" r="4" fill="hsl(var(--accent))" />
          <path d="M70 170 L70 185 L90 200" stroke="hsl(var(--muted-foreground))" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>

        {/* gear large */}
        <g className="gear-large" fill="hsl(var(--secondary))" stroke="hsl(var(--card-border))" strokeWidth="1">
          <circle cx="566" cy="130" r="20" />
          <rect x="562" y="102" width="8" height="10" />
          <rect x="562" y="148" width="8" height="10" />
          <rect x="538" y="126" width="10" height="8" />
          <rect x="584" y="126" width="10" height="8" />
          <rect x="546" y="110" width="9" height="9" transform="rotate(45 550 114)" />
          <rect x="577" y="110" width="9" height="9" transform="rotate(-45 581 114)" />
          <rect x="546" y="142" width="9" height="9" transform="rotate(-45 550 146)" />
          <rect x="577" y="142" width="9" height="9" transform="rotate(45 581 146)" />
        </g>
        <circle cx="566" cy="130" r="9" fill="hsl(var(--background))" />

        {/* gear small */}
        <g className="gear-small" fill="hsl(var(--primary))" stroke="hsl(var(--card-border))" strokeWidth="1">
          <circle cx="592" cy="158" r="13" />
          <rect x="589" y="140" width="6" height="6" />
          <rect x="589" y="170" width="6" height="6" />
          <rect x="574" y="155" width="6" height="6" />
          <rect x="604" y="155" width="6" height="6" />
          <rect x="578" y="144" width="6" height="6" transform="rotate(45 581 147)" />
          <rect x="600" y="144" width="6" height="6" transform="rotate(-45 603 147)" />
          <rect x="578" y="166" width="6" height="6" transform="rotate(-45 581 169)" />
          <rect x="600" y="166" width="6" height="6" transform="rotate(45 603 169)" />
        </g>
        <circle cx="592" cy="158" r="6" fill="hsl(var(--background))" />

        <style>{`
          .illustration-wrap { width: 100%; max-width: 690px; margin: 0 auto; background: transparent; }
          .illustration-wrap svg { width: 100%; height: auto; display: block; }
          .cursor {
            display: inline-block;
            width: 6px;
            background: hsl(var(--primary));
            animation: blink 0.9s steps(1) infinite;
          }
          .terminal-prompt { animation: blink 1.1s steps(1) infinite; }
          @keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
          .glow-blob { animation: blobFloat 10s ease-in-out infinite; }
          .glow-blob.b2 { animation-delay: -3s; animation-duration: 12s; }
          .glow-blob.b3 { animation-delay: -6s; animation-duration: 8s; }
          @keyframes blobFloat { 0% { transform: translate(0,0); opacity:0.5; } 50% { transform: translate(6px,-10px); opacity:0.85; } 100% { transform: translate(0,0); opacity:0.5; } }
          .screen-glow { animation: glowPulse 4s ease-in-out infinite; transform-origin: 340px 215px; }
          @keyframes glowPulse { 0%,100% { opacity:0.1; } 50% { opacity:0.22; } }
          .power-led { animation: ledBlink 2.4s ease-in-out infinite; }
          @keyframes ledBlink { 0%,100% { opacity:1; } 50% { opacity:0.25; } }
          .gear-large { transform-origin: 566px 130px; animation: spin 18s linear infinite; }
          .gear-small { transform-origin: 592px 158px; animation: spinReverse 12s linear infinite; }
          @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
          @keyframes spinReverse { from { transform:rotate(0deg); } to { transform:rotate(-360deg); } }
          .cloud-group { animation: cloudDrift 7s ease-in-out infinite alternate; }
          @keyframes cloudDrift { from { transform:translateX(0); } to { transform:translateX(10px); } }
          .steam { animation: steamRise 3s ease-in-out infinite; }
          .steam.s2 { animation-delay: -1s; }
          @keyframes steamRise { 0% { transform:translateY(0); opacity:0; } 30% { opacity:0.6; } 100% { transform:translateY(-14px); opacity:0; } }
          .branch-dot { animation: dotPulse 2.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          .branch-dot.d2 { animation-delay: -0.5s; }
          .branch-dot.d3 { animation-delay: -1s; }
          @keyframes dotPulse { 0%,100% { transform:scale(1); opacity:1; } 50% { transform:scale(1.4); opacity:0.6; } }
          .code-icon { animation: iconFloat 3.2s ease-in-out infinite alternate; }
          @keyframes iconFloat { from { transform:translateY(0); } to { transform:translateY(-6px); } }
          .data-particle { animation: particleDrift 6s linear infinite; }
          .data-particle.p2 { animation-delay: -2s; }
          .data-particle.p3 { animation-delay: -4s; }
          @keyframes particleDrift { 0% { transform:translate(0,0); opacity:0; } 15% { opacity:0.8; } 85% { opacity:0.8; } 100% { transform:translate(-46px,44px); opacity:0; } }
        `}</style>
      </svg>
    </div>
  );
}