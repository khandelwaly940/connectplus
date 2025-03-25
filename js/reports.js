document.addEventListener("DOMContentLoaded", function () {
    const roadmapContainer = document.getElementById("roadmap-container");

    // Sample roadmap data
    const roadmaps = [
        { title: "Web Development", progress: 75 },
        { title: "Data Science", progress: 40 },
        { title: "Cybersecurity", progress: 60 },
    ];

    // Render roadmaps dynamically
    roadmaps.forEach((roadmap) => {
        const roadmapCard = document.createElement("div");
        roadmapCard.classList.add("roadmap");

        roadmapCard.innerHTML = `
            <h3>${roadmap.title}</h3>
            <p>Progress: ${roadmap.progress}%</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${roadmap.progress}%"></div>
            </div>
        `;

        roadmapContainer.appendChild(roadmapCard);
    });

    // Generate Charts
    generateCharts(roadmaps);
});

function generateCharts(roadmaps) {
    // Progress Bar Chart
    const ctx1 = document.getElementById("progressChart").getContext("2d");
    new Chart(ctx1, {
        type: "bar",
        data: {
            labels: roadmaps.map(r => r.title),
            datasets: [{
                label: "Progress %",
                data: roadmaps.map(r => r.progress),
                backgroundColor: ["#FF5733", "#33FF57", "#3357FF"],
                borderWidth: 1,
            }],
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, max: 100 },
            },
        },
    });

    // Pie Chart for Skill Categories
    const ctx2 = document.getElementById("skillsChart").getContext("2d");
    new Chart(ctx2, {
        type: "pie",
        data: {
            labels: roadmaps.map(r => r.title),
            datasets: [{
                data: roadmaps.map(r => r.progress),
                backgroundColor: ["#FF5733", "#33FF57", "#3357FF"],
            }],
        },
        options: {
            responsive: true,
        },
    });
}
