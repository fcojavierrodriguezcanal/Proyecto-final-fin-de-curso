// 1 - Invocamos a Express
const express = require('express');
const app = express();
const User = require('./models/User');
//2 - Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({extended:false}));
app.use(express.json());//además le decimos a express que vamos a usar json

//3- Invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env'});

//4 -seteamos el directorio de assets
app.use('/resources',express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//5 - Establecemos el motor de plantillas
app.set('view engine','ejs');

//6 -Invocamos a bcrypt
const bcrypt = require('bcryptjs');

//7- variables de session
const session = require('express-session');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


// 8 - Invocamos a la conexion de la DB
const connection = require('./database/db');

//rutas login
	app.get('/login',(req, res)=>{
		res.render('login');
	})

	app.get('/register',(req, res)=>{
		res.render('register');
	})
	const uploadRoutes = require('./routes/uploadRoutes');

	app.use('/upload', uploadRoutes);
  // Ruta para obtener una imagen
  app.get('/images/:imageName', (req, res) => {
	const imageName = req.params.imageName;
	// Aquí puedes buscar la imagen en la base de datos o sistema de archivos y devolverla al usuario
	res.sendFile(__dirname + '/uploads/' + imageName);
  });
//10 - Método para la REGISTRACIÓN
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
            //res.redirect('/');         
        }
	});
})



//11 - Metodo para la autenticacion
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

//12 - Método para controlar que está auth en todas las páginas
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

// Ruta para la página de upload (si el usuario tiene rol "dibujante")
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
		rol: req.session.rol  // Asegúrate de tener esta línea
	  });    
	} else {
	  res.render('index', {
		login: false,
		name: 'Debe iniciar sesión',
		rol: ''  // Asegúrate de tener esta línea
	  });       
	}
	res.end();
  });

// Ruta para la página de upload (si el usuario tiene rol "dibujante")


//función para limpiar la caché luego del logout
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

 //Logout
//Destruye la sesión.
app.get('/logout', function (req, res) {
	req.session.destroy(() => {
	  res.redirect('/') // siempre se ejecutará después de que se destruya la sesión
	})
});


app.listen(3000, (req, res)=>{
    console.log('SERVER RUNNING IN http://localhost:3000');
});