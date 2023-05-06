import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom'

import HomePage from './components/homePage'
import Login from './components/login'
import Signup from './components/signup'
import UserHome from './components/userHome';
import UserProfile from './components/userProfile';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:3005/graphql',
})

const client = new ApolloClient({

  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/userhome' element={<UserHome />} />
          <Route path='/userProfile' element={<UserProfile />} />
        </Routes>
      </HashRouter>
     </ApolloProvider>
  );
}

export default App;
