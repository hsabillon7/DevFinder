document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelector(".lista-conocimientos");

  if (skills) {
    skills.addEventListener("click", agregarSkill);
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
