import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import rootSaga from './sagas/rootSaga';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const createSagaMiddleware = require('redux-saga').default;

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
      sagaMiddleware,
    ),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
