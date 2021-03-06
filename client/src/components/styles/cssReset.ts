import { createGlobalStyle } from "styled-components";

export const CssReset = createGlobalStyle`
body {
  background-color: var(--color-white);
  font-family: var(--font-primary);
  color: var(--color-black);
}

*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

html, body {
  height: 100%;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

#root, #__next {
  isolation: isolate;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--color-primary);
}

::-webkit-scrollbar-thumb {
  background: var(--color-primary-light);
  border-radius: .5rem;
}
`;
