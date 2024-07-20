import { css } from '@emotion/react';
import { colors } from '@sopt-makers/colors';

export const reset = css`
  html,
  body {
    background: #fff;
    color: ${colors.gray10};
    font-family: SUIT, sans-serif;
    -webkit-font-smoothing: antialiased;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
    touch-action: manipulation;

    & > div:last-child > span + img {
      display: inline !important;
    }
  }

  /* stylelint-disable-next-line selector-id-pattern */
  #__next,
  #root {
    width: 100%;
    height: 100%;
  }

  * {
    box-sizing: border-box;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ul,
  li {
    margin: 0;
    padding: 0;
  }

  ol,
  ul {
    list-style: none;
  }

  /* Document
    ========================================================================== */

  /**
  * 1. Correct the line height in all browsers.
  * 2. Prevent adjustments of font size after orientation changes in iOS.
  */
  html {
    text-size-adjust: 100%; /* 2 */
  }

  /* Sections
    ========================================================================== */

  /**
  * Remove the margin in all browsers.
  */
  body {
    margin: 0;
  }

  /**
  * Render the 'main' element consistently in IE.
  */
  main {
    display: block;
  }

  /* Grouping content
    ========================================================================== */

  /**
  * 1. Add the correct box sizing in Firefox.
  * 2. Show the overflow in Edge and IE.
  */
  hr {
    box-sizing: content-box; /* 1 */
    height: 0; /* 1 */
    overflow: visible; /* 2 */
  }

  /**
  * 1. Correct the inheritance and scaling of font size in all browsers.
  * 2. Correct the odd 'em' font sizing in all browsers.
  */
  pre {
    font-family: monospace;
    font-size: 1em; /* 2 */
  }

  /* Text-level semantics
    ========================================================================== */

  /**
  * Remove the gray background on active links in IE 10.
  */
  a,
  button,
  input,
  label,
  select {
    background-color: transparent;
  }

  a {
    outline: none;
    text-decoration: none;
    color: ${colors.gray10};
  }

  a:hover,
  a:visited,
  a:active {
    text-decoration: none;
  }

  /**
  * 1. Remove the bottom border in Chrome 57-
  * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
  */
  abbr[title] {
    border-bottom: none; /* 1 */
    text-decoration: underline; /* 2 */
    text-decoration: underline dotted; /* 2 */
  }

  /**
  * Add the correct font weight in Chrome, Edge, and Safari.
  */
  b,
  strong {
    font-weight: bolder;
  }

  /**
  * 1. Correct the inheritance and scaling of font size in all browsers.
  * 2. Correct the odd 'em' font sizing in all browsers.
  */
  code,
  kbd,
  samp {
    font-family: monospace;
    font-size: 1em; /* 2 */
  }

  /**
  * Add the correct font size in all browsers.
  */
  small {
    font-size: 80%;
  }

  /**
  * Prevent 'sub and 'sup' elements from affecting the line height in
  * all browsers.
  */
  sub,
  sup {
    position: relative;
    vertical-align: baseline;
    line-height: 0;
    font-size: 75%;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  /* Embedded content
    ========================================================================== */

  /**
  * Remove the border on images inside links in IE 10.
  */
  img {
    display: block;
    border-style: none;
    width: 100%;
  }

  /* Forms
    ========================================================================== */

  /**
  * 1. Change the font styles in all browsers.
  * 2. Remove the margin in Firefox and Safari.
  */
  button,
  input,
  optgroup,
  select,
  figure,
  textarea {
    margin: 0; /* 2 */
    border: none;
    padding: 0;
    line-height: 1.15; /* 1 */
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
  }

  /**
  * Show the overflow in IE.
  * 1. Show the overflow in Edge.
  */
  button,
  input {
    /* 1 */
    overflow: visible;
  }

  /**
  * Remove the inheritance of text transform in Edge, Firefox, and IE.
  * 1. Remove the inheritance of text transform in Firefox.
  */
  button,
  select {
    appearance: none;
    text-indent: 1px;

    /* 1 */
    text-transform: none;
    text-overflow: '';
  }

  input,
  textarea,
  input[type='text'] {
    appearance: none;
  }

  /**
  * Correct the inability to style clickable types in iOS and Safari.
  */
  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    appearance: button;
    color: ${colors.gray10};
  }

  /**
  * Remove the inner border and padding in Firefox.
  */
  button::-moz-focus-inner,
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  /**
  * Restore the focus styles unset by the previous rule.
  */
  button:-moz-focusring,
  [type='button']:-moz-focusring,
  [type='reset']:-moz-focusring,
  [type='submit']:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  /**
  * Correct the padding in Firefox.
  */
  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }

  /**
  * Remove Chrome autofill background-color.
  */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    transition: background-color 9999s ease-in-out 0s;
  }

  /**
  * 1. Correct the text wrapping in Edge and IE.
  * 2. Correct the color inheritance from 'fieldset' elements in IE.
  * 3. Remove the padding so developers are not caught out when they zero out
  *    'fieldset' elements in all browsers.
  */
  legend {
    box-sizing: border-box; /* 1 */
    display: table; /* 1 */
    padding: 0; /* 3 */
    max-width: 100%; /* 1 */
    white-space: normal; /* 1 */
    color: inherit; /* 2 */
  }

  /**
  * Add the correct vertical alignment in Chrome, Firefox, and Opera.
  */
  progress {
    vertical-align: baseline;
  }

  /**
  * Remove the default vertical scrollbar in IE 10+.
  */
  /* stylelint-disable-next-line no-descending-specificity */
  textarea {
    overflow: auto;
  }

  /**
  * 1. Add the correct box sizing in IE 10.
  * 2. Remove the padding in IE 10.
  */
  [type='checkbox'],
  [type='radio'] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
  }

  /**
  * Correct the cursor style of increment and decrement buttons in Chrome.
  */
  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }

  /**
  * 1. Correct the odd appearance in Chrome and Safari.
  * 2. Correct the outline style in Safari.
  */
  [type='search'] {
    appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
  }

  /**
  * Remove the inner padding in Chrome and Safari on macOS.
  */
  [type='search']::-webkit-search-decoration {
    appearance: none;
  }

  /**
  * 1. Correct the inability to style clickable types in iOS and Safari.
  * 2. Change font properties to 'inherit' in Safari.
  */
  ::-webkit-file-upload-button {
    appearance: button; /* 1 */
    font: inherit; /* 2 */
  }

  /* Interactive
    ========================================================================== */

  /*
  * Add the correct display in Edge, IE 10+, and Firefox.
  */
  details {
    display: block;
  }

  /*
  * Add the correct display in all browsers.
  */
  summary {
    display: list-item;
  }

  /* Misc
    ========================================================================== */

  /**
  * Add the correct display in IE 10+.
  */
  template {
    display: none;
  }

  /**
  * Add the correct display in IE 10.
  */
  [hidden] {
    display: none;
  }
`;
