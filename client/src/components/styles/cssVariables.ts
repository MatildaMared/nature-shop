import { createGlobalStyle } from "styled-components";

export const CssVariables = createGlobalStyle`
  :root {
    --max-width: 1200px;

    --color-primary-dark: hsla(90, 9%, 15%, 1.0);
    --color-primary-dark-transparent: hsla(90, 9%, 15%, .85);
    --color-primary: hsla(90, 9%, 25%, 1.0);
    --color-primary-light: hsla(90, 9%, 48%, 1.0);
    --color-primary-light-transparent: hsla(90, 9%, 65%, .75);

    --color-white: hsla(90, 20%, 98%, 1.0);
    --color-black: hsla(90, 4%, 10%, 1.0);

    --font-primary: "Inter", sans-serif;
    --font-script: "Seaweed Script", cursive;
    --font-decorative: "Cinzel Decorative", cursive;
  }
`;
