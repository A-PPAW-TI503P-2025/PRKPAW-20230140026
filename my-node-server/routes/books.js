const express = require('express');
const router = express.Router();

let books = [
	{id: 1, title: 'Book 1', author: 'Author 1'},
	{id: 2, title: 'Book 2', author: 'Author 2'}
];

router.get('/', (req, res) => {
	res.json(books);
});

router.get('/:id', (req, res) => {
	const book = books.find(b => b.id === parseInt(req.params.id));
		if (!book) return res.status(404).send('Book not found');
	res.json(book);
});

router.post('/', (req, res) => {
	const { title, author } = req.body;
		if (!title || !author) {
			return res.status(400).json({ message: 'Title and author are required' });
	}
	const book = {
		id: books.length + 1,
		title,
		author
	};
		books.push(book);
	res.status(201).json(book);
});

router.put('/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

    const { title, author } = req.body;
    
    // Panggilan fungsi sekarang sudah didefinisikan
    const validationError = validateBook(title, author); 
    if (validationError) {
        return res.status(400).json({ message: validationError }); 
    }

    books[bookIndex].title = title;
    books[bookIndex].author = author;
    
    res.json(books[bookIndex]);
});

router.delete('/:id', (req, res) => {
    const initialLength = books.length;
    books = books.filter(b => b.id !== parseInt(req.params.id));

    if (books.length === initialLength) {
        return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(204).send();
});

module.exports = router;
