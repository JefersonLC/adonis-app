import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('home')
})

Route.get('/products', async ({ view }) => {
  return view.render('products')
})

// Login
Route.get('/login', async ({ view }) => view.render('login')).as('login.form')

Route.post('/login', 'UserController.login').as('user.login')

// Register
Route.get('/register', ({ view }) => view.render('register')).as('register.form')

Route.post('/register', 'UsersController.create').as('user.create')

// Route.get('/user', async () => {
//   const user = new User()

//   user.name = 'jeferson'
//   user.email = 'jeff@correo.com'
//   user.password = '12345678'

//   user.save()
// })

// Route.post('/login', async ({ auth, request }) => {
//   const email = request.input('email')
//   const password = request.input('password')
//   await auth.use('web').attempt(email, password)
// })

// Route.get('/profile', async ({ auth }) => {
//   await auth.use('web').authenticate()
//   return {
//     profile: auth.user,
//   }
// })

// Route.get('/logout', async ({ auth, response }) => {
//   await auth.use('web').logout()
//   response.redirect('/login')
// })

// Route.get('/enviar', async ({ request }) => {
//   const userSchema = schema.create({
//     nombre: schema.string({ trim: true }, [rules.minLength(10), rules.required()]),
//     pass: schema.string({}, [rules.minLength(8), rules.required()]),
//   })

//   const messages: CustomMessages = {
//     required: '{{field}} Requerido',
//     minLength: 'minimo {{options.minLength}}',
//   }
//   const payload = await request.validate({ schema: userSchema, messages })

//   return {
//     payload,
//   }
// })

// Route.get('/profile', ({ session, response }) => {
//   const user = session.get('user')
//   if (!user) response.redirect('/')
//   return {
//     user,
//   }
// })

// Route.get('/logout', ({ session, response }) => {
//   const user = session.get('user')
//   if (user) {
//     session.forget('user')
//     console.log('sesion cerrada')
//   }
//   response.redirect('/')
// })
