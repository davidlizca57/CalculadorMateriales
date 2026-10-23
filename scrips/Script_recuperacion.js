document.addEventListener('DOMContentLoaded', function () {
    var formRecovery = document.querySelector('.Recovery form');

    if (formRecovery) {
        formRecovery.addEventListener('submit', function (e) {
            e.preventDefault(); 

            var emailIngresado = document.getElementById('email').value;

            // Le pedimos al usuario que escriba su nueva contraseña de forma sencilla
            var nuevaClave = prompt("Ingrese su nueva contraseña (mínimo 8 caracteres):");

            // Si el usuario cancela o lo deja vacío, no hace nada
            if (!nuevaClave || nuevaClave.length < 8) {
                alert("Operación cancelada o contraseña demasiado corta.");
                return;
            }

            // Enviar la nueva contraseña al servidor de Python
            fetch('http://127.0.0.1:5000/api/recuperar', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    correo: emailIngresado,
                    nueva_clave: nuevaClave
                })
            })
            .then(function(respuesta) {
                if (respuesta.ok) {
                    alert("Contraseña actualizada con éxito en la base de datos.");
                    // Lo regresa al login para que entre con su nueva clave
                    window.location.href = "index.html";
                } else {
                    alert("El correo ingresado no coincide con ningún usuario registrado.");
                }
            })
            .catch(function(error) {
                alert("Error al conectar con el servidor backend.");
            });
        });
    }
});
