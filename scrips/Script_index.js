document.addEventListener('DOMContentLoaded', function () {
    var formLogin = document.querySelector('.Login form');
    var inputPassword = document.getElementById('password');
    var btnOjo = document.getElementById('eye');

    // 1. LOGICA PARA MOSTRAR / OCULTAR CONTRASEÑA
    if (btnOjo && inputPassword) {
        btnOjo.addEventListener('click', function () {
            if (inputPassword.type === "password") {
                inputPassword.type = "text";
            } else {
                inputPassword.type = "password";
            }
        });
    }

    // 2. LOGICA PARA ENTRAR AL SISTEMA
    if (formLogin) {
        formLogin.addEventListener('submit', function (e) {
            // Evita que la pagina cargue antes de verificar los datos
            e.preventDefault(); 

            // Recoger lo que escribio el usuario en la pantalla de ingreso
            var usuarioIngresado = document.getElementById('usuario').value;
            var claveIngresada = document.getElementById('password').value;

            // Traer los datos que se guardaron en la pagina de registro
            var usuarioGuardado = localStorage.getItem('guardar_usuario');
            var correoGuardado = localStorage.getItem('guardar_correo');
            var claveGuardada = localStorage.getItem('guardar_clave');

            // Verificar si hay algun usuario guardado en la memoria
            if (!usuarioGuardado) {
                alert("No hay ningun usuario registrado en este navegador. Por favor registrese primero.");
                return;
            }

            // Comprobar si el dato ingresado coincide con el usuario o con el correo, y si la clave es correcta
            if ((usuarioIngresado === usuarioGuardado || usuarioIngresado === correoGuardado) && claveIngresada === claveGuardada) {
                alert("Inicio de sesion exitoso. Bienvenido.");
                
                // Llevar al usuario a la pagina del menu
                window.location.href = "menu.html";
            } else {
                alert("Datos incorrectos. Verifique su usuario o contraseña.");
            }
        });
    }
});
