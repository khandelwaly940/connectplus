document.addEventListener("DOMContentLoaded", function () {
    const courseDropdown = document.getElementById("course-dropdown");
    const selectCourseBtn = document.getElementById("select-course-btn");
    const pathList = document.getElementById("path-list");

    const studyTime = document.getElementById("study-time");
    const studyDate = document.getElementById("study-date");
    const googleCalendarBtn = document.getElementById("google-calendar-btn");

    // Learning Path Data with Resources
    const learningPaths = {
        "dsa": [
            { title: "Arrays & Strings", link: "https://www.geeksforgeeks.org/arrays-in-data-structure/" },
            { title: "Linked Lists", link: "https://www.javatpoint.com/linked-list" },
            { title: "Stacks & Queues", link: "https://www.geeksforgeeks.org/stack-data-structure/" },
            { title: "Trees & Graphs", link: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/" },
            { title: "Dynamic Programming", link: "https://www.geeksforgeeks.org/dynamic-programming/" }
        ],
        "web-dev": [
            { title: "HTML & CSS Basics", link: "https://developer.mozilla.org/en-US/docs/Learn/HTML" },
            { title: "JavaScript Essentials", link: "https://javascript.info/" },
            { title: "Frontend Frameworks (React.js)", link: "https://react.dev/" },
            { title: "Backend Development (Node.js)", link: "https://nodejs.org/en/learn" },
            { title: "Databases & APIs", link: "https://www.postgresql.org/docs/" }
        ],
        "ml": [
            { title: "Python Basics for ML", link: "https://www.learnpython.org/" },
            { title: "Linear Regression & Gradient Descent", link: "https://towardsdatascience.com/linear-regression-detailed-view-ea73175f6e86" },
            { title: "Neural Networks Basics", link: "https://cs231n.github.io/neural-networks-1/" },
            { title: "Deep Learning with TensorFlow", link: "https://www.tensorflow.org/tutorials" },
            { title: "Machine Learning Projects", link: "https://www.kaggle.com/" }
        ]
    };

    // Update Learning Path with detailed links
    selectCourseBtn.addEventListener("click", function () {
        const selectedCourse = courseDropdown.value;
        pathList.innerHTML = ""; // Clear previous list

        learningPaths[selectedCourse].forEach(step => {
            const li = document.createElement("li");
            const a = document.createElement("a");

            a.textContent = step.title;
            a.href = step.link;
            a.target = "_blank"; // Open in new tab
            a.style.color = "#007bff"; // Make it visually distinct
            a.style.textDecoration = "none";

            li.appendChild(a);
            pathList.appendChild(li);
        });
    });

    // Google Calendar Integration
    googleCalendarBtn.addEventListener("click", function () {
        const dateValue = studyDate.value;
        const timeValue = studyTime.value;

        if (!dateValue || !timeValue) {
            alert("Please select a date and time.");
            return;
        }

        const eventTitle = "Study Session";
        const eventStart = `${dateValue}T${timeValue}:00`;
        const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${eventStart}/${eventStart}`;

        window.open(googleCalendarUrl, "_blank");
    });
});
