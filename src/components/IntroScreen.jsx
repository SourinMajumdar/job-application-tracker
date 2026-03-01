import { motion } from "framer-motion";
import { useEffect } from "react";

const ACCENT = "#34d399";       // emerald — matches topbar accent
const DARK   = "#111827";       // near-black — "track" text
const MUTED  = "#9ca3af";       // subtitle

export default function IntroScreen({ onFinish }) {
  const INTRO_DURATION = 3200;

  useEffect(() => {
    const timer = setTimeout(onFinish, INTRO_DURATION);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* Subtle ambient glow behind logo */}
      <div style={styles.glow} />

      {/* Briefcase icon — draws itself */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={DARK}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={styles.icon}
      >
        <motion.rect
          x="2" y="7" width="20" height="14" rx="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        <motion.path
          d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        />
        <motion.line
          x1="2" y1="13" x2="22" y2="13"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
        />
        {/* accent dot on clasp */}
        <motion.circle
          cx="12" cy="13" r="1.2"
          fill={ACCENT}
          stroke="none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.3, ease: "backOut" }}
        />
      </motion.svg>

      {/* Wordmark — "track" letter-by-letter, then "mate" slides in */}
      <div style={styles.wordmark}>
        {["t","r","a","c","k"].map((char, i) => (
          <motion.span
            key={i}
            style={{ color: DARK }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.13, duration: 0.35, ease: "easeOut" }}
          >
            {char}
          </motion.span>
        ))}

        <motion.span
          style={{ color: ACCENT }}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 1 + 5 * 0.13 + 0.15,
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          mate
        </motion.span>
      </div>

      {/* Thin green underline that grows left→right */}
      <motion.div
        style={styles.underline}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.15, duration: 0.55, ease: "easeOut" }}
      />

      {/* Subtitle */}
      <motion.p
        style={styles.subtitle}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.55, ease: "easeOut" }}
      >
        Track your applications. Calm and smart.
      </motion.p>
    </motion.div>
  );
}

const styles = {
  container: {
    position: "fixed",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "18px",
    zIndex: 9999,
    background: "#f8fafc",
    overflow: "hidden",
  },
  glow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -54%)",
    width: "420px",
    height: "300px",
    background: "radial-gradient(ellipse, rgba(52,211,153,0.10) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  icon: {
    width:  "clamp(44px, 6vw, 72px)",
    height: "clamp(44px, 6vw, 72px)",
  },
  wordmark: {
    fontWeight: 900,
    letterSpacing: "0.02em",
    fontFamily:
      '"Segoe UI Black", "Segoe UI", Roboto, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
    fontSize: "clamp(48px, 6vw, 82px)",
    display: "flex",
    alignItems: "baseline",
    gap: "1px",
    lineHeight: 1,
  },
  underline: {
    width: "clamp(120px, 15vw, 200px)",
    height: "3px",
    borderRadius: "999px",
    background: `linear-gradient(to right, transparent, ${ACCENT}, transparent)`,
    transformOrigin: "left center",
    marginTop: "-4px",
  },
  subtitle: {
    fontSize: "clamp(13px, 1.6vw, 18px)",
    fontWeight: 500,
    color: MUTED,
    letterSpacing: "0.05em",
    margin: 0,
  },
};
