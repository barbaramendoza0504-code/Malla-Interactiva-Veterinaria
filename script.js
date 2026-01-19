const cursos = document.querySelectorAll(".curso");

cursos.forEach(curso => {
  curso.addEventListener("click", () => {
    if (curso.classList.contains("locked")) {
      alert("Este curso tiene prerrequisitos");
      return;
    }

    curso.classList.add("completed");

    const id = curso.dataset.id;

    cursos.forEach(c => {
      if (c.dataset.prereq === id) {
        c.classList.remove("locked");
        c.classList.add("unlocked");
      }
    });
  });
});
