import {
  patchState,
  signalStoreFeature,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';

import { CustomerApiItem } from '../services/customer-api';
const SORT_KEYS: (keyof Pick<
  CustomerApiItem,
  'name' | 'company' | 'lastContacted'
>)[] = ['lastContacted', 'company', 'name'];

export type SortKeys = (typeof SORT_KEYS)[number];

export function withCustomerSorting() {
  return signalStoreFeature(
    withProps(() => {
      return {
        sortingOptions: SORT_KEYS,
      };
    }),
    withState({
      sortBy: 'lastContacted' as SortKeys,
    }),
    withMethods((store) => {
      return {
        setSortBy: (sortBy: SortKeys) => patchState(store, { sortBy }),
      };
    }),
  );
}

export function sortText(key: SortKeys) {
  return (a: CustomerApiItem, b: CustomerApiItem): number => {
    const aValue = a[key]!;
    const bValue = b[key]!;
    if (aValue === bValue) return 0;
    if (aValue > bValue) return 1;
    return -1;
  };
}

export function sortDate(key: SortKeys) {
  return (a: CustomerApiItem, b: CustomerApiItem): number => {
    const aValue = a[key];
    const bValue = b[key];
    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return -1;
    if (bValue === undefined) return 1;
    return new Date(aValue).getTime() - new Date(bValue).getTime();
  };
}
