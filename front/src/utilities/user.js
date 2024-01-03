    const login = async (phone, password) => {
        const res = fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone: phone,
                password: password
            })
        })
        const data = res.json();
        console.log(data);

        if(res.status === 404 || res.status === 400) {
            alert(data.message);
        }
        const authToken = res.headers;
        console.log(authToken.Authorization);

        localStorage.setItem('username', phone);
        localStorage.setItem('authToken', data.headers);
    }

    module.exports = {login}