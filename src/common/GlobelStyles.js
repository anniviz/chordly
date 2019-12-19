import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');

  
  :root{
    --standardPadding: 20px;
    --titlePadding: 10px;
    --mainButtonWidth: 100px;
    --mainButtonHeight: 100px;
    --mainButtonBottom: -20px;
    --mainButtonLeft: -20px;
    --smallButtonDiameter: 48px;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    min-width: 0;
    scrollbar-width: none;
    ::-webkit-scrollbar {display: none;}
  }

  body {
    background: #26304A;
    color: #FEFEFE;
    font-family: 'Nunito', sans-serif;
    width: 100vw;
    ${'' /* overflow: hidden; */}
  }
  `
