import { FoundDictionaryItemDTO } from './models/index.js';

const recurse = (dictionary: FoundDictionaryItemDTO[] = [], path: string, key: string): FoundDictionaryItemDTO | undefined => {
  for (const item of dictionary) {
    if (item?.parent_item_path === path && item?.item_key === key) {
      return item;
    }

    if (item?.items) {
      const child = recurse(item.items, path, key);
      if (child) {
        return child;
      }
    }
  }
};

export const getRecordByPathRecursively = (
  dictionary: FoundDictionaryItemDTO[] = [],
  path: string,
  key: string,
): FoundDictionaryItemDTO | string => {
  const item = recurse(dictionary, path, key);

  if (!item) {
    return key;
  }

  return item;
};

export const getRecordItemsByPathRecursively = (
  dictionary: FoundDictionaryItemDTO[] = [],
  path: string,
  key: string,
): FoundDictionaryItemDTO[] => {
  const item = recurse(dictionary, path, key);

  if (!item?.items?.length) {
    return [];
  }

  return item.items;
};

export const getRecordsSequenceByPath = (
  dictionary: FoundDictionaryItemDTO[] = [],
  path: string,
): Record<number, FoundDictionaryItemDTO> => {
  const records: Record<number, FoundDictionaryItemDTO> = {};
  const paths = [...path.split('/'), path];

  const getRecordsSequenceRecurse = (dict: FoundDictionaryItemDTO[]): void => {
    const currentLevel = dict.find((item) => item.item_key === paths[item.level]);

    if (currentLevel) {
      records[currentLevel?.level] = {
        dictionary_type: currentLevel.dictionary_type,
        parent_item_path: currentLevel.parent_item_path,
        item_key: currentLevel.item_key,
        item_content: currentLevel.item_content,
        selectable: currentLevel.selectable,
        level: currentLevel.level,
      };

      if (currentLevel.items?.length) {
        getRecordsSequenceRecurse(currentLevel.items);
      }
    } else if (dict.length === 1 && dict[0].level) {
      const currentLevelDict = dict[0];
      records[currentLevelDict?.level] = dict[0];
    }
  };

  getRecordsSequenceRecurse(dictionary);

  return records;
};

export * from './withDictionary.js';
