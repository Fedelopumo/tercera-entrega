
const usuarios = [{
    nombre: 'Federico',
    mail: 'fedelopumo@mail.com',
    pass: '12345'
},
{
    nombre: 'belen',
    mail: 'belenpaleari@mail.com',
    pass: 'holamundo'
},
{
    nombre: 'franco',
    mail: 'franconob74@mail.com',
    pass: 'newells'
}]

const juegos = [{
    nombre: "god of war",
    genero: "aventura",
    anio: 2018,
    desarrollador: "SCE Santa Monica Studio",
    img: './img/gow.jpg' 
}, {
    nombre: "Tony hawk",
    genero: "deportes",
    anio: 2015,
    desarrollador: "activition",
    img: './img/tony.jpg'
}, {
    nombre: "Mortal kombat",
    genero: "pelea",
    anio: 2019,
    desarrollador: "NetherRealm Studios",
    img: './img/mk.jpg'
}, {
    nombre: "GTA",
    genero: "mundo abierto",
    anio: 2014,
    desarrollador: "Rockstar Games",
    img: './img/gta.jpg'
}]



const mailLogin = document.getElementById('emailLogin'),
    passLogin = document.getElementById('passwordLogin'),
    recordar = document.getElementById('recordarme'),
    btnLogin = document.getElementById('login'),
    modalEl = document.getElementById('modalLogin'),
    modal = new bootstrap.Modal(modalEl),
    contTarjetas = document.getElementById('tarjetas'),
    toggles = document.querySelectorAll('.toggles');


function validarUsuario(usersDB, user, pass) {
    let encontrado = usersDB.find((userDB) => userDB.mail == user);

   
    if (typeof encontrado === 'undefined') {
        return false;
    } else {
      
        if (encontrado.pass != pass) {
            return false;
        } else {
            return encontrado;
        }
    }
}


function guardarDatos(usuarioDB, storage) {
    const usuario = {
        'name': usuarioDB.nombre,
        'user': usuarioDB.mail,
        'pass': usuarioDB.pass
    }

    storage.setItem('usuario', JSON.stringify(usuario));
}


function saludar(usuario) {
    nombreUsuario.innerHTML = `Bienvenido/a, <span>${usuario.name}</span>`
}

//Limpiar los storages
function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}


function recuperarUsuario(storage) {
    let usuarioEnStorage = JSON.parse(storage.getItem('usuario'));
    return usuarioEnStorage;
}



function estaLogueado(usuario) {

    if (usuario) {
        saludar(usuario);
        mostrarInfoJuegos(juegos);
        presentarInfo(toggles, 'd-none');
    }
}


function presentarInfo(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}


function mostrarInfoJuegos(array) {
    contTarjetas.innerHTML = '';
    array.forEach(element => {
        let html = `<div class="card cardJuego" id="tarjeta${element.nombre}">
                <h3 class="card-header" id="nombreMascota">Juego: ${element.nombre}</h3>
                <img src="${element.img}" alt="${element.nombre}" class="card-img-bottom" id="fotoJuego">
                <div class="card-body">
                    <p class="card-text" id="especieMascota">Genero: ${element.genero}.</p>
                    <p class="card-text" id="edadMascota">Salida: ${element.anio}.</p>
                    <p class="card-text" id="pesoMascota">Desarrollador: ${element.desarrollador}.</p>
                </div>
            </div>`;
        contTarjetas.innerHTML += html;
    });
}


btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

   
        let data = validarUsuario(usuarios, mailLogin.value, passLogin.value);

        if (!data) {
            alert(`Usuario y/o contraseña erróneos`);
        } else {

            
            if (recordar.checked) {
                guardarDatos(data, localStorage);
                saludar(recuperarUsuario(localStorage));
            } else {
                guardarDatos(data, sessionStorage);
                saludar(recuperarUsuario(sessionStorage));
            }
            
            modal.hide();
            
            mostrarInfoJuegos(juegos);
            presentarInfo(toggles, 'd-none');
        }
   // }
});

btnLogout.addEventListener('click', () => {
    borrarDatos();
    presentarInfo(toggles, 'd-none');
});

window.onload = () => estaLogueado(recuperarUsuario(localStorage)); 
