const express = require('express');
const createError = require('http-errors')
const logger = require('signale').scope('app');
var favicon = require('serve-favicon');
const path = require('path');

const indexRouter = require('./routes/index');

const app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/pingman', indexRouter);

// catch 404
app.use((req, res, next) => {
	next(createError(404, 'Not Found'));
});

// error handler
app.use((err, req, res) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({
    message: err.message,
    status: err.status,
	});
});

module.exports = app;