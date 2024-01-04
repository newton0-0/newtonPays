import {Grid} from "@mui/material";
import { useState } from "react";

const Login = () => {
    const [loginPhn, setLogin] = useState('');
    const [loginPass, setPass] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [pin, setPin] = useState('');

    const [notNewUser, setNewUser] = useState(true);

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone: loginPhn,
                password: loginPass
            })
        })
        const resData = await res.json();
        console.log(resData);

        if(!res.ok) {
            alert(resData.message);
        }

        localStorage.setItem('username', resData.data.authorization);

        window.location.assign('/');
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        const res = await fetch('/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: name,
                phone: phone,
                email: email,
                password: password,
                pin: pin
            })
        });
        const resData = await res.json();
        if(!res.ok) {
            alert(resData.message);
        }

        alert(resData.message);
        window.location.assign('/');
    }

    return(
        <div className="loginSignupPage">
            <button className="switch" onClick={() => setNewUser(!notNewUser)}>{notNewUser? 'Register' : 'Login'}</button>
            {notNewUser? (<form className="loginPage">
                <h3>Login</h3>
                <Grid item xs={18} className="loginform" justifyContent="center">
                    <Grid container spacing={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <label>
                            Phone:
                            <input type="text" value={loginPhn} onChange={(e) => setLogin(e.target.value)} />
                        </label>
                    </Grid>
                    <Grid container spacing={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <label>
                            Password:
                            <input type="password" value={loginPass} onChange={(e) => setPass(e.target.value)} />
                        </label>
                    </Grid>
                    <Grid container xs={15}><button onClick={e => handleLogin(e)}>Submit</button></Grid>
                </Grid>
            </form>):(
            <form className="loginPage">
                <h3>Register</h3>
                <Grid item xs={18} className="loginform" justifyContent="center">
                    <Grid container spacing={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <label>
                            username:
                            <input type="text" value={name} placeholder="your name here" onChange={(e) => setName(e.target.value)} />
                        </label>
                    </Grid>
                    <Grid container spacing={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <label>
                            phone:
                            <input type="number" value={phone} placeholder="*no country code" onChange={(e) => setPhone(e.target.value)} />
                        </label>
                    </Grid>
                    <Grid container spacing={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <label>
                            e-mail:
                            <input type="text" value={email} placeholder="email address" onChange={(e) => setEmail(e.target.value)} />
                        </label>
                    </Grid>
                    <Grid container spacing={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <label>
                            password:
                            <input type="password" value={password} placeholder="your login password here" onChange={(e) => setPassword(e.target.value)} />
                        </label>
                    </Grid>
                    <Grid container spacing={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <label>
                            PIN:
                            <input type="password" value={pin} placeholder="your transaction PIN here" onChange={(e) => setPin(e.target.value)} />
                        </label>
                    </Grid>
                    <Grid container xs={15}><button onClick={e => handleRegister(e)}>Submit</button></Grid>
                </Grid>
            </form>)}
        </div>
    )
}

export default Login;