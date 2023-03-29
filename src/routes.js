const routes = [
    {
        method: 'GET',
        path:'/hello',
        handler: (request, h) => {
    
          return 'Hello World!';
        }
    },
]

module.exports = routes;