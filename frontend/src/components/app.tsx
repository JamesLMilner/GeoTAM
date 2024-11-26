import { h } from "preact";
 
// Code-splitting is automated for `routes` directory
import Login from "../routes/login";
import { useEffect, useState } from "preact/hooks";
import Dashboard from "../routes/dashboard";
 
const App = () => {

  const [loading, setLoading] = useState<boolean>(true)
  const [authenticated, setAuthenticated] = useState<string>('')

  useEffect(() => {
    if (authenticated) {
      localStorage.setItem('jwt', authenticated)
    }

    if (!authenticated && localStorage.getItem('jwt')) {
      setAuthenticated(localStorage.getItem('jwt') as string);
    }

  }, [authenticated])

  useEffect(() => {
    setLoading(true)

    fetch("http://localhost:3000/api/auth/check", {
        method: "GET",
    }).then((response) => {
        setLoading(false)
        if (response.status !== 200) {
          setAuthenticated('')
        }
    }).catch((error) => {
        setLoading(false)
        setAuthenticated('')
        console.log('Error!', error)
    });
  }, [])

  return <div id="app">
    {
      loading ? <div /> : !authenticated ? 
      <Login setAuthenticated={(jwt: string) => setAuthenticated(jwt)} /> :
      <Dashboard authenticated={authenticated} />
    } 
  </div>
}

export default App;
