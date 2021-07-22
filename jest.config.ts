import path from "path";
import type { InitialOptionsTsJest } from "ts-jest/dist/types";
import { defaults as tsjPreset } from "ts-jest/presets";

const config: InitialOptionsTsJest = {
  moduleFileExtensions: ["js", "ne", "ts"],
  transform: {
    ...tsjPreset.transform,
    "^.+\\.ne$": path.resolve(__dirname, "src", "jest-transform-nearley.js"),
  },
};

export default config;
