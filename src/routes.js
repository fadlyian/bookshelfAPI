const {
    addBookHandler,
    getAllBooksHandler,
} = require("./handler");

const routes = [
    {
        method: 'GET',
        path:'/hello',
        handler: () => {
            return 'Hello World!';
        }
    },
    {
        method: 'POST',
        path:'/books',
        handler: addBookHandler,
    },
    {
        method : 'GET',
        path :'/books',
        handler : getAllBooksHandler,
    }
]

module.exports = routes;