import { createGlobalStyle } from "styled-components";

export const CssVariables = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&family=Cinzel+Decorative:wght@400;700;900&family=Rampart+One&family=Seaweed+Script&display=swap');
  :root {
    --max-width: 1200px;

    --color-primary: #00bcd4;
    --color-primary-dark: hsla(90, 9%, 15%, 1.0);
    --color-primary-light: hsla(90, 9%, 48%, 1.0);
    --color-primary-light-transparent: hsla(90, 9%, 65%, .7);
  }
`;
