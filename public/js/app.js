import axios from "axios";
import Swal from "sweetalert2";

document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelector(".lista-conocimientos");

  if (skills) {
    skills.addEventListener("click", agregarSkill);

    // Skills seleccionados para el formulario de editar
    skillsSeleccionados();
  }

  // Limpiar las alertas
  let alertas = document.querySelector(".alertas");

  if (alertas) {
    limpiarAlertas(alertas);
  }

  // Eliminar vacantes
  const vacantesListado = document.querySelector(".panel-administracion");

  if (vacantesListado) {
    vacantesListado.addEventListener("click", accionesListado);
  }
});

// Utilizar Set en un lugar de arreglos
const skills = new Set();

const agregarSkill = e => {
  if (e.target.classList.contains("activo")) {
    //   eliminar del Set
    skills.delete(e.target.textContent);
    // Remover el estilo
    e.target.classList.remove("activo");
  } else {
    //   Agregar al Set
    skills.add(e.target.textContent);
    // Agregar el estilo activo
    e.target.classList.add("activo");
  }

  //   Crear un arreglo de un literal
  const skillsArray = [...skills];

  document.querySelector("#skills").value = skillsArray;
};

const skillsSeleccionados = () => {
  const seleccionados = Array.from(
    document.querySelectorAll(".lista-conocimientos .activo")
  );

  seleccionados.forEach(seleccionado => {
    skills.add(seleccionado.textContent);
  });

  //  Inyectar al input hidden
  const skillsArray = [...skills];
  document.querySelector("#skills").value = skillsArray;
};

const limpiarAlertas = alertas => {
  // Verificar si el div alertas tiene hijos
  const interval = setInterval(() => {
    if (alertas.children.length > 0) {
      alertas.removeChild(alertas.children[0]);
    } else {
      alertas.parentElement.removeChild(alertas);
      clearInterval(interval);
    }
  }, 3000);
};

const accionesListado = e => {
  // Prevenir el comportamiento por defecto
  e.preventDefault();

  // verificar que el botón seleccionado es el de eliminar
  if (e.target.dataset.eliminar) {
    Swal.fire({
      title: "¿Está seguro de eliminar la vacante?",
      text: "Una vez eliminada no se puede recuperar",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.value) {
        // Obtener el valor del id de la vacante
        const url = `${location.origin}/vacante/eliminar/${e.target.dataset.eliminar}`;

        // Axios haga la petición de eliminación
        axios.delete(url, { params: url }).then(function(respuesta) {
          if (respuesta.status == 200) {
            Swal.fire("¡Eliminada!", "Your file has been deleted.", "success");
          }
        });
      }
    });
  }
};
