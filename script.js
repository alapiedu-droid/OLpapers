let papers = [];
let database = {};

let basketOpened = false;


// =====================================
// LOAD DATABASE
// =====================================

async function loadDatabase() {

    try {

        const response =
            await fetch("data/papers.json");

        if (!response.ok) {

            throw new Error(
                "Could not load papers.json"
            );

        }

        database =
            await response.json();

        papers =
            database.papers || [];

        buildMainSubjects();

        buildBasketSubjects();

        console.log(
            "OL database loaded successfully."
        );

    } catch (error) {

        console.error(
            "Database loading error:",
            error
        );

    }

}



// =====================================
// SUBJECT ICON
// =====================================

function getSubjectIcon(category, name) {

    const text =
        name.toLowerCase();


    if (
        text.includes("mathematics")
    ) {
        return "📐";
    }


    if (
        text.includes("science")
    ) {
        return "🔬";
    }


    if (
        text.includes("history")
    ) {
        return "🏛️";
    }


    if (
        text.includes("english")
    ) {
        return "🇬🇧";
    }


    if (
        text.includes("sinhala")
    ) {
        return "📖";
    }


    if (
        text.includes("tamil")
    ) {
        return "📚";
    }


    if (category === "Religion") {

        return "🕊️";

    }


    if (category === "Aesthetic") {

        return "🎨";

    }


    if (category === "Technology") {

        return "💻";

    }


    if (category === "Basket Subjects") {

        return "📦";

    }


    if (category === "Languages") {

        return "🌐";

    }


    return "📘";

}



// =====================================
// CREATE SUBJECT CARD
// =====================================

function createSubjectCard(subject) {

    const card =
        document.createElement("button");

    card.className =
        "subject-card";


    card.type = "button";


    card.onclick = function () {

        openSubject(
            subject.name,
            subject.code
        );

    };


    card.innerHTML = `

        <div class="subject-icon">

            ${getSubjectIcon(
                subject.category,
                subject.name
            )}

        </div>


        <strong>
            ${subject.name}
        </strong>


        <span>
            Subject Code ${subject.code}
        </span>

    `;


    return card;

}



// =====================================
// MAIN SUBJECTS
// =====================================

function buildMainSubjects() {

    const container =
        document.getElementById(
            "mainSubjectGrid"
        );


    if (!container) return;


    container.innerHTML = "";


    const subjects =
        database.subjects || [];


    const mainSubjects =
        subjects.filter(subject => {

            return [

                "Core Subjects",
                "Languages",
                "Religion"

            ].includes(
                subject.category
            );

        });


    mainSubjects.forEach(subject => {

        container.appendChild(
            createSubjectCard(subject)
        );

    });

}



// =====================================
// BASKET SUBJECTS
// =====================================

function buildBasketSubjects() {

    const container =
        document.getElementById(
            "basketSubjects"
        );


    if (!container) return;


    container.innerHTML = "";


    const subjects =
        database.subjects || [];


    const basketSubjects =
        subjects.filter(subject => {

            return subject.category ===
                "Basket Subjects";

        });


    basketSubjects.forEach(subject => {

        container.appendChild(
            createSubjectCard(subject)
        );

    });

}



// =====================================
// TOGGLE BASKET
// =====================================

function toggleBasketSubjects() {

    const container =
        document.getElementById(
            "basketSubjects"
        );


    const button =
        document.getElementById(
            "basketToggle"
        );


    basketOpened =
        !basketOpened;


    if (basketOpened) {

        container.classList.add(
            "show"
        );


        button.innerHTML = `
            <span>
                Hide Subjects
            </span>

            <b>
                ↑
            </b>
        `;


        setTimeout(() => {

            container.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

        }, 100);

    } else {

        container.classList.remove(
            "show"
        );


        button.innerHTML = `
            <span>
                View Subjects
            </span>

            <b>
                ↓
            </b>
        `;

    }

}



// =====================================
// GRADE FILTER
// =====================================

function selectGrade(grade) {

    const section =
        document.getElementById(
            "paperSection"
        );


    const title =
        document.getElementById(
            "paperTitle"
        );


    section.style.display =
        "block";


    title.innerText =
        "Grade " + grade + " Papers";


    const filtered =
        papers.filter(
            paper =>
                String(paper.grade) ===
                String(grade)
        );


    renderPapers(filtered);


    section.scrollIntoView({
        behavior: "smooth"
    });

}



