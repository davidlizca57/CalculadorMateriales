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

    // 2. LOGICA PARA CONECTAR EL INICIO DE SESION CON PYTHON
    if (formLogin) {
        formLogin.addEventListener('submit', function (e) {
            e.preventDefault(); 

            var usuarioIngresado = document.getElementById('usuario').value;
            var claveIngresada = document.getElementById('password').value;

            // Enviar los datos ingresados al servidor de Python para verificar si existen
            fetch('http://127.0.0.1:5000/api/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usuario: usuarioIngresado,
                    clave: claveIngresada
                })
            })
            .then(function(respuesta) {
                if (respuesta.ok) {
                    alert("Inicio de sesión exitoso. Bienvenido.");
                    // Si los datos son correctos, te deja pasar al Menu Principal
                    window.location.href = "menu.html";
                } else {
                    alert("Datos incorrectos. Verifique su usuario o contraseña.");
                }
            })
            .catch(function(error) {
                alert("Error al conectar con el servidor backend.");
            });
        });
    }
});
