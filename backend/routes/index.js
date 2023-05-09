const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');
const cardsRouter = require('./cards');
const usersRouter = require('./users');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.all('/*', () => {
  throw new NotFoundError('Ресурс не найден. Проверьте URL и метод запроса');
});

module.exports = router;
