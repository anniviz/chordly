import { configure } from "@storybook/react";
import { load, addDecorator } from "@storybook/react";
import styled from "styled-components/macro";
import React from "react";
import { withInfo } from "@storybook/addon-info";
import GlobalStyles from "../src/GlobelStyles";

// automatically import all files ending in *.stories.js
configure(require.context("../src", true, /\.stories\.js$/), module);
addDecorator(withInfo);
addDecorator(storyFn => (
  <>
    <GlobalStyles />
    {storyFn()}
  </>
));
