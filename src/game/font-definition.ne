@builtin "number.ne"
@builtin "string.ne"
@builtin "whitespace.ne"

statementlist -> (_ statement _ ";"):* _      {% (d) => d[0].map((e) => e[1]) %}

statement ->
  # LayerSetImage Main 'ImageAssetName'
    layerAction __ identifier __ varValue     {% (d) => ({ action: d[0], id: d[2], type: 'single', value: d[4] }) %}
  
  # Define Variable '23'
  | action __ identifier __ varValue          {% (d) => ({ action: d[0], id: d[2], type: 'single', value: d[4] }) %}

  # CreateLayer Main
  | action __ identifier                      {% (d) => ({ action: d[0], id: d[2], type: 'single' }) %}
  
  # SetCharMap Lowercase Uppercase
  | action __ identifier __ identifier        {% (d) => ({ action: d[0], key: d[2], type: 'map', value: d[4] }) %}

  # LayerSetCharWidths Main CharList WidthList
  | layerAction __ identifier __ identifier __ identifier {% (d) => ({ action: d[0], id: d[2], key: d[4], type: 'map', value: d[6] }) %}

  # LayerSetCharWidths Main (' ') (5)
  | layerAction __ identifier __ varValue __ varValue {% (d) => ({ action: d[0], id: d[2], key: d[4], type: 'map', value: d[6] }) %}

  # SetDefaultValue 42
  | action __ varValue                        {% (d) => ({ action: d[0], type: 'single', value: d[2] }) %}

identifier -> [a-zA-Z] [a-zA-Z0-9]:*          {% (d) => ({ type: 'identifier', v: d[0] + d[1].join("") }) %}

layerAction -> "LayerSet" [a-zA-Z]:+          {% (d) => ({ type: 'layer', v: d[1].join("") }) %}
             | "LayerRequire" [a-zA-Z]:+      {% (d) => ({ type: 'layer', v: d[1].join("") }) %}

action -> "Define"                            {% (d) => ({ type: 'define' }) %}
        | "CreateLayer"                       {% (d) => ({ type: 'createLayer' }) %}
        | "Set" [a-zA-Z]:+                    {% (d) => ({ type: 'set', v: d[1].join("") }) %}

varValue -> varValueArray                     {% (d) => ({ type: 'value', v: d[0][0] }) %}

varValueArray -> arrayValue                   {% (d) => d[0] %}
          | value                             {% (d) => [d[0]] %}

arrayValue -> "(" _ values _ ")"              {% (d) => [d[2]] %}

values -> values _ "," _ varValueArray        {% (d) => [...d[0], ...d[4]] %}
        | varValueArray                       {% id %}

value -> dqstring {% id %}
       | sqstring {% id %}
       | decimal  {% id %}

wschar -> [\r] {% id %}
