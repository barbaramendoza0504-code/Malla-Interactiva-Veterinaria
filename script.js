const courses = document.querySelectorAll('.course');

courses.forEach(course => {
  course.addEventListener('click', () => {
    if (course.classList.contains('locked')) return;

    course.classList.toggle('approved');
    unlockCourses();
  });

  course.addEventListener('dblclick', () => {
    course.classList.remove('approved');
    unlockCourses();
  });
});

function unlockCourses() {
  courses.forEach(course => {
    const prereq = course.dataset.prereq;
    if (!prereq) return;

    const prereqCourse = document.querySelector(`[data-id="${prereq}"]`);
    if (prereqCourse && prereqCourse.classList.contains('approved')) {
      course.classList.remove('locked');
    } else {
      course.classList.add('locked');
      course.classList.remove('approved');
    }
  });
}

