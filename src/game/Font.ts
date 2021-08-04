import { Grammar, Parser } from "nearley";
import AlphaPicture from "./AlphaPicture";
import fontDefinitionRules from "./font-definition.ne";
import Picture from "./Picture";
import Resources from "./Resources";
import TextPicture from "./TextPicture";

const grammar = Grammar.fromCompiled(fontDefinitionRules);

export interface FontLayer {
  CharWidths: { [char: string]: number };
  Image: string;
  ImageMap: { [char: string]: number[] };
  KerningPairs: { [keyPair: string]: number };
  PointSize: number;
}

export interface FontDefinition {
  CharMap: { [char: string]: string };
  DefaultPointSize: number;
  layers: { [name: string]: FontLayer };
}

interface Identifier {
  type: "identifier";
  v: string;
}

interface Value {
  type: "value";
  v: unknown;
}

interface LayerSetValue {
  action: { type: "layer"; v: string };
  id: Identifier;
  type: "single";
  value: Value;
}

interface DefineVariable {
  action: { type: "define" };
  id: Identifier;
  type: "single";
  value: Value;
}

interface CreateLayer {
  action: { type: "createLayer" };
  id: Identifier;
  type: "single";
  value: undefined;
}

interface LayerSetMap {
  action: { type: "layer"; v: string };
  id: Identifier;
  key: Identifier | Value;
  value: Identifier | Value;
  type: "map";
}

interface Set {
  action: { type: "set"; v: string };
  key: Identifier | Value;
  value: Identifier | Value;
  type: "map" | "single";
}

type Statement =
  | LayerSetValue
  | DefineVariable
  | CreateLayer
  | LayerSetMap
  | Set;

function isDefineVariable(statement: Statement): statement is DefineVariable {
  return statement.action.type === "define";
}

function isCreateLayer(statement: Statement): statement is CreateLayer {
  return statement.action.type === "createLayer";
}

function isLayerSet(
  statement: Statement
): statement is LayerSetMap | LayerSetValue {
  return statement.action.type === "layer";
}

function isSet(statement: Statement): statement is Set {
  return statement.action.type === "set";
}

export default class Font {
  private fontDefinition: FontDefinition;
  private fontImages = new Map<string, Picture>();

  constructor(private resources: Resources, definitionFileContents: string) {
    this.fontDefinition = Font.parseDefinitionFile(definitionFileContents);
  }

  protected getFontImage(layer: string): Picture {
    if (this.fontImages.has(layer)) {
      return this.fontImages.get(layer);
    }

    const fontImageName = this.fontDefinition.layers[layer].Image;
    const colorImage = this.resources.images[fontImageName];
    const alphaImage = `_${fontImageName}`;
    let picture: Picture;
    if (colorImage) {
      picture = new AlphaPicture(this.resources, colorImage, alphaImage);
    } else {
      picture = new Picture(this.resources, alphaImage);
    }
    this.fontImages.set(layer, picture);
    return picture;
  }

  createText(
    layer: string,
    x: "center" | number,
    y: number,
    text: string
  ): TextPicture {
    const fontImage = this.getFontImage(layer);
    return new TextPicture(
      this.fontDefinition,
      this.resources,
      fontImage,
      x,
      y,
      layer,
      text
    );
  }

  static parseDefinitionFile(definitionFileContents: string): FontDefinition {
    const parser = new Parser(grammar);
    parser.feed(definitionFileContents);

    const [statements] = parser.results;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fontDefinition: any = {
      CharMap: {},
      layers: {},
    };
    const variables = new Map<string, unknown>();

    function getValue(value: Value | Identifier) {
      if (value.type === "identifier") {
        return variables.get(value.v);
      }
      return value.v;
    }

    (statements as Statement[]).forEach((statement) => {
      let value = statement.value && getValue(statement.value);
      if (statement.type === "map") {
        value = Object.fromEntries(
          (getValue(statement.key) as string[]).map((key, i) => [
            key,
            (value as unknown[])[i],
          ])
        );
      }
      if (isDefineVariable(statement)) {
        variables.set(statement.id.v, value);
      }
      if (isCreateLayer(statement)) {
        fontDefinition.layers[statement.id.v] = {
          KerningPairs: {},
        };
      }
      if (isLayerSet(statement)) {
        const layer = fontDefinition.layers[statement.id.v];
        const property = statement.action.v as keyof FontLayer;
        if (statement.type === "map") {
          if (!layer[property]) {
            layer[property] = {};
          }
          Object.assign(layer[property], value);
        } else {
          layer[property] = value;
        }
      }
      if (isSet(statement)) {
        const property = statement.action.v as keyof FontLayer;
        if (statement.type === "map") {
          if (!fontDefinition[property]) {
            fontDefinition[property] = {};
          }
          Object.assign(fontDefinition[property], value);
        } else {
          fontDefinition[property] = value;
        }
      }
    });
    return fontDefinition;
  }
}
