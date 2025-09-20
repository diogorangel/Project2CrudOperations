// routes/books.js
const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');

/**
 * @swagger
 * tags:
 * - name: Books
 * description: API para gerenciar livros
 * components:
 * schemas:
 * Book:
 * type: object
 * required:
 * - title
 * - author
 * properties:
 * id:
 * type: string
 * description: O ID gerado do livro
 * title:
 * type: string
 * description: O título do livro
 * author:
 * type: string
 * description: O nome do autor
 * isbn:
 * type: string
 * description: O ISBN do livro
 * published_date:
 * type: string
 * format: date
 * description: A data de publicação do livro
 * genre:
 * type: string
 * description: O gênero do livro
 * pages:
 * type: integer
 * description: O número de páginas
 * publisher:
 * type: string
 * description: A editora
 * language:
 * type: string
 * description: O idioma do livro
 * example:
 * id: 60d0fe4f5311236168a109ca
 * title: The Lord of the Rings
 * author: J.R.R. Tolkien
 * isbn: "9780618053267"
 * published_date: "1954-07-29"
 * genre: "Fantasy"
 * pages: 1178
 * publisher: "Allen & Unwin"
 * language: "English"
 *
 * /books:
 * get:
 * summary: Retorna a lista de todos os livros
 * tags: [Books]
 * responses:
 * '200':
 * description: A lista de livros
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Book'
 * post:
 * summary: Cria um novo livro
 * tags: [Books]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Book'
 * responses:
 * '201':
 * description: O livro foi criado com sucesso.
 * '500':
 * description: Algum erro ocorreu.
 *
 * /books/{id}:
 * get:
 * summary: Retorna um livro por ID
 * tags: [Books]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: O ID do livro
 * responses:
 * '200':
 * description: O livro solicitado
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Book'
 * '404':
 * description: O livro não foi encontrado.
 * put:
 * summary: Atualiza um livro por ID
 * tags: [Books]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: O ID do livro
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Book'
 * responses:
 * '200':
 * description: O livro foi atualizado.
 * '404':
 * description: O livro não foi encontrado.
 * delete:
 * summary: Deleta um livro por ID
 * tags: [Books]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: O ID do livro
 * responses:
 * '200':
 * description: O livro foi excluído com sucesso.
 * '404':
 * description: O livro não foi encontrado.
 */

router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getSingleBook);
router.post('/', booksController.createBook);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;