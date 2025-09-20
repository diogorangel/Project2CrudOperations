// routes/authors.js
const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');

/**
 * @swagger
 * tags:
 * - name: Authors
 * description: API para gerenciar autores
 * components:
 * schemas:
 * Author:
 * type: object
 * required:
 * - name
 * properties:
 * id:
 * type: string
 * description: O ID gerado do autor
 * name:
 * type: string
 * description: O nome do autor
 * bio:
 * type: string
 * description: A biografia do autor
 * birth_date:
 * type: string
 * format: date
 * description: A data de nascimento do autor
 * example:
 * id: 60d0fe4f5311236168a109cb
 * name: J.R.R. Tolkien
 * bio: John Ronald Reuel Tolkien CBE FRSL was an English writer...
 * birth_date: 1892-01-03
 *
 * /authors:
 * get:
 * summary: Retorna a lista de todos os autores
 * tags: [Authors]
 * responses:
 * '200':
 * description: A lista de autores
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Author'
 * post:
 * summary: Cria um novo autor
 * tags: [Authors]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Author'
 * responses:
 * '201':
 * description: O autor foi criado com sucesso.
 * '500':
 * description: Algum erro ocorreu.
 *
 * /authors/{id}:
 * get:
 * summary: Retorna um autor por ID
 * tags: [Authors]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: O ID do autor
 * responses:
 * '200':
 * description: O autor solicitado
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Author'
 * '404':
 * description: O autor não foi encontrado.
 * put:
 * summary: Atualiza um autor por ID
 * tags: [Authors]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: O ID do autor
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Author'
 * responses:
 * '200':
 * description: O autor foi atualizado.
 * '404':
 * description: O autor não foi encontrado.
 * delete:
 * summary: Deleta um autor por ID
 * tags: [Authors]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: O ID do autor
 * responses:
 * '200':
 * description: O autor foi excluído com sucesso.
 * '404':
 * description: O autor não foi encontrado.
 */

router.get('/', authorsController.getAllAuthors);
router.get('/:id', authorsController.getSingleAuthor);
router.post('/', authorsController.createAuthor);
router.put('/:id', authorsController.updateAuthor);
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;