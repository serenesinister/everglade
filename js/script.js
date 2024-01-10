document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    const slides = Array.from(document.querySelectorAll('.slide'));
    const totalSlides = slides.length;
    const slideWidth = 100;
    let slideInterval;

    const showSlide = index => {
        const translateValue = -index * slideWidth;
        document.querySelector('.slides').style.transform = `translateX(${translateValue}%)`;
        updateDots(index);
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
        restartInterval();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
        restartInterval();
    };

    const createDots = () => {
        const dotsContainer = document.querySelector('.dots');
        dotsContainer.innerHTML = Array.from({ length: totalSlides }, (_, index) => `<span class="dot" data-index="${index}"></span>`).join('');
        updateDots(currentIndex);
    };

    const updateDots = index => {
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        document.querySelector(`.dot[data-index="${index}"]`).classList.add('active');
    };

    const restartInterval = () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 3000);
    };

    createDots();
    showSlide(currentIndex);

    const slider = document.querySelector('.slider');
    slider.innerHTML += '<button class="prev">Prev</button><button class="next">Next</button>';

    slider.addEventListener('click', event => {
        if (event.target.classList.contains('next')) {
            nextSlide();
        } else if (event.target.classList.contains('prev')) {
            prevSlide();
        } else if (event.target.classList.contains('dot')) {
            const dotIndex = parseInt(event.target.dataset.index, 10);
            showSlide(dotIndex);
            restartInterval();
        }
    });

    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', restartInterval);

    // Inicializa o carrossel automático
    slideInterval = setInterval(nextSlide, 3000);
});

const loadSection = sectionName => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("content-container").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", `${sectionName}.html`, true);
    xhttp.send();
};
