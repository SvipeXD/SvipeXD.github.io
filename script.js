// Arreglo para almacenar las solicitudes de los trabajadores
var solicitudes = [];

function showWorkerForm() {
  document.getElementById("workerForm").classList.remove("hidden");
  document.getElementById("adminLogin").classList.add("hidden");
  document.getElementById("adminPanel").classList.add("hidden");
}

function showAdminLogin() {
  document.getElementById("workerForm").classList.add("hidden");
  document.getElementById("adminLogin").classList.remove("hidden");
  document.getElementById("adminPanel").classList.add("hidden");
}

function showSuccessMessage() {
  var nombre = document.getElementById("workerNombre").value;
  var eppSolicitado = document.getElementById("eppSolicitado").value;
  var talla = document.getElementById("talla").value;
  var razonSolicitud = document.getElementById("razonSolicitud").value;
  var fotoEPP = document.getElementById("fotoEPP").files[0]; // Obtener la imagen seleccionada
  var fechaCreacion = new Date(); // Obtener la fecha y hora actual
  var solicitud = { 
    nombre: nombre, 
    eppSolicitado: eppSolicitado, 
    talla: talla, 
    razonSolicitud: razonSolicitud, 
    fotoEPP: fotoEPP, // Guardar la imagen en la solicitud
    generado: false, // Inicialmente establecemos generado como falso
    fechaCreacion: fechaCreacion // Guardar la fecha de creación
  };
  solicitudes.push(solicitud); // Agregar la solicitud al arreglo
  
  var floatingMessage = document.getElementById("floatingMessage");
  floatingMessage.textContent = "¡Solicitud creada con éxito!";
  floatingMessage.classList.remove("hidden");
  floatingMessage.classList.remove("error-message"); // Remove error class if present
  floatingMessage.classList.add("success-message"); // Add success class
  
  setTimeout(function() {
    floatingMessage.classList.add("hidden");
    floatingMessage.classList.remove("success-message"); // Remove success class
  }, 3000); // Oculta el mensaje después de 3 segundos
  
  mostrarSolicitudes(); // Mostrar todas las solicitudes
  event.preventDefault(); // Cancela el evento de envío del formulario
}

function toggleSolicitudGenerada(index) {
  solicitudes[index].generado = !solicitudes[index].generado;
  mostrarSolicitudes();
}

// Función para mostrar todas las solicitudes en el panel de administrador
function mostrarSolicitudes() {
  var solicitudHTML = '';
  for (var i = 0; i < solicitudes.length; i++) {
    solicitudHTML += '<div><strong>Nombre:</strong> ' + solicitudes[i].nombre + '<br>';
    solicitudHTML += '<strong>EPP Solicitado:</strong> ' + solicitudes[i].eppSolicitado + '<br>';
    solicitudHTML += '<strong>Talla:</strong> ' + solicitudes[i].talla + '<br>';
    solicitudHTML += '<strong>Razón de la Solicitud:</strong> ' + solicitudes[i].razonSolicitud + '<br>';
    solicitudHTML += '<strong>Generado:</strong> ' + (solicitudes[i].generado ? 'Sí' : 'No') + '<br>';
    solicitudHTML += '<strong>Fecha de Creación:</strong> ' + formatDate(solicitudes[i].fechaCreacion) + '<br>'; // Mostrar fecha de creación
    if (solicitudes[i].fotoEPP) {
      solicitudHTML += '<a href="' + URL.createObjectURL(solicitudes[i].fotoEPP) + '" download="foto_epp_' + i + '">Descargar Imagen</a><br>';
    }
    solicitudHTML += '<button onclick="toggleSolicitudGenerada(' + i + ')">Cambiar estado</button></div>';
    solicitudHTML += '<hr>';
  }
  document.getElementById("solicitudContainer").innerHTML = solicitudHTML;
}

function showAdminPanel() {
  // Muestra la sección del panel de administrador y oculta el resto
  document.getElementById("adminPanel").classList.remove("hidden");
  document.getElementById("workerForm").classList.add("hidden");
  document.getElementById("adminLogin").classList.add("hidden");
}

function loginAdmin() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (username === "svipe" && password === "159753") {
    // Si las credenciales son correctas, muestra el panel de administrador
    var floatingMessage = document.getElementById("floatingMessage");
    floatingMessage.textContent = "Inicio de sesión exitoso";
    floatingMessage.classList.remove("hidden");
    floatingMessage.classList.remove("error-message"); // Remove error class if present
    floatingMessage.classList.add("success-message"); // Add success class
    
    setTimeout(function() {
      floatingMessage.classList.add("hidden");
      floatingMessage.classList.remove("success-message"); // Remove success class
      showAdminPanel(); // Llama a la función para mostrar el panel de administrador
    }, 3000);
  } else {
    // Si las credenciales son incorrectas, muestra un mensaje de error
    var floatingMessage = document.getElementById("floatingMessage");
    floatingMessage.textContent = "Nombre de usuario o contraseña incorrectos";
    floatingMessage.classList.remove("hidden");
    floatingMessage.classList.remove("success-message"); // Remove success class if present
    floatingMessage.classList.add("error-message"); // Add error class
    
    setTimeout(function() {
      floatingMessage.classList.add("hidden");
      floatingMessage.classList.remove("error-message"); // Remove error class
    }, 3000);
  }

  event.preventDefault(); // Cancela el evento de envío del formulario
}

// Función para formatear la fecha en formato legible
function formatDate(date) {
  var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return new Date(date).toLocaleDateString('es-ES', options);
}

// Mostrar solicitudes al cargar la página
document.addEventListener("DOMContentLoaded", function() {
  mostrarSolicitudes();
});



















