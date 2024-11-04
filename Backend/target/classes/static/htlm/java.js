document.getElementById("docenteForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el envío normal del formulario

    const nombre = document.getElementById("nombre").value;
    const legajo = document.getElementById("legajo").value;

    // Crear el objeto a enviar
    const docenteData = {
        nombre: nombre,
        legajo: parseInt(legajo)
    };

    // Enviar la solicitud POST al backend
    fetch("http://localhost:8082/docentes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(docenteData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("response").innerText = "Docente agregado: " + JSON.stringify(data);
        })
        .catch(error => {
            document.getElementById("response").innerText = "Error: " + error.message;
        });
});
