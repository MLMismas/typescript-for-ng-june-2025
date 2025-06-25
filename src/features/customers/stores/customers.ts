import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { CustomerApiItem, CustomersApi } from '../services/customer-api';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, tap } from 'rxjs';
import { setIsLoaded, withApiState } from './api-state-feature';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import {
  sortDate,
  sortText,
  withCustomerSorting,
} from './customer-sort-feature';

export const CustomersStore = signalStore(
  withDevtools('Customers'),
  withEntities<CustomerApiItem>(),
  withApiState(),
  withCustomerSorting(),
  withComputed((store) => {
    return {
      sortedList: computed(() => {
        const entities = store.entities();
        const sortingBy = store.sortBy();
        if (sortingBy !== 'lastContacted') {
          return entities.toSorted(sortText(sortingBy));
        } else {
          return entities.toSorted(sortDate(sortingBy));
        }
      }),
      homeStats: computed(() => {
        const entities = store.entities();
        return {
          total: entities.length,
          outOfDate: entities.filter(({ lastContacted }) => {
            if (!lastContacted) return true;
            const lastConctatedDate = new Date(lastContacted);
            const today = new Date();
            const diffTime = today.getTime() - lastConctatedDate.getTime();
            const diffDays = diffTime / (1000 * 3600 * 24);
            return diffDays > 14;
          }).length,
        };
      }),
    };
  }),
  withMethods((store) => {
    const service = inject(CustomersApi);
    return {
      load: rxMethod<void>(
        exhaustMap(() =>
          service
            .getCustomers()
            .pipe(
              tap((customers) =>
                patchState(store, setEntities(customers), setIsLoaded()),
              ),
            ),
        ),
      ),
    };
  }),
  withHooks({
    onInit(store) {
      store.load();
      console.log('the store was created');
    },
    onDestroy(store) {
      console.log('the store was destroyed');
    },
  }),
);
