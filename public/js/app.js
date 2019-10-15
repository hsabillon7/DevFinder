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
