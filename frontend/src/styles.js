import { createGlobalStyle } from 'styled-components';

export const Container = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: #fff;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    font-size: 16px;
  }

  a{
    text-decoration: none;
    color: #000 !important;
  }
`;
