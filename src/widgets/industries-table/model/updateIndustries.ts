import { useCallback } from 'react';
import { TIndustry, useLSEmployersSelected } from '@/entities/employers-selected';
import { useLSIndustries, useLSIndustriesMain } from '@/entities/industries/model/local-storage';

type TIndustryStat = TIndustry & { countEmployers: number, countVacancies: number };

export const useUpdateIndustries = () => {
  const [employersSelected] = useLSEmployersSelected();
  const [, setIndustries] = useLSIndustries();
  const [, setIndustriesMain] = useLSIndustriesMain();

  return useCallback(
    ()=> {
      const industriesMap = new Map<string, TIndustryStat>();
      const industriesMainMap = new Map<string, TIndustryStat>();

      // TODO: Array.from -> map.entries().next()
      Array.from(employersSelected).forEach(([,employer])=>{
        employer.industries?.forEach((industry)=>{
          const industryStat: TIndustryStat = industriesMap.get(industry.id) ?? { ...industry, countEmployers: 0, countVacancies: 0 };
          industriesMap.set(industry.id, { ...industryStat, countEmployers: industryStat.countEmployers + 1, countVacancies: industryStat.countVacancies + employer.count }  );
        });
        employer.industriesMain?.forEach((industry)=>{
          const industryStat: TIndustryStat = industriesMainMap.get(industry.id) ?? { ...industry, countEmployers: 0, countVacancies: 0 };
          industriesMainMap.set(industry.id, { ...industryStat, countEmployers: industryStat.countEmployers + 1, countVacancies: industryStat.countVacancies + employer.count }  );
        });
      });

      const industriesSorted = Array.from(industriesMap).map(([,industry])=>industry).sort(({ countVacancies: countA }, { countVacancies: countB })=> countB - countA);
      const industriesMainSorted = Array.from(industriesMainMap).map(([,industry])=>industry).sort(({ countVacancies: countA }, { countVacancies: countB })=> countB - countA);

      setIndustries(industriesSorted);
      setIndustriesMain(industriesMainSorted);
    }, [employersSelected, setIndustries, setIndustriesMain],
  );
};