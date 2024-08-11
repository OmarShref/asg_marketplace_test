import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      screens: {
        "md-max": { max: "767px" },
      },
      fontFamily: {
        montserrat: "var(--font-montserrat-remove)",
        noto_sans_arabic: "var(--font-noto-sans-arabic)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        backandforward: {
          "0%": {
            transform: "translateX(0)",
          },
          "50%": {
            transform: "translateX(-50%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        "moving-promotion": {
          "0%": {
            transform: "translateX(-100%) ",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        backandforward: "backandforward 1.4s ease-in-out infinite",
        "moving-promotion": "moving-promotion 10s linear  infinite",
      },
      transitionDuration: {
        10000: "10000ms",
        20000: "20000ms",
      },
      boxShadow: {
        navbar: "0px -3px 15px 0px rgba(116, 116, 117, 0.46)",
        header: "0px 6px 20px 0px rgba(194, 194, 194, 0.20)",
        circular_btn: "0px 2px 3px 0px rgba(96,96,96,.21)",
        circular_btn_inverted: "0px -2px 3px 0px rgba(96,96,96,.21)",
        color_swatch: "0px 0px 10px 0px rgba(0,0,0,0.3)",
        cart_card: "0px 4px 10px 0px rgba(0,0,0,0.05)",
        address_card: "0px 4px 13px -8px rgba(15, 15, 15, 0.2)",
      },
      colors: {
        background: "#FFFFFF",
        background_inverted: "#000000",
        accent: "#be1e2d",
        faint_accent: "#F5A09B2B",
        ultra_faint_accent: "#F5A09B1A",
        navbar: "#979C9E",
        primary_text: "#000000",
        secondry_text: "#555555",
        sub_secondry_text: "#878787",
        faint_text: "#BBBBBB",
        positive_text: "#00AB56",
        inactive_bullet: "#A3A3A3",
        inactive_bullet_light: "#FFFFFF",
        timer_background: "#FFD33C",
        separator: "#E3E3E3",
        label_discount_background: "#FDDBC9",
        label_itemcount_background: "#F40C0C",
        label_outofstock_background: "#FFDBDE",
        label_outofstock: "#BF1D28",
        label_primary: "#F45E0C",
        rounded_btn_background: "#EEEEF0",
        rounded_btn_background_light: "rgba(249, 249, 249, 1)",
        product_card_background: "#F9F9FB",
        review_card_background: "#F9F9FB",
        socialBar_background: "#F2F3F5",
        filter_option_border: "#F2F3F5",
        accordion_border: "#F1F2F4",
        devider_background: "#EBEBF0",
        glass_effect_background: "rgba(53, 53, 53, 0.47)", // backdrop-filter: blur(62);
        quick_sort_btn_border: "#DEDEDE",
        active_star: "rgba(254, 210, 61, 1)",
        inactive_star: "#E3E3E3",
        circular_change_btn_border: "#E3E3E3",
        circular_change_btn_foreground: "#292526",
        basic_confirm_btn_background: "#292D32",
        fixed_btn_container_background: "#F3F3F6",
        cart_totals_card_border: "#D9D9D9",
        remove_discount_btn_background: "#e4e4e5",
        active_row_background: "#f8f8f9",
        secondry_chevron: "#B4B4B4",
        productcard_colorswatch_background: "#a8a6a5",
        product_colorswatch_border: "#F1F2F4",
        social_login_btn_border: "#EFEFEF",
        social_login_btn_background: "#FCFCFC",
        form_field_background: "#F5F5F5",
        payment_card_background: "#F9F9F9",
        danger: "#F40C0C",
        landingPageTabs_background: "#F9F9F9",
        landingPageTabs_border: "#EDEDED",
        secretRoom: "#982F4B",
        faint_secretRoom: "#FAF1F2",
        menu_tab_background: "#F9F9F9",
        header_utility_background: "#F8F8F8",
        header_menubar_background: "#333333",
      },
      maxWidth: {
        project: "1200px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
