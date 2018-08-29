import React from 'react'
import ReactDOM from 'react-dom'
import Amplify, { Analytics } from 'aws-amplify'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import indexReducer from './reducers'
import config from './config'

const store = createStore(indexReducer)

Amplify.configure({
  identityPoolId: config.identityPoolId,
  region: config.region,
  identityPoolRegion: config.region,
  userPoolId: config.userPoolId,
  userPoolWebClientId: config.appClient,
  mandatorySignIn: false,
  'aws_appsync_graphqlEndpoint': config.appSyncEndpoint,
  'aws_appsync_region': config.region,
  'aws_appsync_authenticationType': 'AWS_IAM',
})
Analytics.disable()

ReactDOM.render(<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>, document.getElementById('root'))
