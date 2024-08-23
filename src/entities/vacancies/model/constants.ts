export const VACANCIES_QUERY_COOKIE_NAME = 'vacancies-query';

export enum EVacancyStatuses {
  'Default',
  'Selection',
  'HighInterest',
  'MediumInterest',
  'LowInterest',
  'Offers',
  'Archive',
}

export const VACANCY_STATUS_NAMES = new Map([
  ['Default', '-'],
  ['Selection', 'отбор'],
  ['HighInterest', 'высокий интерес'],
  ['MediumInterest', 'средний интерес'],
  ['LowInterest', 'низкий интерес'],
  ['Offers', 'оферы'],
  ['Archive', 'архив'],
]);
