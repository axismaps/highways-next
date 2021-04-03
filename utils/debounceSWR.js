import useSWR from 'swr';

import useDebounce from './useDebounce';

const debounceSWR = (year, url, fetcher) => {
  const debouncedYear = useDebounce(year, 500);
  return useSWR(debouncedYear ? `${url}?year=${debouncedYear}` : null, fetcher);
};

export default debounceSWR;
