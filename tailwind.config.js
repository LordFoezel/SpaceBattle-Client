/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: [
        '"Black Ops One"',
        'Segoe UI',
        'Tahoma',
        'Geneva',
        'Verdana',
        'sans-serif',
      ],
    },
    extend: {},
  },
  plugins: [],
  safelist: [
    // spacing
    { pattern: /^(p|m|px|py|pt|pr|pb|pl|mx|my)-(0|1|2|3|4|5|6|8|10|12|16|20|24|32)$/ },
    { pattern: /^gap-(0|1|2|3|4|5|6|8|10|12|16)$/ },

    // flex direction & alignment
    'flex', 'flex-row', 'flex-col',
    { pattern: /^(items|justify)-(start|center|end|between|around|evenly)$/ },

    // width/height you use via Props (z. B. width="96")
    { pattern: /^w-(auto|full|screen|fit|min|max|96)$/ },
    { pattern: /^h-(auto|full|screen|fit|min|max)$/ },
    // falls du mehr Breiten/Höhen brauchst, hier ergänzen (z. B. 64, 80, 128 …)
  ],
};
