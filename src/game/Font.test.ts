import Font from "./Font";

test("parse font definition file", () => {
  const testDefinition = `
    Define CharList ('A', 'B', 'C');
    Define WidthList (13,  12,  15);
    Define RectList ((349, 0, 16, 22), (366, 0, 19, 22), (712, 0, 18, 22));
    Define OffsetList ((-3, 0), (-2, 0), (-3, 0));
    Define KerningPairs ("AT", "AV");
    Define KerningValues (-3, -2);

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

    SetDefaultPointSize  -3.14;
    SetCharMap            CharList WidthList;
  `;
  const fontDefinition = Font.parseDefinitionFile(testDefinition);
  expect(fontDefinition).toHaveProperty("layers.Main");
  expect(fontDefinition).toHaveProperty("DefaultPointSize", -3.14);
  expect(fontDefinition).toHaveProperty("CharMap.B", 12);
});
