import { useLocalStorage } from 'usehooks-ts';
import { TEmployerSelected } from './types';

export const useLSEmployersSelected = () =>
  useLocalStorage('employers-selected', new Map<string, TEmployerSelected>(), {
    deserializer:(value)=> new Map<string, TEmployerSelected>(JSON.parse(value)),
    serializer:(value)=> JSON.stringify(Array.from(value)),
  });
