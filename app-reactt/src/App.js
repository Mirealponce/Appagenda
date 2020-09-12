import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navigation from './components/Navigation'
import CreateUser from './components/CreateUser'
import CreateNote from './components/CreateNote'
import NotesList from './components/NotesList'

function App() {
  return (
    
   <BrowserRouter>
   <Navigation></Navigation>
   <div className="container p-4">
      <Route path="/" exact component={NotesList}></Route>
      <Route path="/edit/:id" component={CreateNote}></Route>
      <Route path="/create" component={CreateNote}></Route>
      <Route path="/user" component={CreateUser}></Route>
      </div>
   </BrowserRouter>
    
  );
}

export default App;
