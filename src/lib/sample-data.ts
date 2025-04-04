
import { ComponentData } from "./types";

export const initialSampleData: ComponentData[] = [
  {
    "name": "arbeidserfaring",
    "buttons": [
      "Logg ut",
      "Avbryt",
      "{option.icon}\n                                  \n                                    {option.label}",
      "Neste"
    ]
  },
  {
    "name": "forhåndsvisning",
    "buttons": [
      "Min CV-data",
      "Mine CV-er",
      "Logg ut",
      "Tilbake",
      "Lagre"
    ],
    "children": [
      {
        "name": "ChildComponent",
        "buttons": [
          "Child Button"
        ]
      }
    ]
  }
];
