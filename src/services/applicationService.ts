import { createHeader } from "../utils/fetchUtils";
const api = "http://localhost:3000/applications";

export const getApplications = async (userid: string) => {
    const headers = createHeader();
    let response = await fetch(`${api}/${userid}`, {
        method: "GET",
        headers,
    });
    return await response.json();
};

// create new application
export const addNewApplication = async (application: object) => {
    const headers = createHeader();
    let response = await fetch(`${api}`, {
        method: "POST",
        headers,
        body: JSON.stringify(application),
    });
    return await response.json();
};

export const updateApplication = async (id: string, update: object) => {
    const headers = createHeader();
    let response = await fetch(`${api}/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ update }),
    });
    return await response.json();
};

export const removeApplications = async (idsToRemove: Array<string>) => {
    const headers = createHeader();
    let response = await fetch(`${api}`, {
        method: "DELETE",
        headers,
        body: JSON.stringify({ idsToRemove }),
    });
    return await response.json();
};
