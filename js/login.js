document.addEventListener("DOMContentLoaded", function () {
    // Course Selection Functionality
    const courseDropdown = document.getElementById("course-dropdown");
    const selectCourseBtn = document.getElementById("select-course-btn");
    selectCourseBtn.addEventListener("click", () => {
        const selectedCourse = courseDropdown.value;
        alert(`You selected the course: ${selectedCourse}`);
    });

    // Time Management Functionality
    const studyTimeInput = document.getElementById("study-time");
    const setTimeBtn = document.getElementById("set-time-btn");
    setTimeBtn.addEventListener("click", () => {
        const selectedTime = studyTimeInput.value;
        if (selectedTime) {
            alert(`Your study time is set to: ${selectedTime}`);
        } else {
            alert("Please select a valid time.");
        }
    });

    // Roadmap Rendering Functionality
    const roadmapContainer = document.getElementById("roadmap-container");
    const roadmaps = [
        {
            id: 1,
            title: "Web Development",
            description: "Learn the fundamentals of building websites and web apps.",
            steps: [
                { title: "HTML Basics", completed: true },
                { title: "CSS Styling", completed: true },
                { title: "JavaScript Programming", completed: false },
                { title: "Responsive Design", completed: false },
                { title: "React Framework", completed: false },
            ],
        },
        {
            id: 2,
            title: "Data Science",
            description: "Master data analysis and machine learning techniques.",
            steps: [
                { title: "Python Basics", completed: true },
                { title: "Data Visualization", completed: false },
                { title: "Statistical Analysis", completed: false },
                { title: "Machine Learning", completed: false },
            ],
        },
    ];

    roadmaps.forEach((roadmap) => {
        const roadmapCard = document.createElement("div");
        roadmapCard.classList.add("roadmap");

        roadmapCard.innerHTML = `
            <h3>${roadmap.title}</h3>
            <p>${roadmap.description}</p>
        `;

        const stepList = document.createElement("ul");
        roadmap.steps.forEach((step) => {
            const stepItem = document.createElement("li");
            stepItem.textContent = step.title;
            if (step.completed) {
                stepItem.classList.add("completed");
            }
            stepList.appendChild(stepItem);
        });

        roadmapCard.appendChild(stepList);
        roadmapContainer.appendChild(roadmapCard);
    });
});
