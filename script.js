document.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll(".curso");

  function puedeDesbloquear(curso) {
    const prereq = curso.dataset.prereq;
    if (!prereq) return true;

    return prereq.split(",").every(id =>
      document.querySelector(`[data-id="${id}"]`)?.classList.contains("completed")
    );
  }

  function actualizarMalla() {
    cursos.forEach(curso => {
      if (curso.classList.contains("completed")) return;

      if (puedeDesbloquear(curso)) {
        curso.classList.remove("locked");
        curso.classList.add("unlocked");
      } else {
        curso.classList.remove("unlocked");
        curso.classList.add("locked");
      }
    });
  }

  function bloquearDependientes(cursoBase) {
    const idBase = cursoBase.dataset.id;

    cursos.forEach(curso => {
      const prereq = curso.dataset.prereq;
      if (!prereq) return;

      if (prereq.split(",").includes(idBase)) {
        curso.classList.remove("completed", "unlocked");
        curso.classList.add("locked");
        bloquearDependientes(curso); // recursivo
      }
    });
  }

  cursos.forEach(curso => {
    curso.addEventListener("click", () => {

      // NO se puede hacer click si está bloqueado
      if (curso.classList.contains("locked")) return;

      // DESAPROBAR
      if (curso.classList.contains("completed")) {
        curso.classList.remove("completed");
        curso.classList.add("unlocked");
        bloquearDependientes(curso);
      }
      // APROBAR
      else {
        curso.classList.remove("unlocked");
        curso.classList.add("completed");
      }

      actualizarMalla();
    });
  });

  actualizarMalla();
});

