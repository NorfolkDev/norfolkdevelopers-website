module.exports = {
  theme: {
    extend: {
      colors: {
        foreground: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
        },
        background: {
          primary: "var(--color-bg-primary)",
          secondary: "var(--color-bg-secondary)",
        },
        border: {
          primary: "var(--color-border-primary)",
          active: "var(--color-href-hover)",
        },
        href: {
          base: "var(--color-href-base)",
          hover: "var(--color-href-hover)",
          active: "var(--color-href-active)",
        },
        discord: "#5865F2",
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
  content: [
    './src/components/*.tsx',
    './src/components/**/*.tsx',
    './src/pages/*.tsx',
    './src/pages/**/*.tsx',
  ],
};
