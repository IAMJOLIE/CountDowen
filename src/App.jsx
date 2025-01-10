
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import StartPage from './component/StartPage'
import CountDown from './component/CountDown'

import EventInput from './component/EventInput'
import { useState } from 'react'
import  useEvents  from './Hooks/useEvents'

function App() {
const {events, addEvent, deletEvent }= useEvents();
  return (
    <>
  <Router>
    <Routes>
    <Route path='/' element={<StartPage events={events} deletEvent={deletEvent}/>} />
    <Route path='new-event' element={<EventInput onAddEvent={addEvent}/>} />
    <Route path='countdown/:i' element={<CountDown events={events}/>} />
    </Routes>
  </Router>
    
    </>
  )
}

export default App
