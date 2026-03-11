import { useCallback, useEffect, useMemo, useState } from 'react';
import { TIndustry, useLSEmployersSelected } from '@/entities/employers-selected';
import { useLSIndustriesDict } from '@/entities/industries';
import { useGetEmployerById } from '@/entities/employers/api/api';

export const useSortedData = () => {
  const [employersIndustries, setEmployersIndustries] = useState(new Map<string, TIndustry[]>());
  const [industriesDict] = useLSIndustriesDict();
  const [employerIndex, setEmployerIndex] = useState(-1);
  const [employersSelected, setEmployersSelected] = useLSEmployersSelected();
  // TODO: оптимизировать?
  const employersSelectedSorted = useMemo(
    ()=> {
      const employers = Array.from(employersSelected).map(([,employer])=> employer);

      return employers.sort(({ count: countA }, { count: countB })=> countB - countA);
    }, [employersSelected],
  );
  const { data, refetch, isFetching } = useGetEmployerById(employersSelectedSorted.length > 0 && employerIndex >= 0 ? employersSelectedSorted[employerIndex].id : -1, false);

  const updateEmployersSelected = useCallback(()=> {
    const employerIndustriesMain = new Map<string, TIndustry[]>();
    // TODO: Array.from -> map.entries().next()
    Array.from(employersIndustries).forEach(([employerId, industries])=> {
      const employerIndustriesMainSet = new Set<string>();
      const industriesMain = industries.map(({ id })=> {
        const mainId = id.replaceAll(/(\d+)\..+/gm, '$1');
        const industryMain = industriesDict?.find(({ id:savedMainId })=>savedMainId === mainId);

        if (!industryMain || employerIndustriesMainSet.has(mainId)) {
          return;
        }
        employerIndustriesMainSet.add(mainId);

        return { id: industryMain.id, name: industryMain.name };
      }).filter((industryMain)=> industryMain) as TIndustry[];
      employerIndustriesMain.set(employerId, industriesMain);
    });

    // TODO: Array.from -> map.entries().next()
    Array.from(employersIndustries).forEach(([employerId, industries])=> {
      const industriesMain = employerIndustriesMain.get(employerId);
      const employerSelected = employersSelected.get(employerId);
      if (employerSelected) {
        // TODO: иммутабельность???
        employersSelected.set(employerId, { ...employerSelected, industries, industriesMain });
      }
    });

    setEmployersSelected(employersSelected);
  }, [employersIndustries, employersSelected, industriesDict, setEmployersSelected]);

  const getEmployersIndustries = useCallback(( )=>{
    setEmployerIndex(employerIndex + 1);
  }, [employersSelectedSorted]);

  useEffect(() => {
    if (employerIndex == -1) {
      return;
    }

    refetch().then(()=>{
      // TODO: заменить дорогое преобразование в массив
      if (employerIndex >= Array.from(employersSelected).length - 1) {
        // TODO: сейчас недополучает последние данные, так как выстреливает раньше чем закончится последний setEmployersIndustries
        updateEmployersSelected();
        return;
      }

      setTimeout(()=>setEmployerIndex(employerIndex + 1), Math.random() * 100 + 100);
    });
  }, [employerIndex, refetch]);

  useEffect(() => {
    // TODO: костыльная проверка на ошибку, так как сейчас даже при 404 возвращает {errors}, а не undefined или null
    if (!data || !data.id) {
      return;
    }
    // TODO: иммутабельность???
    setEmployersIndustries((employerIndustry)=> employerIndustry.set(data.id, data.industries));
  }, [data]);
  
  return { employersSelectedSorted, isFetching, getEmployersIndustries };
};