document.addEventListener('DOMContentLoaded', function () {
    var formRegistro = document.querySelector('.Register form');

    if (formRegistro) {
        formRegistro.addEventListener('submit', function (e) {
            // Evita que la pagina se recargue antes de guardar
            e.preventDefault(); 

            // Recoger los datos que escribio el usuario
            var usuario = document.getElementById('nuevo_usuario').value;
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            var confirmPassword = document.getElementById('confirm-password').value;

            // Verificar si las contraseñas coinciden
            if (password !== confirmPassword) {
                alert("Las contraseñas no coinciden. Por favor, verifícalas.");
                return; 
            }

            // Guardar los datos en la memoria del navegador
            localStorage.setItem('guardar_usuario', usuario);
            localStorage.setItem('guardar_correo', email);
            localStorage.setItem('guardar_clave', password);

            // Avisar al usuario que todo salio bien
            alert("Registro completado con éxito.");
            
            // Llevar al usuario a la pagina de inicio de sesion
            window.location.href = "index.html"; 
        });
    }
});