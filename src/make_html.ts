
/* IMPORT */

import {Options} from './types';

/* MAKE HTML */

const makeHTML = ( options: Options ) => `
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Arial, sans-serif;
        margin: 0;
      }
      body * {
        margin-top: 0;
      }
      body *:first-child {
        margin-top: 12px;
      }
      body *:not(:last-child) {
        margin-bottom: 8px;
      }
      .name {
        font-weight: 700;
      }
      .version,
      .copyright {
        font-size: .5946142301em;
      }
    </style>
  </head>
  <body>
    <img class="icon" src="${options.icon}" width="64">
    <p class="name">${options.appName}</p>
    <p class="version">${options.version}</p>
    <p class="copyright">${options.copyright}</p>
  </body>
</html>
`;

/* EXPORT */

export default makeHTML;
