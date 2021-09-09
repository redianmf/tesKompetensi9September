const http = require('http');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const session = require('express-session');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(
  session(
    {
      cookie: {
        maxAge: 1000 * 60 * 60 * 3,
      },
      store: new session.MemoryStore(),
      resave: false,
      saveUninitialized: true,
      secret: 'confidential',
    }
  )
)

app.use(function(req,res,next){
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

const dbConnection = require('./connection/db');


app.set('view engine', 'hbs');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

hbs.registerPartials(__dirname + '/views/partials');


// const isLogin = false;


app.get('/', function (request, response) {
  const title = 'Web Task';
  const query = `SELECT * FROM collections_tb ORDER BY id DESC;`;

  dbConnection.getConnection(function(err,conn){
    if(err) throw err;
    conn.query(query,function(err,results) {
      if (err) throw err;
      const collections = [];

      for(var result  of results){
        collections.push({
          id: result.id,
          name: result.name,
          user_id: result.user_id,
        });
      }

      response.render('index', {
        title,
        isLogin: request.session.isLogin,        
        collections,
      });
    conn.release();
    });
  });

  
});

// app.get('/ffadf', function (request, response) {
//   const user_id = request.params.user_id;
//   const title = 'My Car';
//   const userId = request.session.user.id;
  
//   const query = `SELECT * FROM tb_car WHERE user_id = ${userId};`;

//   dbConnection.getConnection(function(err,conn){
//     if(err) throw err;
//     conn.query(query,function(err,results) {
//       if (err) throw err;
//       const cars = [];

//       for(var result  of results){
//         cars.push({
//           id: result.id,
//           plat_number : result.plat_number,
//           name: result.name,
//           price: result.price,
//           photo: pathImage + result.photo,
//           status: result.status,
//         });
//       }
      
//       response.render('my-car', {
//         title,
//         isLogin: request.session.isLogin,
//         cars,
//       });
    
//     });
//     conn.release();
//   });
// });

app.get('/task-management/:id', function (request, response) {
  const id = request.params.id;
  const title = 'Task Management';
  
  const query = `SELECT * FROM task_tb WHERE collections_id = ${id};`;

  dbConnection.getConnection(function(err,conn){
    if(err) throw err;
    conn.query(query,function(err,results) {
      if (err) throw err;
      
     const tasks = [];

        for(var result  of results){
          collections.push({
            id: result.id,
            name: result.name,
            is_done: result.is_done,
            collections_id: result.collections_id,
          });
        }
      
//       var isContentOwner = false;

//       if(request.session.isLogin){
//         if(request.session.user.id == results[0].user_id){
//           isContentOwner = true;
//         }
//       }

      response.render('task-management', {
        title,
        isLogin: request.session.isLogin,
        tasks,
        // isContentOwner,
      });
    
    });
    conn.release();
  });
});

// app.get('/add-car', function (request, response) {
//   const title = 'Add Car';
//   response.render('addCar', {
//     title,
//     isLogin: request.session.isLogin,
//   });
// });

// app.get('/delete-car/:id', function (request, response) {
//   const {id} = request.params;
//   const query = `DELETE FROM tb_car WHERE id = ${id};`;

//   dbConnection.getConnection(function(err,conn){
//     if(err) throw err;
//     conn.query(query,function(err,results) {
//       if (err) throw err;
//       response.redirect('/');
//     });
//     conn.release();
//   });
// });

// app.get('/rent-car/', function (request, response) {
//   const title = 'Rent Car';
//   response.render('rent-car', {
//     title,
//     isLogin: request.session.isLogin,
//   });
// });

// app.post('/rent-car/:id', function (request, response) {
//   const {id} = request.params;
//   const email = request.session.user.email;
//   console.log(email);
//   console.log(id);
//   const query = `UPDATE tb_car SET status = "Rent Pending by ${email}" WHERE id = ${id} ;`;
  

//   dbConnection.getConnection(function(err,conn){
//     if(err) throw err;
//     conn.query(query,function(err,results) {
//       if (err) throw err;
//       response.redirect('/rent-car');
//     });
//     conn.release();
//   });
// });

app.post('/add-collection', function (request, response) {
  const {name} = request.body;
  const user = request.session.user.id;
 
  if(name == '' ) {
    request.session.message = {
      type: 'warning',
      message: 'Field must be filled!'
    };

    return response.redirect('/register');
  }

  const query = `INSERT INTO collections_tb (name, user_id) VALUES ("${name}", "${user}"); `;
  
  dbConnection.getConnection(function(err,conn){
    if(err) throw err;
    conn.query(query,function(err,results) {
      if (err) throw err;

      request.session.message = {
        type: 'success',
        message: 'Collection added'
      };

      response.redirect('/');
    });
    conn.release();
  });
});

app.get('/register', function (request, response) {
  const title = 'Register';
  response.render('register', {
    title,
    isLogin: request.session.isLogin,
  });
});

app.post('/register', function (request, response) {
  const {email, username, password} = request.body;
 
  if(email == '' || password == '' || username == '' ) {
    request.session.message = {
      type: 'warning',
      message: 'All fields must be filled!'
    };

    return response.redirect('/register');
  }

  const query = `INSERT INTO users_tb (email, username, password) VALUES ("${email}", "${username}", ${password}); `;
  
  dbConnection.getConnection(function(err,conn){
    if(err) throw err;
    conn.query(query,function(err,results) {
      if (err) throw err;

      request.session.message = {
        type: 'success',
        message: 'Register suceed!'
      };

      response.redirect('/register');
    });
    conn.release();
  });
});

app.get('/login', function (request, response) {
  const title = 'Login';
  response.render('login', {
    title,
    isLogin: request.session.isLogin,
  });
});

app.post('/login', function (request, response) {
  const {email, password} = request.body;

  if(email == '' || password == '') {
    request.session.message = {
      type: 'danger',
      message: 'All fields must be filled!'
    };

    return response.redirect('/login');
  }
  const query = `SELECT *, MD5(password) as password FROM users_tb WHERE email = "${email}" AND password = "${password}";`;

  dbConnection.getConnection(function(err,conn){
    if(err) throw err;
    conn.query(query,function(err,results) {
      if (err) throw err;

      if(results.length == 0) {
        request.session.message = {
          type: 'danger',
          message: 'Wrong Email or Password!',
        };
        response.redirect('/login');
      } else {
        request.session.message = {
          type: 'success',
          message: 'You are logged in!',
        };

        request.session.isLogin = true;

        request.session.user = {
          id: results[0].id,
          email: results[0].email,
          username: results[0].username,
        }
        
        var username = request.session.user.name;
        // console.log(username);
        // console.log(request.session.user.status);
        // if(request.session.user.status == 1){
        //   request.session.isAdmin = true;
        // }

      }
      response.redirect('/');
    });
    conn.release();
  });
});

app.get('/logout', function (request, response) {
    request.session.destroy();
    response.redirect('/');
});

const port = 3000;
const server = http.createServer(app);
server.listen(port);
console.debug(`Server listening on port ${port}`);
