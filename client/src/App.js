import React, { useEffect, useState } from 'react'
import Calender from "./Components/Calender/Calender"
import Header from "./Components/Header/Header";
import './App.css';
import Login from "./Components/Login/Login";
import { auth,db } from "./firebase";
import { useStateValue } from "./Context/StateProvider";
import CircularProgress from '@material-ui/core/CircularProgress';

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [installable, setInstallable] = useState(false);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [loadingCalender,setLoadingCalender]=useState(false);

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
    db.collection('events')
      .onSnapshot((snapshot => {
        setCurrentEvents(snapshot.docs.map(
          doc => doc.data()
        ))
        setLoadingCalender(true)
      }))
  }, [])
    

  const handleInstall = () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    promptEvent.userChoice.then((result) => {
      // Reset the deferred prompt variable, since
      // prompt() can only be called once.
      window.deferredPrompt = null;
      // Hide the install button.
      setInstallable(false)
    });

  }

  return (
    <div className="App">
      {user ? <><Header user={user} installable={installable} handleInstall={handleInstall} />
        {loadingCalender?<Calender currentEvents={currentEvents}/>:<CircularProgress />}</> : <Login />}
    </div>
  );
}

export default App;
