const api = 'http://localhost:3000/users';

// Login
export const userLogin = async (username: string, password: string) => {
    let response = await fetch(`${api}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    });
    let data = await response.json();
    return data;
};

// create login
export const createNewUserLogin = async (username: string, email: string, password: string) => {
    let response = await fetch(`${api}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, email, password})
    });
    let data = await response.json();
    return data;
};