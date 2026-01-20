document.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll(".curso");

  function requisitosCumplidos(curso) {
    const prereq = curso.dataset.prereq;
    if (!prereq) return true;

    return prereq.split(",").every(id =>
      document.querySelector(`[data-id="${id}"]`)?.classList.contains("completed")
    );
  }

  function actualizarEstados() {
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
        if (curso.classList.contains("completed")) {
          curso.classList.remove("completed");
        }
        curso.classList.remove("available");
        curso.classList.add("locked");
        bloquearDependientes(curso.dataset.id);
      }
    });
  }

  cursos.forEach(curso => {
    curso.addEventListener("click", () => {

      // 🚫 No se puede clickear si está bloqueado
      if (curso.classList.contains("locked")) return;

      // ❌ Desaprobar
      if (curso.classList.contains("completed")) {
        curso.classList.remove("completed");
        curso.classList.add("available");
        bloquearDependientes(curso.dataset.id);
      }
      // ✅ Aprobar
      else {
        curso.classList.remove("available");
        curso.classList.add("completed");
      }

      actualizarEstados();
    });
  });

  actualizarEstados();
});

