const express = require('express');
const app = express();

// Configurar el middleware para parsear el cuerpo de las solicitudes POST
app.use(express.urlencoded({ extended: true }));

// Almacenar las tareas
let tareas = ['Tarea 1', 'Tarea 2', 'Tarea 3'];

// Configurar el motor de plantillas
app.set('view engine', 'pug');
app.set('views', './views');

// Configurar EJS como motor de plantillas para una ruta específica
app.engine('ejs', require('ejs').renderFile);

// Datos de los usuarios
const usuarios = [
 { id: 1, nombre: 'Patsy', intereses: ['Cine', 'Música', 'Viajes'],edad: 19 },
 { id: 2, nombre: 'Gabriel', intereses: ['Lectura', 'Deportes', 'Viajes'],edad: 21 },
 { id: 3, nombre: 'David', intereses: ['Cocina', 'Tecnología', 'Viajes'],edad: 20 },
 { id: 4, nombre: 'Miguel', intereses: ['Fotografía', 'Música', 'Viajes'],edad: 33 },
];

// Manejar la solicitud POST a /agregar-tarea
app.post('/agregar-tarea', (req, res) => {
 // Obtener la nueva tarea del formulario
 const nuevaTarea = req.body.tarea;

 // Agregar la nueva tarea al array de tareas
 tareas.push(nuevaTarea);

 // Redirigir al usuario a la página de tareas
 res.redirect('/miplantilla-ejs'); // o '/miplantilla-pug' dependiendo de la plantilla que estés usando
});

// Ruta para renderizar la plantilla Pug
app.get('/miplantilla-pug', (req, res) => {
 res.render('miplantilla', { mensaje: '¡Hola desde la plantilla Pug!', tareas: tareas });
});

// Ruta para renderizar la plantilla EJS
app.get('/miplantilla-ejs', (req, res) => {
 res.render('miplantilla.ejs', { mensaje: '¡Hola desde la plantilla EJS!', tareas: tareas });
});

// Ruta para renderizar la plantilla Pug
app.get('/pug', (req, res) => {
 res.render('index', { nombre: 'Usuario Pug', usuarios: usuarios });
});

// Ruta para renderizar la plantilla EJS
app.get('/ejs', (req, res) => {
 res.render('index.ejs', { nombre: 'Usuario EJS', usuarios: usuarios });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
 console.log('Aplicación web dinámica ejecutándose en el puerto 3000');
});

app.use(express.static('public'));

app.get('/perfil/:id', (req, res) => {
 const userId = req.params.id;
 // Buscar el usuario por ID
 const user = usuarios.find(usuario => usuario.id == userId);
 if (user) {
    res.render('perfil', { user: user });
 } else {
    res.status(404).send('Usuario no encontrado');
 }
});

app.get('/multiplicar/:numero', (req, res) => {
    const numero = req.params.numero;
    const tabla = [];
    for (let i = 1; i <= 10; i++) {
       tabla.push({ multiplicador: i, resultado: numero * i });
    }
    res.render('tabla', { numero: numero, tabla: tabla });
   });
   