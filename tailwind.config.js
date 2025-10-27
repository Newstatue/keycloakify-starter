/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

const colorVar = (variable) => `var(${variable})`;
const shadowVar = (variable) => `var(${variable})`;

module.exports = {
    darkMode: ["class"],
    content: [
        "./src/**/*.tsx",
        "./src/**/*.ts",
        "./node_modules/keycloakify/**/*.js",
        "./node_modules/keycloakify/**/*.jsx",
        "./.storybook/**/*.{js,jsx,ts,tsx}" // Ensure Storybook files are included
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px"
            }
        },
        extend: {
            colors: {
                border: colorVar("--border"),
                input: colorVar("--input"),
                ring: colorVar("--ring"),
                background: colorVar("--background"),
                foreground: colorVar("--foreground"),
                primary: {
                    DEFAULT: colorVar("--primary"),
                    foreground: colorVar("--primary-foreground")
                },
                secondary: {
                    DEFAULT: colorVar("--secondary"),
                    foreground: colorVar("--secondary-foreground")
                },
                destructive: {
                    DEFAULT: colorVar("--destructive"),
                    foreground: colorVar("--destructive-foreground")
                },
                muted: {
                    DEFAULT: colorVar("--muted"),
                    foreground: colorVar("--muted-foreground")
                },
                accent: {
                    DEFAULT: colorVar("--accent"),
                    foreground: colorVar("--accent-foreground")
                },
                popover: {
                    DEFAULT: colorVar("--popover"),
                    foreground: colorVar("--popover-foreground")
                },
                card: {
                    DEFAULT: colorVar("--card"),
                    foreground: colorVar("--card-foreground")
                },
                sidebar: {
                    DEFAULT: colorVar("--sidebar"),
                    foreground: colorVar("--sidebar-foreground"),
                    primary: colorVar("--sidebar-primary"),
                    "primary-foreground": colorVar("--sidebar-primary-foreground"),
                    accent: colorVar("--sidebar-accent"),
                    "accent-foreground": colorVar("--sidebar-accent-foreground"),
                    border: colorVar("--sidebar-border"),
                    ring: colorVar("--sidebar-ring")
                },
                chart: {
                    1: colorVar("--chart-1"),
                    2: colorVar("--chart-2"),
                    3: colorVar("--chart-3"),
                    4: colorVar("--chart-4"),
                    5: colorVar("--chart-5")
                }
            },
            borderRadius: {
                DEFAULT: "var(--radius)",
                xl: "calc(var(--radius) + 4px)",
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)"
            },
            fontFamily: {
                sans: ["var(--font-sans)", ...fontFamily.sans],
                serif: ["var(--font-serif)", ...fontFamily.serif],
                mono: ["var(--font-mono)", ...fontFamily.mono]
            },
            boxShadow: {
                "2xs": shadowVar("--shadow-2xs"),
                xs: shadowVar("--shadow-xs"),
                sm: shadowVar("--shadow-sm"),
                DEFAULT: shadowVar("--shadow"),
                md: shadowVar("--shadow-md"),
                lg: shadowVar("--shadow-lg"),
                xl: shadowVar("--shadow-xl"),
                "2xl": shadowVar("--shadow-2xl"),
                offset: `${shadowVar("--shadow-x")} ${shadowVar("--shadow-y")} ${shadowVar("--shadow-blur")} ${shadowVar("--shadow-spread")} ${shadowVar("--shadow-color")}`
            },
            letterSpacing: {
                tighter: "var(--tracking-tighter)",
                tight: "var(--tracking-tight)",
                normal: "var(--tracking-normal)",
                wide: "var(--tracking-wide)",
                wider: "var(--tracking-wider)",
                widest: "var(--tracking-widest)"
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" }
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" }
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out"
            }
        }
    },
    plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")]
};
