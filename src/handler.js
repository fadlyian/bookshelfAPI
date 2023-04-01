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
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                booksId: id,
            }
        })

        response.code(201);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Buku gagal ditambahkan"
    });
    response.code(500);
    return response;
}

module.exports = {
    addBookHandler,
};