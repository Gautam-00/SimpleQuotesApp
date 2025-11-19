import React, { Fragment } from 'react'
import MainNavigation from './Components/mainNavigation/MainNavigation'
import { Route, Routes } from 'react-router-dom'
import AllQuotes from './Components/pages/AllQuotes'
import NewQuote from './Components/pages/NewQuote'
import ShowQuote from './Components/pages/ShowQuote'

function App() {
  return (
    <Fragment>
      <MainNavigation />
      <Routes>
        <Route path='/' element={ <AllQuotes /> } />
        <Route path='/new' element={ <NewQuote /> } />
        <Route path='/quotes/:id' element={ <ShowQuote /> } />
      </Routes>
    </Fragment>
  )
}

export default App