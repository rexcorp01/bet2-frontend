import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import baseTheme from "./baseTheme";

let theme = createTheme(baseTheme);

theme = responsiveFontSizes(theme);

export default theme;
