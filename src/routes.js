const {
    addBookHandler,
    getAllBooksHandler,
    getDetailBookByIdHandler,
    editBookByIdHandler,
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
    },
    {
        method : 'GET', 
        path : '/books/{id}',
        handler : getDetailBookByIdHandler,
    },
    {
        method: 'PUT',
        path : '/books/{id}',
        handler : editBookByIdHandler,
    },
]

module.exports = routes;