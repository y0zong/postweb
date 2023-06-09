const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  theme: {
    colors: {
      inherit: 'inherit',
      transparent: 'transparent',
      current: 'currentColor',
      black: "rgb(var(--black) / <alpha-value>)",
      white: "rgb(var(--white) / <alpha-value>)",
      gray: {
        DEFAULT: "rgb(var(--gray) / <alpha-value>)",
        1: "rgb(var(--gray-1) / <alpha-value>)",
        2: "rgb(var(--gray-2) / <alpha-value>)",
        3: "rgb(var(--gray-3) / <alpha-value>)",
        4: "rgb(var(--gray-4) / <alpha-value>)",
        light: "rgb(var(--gray-light) / <alpha-value>)",
        "light-1": "rgb(var(--gray-light-1) / <alpha-value>)",
        "light-2": "rgb(var(--gray-light-2) / <alpha-value>)",
        "light-3": "rgb(var(--gray-light-3) / <alpha-value>)",
        "light-4": "rgb(var(--gray-light-4) / <alpha-value>)",
        dark: "rgb(var(--gray-dark) / <alpha-value>)",
        "dark-1": "rgb(var(--gray-dark-1) / <alpha-value>)",
        "dark-2": "rgb(var(--gray-dark-2) / <alpha-value>)",
        "dark-3": "rgb(var(--gray-dark-3) / <alpha-value>)",
        "dark-4": "rgb(var(--gray-dark-4) / <alpha-value>)",
      },
      primary: {
        DEFAULT: "rgb(var(--primary) / <alpha-value>)",
        1: "rgb(var(--primary-1) / <alpha-value>)",
        2: "rgb(var(--primary-2) / <alpha-value>)",
        3: "rgb(var(--primary-3) / <alpha-value>)",
        4: "rgb(var(--primary-4) / <alpha-value>)",
      },
      green: {
        DEFAULT: "rgb(var(--green) / <alpha-value>)",
        1: "rgb(var(--green-1) / <alpha-value>)",
        2: "rgb(var(--green-2) / <alpha-value>)",
        3: "rgb(var(--green-3) / <alpha-value>)",
        4: "rgb(var(--green-4) / <alpha-value>)",
      },
      orange: {
        DEFAULT: "rgb(var(--orange) / <alpha-value>)",
        1: "rgb(var(--orange-1) / <alpha-value>)",
        2: "rgb(var(--orange-2) / <alpha-value>)",
        3: "rgb(var(--orange-3) / <alpha-value>)",
        4: "rgb(var(--orange-4) / <alpha-value>)",
      },
      red: {
        DEFAULT: "rgb(var(--red) / <alpha-value>)",
        1: "rgb(var(--red-1) / <alpha-value>)",
        2: "rgb(var(--red-2) / <alpha-value>)",
        3: "rgb(var(--red-3) / <alpha-value>)",
        4: "rgb(var(--red-4) / <alpha-value>)",
      },
    },
    extend: {
      zIndex: {
        title: 9,
        bar: 10,
        modal: 11,
        window: 12,
        postwin: 13,
        notice: 14
      },
      opacity: {
        5: ".5",
        10: ".10",
        15: ".15",
        20: ".20",
        25: ".25",
        30: ".30",
        35: ".35",
        40: ".40",
        45: ".45",
        50: ".50",
        55: ".55",
        60: ".60",
        65: ".65",
        70: ".70",
        75: ".75",
        80: ".80",
        85: ".85",
        90: ".90",
        95: ".95",
      },
      spacing: {
        v: "0.3125rem",
        "2v": "0.625rem",
        "3v": "0.9375rem",
        "4v": "1.25rem",
        "5v": "1.5625rem",
        "6v": "1.875rem",
        "7v": "2.1875rem",
        "8v": "2.5rem",
        "9v": "2.8125rem",
        "sm": "1.5rem",
        "md": "1.875rem",
        "lg": "2.5rem"
      },
      lineHeight: {
        "sm": "1.5rem",
        "md": "1.875rem",
        "lg": "2.5rem"
      },
      // blueprint
      borderRadius: {
        DEFAULT: "var(--border-radius)",
        fiber: "var(--fiber-border-radius)"
      },
      colors: {
        txt: "rgb(var(--text) / <alpha-value>)",
        app: {
          DEFAULT: "rgb(var(--app-bg) / <alpha-value>)",
          second: "rgb(var(--app-bg-second) / <alpha-value>)",
          third: "rgb(var(--app-bg-third) / <alpha-value>)",
        },
        btn: {
          DEFAULT: "rgb(var(--btn-bg) / <alpha-value>)",
          hover: "rgb(var(--btn-bg-hover) / <alpha-value>)",
          active: "rgb(var(--btn-bg-active) / <alpha-value>)",
        },
        icon: {
          DEFAULT: "rgb(var(--icon) / <alpha-value>)",
        },
        tag: {
          DEFAULT: "rgb(var(--tag) / <alpha-value>)",
          text: "rgb(var(--tag-text) / <alpha-value>)",
        },
        input: {
          DEFAULT: "var(--input-bg)"
        },
        table: {
          DEFAULT: "var(--input-bg)",
          border: "rgb(var(--table-border) / <alpha-value>)"
        },
        modal: {
          DEFAULT: "rgb(var(--modal-bg) / <alpha-value>)",
          border: "rgb(var(--modal-border) / <alpha-value>)"
        },
        window: {
          DEFAULT: "rgb(var(--window-bg) / <alpha-value>)",
          header: "rgb(var(--window-header) / <alpha-value>)",
        },
        border: {
          DEFAULT: "rgb(var(--text) / .2)"
        },
        "txt-default": "hsl(var(--fiber-text-color))",
        "button": "hsl(var(--fiber-button-default))"
      },
      boxShadow: {
        "kbd": "0 2px 0 1px hsl(var(--muted-foreground) / 0.5)",
        "border-toast": "inset 0 0 0 1px rgb(var(--black) / .2), 0 2px 4px rgb(var(--black) / .2), 0 8px 24px rgb(var(--black) / .2)"
      },
      keyframes: {
        "loading-dot": {
          from: { opacity: 0.2 },
          "20%": { opacity: 1 },
          to: { opacity: 0.2 },
        },
        "raise-with-scale": {
          from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
          from: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" }
        }
      },
      animation: {
        "loading-dot": "1.4s infinite loading-dot",
        "raise-with-scale": "raise-with-scale 150ms cubic-bezier(0.16, 1, 0.3, 1)"
      },
      transitionDelay: {
        400: "400ms"
      },
      data: {}
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addComponents }) {
      addComponents({
        '.test': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        }
      })
    }),
    plugin(function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--black': "17 20 24",
          '--white': "255 255 255",
          '--gray': "95 107 124",
          '--gray-1': "115 128 145",
          '--gray-2': "143 153 168",
          '--gray-3': "171 179 191",
          '--gray-4': "197 203 211",
          '--gray-dark': "28 33 39",
          '--gray-dark-1': "37 42 49",
          '--gray-dark-2': "47 52 60",
          '--gray-dark-3': "56 62 71",
          '--gray-dark-4': "64 72 84",
          '--gray-light': "211 216, 222",
          '--gray-light-1': "220 224 229",
          '--gray-light-2': "229 232 235",
          '--gray-light-3': "237 239 242",
          '--gray-light-4': "246 247 249",
          '--blue': "24 74 144",
          '--blue-1': "33 93 176",
          '--blue-2': "45 114 210",
          '--blue-3': "76 144 240",
          '--blue-4': "138 187 255",
          '--green': "22 90 54",
          '--green-1': "28 110 66",
          '--green-2': "35 133 81",
          '--green-3': "50 164 103",
          '--green-4': "144 202 115",
          '--orange': "119 69 13",
          '--orange-1': "147 86 16",
          '--orange-2': "200 118 25",
          '--orange-3': "236 154 60",
          '--orange-4': "251 179 91",
          '--red': "142 41 44",
          '--red-1': "172 47 51",
          '--red-2': "205 66 70",
          '--red-3': "231 106 110",
          '--red-4': "250 153 156",
          '--fiber-text-color': "213 16% 13%",
          '--fiber-primary': "215 65% 50%",
          '--fiber-verified': "148 58% 33%",
          '--fiber-warning': "32 78% 44%",
          '--fiber-danger': "358 58% 53%",
          '--fiber-button-default': "220 20% 97%",
          '--border-radius': "4px",
          '--fiber-border-radius': "4px"
        },
        'html:not(.dark)': {
          '--primary': "15 23 41",
          '--primary-1': "15 23 41",
          '--primary-2': "15 23 41",
          '--text': "var(--black)",
          '--app-bg': "var(--white)",
          '--app-bg-second': "var(--gray-light-4)",
          '--app-bg-third': "var(--gray-light-3)",
          '--btn-bg': "var(--gray-light-4)",
          '--btn-bg-hover': "var(--gray-light-3)",
          '--btn-bg-active': "var(--gray-light-1)",
          '--btn-border': "inset 0 0 0 1px rgb(var(--black) / 0.2), 0 1px 2px rgb(var(--black) / 0.1)",
          '--icon': "var(--gray)",
          '--tag': "var(--gray)",
          '--tag-text': "var(--white)",
          '--modal-border': "var(--gray-light-2)",
          '--modal': "inset 0 0 0 1px rgb(var(--white)), 0 2px 4px rgb(var(--black) / .2),0 0 12px rgb(var(--black) / .2)",
          '--modal-bg': "var(--white)",
          '--window-bg': "var(--gray-light-4)",
          '--window-header': "var(--white)",
          '--table-border': "var(--gray-4)",
          '--input-border': "0 0 0 0 transparent, 0 0 0 0 transparent, inset 0 0 0 1px rgb(var(--black) / .2), inset 0 1px 1px rgb(var(--black) / .5)",
          '--input-border-focus': "0 0 0 2px rgb(var(--black) / .2), 0 0 0 0 transparent, inset 0 0 0 1px rgb(var(--black) / .48), inset 0 1px 1px rgb(var(--black) / .5)",
          '--input-bg': "rgb(var(--white))"
        },
        'html.dark': {
          '--primary': "var(--blue)",
          '--primary-1': "var(--blue-1)",
          '--primary-2': "var(--blue-2)",
          '--text': "var(--white)",
          '--app-bg': "var(--gray-dark-3)",
          '--app-bg-second': "var(--gray-dark-2)",
          '--app-bg-third': "var(--gray-dark-1)",
          '--btn-bg': "var(--gray-dark-3)",
          '--btn-bg-hover': "var(--gray-dark-2)",
          '--btn-bg-active': "var(--gray-dark)",
          '--btn-border': "inset 0 0 0 1px rgb(var(--white) / 0.2), 0 1px 2px rgb(var(--black) / 0.75)",
          '--icon': "var(--gray-3)",
          '--tag': "var(--gray-4)",
          '--tag-text': "var(--gray-dark)",
          '--modal-border': "var(--gray-dark-4)",
          '--modal': "inset 0 0 0 1px rgb(var(--gray-dark-4)), 0 0 12px rgb(var(--black) / .75)",
          '--modal-bg': "var(--black)",
          '--window-bg': "var(--gray-dark-1)",
          '--window-header': "var(--gray-dark-2)",
          '--table-border': "var(--gray-dark-4)",
          '--input-border': "0 0 0 0 transparent, 0 0 0 0 transparent, 0 0 0 0 transparent, inset 0 0 0 1px rgb(var(--white) / .2), inset 0 -1px 1px 0 rgb(var(--gray-2))",
          '--input-border-focus': "0 0 0 2px rgb(var(--white) / .2), 0 0 0 0 transparent, 0 0 0 0 transparent, inset 0 0 0 1px rgb(var(--white) / .58), inset 0 -1px 1px 0 rgb(var(--gray-2))",
          '--input-bg': "rgb(var(--black) / .3)"
        },
        'ol.notice>li': {
          'position': "absolute",
          'left': "0",
          'z-index': "1"
        },
        'ol.notice>li:nth-last-of-type(1)': {
          'z-index': "3"
        },
        'ol.notice>li:nth-last-of-type(2)': {
          'transform': "translate3d(0, 10px, -1px) scale(.95)",
          'z-index': "2"
        },
        'ol.notice>li:nth-last-of-type(3)': {
          'transform': "translate3d(0, 20px, -1px) scale(.90)",
        },
        'ol.notice>li:not(:nth-last-of-type(1),:nth-last-of-type(2),:nth-last-of-type(3))': {
          'transform': "translate3d(0, 30px, -1px) scale(.85)",
        },
        'ol.notice:hover > li': {
          'position': "relative",
          'transform': "none"
        },
        ".ébtn": {
          'box-shadow': "var(--btn-border)"
        },
        ".émodal": {
          'box-shadow': "var(--modal)"
        },
        ".éinput": {
          'box-shadow': "var(--input-border)"
        },
        ".éinput:focus-within":{
          'box-shadow': "var(--input-border-focus)"
        },
        "table.étable>thead": {
          'box-shadow': "inset 0 -1px 0 0 rgb(var(--table-border))"
        }
      })
    })
  ]
};
