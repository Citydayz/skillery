// types/index.ts

export type Swatch = {
  id: string;
  hex: string;
  h: number;
  s: number;
  l: number;
  a: number;
  locked: boolean;
};

export type HarmonyType =
  | "analogues"
  | "complementaire"
  | "triadique"
  | "splitComplementaire"
  | "tetradique"
  | "carre"
  | "doubleComplementaire"
  | "accentueAnalogue";

export type ModeType = "normal" | "pastel" | "dark" | "monochrome";
