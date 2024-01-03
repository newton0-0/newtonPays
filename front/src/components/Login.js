import {Grid} from "@mui/material";
import { useState } from "react";

const Login = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone: phone,
                password: password
            })
        })
        const data = await res.json();
        console.log(res);

        if(!res.ok) {
            alert(data.message);
        }
        const authToken = await res.header.authorization;
        console.log("token", authToken);

        localStorage.setItem('username', phone);
        // localStorage.setItem('authToken', res.header.authorization);

        window.location.assign('/dashboard');
    }

    return(
        <div className="loginPage">
            <form>
                <h3>Login</h3>
                <Grid item xs={18} className="loginform" justifyContent="center">
                    <Grid container spacing={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <label>
                            Phone:
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </label>
                    </Grid>
                    <Grid container spacing={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <label>
                            Password:
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                    </Grid>
                    <Grid container xs={15}><button onClick={e => handleLogin(e)}>Submit</button></Grid>
                </Grid>
            </form>
        </div>
    )
}

export default Login;