const enableProgressClick = true; // 切换功能开启或关闭

const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY;
const BIN_ID = "67822f8ee41b4d34e475a8c5";

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
  fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": JSONBIN_API_KEY,
    },
    body: JSON.stringify({ record: progressData }),
  });
}

function loadProgress() {
  fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: {
      "X-Master-Key": JSONBIN_API_KEY,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const progressData = data.record;
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
