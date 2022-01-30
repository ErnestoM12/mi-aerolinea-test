import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'


//crear variable para la extencion devtools chroms
const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) || (compose);

/////Store/////
const store = createStore(rootReducer,composeEnhancers( applyMiddleware(thunk))
)
export default store







