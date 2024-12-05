'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore, makePersistor, Persistor } from '.';
import { PersistGate } from 'redux-persist/integration/react';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  const persistRef = useRef<Persistor>();
  if (!storeRef.current || !persistRef.current) {
    storeRef.current = makeStore();
    persistRef.current = makePersistor(storeRef.current);
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate persistor={persistRef.current} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
}
