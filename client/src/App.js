import React, { useEffect, useState } from 'react'
import Header from "./Components/Header/Header"
import './App.css'
import Login from "./Components/Login/Login"
import { auth, db } from "./firebase"
import { useStateValue } from "./Context/StateProvider"
import CircularProgress from '@material-ui/core/CircularProgress'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import MonthView from './Components/Calender/MonthView/MonthView'
import DayView from './Components/Calender/DayView/DayView'
import WeekView from './Components/Calender/WeekView/WeekView'
import Tasks from './Components/Task/Tasks'
import Task from './Components/Task/Task'

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [installable, setInstallable] = useState(false);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [loadingCalender, setLoadingCalender] = useState(false);
  const [currentTasks, setCurrentTasks] = useState([])
  const [loadingTasks, setLoadingTasks] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
    // eslint-disable-next-line
  }, [])

  window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    setInstallable(true)
  });

  useEffect(() => {
    setLoadingCalender(false)
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .collection('events')
        .onSnapshot((snapshot => {
          setCurrentEvents(snapshot.docs.map(
            doc => doc.data()
          ))
          setLoadingCalender(true)
        }))
    }
  }, [user])

  useEffect(() => {
    setLoadingTasks(false)
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .collection('tasks')
        .onSnapshot((snapshot => {
          setCurrentTasks(snapshot.docs.map(
            doc => doc.data()
          ))
          setLoadingTasks(true)
        }))
    }
  }, [user])
  const handleInstall = () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      return;
    }
    promptEvent.prompt();
    promptEvent.userChoice.then((result) => {
      window.deferredPrompt = null;
      setInstallable(false)
    });

  }

  return (
    <div className="App">
      {user ? <>
        {loadingCalender ?
          <Router>
            <Header user={user} installable={installable} handleInstall={handleInstall} />
            <Switch>
              <Route exact path="/" render={() => <MonthView user={user} currentEvents={currentEvents} />} />
              <Route exact path="/month-view" render={() => <MonthView user={user} currentEvents={currentEvents} />} />
              <Route exact path="/day-view" render={() => <DayView user={user} currentEvents={currentEvents} />} />
              <Route exact path="/week-view" render={() => <WeekView user={user} currentEvents={currentEvents} />} />
              <Route exact path="/tasks" render={() => <Tasks tasks={currentTasks} user={user} />} />
              <Route exact path="/task" render={() => <Task tasks={currentTasks } user={user} />} />
            </Switch>
          </Router>
          : <CircularProgress />}</> : <Login />}
    </div>
  );
}

export default App;
