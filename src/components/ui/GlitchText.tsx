'use client'

interface GlitchTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'span' | 'div'
}

/**
 * Renders text with a CSS glitch effect using ::before (magenta offset) and
 * ::after (cyan offset) pseudo-elements. The effect fires sporadically to feel
 * authentic rather than mechanical.
 */
export default function GlitchText({ text, className = '', as: Tag = 'h1' }: GlitchTextProps) {
  return (
    <>
      {/* Scoped style — avoids global leakage while keeping pseudo-element content */}
      <style>{`
        .glitch-text {
          position: relative;
          display: inline-block;
        }

        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          background: transparent;
        }

        /* Magenta ghost — clips a horizontal band near the top */
        .glitch-text::before {
          color: #ff00e5;
          clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
          animation: gt-before 3s infinite;
        }

        /* Cyan ghost — clips a band near the bottom */
        .glitch-text::after {
          color: #00f0ff;
          clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
          animation: gt-after 3s infinite;
        }

        @keyframes gt-before {
          0%, 88%, 100% { transform: translateX(0) skewX(0); opacity: 0; }
          89%  { transform: translateX(-4px) skewX(-2deg); opacity: 0.9; }
          91%  { transform: translateX(4px)  skewX(2deg);  opacity: 0.8; }
          93%  { transform: translateX(-2px); opacity: 0.9; }
          95%  { transform: translateX(0);    opacity: 0; }
        }

        @keyframes gt-after {
          0%, 83%, 100% { transform: translateX(0) skewX(0); opacity: 0; }
          84%  { transform: translateX(3px) skewX(1deg);  opacity: 0.9; }
          86%  { transform: translateX(-3px) skewX(-1deg); opacity: 0.8; }
          88%  { transform: translateX(1px);  opacity: 0.7; }
          90%  { transform: translateX(0);    opacity: 0; }
        }
      `}</style>

      <Tag
        className={`glitch-text font-orbitron font-black tracking-[0.12em] neon-text-cyan ${className}`}
        data-text={text}
      >
        {text}
      </Tag>
    </>
  )
}
