document.addEventListener('DOMContentLoaded', function () {
    var formRecovery = document.querySelector('.Recovery form');
    var contenedorAlerta = document.getElementById('mensaje-alerta');

    if (formRecovery) {
        formRecovery.addEventListener('submit', function (e) {
            // Evita que la pagina se recargue antes de hacer la comprobacion
            e.preventDefault(); 

            // Recoger el correo que escribio el usuario en el campo de texto
            var emailIngresado = document.getElementById('email').value;

            // Traer el correo y la contraseña que se guardaron en la pagina de registro
            var correoGuardado = localStorage.getItem('guardar_correo');
            var claveGuardada = localStorage.getItem('guardar_clave');

            // Ocultar cualquier mensaje previo
            contenedorAlerta.style.display = "none";

            // Verificar si el correo ingresado es igual al que esta registrado
            if (emailIngresado === correoGuardado) {
                // Mensaje de exito indicando la contraseña encontrada (Simulacion)
                contenedorAlerta.innerText = "Correo verificado. Su contraseña es: " + claveGuardada + ". Redirigiendo al inicio de sesion...";
                contenedorAlerta.style.color = "green";
                contenedorAlerta.style.display = "block";

                // Esperar 3 segundos para que el usuario lea su clave y luego enviarlo al index.html
                setTimeout(function () {
                    window.location.href = "index.html";
                }, 3000);

            } else {
                // Mensaje de error si el correo no existe en la memoria
                contenedorAlerta.innerText = "El correo ingresado no coincide con ningun usuario registrado.";
                contenedorAlerta.style.color = "red";
                contenedorAlerta.style.display = "block";
            }
        });
    }
});
