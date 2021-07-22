import { Grammar, Parser } from "nearley";
import fontDefinitionRules from "./font-definition.ne";

test("parses Define statements", () => {
  const grammar = Grammar.fromCompiled(fontDefinitionRules);
  const parser = new Parser(grammar);
  const testDefinition = `
    Define CharList ('A', 'B', 'C');
    Define KerningPairs ("AT", "AV");
    Define WidthList (13, -12, 1.5);
    Define OffsetList ((-3, 0), (-2, 0), (-3, 0));

    CreateLayer               Main;
    LayerSetImage             Main 'CancunFloat14';
    LayerSetAscent            Main 18;
    LayerSetCharWidths        Main CharList WidthList;
    LayerSetCharWidths        Main (' ') (6);
    LayerSetKerningPairs      Main KerningPairs KerningValues;
    LayerSetImageMap          Main CharList RectList;
    LayerSetCharOffsets       Main CharList OffsetList;
    LayerSetAscentPadding     Main 3;
    LayerSetLineSpacingOffset Main 0;
    LayerSetPointSize         Main 14;
    LayerRequireTags          Main ("This is a tag");

    CreateLayer               Main2;

    SetDefaultPointSize  -3.14;
  `;
  parser.feed(testDefinition);
  expect(parser.results).toHaveLength(1);

  const [statements] = parser.results;
  expect(statements).toMatchSnapshot();
});
