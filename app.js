const express = require('express');
const app = express();

const html = require('html-template-tag');

const bodyParser = require('body-parser');

const methodOverride = require('method-override');

app.use(bodyParser.urlencoded());

app.use(methodOverride('_method'));

const {findAllUsers, findUser, createUser, deleteUser} = require('./index.js');

const showAllUsers = users => {

  return html`
  
    <!DOCTYPE html>

    <html lang="en-US">

    <head>
      <title>Wizard Users</title>
      <meta charset="UTF-8">
      <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css">
    </head>
  
    <body>

      <div class="container">

        <h1><a href="/">Wizard Users</a></h1>

        <form method="POST" action="/users">

          <div class="form-group">
            <label>Name</label>
            <input name="name" class="form-control">
          </div>

          <div class="form-group">
            <input class="btn btn-primary" type="submit" value="save">
          </div>

        </form>

        <ul>
          ${users.map(user => {
            return html`
            
              <li>
                <a href="/users/${user.id}" target="_blank">${user.name}</a>
              </li>

              <form method="POST" action="/users/${user.id}?_method=delete">

                <input class="btn btn-warning" type="submit" value="delete">

              </form>
            
            `
          })}

        </ul>

      </div>


    </body>
    </html>
  
  
  `


}

// route: main page
app.get('/', (req, res, next) => {

  // grab all users in an array of objects
  const users = findAllUsers();
  console.log(users);

  // send view (returned HTML from fn above)
  res.send(showAllUsers(users));
});

// route: individual users by id
// ':id' is express syntax for variable
app.get('/users/:id', (req, res, next) => {
  
  // grab express id variable located in req.params.id and dynamicall convert to Number
  const id = +req.params.id;

  // grab user object passing in id
  const user = findUser(id);

  // (in order to use one view with a map fn)
  // set users to an array of one object
  // hence, map fn in view fn above will iterate over just one element
  const users = [user];

  res.send(showAllUsers(users));

});

// route: create a user
app.post('/users', (req, res, next) => {

  // grab name of user entered in form
  const name = req.body.name;

  // create new user with name passed in
  const newUser = createUser(name);

  // set users array to be just that new user for map functionality in view above
  const users = [newUser];
  
  // redirect to home page
  res.redirect('/');
});

app.delete('/users/:id', (req, res, next) => {

  const id = +req.params.id;
  deleteUser(id);
  res.redirect('/');

});













module.exports = app;
