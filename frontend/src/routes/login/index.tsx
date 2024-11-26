import { h } from "preact";
import style from "./style.module.css";
import background from "../../assets/imgs/manchester.png";
import { useCallback, useState } from "preact/hooks";

const Login = ({ setAuthenticated } : { setAuthenticated: (jwt: string) => void } ) => {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [_, setLoading] = useState<boolean>(false)
    const version = '0.0.1'

    const login = useCallback((username: string, password: string) => {
        if (!username || !password) {
            return
        }
        
        setLoading(true)

        fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }),
        }).then(async(response) => {
            console.log('Response:', response)

            if (response.status !== 200) {
                setLoading(false)
                setError('Error: Invalid username or password')
                return
            }

            const json = await response.json()
            setLoading(false)
            setAuthenticated(json.access_token)
           
        }).catch((error) => {
            setLoading(false)
            setError('Error: Invalid username or password')
            console.log('Error!', error)
        });
    }, [setAuthenticated])

    return (
        <div class={style.container} >
            <div class={style.login}>
                <div class={style.loginLayout}>
                    <div class={style.title}>
                        <h1>GeoTAM</h1>
                        <h2>Login</h2>
                    </div>
                    <form onSubmit={(event)=> {
                        event.preventDefault();
                        login(username, password)
                    }}>
                        <div class={style.inputsContainer}>
                            
                            <div class={style.inputs}>
                                <label>Email</label>
                                <input
                                    required 
                                    onChange={(event) => {
                                        setUsername(event?.currentTarget?.value)
                                    }} 
                                />
                            </div >
                            <div class={style.inputs}>
                                <label>Password</label>
                                <input   
                                type="password" onChange={(event) => {
                                    setPassword(event?.currentTarget?.value)
                                }} />
                            </div>
                        </div>
                        <div >
                            {error && <div class={style.error}>{error}</div>}
                            <button class={style.loginButton} disabled={!username || !password}>
                                Login
                            </button>

                            <p>v{version}</p>
                        </div>
                    </form>
                </div>
           
            </div>
            <div class={style.filter} style={{  backgroundImage: `url(${background})` }} />
        </div>
    );
};

export default Login;
  