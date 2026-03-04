import { useLocalStorage } from 'usehooks-ts';
import { TEmployerSelected } from '../model/types';
import { EMPLOYERS_LS_NAME } from '../model/constants';

export const useEmployersSelected = () => {
  return  useLocalStorage(EMPLOYERS_LS_NAME, new Map<string, TEmployerSelected>(), {
    deserializer:(value)=>new Map<string, TEmployerSelected>(JSON.parse(value)),
    serializer:(value)=>JSON.stringify(Array.from(value)),
  });
};
