import Route from '@ioc:Adonis/Core/Route'

// Home
Route.on('/').render('home').as('home').middleware(['checkAuth', 'verifyEmail'])

// Categories
Route.get('/api/categories', 'CategoriesController.panel').middleware([
  'auth',
  'verifyEmail',
  'isAdmin',
])

Route.post('/api/categories', 'CategoriesController.create').middleware([
  'auth',
  'verifyEmail',
  'isAdmin',
])

// Products
Route.on('/products').render('products').as('products').middleware(['checkAuth', 'verifyEmail'])

Route.get('/api/products', 'ProductsController.panel').middleware([
  'auth',
  'verifyEmail',
  'isAdmin',
])

Route.post('/products', 'ProductsController.create')
  .as('product.create')
  .middleware(['auth', 'verifyEmail', 'isAdmin'])

// Auth
Route.on('/login').render('login').as('login.form')

Route.post('/login', 'AuthController.login').as('user.login')

Route.get('/logout', 'AuthController.logout').as('user.logout').middleware(['auth', 'verifyEmail'])

Route.get('/verify-email', 'AuthController.verifyEmail')

// Register
Route.on('/register').render('register').as('register.form')

Route.post('/register', 'UsersController.create').as('user.create')

// Profile
Route.on('/profile').render('profile').as('user.profile').middleware(['auth', 'verifyEmail'])

// Control-panel
Route.on('/control-panel')
  .render('control-panel')
  .as('control.panel')
  .middleware(['auth', 'verifyEmail', 'isAdmin'])
