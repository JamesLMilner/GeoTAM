import { h } from "preact";
 
// Code-splitting is automated for `routes` directory
import Login from "../routes/login";
import { useEffect, useState } from "preact/hooks";
import Dashboard from "../routes/dashboard";
 
const App = () => {

  const [loading, setLoading] = useState<boolean>(true)
  const [authenticated, setAuthenticated] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)

    fetch("http://localhost:3000/api/auth/check", {
        method: "GET",
    }).then((response) => {
        setLoading(false)
        if (response.status === 200) {
          setAuthenticated(true)
          console.log('Success!', response)
        } else {
          setAuthenticated(false)
        }
    }).catch((error) => {
        setLoading(false)
        setAuthenticated(false)
        console.log('Error!', error)
    });
  }, [])

  return <div id="app">
    {
      loading ? <div /> : !authenticated ? 
      <Login setAuthenticated={(auth: boolean) => setAuthenticated(auth)} /> :
      <Dashboard />
    } 
  </div>
}

export default App;
