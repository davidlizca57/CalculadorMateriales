document.addEventListener('DOMContentLoaded', function () {
    var formulario = document.getElementById('formulario-muro');

    if (formulario) {
        formulario.addEventListener('submit', function (e) {
            // Evita que la pagina intente recargarse al enviar los datos
            e.preventDefault();

            // Capturar los valores numericos ingresados por el usuario
            var largo = parseFloat(document.getElementById('largo').value);
            var alto = parseFloat(document.getElementById('alto').value);
            
            // Obtener el valor del espesor seleccionado (20 o 30)
            var espesorOpcion = document.querySelector('input[name="espesor"]:checked').value;

            // Calcular el area total del muro (Superficie)
            var superficie = largo * alto;

            // Declarar variables para almacenar las multiplicaciones finales
            var cementoTotal = 0;
            var arenaTotal = 0;
            var ladrillosTotal = 0;

            // Aplicar las reglas especificas por el profesor de interfases
            if (espesorOpcion === "30") {
                cementoTotal = superficie * 15.2;
                arenaTotal = superficie * 0.115;
                ladrillosTotal = superficie * 120;
            } else {
                // Regla por defecto si el espesor es de 20cm
                cementoTotal = superficie * 10.9;
                arenaTotal = superficie * 0.09;
                ladrillosTotal = superficie * 90;
            }

            // Inyectar de manera ordenada los resultados en las etiquetas del HTML
            // .toFixed() sirve para limitar la cantidad de decimales en pantalla
            document.getElementById('res-superficie').innerText = superficie.toFixed(2).replace('.', ',') + " m²";
            document.getElementById('res-cemento').innerText = cementoTotal.toFixed(1).replace('.', ',') + " kg";
            document.getElementById('res-arena').innerText = arenaTotal.toFixed(3).replace('.', ',') + " m³";
            document.getElementById('res-ladrillos').innerText = Math.round(ladrillosTotal).toLocaleString() + " unidades";
        });
    }
});
