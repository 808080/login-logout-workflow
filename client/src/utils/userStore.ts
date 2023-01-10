import { writable } from 'svelte/store';
import type { TStore } from './types';

export const STORAGE_NAME = 'store-user';

const createStore = () => {

  const localStore: TStore = JSON.parse(localStorage.getItem(STORAGE_NAME));

  const { subscribe, set, update } = writable<TStore>(localStore || {
    username: ''
  });

  const methods = {
    clearStorage: () => localStorage.clear(),
    setStorage: (store: TStore) => localStorage.setItem(STORAGE_NAME, JSON.stringify(store))
  };

  return {
    subscribe,
    set,
    update,
    ...methods
  };
}

const Store = createStore();

export default Store;