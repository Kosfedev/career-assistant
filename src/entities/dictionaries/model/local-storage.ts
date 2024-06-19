import { useLocalStorage } from 'usehooks-ts';

export const useLSDictionaries = () => useLocalStorage<any>('dictionaries', null);
