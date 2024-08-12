import { useLocalStorage } from 'usehooks-ts';
import { TDictionaries } from './types';

export const useLSDictionaries = () => useLocalStorage<TDictionaries | null>('dictionaries', null);
