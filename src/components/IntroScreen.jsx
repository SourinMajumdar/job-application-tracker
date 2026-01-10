import { color, motion, transform } from "framer-motion";
import { useEffect } from "react";

const bg = "linear-gradient(180deg, #FFF5EB 0%, #FFE8D6 60%, #FFFFFF 100%)";
const primary = "#374151";
const secondary = "#6B7280";

export default function IntroScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3200); // full animation duration

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      style={{ ...styles.container, background: bg, color: primary }}
      initial={{ opacity: 1, y: 0 }}
      exit={{ y: "-100%", opacity: 1 }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
    >
      {/* Suitcase */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "clamp(50px, 7vw, 100px)",
          height: "clamp(44px, 7vw, 100px)",
        }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.rect
          x="2" y="7" width="20" height="14" rx="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.path
          d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <motion.path
          d="M2 13h20"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        />
      </motion.svg>

      {/* Applyo */}
      <div style={styles.wordmark}>
        {/* tracker — letter by letter */}
        {["T", "r", "a", "c", "k"].map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 + i * 0.18 }}
          >
            {char}
          </motion.span>
        ))}

        {/* mate — pill joins from right */}
        <motion.span
          style={styles.matePill}
          initial={{ x: 28, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: 1 + 5 * 0.18 + 0.2,
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          mate
        </motion.span>
      </div>

      {/* Subtitle */}
      <motion.p
        style={{ ...styles.subtitle, color: secondary }}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.6, duration: 0.6 }}
      >
        Track your applications. Calm and smart!
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
    gap: "20px",
    zIndex: 9999,
  },
  wordmark: {
    fontWeight: 900,
    letterSpacing: "0.02em",
    fontFamily:
      '"Segoe UI Black", "Segoe UI", Roboto, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
    fontSize: "clamp(50px, 5vw, 80px)",
    display: "flex",
    gap: "2px",
  },
  subtitle: {
    fontSize: "clamp(16px, 2.2vw, 30px)",
    fontWeight: 500,
    letterSpacing: "0.08em",
    opacity: 0.85,
  }, 
  mate: {
    marginLeft: "6px",
    fontWeight: 600,
  },
  matePill: {
    marginLeft: "8px",
    padding: "0 14px",
    borderRadius: "0.35em",
    backgroundColor: "#757d8c", 
    color: "#FFFFFF",
    fontWeight: 800,
    fontSize: "0.92em",
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
  },
};
