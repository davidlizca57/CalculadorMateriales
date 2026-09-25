document.addEventListener('DOMContentLoaded', function () {
    var formulario = document.getElementById('formulario-pisos');

    if (formulario) {
        formulario.addEventListener('submit', function (e) {
            // Evita que la pagina intente recargarse e interrumpa los calculos
            e.preventDefault();

            // Capturar los valores numericos que escribio el usuario
            var ancho = parseFloat(document.getElementById('ancho').value);
            var largo = parseFloat(document.getElementById('largo').value);

            // Calcular superficie base (ancho por largo)
            var superficieBase = ancho * largo;

            // Calcular superficie sumando el 10% extra por recortes
            var superficieConExtra = superficieBase * 1.10;

            // Mostrar los resultados finales modificando las etiquetas del HTML
            // .toFixed(2) deja dos decimales y .replace cambia el punto por la coma
            document.getElementById('res-superficie').innerText = superficieBase.toFixed(2).replace('.', ',') + " m²";
            document.getElementById('res-extra').innerText = superficieConExtra.toFixed(2).replace('.', ',') + " m²";
            document.getElementById('res-cantidad').innerText = superficieConExtra.toFixed(2).replace('.', ',') + " m²";
        });
    }
});
