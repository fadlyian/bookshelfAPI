<h1>bookshelfAPI</h1>

<h3>API dapat menyimpan buku</h3>
1. API harus dapat menyimpan buku melalui route: <br/>
    Method : POST <br/>
    URL : /books <br/>
    Body Request: <br/>

```javascript
    {
        "name": string,
        "year": number,
        "author": string,
        "summary": string,
        "publisher": string,
        "pageCount": number,
        "readPage": number,
        "reading": boolean
    }
```
2. Objek buku yang disimpan pada server memiliki struktur seperti contoh di bawah ini: <br/> 
```javascript
    {
        "id": "Qbax5Oy7L8WKf74l",
        "name": "Buku A",
        "year": 2010,
        "author": "John Doe",
        "summary": "Lorem ipsum dolor sit amet",
        "publisher": "Dicoding Indonesia",
        "pageCount": 100,
        "readPage": 25,
        "finished": false,
        "reading": false,
        "insertedAt": "2021-03-04T09:11:44.598Z",
        "updatedAt": "2021-03-04T09:11:44.598Z"
    }
```
3. Properti yang ditebalkan diolah dan didapatkan di sisi server. Berikut penjelasannya:
<br/><br/>
    - id : nilai id string yang unik. Untuk membuat nilai unik, _Saya memanfaatkan **nanoid**._
<br/><br/>
    - finished : merupakan properti boolean yang menjelaskan apakah buku telah selesai dibaca atau belum. Nilai finished didapatkan dari observasi **pageCount === readPage**.
<br/><br/>
    - insertedAt : merupakan properti yang menampung tanggal dimasukkannya buku. Anda menggunakan **new Date().toISOString()** untuk menghasilkan nilainya.
<br/><br/>
    - updatedAt : merupakan properti yang menampung tanggal diperbarui buku. Ketika buku baru dimasukkan, beri nilai properti ini sama dengan **insertedAt**.
<br/><br/>
4. Server harus merespons gagal bila:\
    - Client tidak melampirkan properti namepada request body. Bila hal ini terjadi, maka server akan merespons dengan: <br/>
        Status Code : 400 <br/>
        Response Body: <br/>
```javascript
        {
	   "status": "fail",
	   "message": "Gagal menambahkan buku. Mohon isi nama buku"
    	}
```
    - Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount. Bila hal ini terjadi, maka server akan merespons dengan: <br/>
    	Status Code : 400 <br/>
	Response Body: <br/>
```javascript
	{
	  "status": "fail",
	  "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    	}
```
    - Server gagal memasukkan buku karena alasan umum (generic error). Bila hal ini terjadi, maka server akan merespons dengan: <br/>
    	Status Code : 500 <br/>
    	Response Body: <br/>
```javascript
    	{
           "status": "error",
           "message": "Buku gagal ditambahkan"
    	}
```
