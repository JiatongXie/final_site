const enableProgressClick = true; // 切换功能开启或关闭

document.addEventListener("DOMContentLoaded", () => {
  if (!enableProgressClick) return;

  const subjects = document.querySelectorAll(".subject");
  subjects.forEach((subject) => {
    const progressRectangles = subject.querySelectorAll(".progress-rectangle");
    progressRectangles.forEach((rectangle, index) => {
      rectangle.addEventListener("click", () => {
        if (rectangle.classList.contains("completed")) {
          progressRectangles.forEach((rect) =>
            rect.classList.remove("completed")
          );
        } else {
          for (let i = 0; i <= index; i++) {
            progressRectangles[i].classList.add("completed");
          }
        }
        saveProgress();
      });
    });
  });

  loadProgress();
});

function saveProgress() {
  const progressData = [];
  document.querySelectorAll(".subject").forEach((subject) => {
    const subjectData = [];
    subject.querySelectorAll(".progress-rectangle").forEach((rectangle) => {
      subjectData.push(rectangle.classList.contains("completed"));
    });
    progressData.push(subjectData);
  });
  fetch("/api/progress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(progressData),
  });
}

function loadProgress() {
  fetch("/api/progress")
    .then((response) => response.json())
    .then((progressData) => {
      document.querySelectorAll(".subject").forEach((subject, subjectIndex) => {
        const subjectData = progressData[subjectIndex] || [];
        subject
          .querySelectorAll(".progress-rectangle")
          .forEach((rectangle, rectIndex) => {
            if (subjectData[rectIndex]) {
              rectangle.classList.add("completed");
            } else {
              rectangle.classList.remove("completed");
            }
          });
      });
    });
}
