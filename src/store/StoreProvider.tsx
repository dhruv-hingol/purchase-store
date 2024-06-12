"use client";

import { PersistGate } from "redux-persist/integration/react";
import store, { persistedStore } from "./rootReducer";
import { Provider } from "react-redux";
export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        {children}
      </PersistGate>
    </Provider>
  );
};
