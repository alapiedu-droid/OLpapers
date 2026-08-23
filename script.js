let papers = [];

// Load paper database
async function loadPapers() {
    try {
        const response = await fetch("data/papers.json");

        if (!response.ok) {
            throw new Error("Could not load papers.json");
        }

        const data = await response.json();

        papers = data.papers || [];

        console.log("Paper database loaded:", papers.length);

    } catch (error) {

        console.error(error);

        papers = [];

    }
}


// Show papers by type
function showPapers(type) {

    const section = document.getElementById("paperSection");
    const title = document.getElementById("paperTitle");

    section.style.display = "block";

    title.innerText = type;

    const filtered = papers.filter(
        paper => paper.type === type
    );

    renderPapers(filtered);

    section.scrollIntoView({
        behavior: "smooth"
    });
}


// Show papers by province
function showProvince(province) {

    const section = document.getElementById("paperSection");
    const title = document.getElementById("paperTitle");

    section.style.display = "block";

    title.innerText = province;

    const filtered = papers.filter(
        paper => paper.province === province
    );

    renderPapers(filtered);

    section.scrollIntoView({
        behavior: "smooth"
    });
}


// Show papers by grade
function selectGrade(grade) {

    const section = document.getElementById("paperSection");
    const title = document.getElementById("paperTitle");

    section.style.display = "block";

    title.innerText = grade + " Papers";

    const filtered = papers.filter(
        paper => paper.grade === grade
    );

    renderPapers(filtered);

    section.scrollIntoView({
        behavior: "smooth"
    });
}


// Show papers by subject
function openSubject(subject) {

    const section = document.getElementById("paperSection");
    const title = document.getElementById("paperTitle");

    section.style.display = "block";

    title.innerText = subject + " Papers";

    const filtered = papers.filter(
        paper => paper.subject === subject
    );

    renderPapers(filtered);

    section.scrollIntoView({
        behavior: "smooth"
    });
}


// Render paper cards
function renderPapers(list) {

    const results = document.getElementById("paperResults");

    if (!list || list.length === 0) {

        results.innerHTML = `
            <div class="paper-card">

                <h3>📂 No papers added yet</h3>

                <p>
                    Papers will appear here when they are added.
                </p>

            </div>
        `;

        return;
    }


    results.innerHTML = list.map(paper => {

        const paperButton = paper.paperUrl
            ? `
                <button
                    class="btn view"
                    onclick="window.open('${paper.paperUrl}', '_blank')"
                >
                    👁 View Paper
                </button>
              `
            : `
                <button
                    class="btn view"
                    onclick="showMessage('Paper PDF is not added yet.')"
                >
                    👁 View Paper
                </button>
              `;


        const markingButton = paper.markingUrl
            ? `
                <button
                    class="btn marking"
                    onclick="window.open('${paper.markingUrl}', '_blank')"
                >
                    ✅ Marking
                </button>
              `
            : `
                <button
                    class="btn marking"
                    onclick="showMessage('Marking Scheme is not added yet.')"
                >
                    ✅ Marking
                </button>
              `;


        return `

            <div class="paper-card">

                <div class="paper-top">

                    <div>

                        <h3>
                            ${paper.title}
                        </h3>

                        <p>
                            Grade ${paper.grade}
                            • ${paper.subject}
                            • ${paper.year}
                        </p>

                    </div>

                    <div class="badge">
                        ${paper.type}
                    </div>

                </div>


                <div class="buttons">

                    ${paperButton}

                    ${markingButton}

                </div>

            </div>

        `;

    }).join("");
}


// Search papers
function searchPapers() {

    const query =
        document
        .getElementById("searchBox")
        .value
        .toLowerCase()
        .trim();


    if (!query) {

        document.getElementById("paperSection").style.display = "none";

        return;
    }


    const results = papers.filter(paper => {

        const searchableText = [

            paper.title,
            paper.subject,
            paper.grade,
            paper.year,
            paper.type,
            paper.province

        ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();


        return searchableText.includes(query);

    });


    const section =
        document.getElementById("paperSection");

    const title =
        document.getElementById("paperTitle");


    section.style.display = "block";

    title.innerText = "Search Results";


    renderPapers(results);

}


// Simple message
function showMessage(message) {

    alert(message);

}


// Start application
document.addEventListener("DOMContentLoaded", () => {

    loadPapers();

});
