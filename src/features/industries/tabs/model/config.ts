import { TTabName } from './types';

export const tabsConfig: { value: TTabName, text: string }[] = [{ value: 'Main', text: 'Основные' }, { value: 'Specific', text: 'Конкретные' }];

export const DEFAULT_TAB_NAME = tabsConfig[0].value;

