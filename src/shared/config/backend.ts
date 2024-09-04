export const HH_END_POINT = 'https://api.hh.ru';
export const BE_END_POINT = !!process.env.NEXT_PUBLIC_LOCAL ? process.env.NEXT_PUBLIC_BE_ENDPOINT_LOCAL : process.env.NEXT_PUBLIC_BE_ENDPOINT_REMOTE;