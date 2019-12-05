import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    min-width: 0;
  }

  body {
    background: #26304A;
    color: #FEFEFE;
    font-family: 'Nunito', sans-serif;
    width: 100vw;
  }
  `
