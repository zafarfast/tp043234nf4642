import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';


import HomePage from './components/homePage'
import Login from './components/login'
import Signup from './components/signup'
import UserHome from './components/userHome';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path = '/' element={<HomePage />}/>
        <Route path = '/login' element={<Login />}/>
        <Route path = '/signup' element={<Signup />}/>
        <Route path = '/userhome' element={<UserHome />}/>
      </Routes>
    </BrowserRouter>
   </ApolloProvider>
  );
}

export default App;
