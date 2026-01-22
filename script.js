   );
  }

  function actualizarEstados() {
  function actualizarDisponibilidad() {
    cursos.forEach(curso => {
      if (curso.classList.contains("completed")) return;

@@ -30,38 +30,40 @@ document.addEventListener("DOMContentLoaded", () => {
      if (!prereq) return;

      if (prereq.split(",").includes(idBase)) {
        if (curso.classList.contains("completed")) {
          curso.classList.remove("completed");
        }
        curso.classList.remove("available");
        curso.classList.remove("completed", "available");
        curso.classList.add("locked");
        bloquearDependientes(curso.dataset.id);
      }
    });
  }

  // 👉 CLICK SIMPLE = APROBAR
  cursos.forEach(curso => {
    curso.addEventListener("click", () => {

      // 🚫 No se puede clickear si está bloqueado
    curso.addEventListener("click", e => {
      if (curso.classList.contains("locked")) return;
      if (curso.classList.contains("completed")) return;

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
      curso.classList.remove("available");
      curso.classList.add("completed");

      actualizarEstados();
      actualizarDisponibilidad();
    });
  });

  actualizarEstados();
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
