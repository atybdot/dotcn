import {
  blueBright,
  bold,
  greenBright,
  italic,
  redBright,
  underline,
  yellowBright,
} from "yoctocolors";

export const highlighter = {
  success: (...s: string[]) => greenBright(s.join(" ")),
  error: (...s: string[]) => redBright(s.join(" ")),
  warn: (...s: string[]) => yellowBright(s.join(" ")),
  info: (...s: string[]) => blueBright(s.join(" ")),
  bold: (...s: string[]) => bold(s.join(" ")),
  italic: (...s: string[]) => italic(s.join(" ")),
  underline: (...s: string[]) => underline(s.join(" ")),
};
export const logger = {
  error: (...s: string[]) =>
    console.log(redBright(highlighter.bold(s.join(" ")))),
  warn: (...s: string[]) =>
    console.log(yellowBright(highlighter.bold(s.join(" ")))),
  info: (...s: string[]) =>
    console.log(blueBright(highlighter.bold(s.join(" ")))),
  success: (...s: string[]) =>
    console.log(greenBright(highlighter.bold(s.join(" ")))),
  log: (...s: string[]) => console.log(highlighter.bold(s.join(" "))),
};
