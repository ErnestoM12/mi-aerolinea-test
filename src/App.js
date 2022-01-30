import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Reservations from './components/Reservations'
import Home from './components/Home'
import About from './components/About'


const App = () => {
  return (
    <BrowserRouter className="main">
      <Header />
      <Route path="/" component={Home} exact />
      <Route path="/about" component={About} exact />
      <Route path="/reservations" component={Reservations} exact />
      <Footer />
    </BrowserRouter>
  )
}


export default App;
