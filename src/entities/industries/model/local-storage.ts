import { useLocalStorage } from 'usehooks-ts';
import { TIndustries } from './types';

export const useLSIndustries = () => useLocalStorage<TIndustries | null>('industries', null);
