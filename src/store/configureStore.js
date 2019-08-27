import { createStore,applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers';
import rootSaga from '../sagas/index'

const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    // applyMiddleware(thunk)
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
