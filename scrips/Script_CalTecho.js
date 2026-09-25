document.addEventListener('DOMContentLoaded', function () {
    var formulario = document.getElementById('formulario-techo');

    if (formulario) {
        formulario.addEventListener('submit', function (e) {
            // Evita que la pagina intente recargarse e interrumpa los calculos
            e.preventDefault();

            // Capturar los valores numericos que escribio el usuario
            var espesor = parseFloat(document.getElementById('espesor').value);
            var largo = parseFloat(document.getElementById('largo').value);
            var ancho = parseFloat(document.getElementById('ancho').value);

            // Calcular superficie (metros cuadrados) y volumen (metros cubicos)
            var superficie = largo * ancho;
            var volumen = largo * ancho * espesor;

            // Operaciones matematicas basadas en las indicaciones del profe en el pdf
            var cementoTotal = superficie * 33;
            var arenaTotal = superficie * 0.072;
            var piedraTotal = superficie * 0.072;
            var hierro8Total = superficie * 7;
            var hierro6Total = superficie * 4;

            // Mostrar los resultados finales modificando las etiquetas del HTML
            // .toFixed() limita los decimales y .replace cambia el punto por la coma
            document.getElementById('res-superficie').innerText = superficie.toFixed(2).replace('.', ',') + " m²";
            document.getElementById('res-volumen').innerText = volumen.toFixed(2).replace('.', ',') + " m³";
            document.getElementById('res-cemento').innerText = cementoTotal.toFixed(1).replace('.', ',') + " kg";
            document.getElementById('res-arena').innerText = arenaTotal.toFixed(2).replace('.', ',') + " m³";
            document.getElementById('res-piedra').innerText = piedraTotal.toFixed(2).replace('.', ',') + " m³";
            document.getElementById('res-hierro8').innerText = hierro8Total.toFixed(1).replace('.', ',') + " m";
            document.getElementById('res-hierro6').innerText = hierro6Total.toFixed(1).replace('.', ',') + " m";
        });
    }
});
