alert("This page is under testing, contact the site developer if any issues with this application occurs")
document.addEventListener('DOMContentLoaded', function() {
    // --- DATA ---
    const areas = [
        {
            title: "Waiting Room & Reception",
            id: "waiting-room",
            items: [
                "Floors clean, dry, and free of debris",
                "Furniture and upholstery clean and in good repair",
                "Magazines and reading materials neat",
                "Reception desk and counter sanitized",
                "Entrance glass clean and smudge-free"
            ]
        },
        {
            title: "Exam Rooms",
            id: "exam-rooms",
            items: [
                "Exam table sanitized and freshly papered",
                "Countertops and sinks disinfected",
                "Floors and baseboards clean",
                "Waste receptacles emptied and liners replaced",
                "Medical instruments properly sterilized/stored"
            ]
        },
        {
            title: "Restrooms",
            id: "restrooms",
            items: [
                "Toilets and urinals clean and sanitized",
                "Sinks, counters, and mirrors clean",
                "Floors clean and dry",
                "Soap dispensers and paper towels restocked",
                "Trash emptied and liners replaced"
            ]
        },
        {
            title: "Staff Areas (Break Room/Offices)",
            id: "staff-areas",
            items: [
                "Floors clean",
                "Tables and chairs wiped down",
                "Countertops and sinks clean",
                "Appliances (microwave, fridge) clean",
                "General tidiness and organization"
            ]
        }
    ];

    // --- RENDER AREAS ---
    const scoringSectionsContainer = document.getElementById('scoringSections');
    
    function renderScoringSections() {
        let html = '';
        areas.forEach(area => {
            html += `
                <div class="area-scoring bg-white p-6 rounded-xl shadow-md mb-6" data-area-id="${area.id}">
                    <h3 class="title-area-scoring text-xl font-semibold text-gray-700 mb-4">${area.title}</h3>
                    <div class="items-scoring space-y-4">
            `;
            area.items.forEach((item, index) => {
                html += `
                    <div class="item-scoring flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 border-b last:border-b-0">
                        <p class="label-item-scoring text-gray-600 mb-2 sm:mb-0 flex-1 pr-4">${item}</p>
                        <div class="stars-scoring flex items-center">
                            <div class="star-rating" data-area="${area.id}" data-item-index="${index}">
                                <span class="star text-2xl" data-value="1">&#9733;</span>
                                <span class="star text-2xl" data-value="2">&#9733;</span>
                                <span class="star text-2xl" data-value="3">&#9733;</span>
                                <span class="star text-2xl" data-value="4">&#9733;</span>
                                <span class="star text-2xl" data-value="5">&#9733;</span>
                            </div>
                            <input type="hidden" class="rating-value" value="0">
                        </div>
                    </div>
                `;
            });
            html += `
                    </div>
                     <div class="comments-scoring mt-4">
                        <label for="comments-${area.id}" class="label-comments-scoring block text-sm font-medium text-gray-700">Comments</label>
                        <textarea id="comments-${area.id}" rows="2" class="textarea-comments-scoring mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
                    </div>
                </div>
            `;
        });
        scoringSectionsContainer.innerHTML = html;
    }

    // --- EVENT LISTENERS ---
    function setupEventListeners() {
        // Star rating interaction
        scoringSectionsContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('star')) {
                const parent = e.target.parentElement;
                const value = e.target.getAttribute('data-value');
                const stars = parent.querySelectorAll('.star');
                const ratingInput = parent.nextElementSibling;

                ratingInput.value = value;

                stars.forEach(star => {
                    star.classList.remove('selected');
                    if (star.getAttribute('data-value') <= value) {
                        star.classList.add('selected');
                    }
                });
            }
        });

        document.getElementById('calculateScoreBtn').addEventListener('click', calculateScore);
        document.getElementById('resetBtn').addEventListener('click', resetForm);
        document.getElementById('saveBtn').addEventListener('click', saveAndPrint);
    }

    // --- FUNCTIONS ---
    function calculateScore() {
        let totalScore = 0;
        const ratingInputs = document.querySelectorAll('.rating-value');
        const maxPossibleScore = areas.reduce((acc, area) => acc + area.items.length * 5, 0);

        ratingInputs.forEach(input => {
            const value = parseInt(input.value, 10);
            totalScore += isNaN(value) ? 0 : value;
        });

        document.getElementById('totalScore').textContent = `${totalScore} / ${maxPossibleScore}`;
        
        const percentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0;
        const ratingDiv = document.getElementById('overallRating');
        
        ratingDiv.classList.remove('bg-green-100', 'text-green-800', 'bg-yellow-100', 'text-yellow-800', 'bg-red-100', 'text-red-800');

        if (percentage >= 90) {
            ratingDiv.textContent = 'Excellent';
            ratingDiv.classList.add('bg-green-100', 'text-green-800');
        } 
        else if (percentage >= 70) {
            ratingDiv.textContent = 'Good';
            ratingDiv.classList.add('bg-yellow-100', 'text-yellow-800');
        } 
        else {
            ratingDiv.textContent = 'Needs Improvement';
            ratingDiv.classList.add('bg-red-100', 'text-red-800');
        }
    }
    
    function resetForm() {
        document.getElementById('inspectorName').value = '';
        document.getElementById('inspectionDate').value = '';
        document.getElementById('officeLocation').value = '';

        document.querySelectorAll('textarea').forEach(textarea => textarea.value = '');
        
        const ratingInputs = document.querySelectorAll('.rating-value');
        ratingInputs.forEach(input => input.value = '0');

        const allStars = document.querySelectorAll('.star');
        allStars.forEach(star => star.classList.remove('selected'));

        document.getElementById('totalScore').textContent = '0 / 20'; // always show correct denominator
        const ratingDiv = document.getElementById('overallRating');
        ratingDiv.textContent = '-';
        ratingDiv.classList.remove('bg-green-100', 'text-green-800', 'bg-yellow-100', 'text-yellow-800', 'bg-red-100', 'text-red-800');
    }
    
    function saveAndPrint() {
        calculateScore(); // Ensure score is up to date
        
        const inspectorName = document.getElementById('inspectorName').value || 'N/A';
        const inspectionDate = document.getElementById('inspectionDate').value || 'N/A';
        const officeLocation = document.getElementById('officeLocation').value || 'N/A';
        const totalScoreText = document.getElementById('totalScore').textContent;
        const overallRatingText = document.getElementById('overallRating').textContent;
        
        let reportHTML = `
            <div class="p-8">
                <h1 class="text-3xl font-bold text-center mb-2 text-blue-700">Cleaning Inspection Report</h1>
                <hr class="my-4">
                <div class="grid grid-cols-3 gap-4 mb-6 text-sm">
                    <div><strong>Inspector:</strong> ${inspectorName}</div>
                    <div><strong>Date:</strong> ${inspectionDate}</div>
                    <div><strong>Location:</strong> ${officeLocation}</div>
                </div>
                 <div class="text-center bg-gray-100 p-4 rounded-lg my-6">
                    <span class="font-bold text-lg">Overall Score: ${totalScoreText}</span> | 
                    <span class="font-bold text-lg">Rating: ${overallRatingText}</span>
                </div>
                <hr class="my-4">
        `;
        
        areas.forEach(area => {
            reportHTML += `<h2 class="text-xl font-bold mt-6 mb-2 text-gray-800">${area.title}</h2>`;
            
            const areaContainer = document.querySelector(`[data-area-id="${area.id}"]`);
            area.items.forEach((item, index) => {
                const ratingInput = areaContainer.querySelector(`[data-item-index="${index}"]`).nextElementSibling;
                let ratingValue = parseInt(ratingInput.value, 10);
                ratingValue = isNaN(ratingValue) ? 0 : ratingValue;
                reportHTML += `
                    <div class="flex justify-between items-center py-1 border-b">
                        <span>${item}</span>
                        <span class="font-semibold">${ratingValue} / 5</span>
                    </div>
                `;
            });
            
            const comments = document.getElementById(`comments-${area.id}`).value;
            if (comments) {
                reportHTML += `<div class="mt-3 p-2 bg-gray-50 rounded-md"><strong>Comments:</strong> ${comments}</div>`;
            }
        });

        reportHTML += `</div>`;

        const printSection = document.getElementById('printSection');
        if (!printSection) {
            // Create one if missing
            const div = document.createElement('div');
            div.id = 'printSection';
            div.style.display = 'none';
            document.body.appendChild(div);
        }

        // Fill and display
        const printSectionDiv = document.getElementById('printSection');
        printSectionDiv.innerHTML = reportHTML;
        printSectionDiv.style.display = 'block';

        // Print only the printSection
        const css = `
        <style>
        @media print {
          body * { visibility: hidden !important; }
          #printSection, #printSection * { visibility: visible !important; }
          #printSection { position: absolute; left: 0; top: 0; width: 100vw; }
        }
        </style>`;
        printSectionDiv.insertAdjacentHTML('afterbegin', css);

        window.print();

        setTimeout(() => {
            printSectionDiv.style.display = 'none';
            printSectionDiv.innerHTML = '';
        }, 1000); // give print dialog time
    }

    // --- INITIALIZATION ---
    renderScoringSections();
    setupEventListeners();
});
