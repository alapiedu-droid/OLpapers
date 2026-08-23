let papers = [];
let database = {};


// ===============================
// LOAD DATABASE
// ===============================

async function loadPapers() {
    try {

        const response = await fetch("data/papers.json");

        if (!response.ok) {
            throw new Error("Could not load papers.json");
        }

        database = await response.json();

        papers = database.papers || [];

        loadSubjects();

        console.log("Database loaded successfully");

    } catch (error) {

        console.error("Database error:", error);

    }
}


// ===============================
// LOAD SUBJECTS
// ===============================

function loadSubjects() {

    const container =
        document.getElementById("subjectGrid");

    if (!container) return;

    const subjects =
        database.subjects || [];

    container.innerHTML = "";

    subjects.forEach(subject => {

        const card =
            document.createElement("div");

        card.className = "subject";

        card.onclick = () => {

            openSubject(
                subject.name,
                subject.code
            );

        };

        card.innerHTML = `

            <div class="subject-icon">
                ${getSubjectIcon(subject.category)}
            </div>

            <h3>
                ${subject.name}
            </h3>

            <p>
                Code: ${subject.code}
            </p>

        `;

        container.appendChild(card);

    });
}


// ===============================
// SUBJECT ICONS
// ===============================

function getSubjectIcon(category) {

    switch (category) {

        case "Religion":
            return "🛕";

        case "Languages":
            return "📚";

        case "Core Subjects":
            return "🎓";

        case "Aesthetic":
            return "🎨";

        case "Basket Subjects":
            return "📖";

        case "Technology":
            return "💻";

        default:
            return "📘";
    }
}


// ===============================
// SHOW PAPERS BY TYPE
// ===============================

function showPapers(type) {

    const section =
        document.getElementById("paperSection");

    const title =
        document.getElementById("paperTitle");

    section.style.display = "block";

    title.innerText = type;

    const filtered =
        papers.filter(
            paper => paper.type === type
        );

    renderPapers(filtered);

    section.scrollIntoView({
        behavior: "smooth"
    });
}


// ===============================
// SHOW PAPERS BY PROVINCE
// ===============================

function showProvince(province) {

    const section =
        document.getElementById("paperSection");

    const title =
        document.getElementById("paperTitle");

    section.style.display = "block";

    title.innerText = province;

    const filtered =
        papers.filter(
            paper => paper.province === province
        );

    renderPapers(filtered);

    section.scrollIntoView({
        behavior: "smooth"
    });
}


// ===============================
// SHOW PAPERS BY GRADE
// ===============================

function selectGrade(grade) {

    const section =
        document.getElementById("paperSection");

    const title =
        document.getElementById("paperTitle");

    section.style.display = "block";

    title.innerText =
        "Grade " + grade + " Papers";

    const filtered =
        papers.filter(
            paper => paper.grade === grade
        );

    renderPapers(filtered);

    section.scrollIntoView({
        behavior: "smooth"
    });
}


// ===============================
// SHOW PAPERS BY SUBJECT
// ===============================

function openSubject(
    subject,
    subjectCode = ""
) {

    const section =
        document.getElementById("paperSection");

    const title =
        document.getElementById("paperTitle");

    section.style.display = "block";

    title.innerText =
        subject + " Papers";


    const filtered =
        papers.filter(paper => {

            if (subjectCode) {

                return (
                    paper.subjectCode === subjectCode ||
                    paper.subject === subject
                );

            }

            return paper.subject === subject;

        });


    renderPapers(filtered);

    section.scrollIntoView({
        behavior: "smooth"
    });
}


// ===============================
// RENDER PAPERS
// ===============================

function renderPapers(list) {

    const results =
        document.getElementById("paperResults");

    if (!results) return;


    if (!list || list.length === 0) {

        results.innerHTML = `

            <div class="paper-card">

                <h3>
                    📂 No papers added yet
                </h3>

                <p>
                    Papers will appear here
                    when they are added.
                </p>

            </div>

        `;

        return;
    }


    results.innerHTML =
        list.map(paper => {

            const paperButton =
                paper.paperUrl

                ? `

                    <button
                        class="btn view"
                        onclick="
                            window.open(
                                '${paper.paperUrl}',
                                '_blank'
                            )
                        "
                    >
                        👁 View Paper
                    </button>

                  `

                : `

                    <button
                        class="btn view"
                        onclick="
                            showMessage(
                                'Paper PDF is not added yet.'
                            )
                        "
                    >
                        👁 View Paper
                    </button>

                  `;


            const markingButton =
                paper.markingUrl

                ? `

                    <button
                        class="btn marking"
                        onclick="
                            window.open(
                                '${paper.markingUrl}',
                                '_blank'
                            )
                        "
                    >
                        ✅ Marking
                    </button>

                  `

                : `

                    <button
                        class="btn marking"
                        onclick="
                            showMessage(
                                'Marking Scheme is not added yet.'
                            )
                        "
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


// ===============================
// SEARCH
// ===============================

function searchPapers() {

    const input =
        document.getElementById("searchBox");

    if (!input) return;


    const query =
        input.value
            .toLowerCase()
            .trim();


    const section =
        document.getElementById("paperSection");


    if (!query) {

        section.style.display = "none";

        return;

    }


    const results =
        papers.filter(paper => {

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


            return searchableText.includes(
                query
            );

        });


    section.style.display = "block";


    document.getElementById(
        "paperTitle"
    ).innerText = "Search Results";


    renderPapers(results);

}


// ===============================
// MESSAGE
// ===============================

function showMessage(message) {

    alert(message);

}


// ===============================
// START
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadPapers();

    }
);
