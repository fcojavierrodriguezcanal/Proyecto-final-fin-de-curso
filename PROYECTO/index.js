
const express = require('express');
const app = express();
const path = require('path');
const User = require('./models/User');

app.use(express.urlencoded({extended:false}));
app.use(express.json());


const dotenv = require('dotenv');
dotenv.config({ path: './env/.env'});

app.use('/resources',express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

app.set('view engine','ejs');


const bcrypt = require('bcryptjs');


const session = require('express-session');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));



const connection = require('./database/db');


	app.get('/login',(req, res)=>{
		res.render('login');
	})

	app.get('/register',(req, res)=>{
		res.render('register');
	})
	const uploadRoutes = require('./routes/uploadRoutes');

	app.use('/upload', uploadRoutes);
 
  app.get('/images/:imageName', (req, res) => {
	const imageName = req.params.imageName;
	
	res.sendFile(__dirname + '/uploads/' + imageName);
  });

app.post('/register', async (req, res)=>{
	const user = req.body.user;
	const name = req.body.name;
    const rol = req.body.rol;
	const pass = req.body.pass;
	let passwordHash = await bcrypt.hash(pass, 8);
    connection.query('INSERT INTO users SET ?',{user:user, name:name, rol:rol, pass:passwordHash}, async (error, results)=>{
        if(error){
            console.log(error);
        }else{            
			res.render('register', {
				alert: true,
				alertTitle: "Registration",
				alertMessage: "Registro completado, Bienvenido a artHUB",
				alertIcon:'success',
				showConfirmButton: false,
				timer: 1500,
				ruta: ''
			});
                 
        }
	});
})




app.post('/auth', async (req, res) => {
	const user = req.body.user;
	const pass = req.body.pass;
	if (user && pass) {
	  connection.query('SELECT * FROM users WHERE user = ?', [user], async (error, results, fields) => {
		if (results.length === 0 || !(await bcrypt.compare(pass, results[0].pass))) {
		  res.render('login', {
			alert: true,
			alertTitle: 'Error',
			alertMessage: 'Usuario y/o contraseña incorrectas',
			alertIcon: 'error',
			showConfirmButton: true,
			timer: false,
			ruta: 'login',
		  });
		} else {
		  req.session.loggedin = true;
		  req.session.name = results[0].name;
		  res.render('login', {
			alert: true,
			alertTitle: 'Conexión exitosa',
			alertMessage: 'Bienvenido a ArtHUB',
			alertIcon: 'success',
			showConfirmButton: false,
			timer: 1500,
			ruta: '',
		  });
		}
	  });
	} else {
	  res.send('Por favor, introduzca un usuario o contraseña correctos');
	}
  });


app.get('/', (req, res) => {
	if (req.session.loggedin) {
	  const username = req.session.name;
	  connection.query('SELECT * FROM users WHERE user = ?', [username], (error, results) => {
		if (error || results.length === 0) {
		  res.render('index', {
			login: false,
			name: 'Debe iniciar sesión',
		  });
		} else {
		  const user = results[0];
		  res.render('index', {
			login: true,
			name: req.session.name,
			rol: user.rol,
		  });
		}
	  });
	} else {
	  res.render('index', {
		login: false,
		name: 'Debe iniciar sesión',
		rol: '',
	  });
	}
  });


app.get('/upload', (req, res) => {
	if (req.session.loggedin) {
	  const username = req.session.name;
	  connection.query('SELECT * FROM users WHERE user = ?', [username], (error, results) => {
		if (error || results.length === 0) {
		  res.render('index', {
			login: false,
			name: 'Debe iniciar sesión',
		  });
		} else {
		  const user = results[0];
		  if (user.rol === 'dibujante') {
			res.render('upload');
		  } else {
			res.render('index', {
			  login: true,
			  name: req.session.name,
			  rol: user.rol,
			});
		  }
		}
	  });
	} else {
	  res.render('index', {
		login: false,
		name: 'Debe iniciar sesión',
	  });
	}
  });
app.get('/', (req, res)=> {
	if (req.session.loggedin) {
	  res.render('index', {
		login: true,
		name: req.session.name,
		rol: req.session.rol  
	  });    
	} else {
	  res.render('index', {
		login: false,
		name: 'Debe iniciar sesión',
		rol: ''  
	  });       
	}
	res.end();
  });
  app.get('/contacto', (req, res) => {
	res.render('contacto');
  });

const galleryRoutes = require('./routes/galleryRoutes');

app.use('/', galleryRoutes);

app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/logout', function (req, res) {
	req.session.destroy(() => {
	  res.redirect('/') 
	})
});


app.listen(3000, (req, res)=>{
    console.log('SERVER RUNNING IN http://localhost:3000');
})