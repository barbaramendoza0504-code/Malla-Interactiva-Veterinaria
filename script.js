const cursos = document.querySelectorAll(".curso");

let aprobados = JSON.parse(localStorage.getItem("aprobados")) || [];

function actualizarEstado() {
  cursos.forEach(curso => {
    const id = curso.dataset.id;
    const prereq = curso.dataset.prereq;

    if (aprobados.includes(id)) {
      curso.classList.add("completed");
      curso.classList.remove("locked");
      curso.classList.add("unlocked");
    }

    if (prereq) {
      const requisitos = prereq.split(",");
      const cumplidos = requisitos.every(r => aprobados.includes(r));

      if (cumplidos) {
        curso.classList.remove("locked");
        curso.classList.add("unlocked");
      }
    }
  });
}

cursos.forEach(curso => {
  curso.addEventListener("click", () => {
    const id = curso.dataset.id;

    if (curso.classList.contains("locked")) return;

    if (!aprobados.includes(id)) {
      aprobados.push(id);
      localStorage.setItem("aprobados", JSON.stringify(aprobados));
      actualizarEstado();
    }
  });
});

actualizarEstado();
