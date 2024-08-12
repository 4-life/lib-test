const result = {
  "1": {
    "dictionary_type": "TitleDictionary",
    "parent_item_path": "/",
    "item_key": "Prod",
    "item_content": {
      "non_translatable_text": "Production"
    },
    "selectable": false,
    "level": 1
  },
  "2": {
    "dictionary_type": "TitleDictionary",
    "parent_item_path": "/Prod",
    "item_key": "PythonPS",
    "item_content": {
      "non_translatable_text": "Python"
    },
    "selectable": false,
    "level": 2
  },
  "3": {
    "dictionary_type": "TitleDictionary",
    "parent_item_path": "/Prod/PythonPS",
    "item_key": "L2SL",
    "item_content": {
      "non_translatable_text": "L2"
    },
    "selectable": false,
    "level": 3
  },
  "4": {
    "dictionary_type": "TitleDictionary",
    "parent_item_path": "/Prod/PythonPS/L2SL",
    "item_key": "SoftEngin",
    "level": 4,
    "selectable": true,
    "item_content": {
      "non_translatable_text": "Software Engineer"
    },
    "parents": [
      "Production",
      "Python",
      "L2"
    ]
  }
};

export default result;
