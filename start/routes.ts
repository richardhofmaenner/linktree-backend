/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.put('register', 'v1/RegistersController.store')
  Route.post('login', 'v1/AuthController.create').middleware(['guest'])
  Route.get('logout', 'v1/AuthController.destroy').middleware(['isLoggedIn'])
  Route.get('auth/info', 'v1/AuthController.show')

  Route.group(() => {
    Route.get('/', 'v1/LinksController.index')
    Route.put('/', 'v1/LinksController.store')
    Route.delete(':id', 'v1/LinksController.destroy').where('id', /^[0-9]+$/)
    Route.get(':id', 'v1/LinksController.show').where('id', /^[0-9]+$/)
    Route.patch(':id', 'v1/LinksController.update').where('id', /^[0-9]+$/)
  }).prefix('links').middleware(['isLoggedIn'])
}).prefix('v1')
