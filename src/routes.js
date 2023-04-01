const {
    addBookHandler,
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

]

module.exports = routes;