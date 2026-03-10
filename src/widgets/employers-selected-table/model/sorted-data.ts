import { useCallback, useEffect, useMemo, useState } from 'react';
import { TIndustry, useLSEmployersSelected } from '@/entities/employers-selected';
import { useLSIndustries } from '@/entities/industries';
import { useGetEmployerById } from '@/entities/employers/api/api';

type TIndustryStat = TIndustry & { count: number };

export const useSortedData = () => {
  const [employersIndustries, setEmployersIndustries] = useState(new Map<string, TIndustry[]>());
  const [savedIndustries] = useLSIndustries();
  const [employerIndex, setEmployerIndex] = useState(-1);
  const [employersSelected, setEmployersSelected] = useLSEmployersSelected();
  // TODO: оптимизировать?
  const [employersSelectedSorted, industriesSorted, industriesMainSorted] = useMemo(
    ()=> {
      const industriesMap = new Map<string, TIndustryStat>();
      const industriesMainMap = new Map<string, TIndustryStat>();
      const employers = Array.from(employersSelected).map(([,employer])=>{
        employer.industries?.forEach((industry)=>{
          const industryStat: TIndustryStat = industriesMap.get(industry.id) ?? { ...industry, count: 0 };
          industriesMap.set(industry.id, { ...industryStat, count: industryStat.count + 1 }  );
        });
        employer.industriesMain?.forEach((industry)=>{
          const industryStat: TIndustryStat = industriesMainMap.get(industry.id) ?? { ...industry, count: 0 };
          industriesMainMap.set(industry.id, { ...industryStat, count: industryStat.count + 1 }  );
        });

        return employer;
      });

      const employersSorted = employers.sort(({ count: countA }, { count: countB })=> countB - countA);
      const industries = Array.from(industriesMap).map(([,industry])=>industry).sort(({ count: countA }, { count: countB })=> countB - countA);
      const industriesMain = Array.from(industriesMainMap).map(([,industry])=>industry).sort(({ count: countA }, { count: countB })=> countB - countA);

      return [employersSorted, industries, industriesMain];
    }, [employersSelected],
  );
  const { data, refetch, isFetching } = useGetEmployerById(employersSelectedSorted.length > 0 && employerIndex >= 0 ? employersSelectedSorted[employerIndex].id : -1, false);

  const updateEmployersSelected = useCallback(()=> {
    const employerIndustriesMain = new Map<string, TIndustry[]>();
    Array.from(employersIndustries).forEach(([employerId, industries])=> {
      const employerIndustriesMainSet = new Set<string>();
      const industriesMain = industries.map(({ id })=> {
        const mainId = id.replaceAll(/(\d+)\..+/gm, '$1');
        const industryMain = savedIndustries?.find(({ id:savedMainId })=>savedMainId === mainId);

        if (!industryMain || employerIndustriesMainSet.has(mainId)) {
          return;
        }
        employerIndustriesMainSet.add(mainId);

        return { id: industryMain.id, name: industryMain.name };
      }).filter((industryMain)=> industryMain) as TIndustry[];
      employerIndustriesMain.set(employerId, industriesMain);
    });

    Array.from(employersIndustries).forEach(([employerId, industries])=> {
      const industriesMain = employerIndustriesMain.get(employerId);
      const employerSelected = employersSelected.get(employerId);
      if (employerSelected) {
        employersSelected.set(employerId, { ...employerSelected, industries, industriesMain });
      }
    });

    setEmployersSelected(employersSelected);
  }, [employersIndustries, employersSelected, savedIndustries, setEmployersSelected]);

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
  
  return { employersSelectedSorted, industriesSorted, industriesMainSorted, isFetching, getEmployersIndustries };
};