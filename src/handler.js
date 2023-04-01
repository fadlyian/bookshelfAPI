const books = require("./books");
const {nanoid} = require("nanoid");

const addBookHandler = (request, h) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

    if(!name){
        const response = h.response({
            status : 'fail',
            message : 'Gagal menambahkan buku. Mohon isi nama buku',
        })
        response.code(400);
        return response;
    }

    if(pageCount < readPage){
        const response = h.response({
            status : 'fail',
            message : 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400);
        return response;
    }

    const id = nanoid(16);
    const finished = (readPage == pageCount)? true : false;
    const insertedAt = new Date().toISOString();
    const updateAt = insertedAt;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updateAt,
    }

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;
    // const nameSuccess = books.filter((book) => book.nama === null);

    if(isSuccess){
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            }
        })

        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan'
    });
    response.code(500);
    return response;
}

const getAllBooksHandler = (request, h) => {
    const {name, reading, finished} = request.query;

    if(books.length > 0){
        let booksWithFilter = books;

        if(name){
            booksWithFilter = booksWithFilter.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
        }

        if(reading){
            booksWithFilter = booksWithFilter.filter((book) => book.reading == Number(reading));
        }

        if(finished){
            booksWithFilter = booksWithFilter.filter((book) => book.finished == Number(reading));
        }

        const response = h.response({
            status : 'success',
            data : {
                books: booksWithFilter.map((book) => ({
                    id : book.id,
                    name : book.name,
                    publisher : book.publisher,
                }))
            }
        })
        response.code(200);
        return response;
    }else{
        const response = h.response({
            status: 'success',
            data : {
                books: []
            }
        })
        response.code(200);
        return response;
    }
}

const getDetailBookByIdHandler = (request, h) => {
    const {id} = request.params;

    console.log(books.id);

    const book = books.filter((book) => book.id == id)[0];

    if(book){
        const response = h.response({
            status: 'success',
            data :{
                book
            }
        })
        response.code(200);
        return response;
    }
    
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    })

    response.code(404);
    return response;

}

const editBookByIdHandler = (request, h) => {
    const {id} = request.params;

    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
    const index = books.findIndex((book) => book.id === id);

    if(index !== -1){
        
        if(!name){
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
            })
    
            response.code(400);
            return response;
        }   

        if(pageCount < readPage){
            const response = h.response({
                status : 'fail',
                message : 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
            })
            response.code(400);
            return response;
        }

        const finished = (pageCount==readPage)?true:false;
        const updateAt = new Date().toISOString();
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updateAt,
        }
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        })
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    })
    response.code(404);
    return response;

}

const deleteBooksById = (request, h) => {
    const {id} = request.params;

    const index = books.findIndex((book) => book.id === id)[0];

    if(index != 1){
        books.splice(index,1);
        const response = h.response({
            status : 'success',
            message : 'Buku berhasil dihapus',
        })
        response.code(200);
        return response;
    }

    const response = h.response({
        status : 'fail',
        message : 'Buku gagal dihapus. Id tidak ditemukan',
    })
    response.code(404);
    return response;
}

module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getDetailBookByIdHandler,
    editBookByIdHandler,
    deleteBooksById,
};