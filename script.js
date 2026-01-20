const cursos = document.querySelectorAll(".curso");

function checkPrereq(prereq) {
  return prereq.split(",").every(id =>
    document.querySelector(`[data-id="${id}"]`)?.classList.contains("completed")
  );
}

cursos.forEach(curso => {
  curso.addEventListener("click", () => {
    if (curso.classList.contains("locked")) return;

    curso.classList.add("completed");
    curso.classList.remove("unlocked");

    cursos.forEach(c => {
      if (c.classList.contains("locked") && c.dataset.prereq) {
        if (checkPrereq(c.dataset.prereq)) {
          c.classList.remove("locked");
          c.classList.add("unlocked");
        }
      }
    });
  });
});

