const admin = {
    username: "pauljose@live.com",
    apiKey: "secret"
}

const users = [
    {
        username: "alice@live.com",
        apiKey: "833b33fca986eebfc320b23f10eaa1de04c36879"
    }
];

const addUser = (username, apiKey) => {
    users.push({ username, apiKey });
};

const getUser = (username, apiKey) => {
    return users.find((user) => user.username === username && user.apiKey === apiKey);
};

const getUsers = () => {
    return users;
};

const doesUserExist = (username) => {
    if (users.find((user) => user.username === username)) {
        return true;
    } else {     
        return false;
    }
};

const verifyAdmin = (username, apiKey) => {
    return admin.username === username && admin.apiKey === apiKey;
};

const doesAdminExist = (username) => {
    if (admin.username === username) {
        return true;
    } else {     
        return false;
    }
};

export {
    addUser,
    getUser,
    getUsers,
    doesUserExist,
    verifyAdmin,
    doesAdminExist
};