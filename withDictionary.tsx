import React, { ComponentType, FC, useEffect, useState } from 'react';
import { IDBPDatabase, openDB } from 'idb';
import { FoundDictionaryDTO, FoundDictionaryItemDTO } from './models/index.js';
import { StoredData } from './types.js';

const apiEndpoint = `${process.env.REACT_APP_API_URL}/api/v1`;

export interface WithDictionaryDataProps {
  dictionary?: StoredData;
  dictionaryLoading?: boolean;
  dictionaryError?: string;
}

const databaseName = 'dictionary-database';
const storeName = 'dictionary-store';

const initDB = async (): Promise<IDBPDatabase<unknown>> => {
  return await openDB(databaseName, 1, {
    upgrade(db) {
      db.createObjectStore(storeName);
    },
  });
};

const fetchDictionaryKeys = async (): Promise<FoundDictionaryDTO[]> => {
  const getToken = (): string => localStorage.getItem(process.env.REACT_APP_TOKEN_NAME || '') || '';
  const response = await fetch(`${apiEndpoint}/dictionary/search`, {
    headers: {
      Autorization: `Bearer ${getToken()}`
    }
  });

  const data: FoundDictionaryDTO[] = await response.json();

  return data;
};

const fetchAndStoreData = async (key: string, endpoint: string): Promise<void> => {
  const response = await fetch(endpoint);
  const data: FoundDictionaryItemDTO[] = await response.json();

  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  await tx.objectStore(storeName).put(data, key);
  await tx.done;
};

const getStoredData = async (keys: string[] = []): Promise<StoredData | undefined> => {
  const db = await initDB();
  const promises = keys.map((key) => db.get(storeName, key));
  const results = await Promise.all(promises);
  const result = keys.reduce((acc, key, index) => {
    acc[key] = results[index];
    return acc;
  }, {} as StoredData);
  return result;
};

const getStoredDataVersion = async (): Promise<string | undefined> => {
  const db = await initDB();
  return await db.get(storeName, 'date-version');
};

const setStoredDataVersion = async (): Promise<void> => {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  await tx.objectStore(storeName).put((new Date()).toDateString(), 'date-version');
  await tx.done;
};

const fetchAndStoreDictionary = async (): Promise<void> => {
  const keys = await fetchDictionaryKeys();

  if (keys?.length) {
    const promises = keys.map(
      ({ dictionary_type }) => fetchAndStoreData(
        dictionary_type,
        `${apiEndpoint}/dictionary/item/search?type=${dictionary_type}`,
      ),
    );

    await Promise.all(promises);
    await setStoredDataVersion();
  }
};

const isDateOld = (date: Date): boolean => {
  const timestamp = new Date().getTime() - (3 * 24 * 60 * 60 * 1000);
  return timestamp > date.getTime();
};

const withDictionary = <P extends WithDictionaryDataProps>(
  Component: ComponentType<P>,
  keys: string[],
): FC<Omit<P, 'data'>> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const componentWithDictionary = (props: any): React.JSX.Element => {
    const [data, setData] = useState<StoredData | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      const loadData = async (): Promise<void> => {
        try {
          const version = await getStoredDataVersion();

          if (!version || isDateOld(new Date(version))) {
            await fetchAndStoreDictionary();
          }

          const storedData = await getStoredData(keys);
          setData(storedData);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }, []);

    return (
      <Component
        {...(props as P)}
        dictionary={data}
        dictionaryLoading={loading}
        dictionaryError={error?.message || ''}
      />
    );
  };

  return componentWithDictionary;
};

export default withDictionary;
