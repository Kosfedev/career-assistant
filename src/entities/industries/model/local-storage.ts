import { useLocalStorage } from 'usehooks-ts';
import { TIndustries } from './types';

export const useLSIndustriesDict = () => useLocalStorage<TIndustries | null>('industries-dictionary', null);
export const useLSIndustries = () => useLocalStorage<TIndustries | null>('industries', null);
export const useLSIndustriesMain = () => useLocalStorage<TIndustries | null>('industries-main', null);
