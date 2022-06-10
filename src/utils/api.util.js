const APIBase = 'http://localhost:3001/companies';

export const fetchCompanies = () => {
    return new Promise((resolve, reject) => {
        fetch(APIBase)
            .then(res => res.json())
            .then(response => resolve(response))
            .catch(error => reject(error.message));
    });
};