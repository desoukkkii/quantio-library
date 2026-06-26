/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        p: { DEFAULT: "#4f46e5", dark: "#3730a3", light: "#818cf8" },
        g: { DEFAULT: "#059669", light: "#34d399" },
        a: { DEFAULT: "#d97706", light: "#fbbf24" },
        r: { DEFAULT: "#dc2626", light: "#f87171" },
        c: { DEFAULT: "#0891b2", light: "#22d3ee" },
        v: "#7c3aed",
        bg: { DEFAULT: "#f1f3f8", 2: "#e8eaf2" },
        surface: "#ffffff",
        s: { 2: "#f7f8fc", 3: "#eef0f8" },
        border: { DEFAULT: "#e4e6f0", h: "#c8cbdb" },
        text: { DEFAULT: "#0f1117", 2: "#4a4f6a", 3: "#8e93b0", 4: "#b8bcd0" },
        pg: "rgba(79, 70, 229, 0.1)",
        pg2: "rgba(79, 70, 229, 0.06)",
        "p-border": "rgba(79, 70, 229, 0.2)",
        gg: "rgba(5, 150, 105, 0.1)",
        "g-border": "rgba(5, 150, 105, 0.2)",
        ag: "rgba(217, 119, 6, 0.1)",
        "a-border": "rgba(217, 119, 6, 0.2)",
        rg: "rgba(220, 38, 38, 0.1)",
        "r-border": "rgba(220, 38, 38, 0.2)",
        cg: "rgba(8, 145, 178, 0.1)",
        "c-border": "rgba(8, 145, 178, 0.2)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        heading: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "20px",
        full: "9999px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(15, 17, 23, 0.05)",
        sm: "0 1px 4px rgba(15, 17, 23, 0.07), 0 1px 2px rgba(15, 17, 23, 0.04)",
        md: "0 4px 16px rgba(15, 17, 23, 0.08), 0 1px 4px rgba(15, 17, 23, 0.05)",
        lg: "0 12px 40px rgba(15, 17, 23, 0.12), 0 4px 12px rgba(15, 17, 23, 0.06)",
        xl: "0 20px 60px rgba(15, 17, 23, 0.14), 0 8px 20px rgba(15, 17, 23, 0.06)",
        p: "0 4px 16px rgba(79, 70, 229, 0.24)",
      },
      animation: {
        "fade-slide": "fadeSlide 0.28s cubic-bezier(0.22, 0.61, 0.36, 1)",
        "modal-pop": "modalPop 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "toast-in": "toastIn 0.28s cubic-bezier(0.22, 0.61, 0.36, 1)",
        "toast-out": "toastOut 0.25s ease forwards",
        "badge-pop": "badgePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "bg-fade": "bgFade 0.2s ease",
        "toast-bar": "toastBar 3.5s linear forwards",
      },
      keyframes: {
        fadeSlide: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        modalPop: {
          from: { opacity: "0", transform: "scale(0.94) translateY(-10px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        toastIn: {
          from: { opacity: "0", transform: "translateX(20px) scale(0.95)" },
          to: { opacity: "1", transform: "translateX(0) scale(1)" },
        },
        toastOut: {
          from: { opacity: "1", transform: "translateX(0) scale(1)" },
          to: { opacity: "0", transform: "translateX(20px) scale(0.95)" },
        },
        badgePop: {
          from: { transform: "scale(0)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        bgFade: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        toastBar: {
          from: { width: "100%" },
          to: { width: "0%" },
        },
      },
    },
  },
  plugins: [],
};
