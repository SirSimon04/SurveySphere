import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "../pages/AuthPage/authSlice";
import loadingReducer from './loadingSlice'

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducerAuth = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducerAuth,
    loading: loadingReducer
  },
});

const persistor = persistStore(store);

export { store, persistor };
