/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* ------------------------------------------------------------------
           Graphite & Brass.

           CR Cars has no logo, so unlike a project where the palette is read
           off an existing mark, this one had to be argued for. The business
           is three things at once — servicing, modification, and a wash
           centre — and a colour that flatters one tends to undercut another:
           performance orange makes the wash look like a tyre shop, detailing
           blue makes the modification bay look like a dental surgery.

           So the hue does no work at all. Graphite carries every action and
           all the structure; brass appears only as ornament — a rule above a
           heading, the full stop after a headline, the sheen that crosses a
           button on hover. A near-neutral site with one warm metal in it
           reads as expensive in the way a watch face does, and it says
           nothing about which of the three trades matters more.

             ink    — actions and structure. Buttons, headings, icons.
             brass  — ornament. Never a large field, never a button.
             paper  — the warm white it is all printed on.
             danger — errors, and nothing else.
           ------------------------------------------------------------------ */

        /* Paper. Warm enough that brass sits on it as metal rather than as
           mustard, cool enough to still read as a white page. The band at
           200 is where an alternating section lands. */
        paper: {
          DEFAULT: '#ffffff',
          50: '#fdfcf9',
          100: '#faf8f3', // page
          200: '#f3efe6', // alternating band
          300: '#e9e3d6', // wells, inert tracks, image mattes
        },

        /* Three border weights: a divider you should not notice, a card
           edge, and the edge under the cursor. */
        line: {
          soft: '#f0ebe1',
          DEFAULT: '#e2dacb',
          strong: '#c9bfa9',
        },

        /* Ink. Warm graphite, not blue-black — a cold black on a warm page
           looks like text pasted in from a different document. 900 is body
           copy, 800 is the button face. */
        ink: {
          1000: '#0a0a09',
          950: '#101010',
          900: '#171614',
          850: '#1d1c19',
          800: '#232220',
          750: '#2c2a27',
          700: '#35332f',
          600: '#45423d',
          500: '#57534c',
        },

        /* Brass. The DEFAULT is a fill — 2.07:1 on paper, so it can be a
           rule or a dot but never a word. Anything that has to be READ in
           brass uses `ink` instead: 5.7:1 on the page and still 4.7:1 inside
           a well, which is the same metal walked darker until it clears AA
           at the 11px these labels are set at. `deep` is for strokes and
           icons — it clears AA on white but only 4.4:1 on the ivory band,
           so it is not a text colour. */
        brass: {
          DEFAULT: '#d4a94a',
          deep: '#8a6a22',
          soft: '#e3c47e',
          bright: '#f7e6bc',
          ink: '#7a5f1e',
          wash: '#fbf6e9',
          line: '#e8d9ae',
        },

        danger: {
          DEFAULT: '#b4442f',
          ink: '#933425',
          wash: '#fdf3f1',
          line: '#efc9c1',
        },

        /* Small print — the "from" on a price, a plus code, a caption.
           Walked dark enough that it still clears AA on the ivory band and
           inside a well, not just on white. */
        muted: '#635d55',

        /* Placeholders only, and only inside a white field — 3.3:1 there,
           and it is not rated for the ivory band. Plainly lighter than a
           real answer at 17:1, so a form full of examples does not read as
           a form somebody has already filled in. */
        placeholder: '#948d84',
      },

      fontFamily: {
        /* Instrument Serif is a single weight by design — at display sizes a
           400 serif with this much stroke contrast needs no bolding, and
           asking for one would only invite a browser to synthesise it. */
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },

      fontSize: {
        /* Fluid display scale. The gap between body size and display size is
           the single biggest lever on how expensive a page reads. */
        'display-sm': ['clamp(2.25rem, 1.5rem + 3.2vw, 3.5rem)', { lineHeight: '1.04', letterSpacing: '-0.018em' }],
        display: ['clamp(2.75rem, 1.4rem + 5.6vw, 5.5rem)', { lineHeight: '0.98', letterSpacing: '-0.022em' }],
        'display-lg': ['clamp(3.25rem, 0.9rem + 8.4vw, 8rem)', { lineHeight: '0.92', letterSpacing: '-0.028em' }],
      },

      letterSpacing: {
        eyebrow: '0.3em',
      },

      boxShadow: {
        /* On a warm page a shadow is a tint of the ink, not an absence of
           light; past about 12% it stops reading as height and starts
           reading as grime. These carry the graphite so a raised card never
           casts a cold grey onto a warm sheet. */
        card: '0 1px 2px rgba(23, 22, 20, 0.05), 0 10px 28px -14px rgba(23, 22, 20, 0.14)',
        lift: '0 1px 2px rgba(23, 22, 20, 0.05), 0 8px 18px -10px rgba(23, 22, 20, 0.12), 0 28px 52px -28px rgba(23, 22, 20, 0.18)',
        'lift-ink':
          '0 1px 2px rgba(23, 22, 20, 0.08), 0 10px 22px -10px rgba(23, 22, 20, 0.34), 0 32px 60px -30px rgba(23, 22, 20, 0.36)',
        'lift-brass':
          '0 1px 2px rgba(23, 22, 20, 0.06), 0 10px 22px -10px rgba(212, 169, 74, 0.36), 0 32px 60px -30px rgba(212, 169, 74, 0.34)',
        rim: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.85)',
      },

      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
        swift: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'page-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        /* The mobile menu. A pair rather than a transition, so the panel
           fades in the moment it mounts without waiting on a second render
           to flip a class. */
        /* Interior page photo band: settles from a hair larger, so the
           page opens on the picture arriving rather than popping in. */
        'band-in': {
          '0%': { opacity: '0', transform: 'scale(1.045)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'sheet-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'sheet-out': { '0%': { opacity: '1' }, '100%': { opacity: '0' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-ring': {
          '0%': { opacity: '0.5', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(1.9)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'page-in': 'page-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'band-in': 'band-in 1.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        'sheet-in': 'sheet-in 0.28s cubic-bezier(0.22, 1, 0.36, 1) both',
        'sheet-out': 'sheet-out 0.24s cubic-bezier(0.22, 1, 0.36, 1) both',
        marquee: 'marquee 42s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite',
      },
    },
  },
  plugins: [],
}

export default config
