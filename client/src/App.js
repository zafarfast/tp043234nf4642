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

// import {setContext} from "@apollo/client/link/context"
import {setContext} from "@apollo/client/link/context"

const httpLink = createHttpLink({
  uri: 'http://localhost:3005/graphql',
})

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('id_token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({

  link: authLink.concat(httpLink),
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
