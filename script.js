document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const closeButton = document.querySelector('.close');
    const submitButton = document.getElementById('submit-answer');
    const nextButton = document.getElementById('next-question');
    const personSelect = document.getElementById('person-select');
    const feedbackMessage = document.getElementById('feedback-message');
    const images = document.querySelectorAll('.image-gallery img');

    const imageToAnswerMap = {
        "alan-turing.jpg": "Alan Turing",
        "Charles-Babbage.jpg": "Charles Babbage",
        "dabbalaBreddy.jpg": "Dabbala Breddy",
        "DavidDeutsch.jpg": "David Deutsch",
        "Dennis-Ritchie.jpg": "Dennis Ritchie",
        "JamesGosling.jpg": "James Gosling",
        "VintCerf.jpg": "Vint Cerf",
        "TimBernersLee.jpg": "Tim Berners-Lee",
        "Markov.jpg": "Andrey Markov",
        "linusTorvalds.jpg": "Linus Torvalds",
        "Newton.jpg": "Isaac Newton",
        "martinHellman.jpg": "Martin Hellman",
        "GuidovanRossum.jpg": "Guido van Rossum",
        "EdsgerWDijksta.jpg": "Edsger",
        "Euclid.jpg": "Euclid",
        "geoffreyhintonneuralNtk.jpg": "Geoffrey",
        "kenthompson.jpg": "Kent Thompson",
        "larrypage.jpg": "Larry Page",
        "leslieLamport.jpg": "Leslie Lamport",
        "liskovBarbara.jpg": "Barbara Liskov",
        "markzuckerberg.jpg": "Mark Zuckerberg",
        "MartinCooper.jpg": "Martin Cooper",
        "Vitalik.jpg": "Vitalik"
    };

    const allImages = Object.keys(imageToAnswerMap);
    const allNames = Object.values(imageToAnswerMap);
    let currentImageFile = '';

    images.forEach(image => {
        image.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImage.src = image.src;
            currentImageFile = image.src.split('/').pop();
            populateDropdownOptions();
            feedbackMessage.style.display = 'none';
            nextButton.style.display = 'none';
        });
    });

    setTimeout(() => {
        loadRandomQuestion();
        modal.style.display = 'block';
    }, 3000);

    function loadRandomQuestion() {
        const randomImage = getRandomImage();
        currentImageFile = randomImage;
        modalImage.src = randomImage;
        populateDropdownOptions();
        feedbackMessage.style.display = 'none';
        nextButton.style.display = 'none';
    }

    function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * allImages.length);
        return allImages[randomIndex];
    }

    function populateDropdownOptions() {
        const correctAnswer = imageToAnswerMap[currentImageFile];
        const wrongAnswers = getRandomWrongAnswers(correctAnswer);
        const options = [correctAnswer, ...wrongAnswers];
        shuffleArray(options);

        personSelect.innerHTML = '<option value="" disabled selected>-- Select Your Answer --</option>';
        options.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            personSelect.appendChild(option);
        });
    }

    function getRandomWrongAnswers(correctAnswer) {
        const wrongAnswers = allNames.filter(name => name !== correctAnswer);
        const selected = [];
        while (selected.length < 3) {
            const randomIndex = Math.floor(Math.random() * wrongAnswers.length);
            const answer = wrongAnswers[randomIndex];
            if (!selected.includes(answer)) selected.push(answer);
        }
        return selected;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    submitButton.addEventListener('click', () => {
        const selectedAnswer = personSelect.value;
        const correctAnswer = imageToAnswerMap[currentImageFile];

        if (selectedAnswer === correctAnswer) {
            feedbackMessage.textContent = 'Correct Answer!';
            feedbackMessage.style.color = 'green';
        } else {
            feedbackMessage.textContent = `Wrong Answer! The correct answer is ${correctAnswer}.`;
            feedbackMessage.style.color = 'red';
        }
        feedbackMessage.style.display = 'block';
        nextButton.style.display = 'inline-block';
    });

    nextButton.addEventListener('click', () => {
        loadRandomQuestion();
    });

    closeButton.addEventListener('click', resetQuizState);

    window.addEventListener('click', (event) => {
        if (event.target === modal) resetQuizState();
    });

    function resetQuizState() {
        modal.style.display = 'none';
        personSelect.value = '';
        feedbackMessage.style.display = 'none';
        nextButton.style.display = 'none';
    }
    window.addEventListener('resize', () => {
        modal.style.top = `${window.innerHeight / 2}px`;
        modal.style.left = `${window.innerWidth / 2}px`;
    });
    
});
