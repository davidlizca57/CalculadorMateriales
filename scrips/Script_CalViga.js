document.addEventListener('DOMContentLoaded', function () {
    var formulario = document.getElementById('formulario-viga');

    if (formulario) {
        formulario.addEventListener('submit', function (e) {
            // Evita el refresco de la pantalla para procesar los datos de forma local
            e.preventDefault();

            // Guardar el valor lineal introducido por el usuario
            var largo = parseFloat(document.getElementById('largo').value);

            // Calculos segun el pdf
            var cementoTotal = largo * 13.2;
            var arenaTotal = largo * 0.046666;
            var piedraTotal = largo * 0.06;
            var hierro8Total = largo * 1.33333;
            var hierro4Total = largo * 1.44;

            // Inyectar los datos calculados en los contenedores del documento HTML
            // .toFixed() restringe el volumen de decimales y .replace cambia puntos por comas
            document.getElementById('res-cemento').innerText = cementoTotal.toFixed(1).replace('.', ',') + " Kg";
            document.getElementById('res-arena').innerText = arenaTotal.toFixed(2).replace('.', ',') + " m³";
            document.getElementById('res-piedra').innerText = piedraTotal.toFixed(2).replace('.', ',') + " m³";
            document.getElementById('res-hierro8').innerText = hierro8Total.toFixed(1).replace('.', ',') + " m";
            document.getElementById('res-hierro4').innerText = hierro4Total.toFixed(2).replace('.', ',') + " m";
        });
    }
});
