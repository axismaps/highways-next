import '@testing-library/jest-dom/extend-expect';
import { cache } from 'swr';

afterEach(() => {
  cache.clear();
});
