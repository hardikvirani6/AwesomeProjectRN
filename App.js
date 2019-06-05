import React, {Component} from 'react';
import AppNavigator from './src/navigation';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/redux/reducers';
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
        <Provider store={store}>
          <AppNavigator/>
        </Provider>
    );
  }
}
