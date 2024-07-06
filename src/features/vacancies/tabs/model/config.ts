import { TTabName } from './types';

export const tabsConfig: { value: TTabName, text: string }[] = [
  { value: 'all', text: 'Все' },
  { value: 'filtering', text: 'Отбор' },
  { value: 'high', text: 'Высокий интерес' },
  { value: 'medium', text: 'Средний интерес' },
  { value: 'low', text: 'Низкий интерес' },
  { value: 'offers', text: 'Оферы' },
  { value: 'archive', text: 'Архив' },
];

export const DEFAULT_TAB_NAME = tabsConfig[0].value;