// =====================================
// SUBJECT FILTER
// =====================================

function openSubject(
    subjectName,
    subjectCode = ""
) {

    const section =
        document.getElementById(
            "paperSection"
        );


    const title =
        document.getElementById(
            "paperTitle"
        );


    section.style.display =
        "block";


    title.innerText =
        subjectName + " Papers";


    const filtered =
        papers.filter(paper => {

            if (subjectCode) {

                return (

                    paper.subjectCode ===
                    subjectCode

                    ||

                    paper.subject ===
                    subjectName

                );

            }


            return (
                paper.subject ===
                subjectName
            );

        });


    renderPapers(filtered);


    section.scrollIntoView({
        behavior: "smooth"
    });

}



// =====================================
// CATEGORY FILTER
// =====================================

function showCategory(category) {

    const section =
        document.getElementById(
            "paperSection"
        );


    const title =
        document.getElementById(
            "paperTitle"
        );


    section.style.display =
        "block";


    title.innerText =
        category + " Subjects";


    const subjectList =
        (database.subjects || [])
        .filter(
            subject =>
                subject.category ===
                category
        );


    const names =
        subjectList.map(
            subject =>
                subject.name
        );


    const filtered =
        papers.filter(
            paper =>
                names.includes(
                    paper.subject
                )
        );


    renderPapers(filtered);


    section.scrollIntoView({
        behavior: "smooth"
    });

}



// =====================================
// PAPER TYPE
// =====================================

function showPapers(type) {

    const section =
        document.getElementById(
            "paperSection"
        );


    const title =
        document.getElementById(
            "paperTitle"
        );


    section.style.display =
        "block";


    title.innerText =
        type;


    const filtered =
        papers.filter(
            paper =>
                paper.type === type
        );


    renderPapers(filtered);


    section.scrollIntoView({
        behavior: "smooth"
    });

}



// =====================================
// PROVINCE
// =====================================

function showProvince(province) {

    const section =
        document.getElementById(
            "paperSection"
        );


    const title =
        document.getElementById(
            "paperTitle"
        );


    section.style.display =
        "block";


    title.innerText =
        province;


    const filtered =
        papers.filter(
            paper =>
                paper.province ===
                province
        );


    renderPapers(filtered);


    section.scrollIntoView({
        behavior: "smooth"
    });

}



// =====================================
// RENDER PAPERS
// =====================================

function renderPapers(list) {

    const results =
        document.getElementById(
            "paperResults"
        );


    if (!results) return;


    if (
        !list ||
        list.length === 0
    ) {

        results.innerHTML = `

            <div class="paper-card">

                <h3>
                    📂 No papers available yet
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
                        📄 View Paper
                    </button>

                  `

                : `

                    <button
                        class="btn view"
                        onclick="
                            showMessage(
                                'Paper PDF has not been added yet.'
                            )
                        "
                    >
                        📄 View Paper
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
                        ✓ Marking Scheme
                    </button>

                  `

                : `

                    <button
                        class="btn marking"
                        onclick="
                            showMessage(
                                'Marking Scheme has not been added yet.'
                            )
                        "
                    >
                        ✓ Marking Scheme
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



// =====================================
// SEARCH
// =====================================

function searchPapers() {

    const input =
        document.getElementById(
            "searchBox"
        );


    if (!input) return;


    const query =
        input.value
            .toLowerCase()
            .trim();


    const section =
        document.getElementById(
            "paperSection"
        );


    if (!query) {

        section.style.display =
            "none";

        return;

    }


    const filtered =
        papers.filter(paper => {

            const text = [

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


            return text.includes(
                query
            );

        });


    section.style.display =
        "block";


    document.getElementById(
        "paperTitle"
    ).innerText =
        "Search Results";


    renderPapers(filtered);

}



// =====================================
// CLOSE RESULTS
// =====================================

function closeResults() {

    const section =
        document.getElementById(
            "paperSection"
        );


    section.style.display =
        "none";

}



// =====================================
// SCROLL TOP
// =====================================

function scrollToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}



// =====================================
// MESSAGE
// =====================================

function showMessage(message) {

    alert(message);

}



// =====================================
// START
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadDatabase();

    }
);
