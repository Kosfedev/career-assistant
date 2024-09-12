import { TTabName } from './types';

export const tabsConfig: { value: TTabName, text: string }[] = [
  { value: 'All', text: 'Все' },
  { value: 'Filtering', text: 'Отбор' },
  { value: 'High', text: 'Высокий интерес' },
  { value: 'Medium', text: 'Средний интерес' },
  { value: 'Low', text: 'Низкий интерес' },
  { value: 'Offers', text: 'Оферы' },
  { value: 'Archive', text: 'Архив' },
];

export const DEFAULT_TAB_NAME = tabsConfig[0].value;

