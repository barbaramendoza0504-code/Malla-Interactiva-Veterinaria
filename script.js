document.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll(".curso");

  function requisitosCumplidos(curso) {
    const prereq = curso.dataset.prereq;
    if (!prereq) return true;

    return prereq.split(",").every(id =>
      document.querySelector(`[data-id="${id}"]`)?.classList.contains("completed")
    );
  }

  function actualizarDisponibilidad() {
    cursos.forEach(curso => {
      if (curso.classList.contains("completed")) return;

      if (requisitosCumplidos(curso)) {
        curso.classList.remove("locked");
        curso.classList.add("available");
      } else {
        curso.classList.remove("available");
        curso.classList.add("locked");
      }
    });
  }

  function bloquearDependientes(idBase) {
    cursos.forEach(curso => {
      const prereq = curso.dataset.prereq;
      if (!prereq) return;

      if (prereq.split(",").includes(idBase)) {
        curso.classList.remove("completed", "available");
        curso.classList.add("locked");
        bloquearDependientes(curso.dataset.id);
      }
    });
  }

  // 👉 CLICK SIMPLE = APROBAR
  cursos.forEach(curso => {
    curso.addEventListener("click", e => {
      if (curso.classList.contains("locked")) return;
      if (curso.classList.contains("completed")) return;

      curso.classList.remove("available");
      curso.classList.add("completed");

      actualizarDisponibilidad();
    });
  });

  // 👉 DOBLE CLICK = DESAPROBAR
  cursos.forEach(curso => {
    curso.addEventListener("dblclick", e => {
      e.preventDefault();

      if (!curso.classList.contains("completed")) return;

      curso.classList.remove("completed");
      curso.classList.add("available");

      bloquearDependientes(curso.dataset.id);
      actualizarDisponibilidad();
    });
  });

  actualizarDisponibilidad();
});
