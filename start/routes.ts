import Route from '@ioc:Adonis/Core/Route'
// Home
Route.on('/').render('home').as('home').middleware('checkAuth')

// Products
Route.on('/products').render('products').as('products').middleware('checkAuth')

// Auth
Route.on('/login').render('login').as('login.form')

Route.post('/login', 'AuthController.login').as('user.login')

Route.get('/logout', 'AuthController.logout').as('user.logout').middleware('auth')

// Register
Route.on('/register').render('register').as('register.form')

Route.post('/register', 'UsersController.create').as('user.create')

// Profile
Route.on('/profile').render('profile').as('user.profile').middleware('auth')
