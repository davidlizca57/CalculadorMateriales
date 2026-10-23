document.addEventListener('DOMContentLoaded', function () {
    var formRegistro = document.querySelector('.Register form');

    if (formRegistro) {
        formRegistro.addEventListener('submit', function (e) {
            e.preventDefault(); 

            var usuario = document.getElementById('nuevo_usuario').value;
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            var confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert("Las contraseñas no coinciden. Por favor, verifícalas.");
                return; 
            }

            // Enviar datos al backend de Python
            fetch('http://127.0.0.1:5000/api/registro', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: usuario,
                    correo: email,
                    clave: password
                })
            })
            .then(function(respuesta) {
                // Si la respuesta del servidor es correcta (codigo 200 o 201)
                if (respuesta.ok) {
                    alert("Registro completado con éxito en la base de datos.");
                    // Forzar la redirección al inicio de sesión de inmediato
                    window.location.href = "index.html";
                } else {
                    alert("El correo ya se encuentra registrado o los datos son inválidos.");
                }
            })
            .catch(function(error) {
                alert("Error al conectar con el servidor backend.");
            });
        });
    }
});
