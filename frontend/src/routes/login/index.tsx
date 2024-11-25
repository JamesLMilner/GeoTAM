import { h } from "preact";
import style from "./style.module.css";
import background from "../../assets/imgs/manchester.png";
import { useCallback, useState } from "preact/hooks";

const Login = ({ setAuthenticated } : { setAuthenticated: (auth: boolean) => void } ) => {

    const [username, setUsername] = useState<string>('admin@geotam.xyz')
    const [password, setPassword] = useState<string>('manchestercitycenter')
    const [error, setError] = useState<string>('')
    const [_, setLoading] = useState<boolean>(false)

    const login = useCallback((username: string, password: string) => {
        if (!username || !password) {
            return
        }

        const base64 = btoa(`${username}:${password}`)
        
        setLoading(true)

        fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { Authorization: `Basic ${base64}` },
        }).then((response) => {
            setLoading(false)
            setAuthenticated(true)
            console.log('Success!', response)
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
                                    value={'admin@geotam.xyz'}
                                    required 
                                    onChange={(event) => {
                                        setUsername(event?.currentTarget?.value)
                                    }} 
                                />
                            </div >
                            <div class={style.inputs}>
                                <label>Password</label>
                                <input   
                                value={'manchestercitycenter'}

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
                        </div>
                    </form>
                </div>
           
            </div>
            <div class={style.filter} style={{  backgroundImage: `url(${background})` }} />
        </div>
    );
};

export default Login;
  