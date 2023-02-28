export const setToken = (token: string) => {
    localStorage.setItem('user-token', token);
}

export const createHeader = () => {
    let token = localStorage.getItem("user-token");
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");
    return headers
}