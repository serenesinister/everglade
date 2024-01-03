$(document).ready(function () {
    var currentIndex = 0;
    var slides = $('.slide');
    var totalSlides = slides.length;
    var slideWidth = 100;
    var slideInterval;

    function showSlide(index) {
        var slideWidth = $('.slide').width();
        var translateValue = -index * slideWidth + 'px';
    
        // Mova os slides horizontalmente
        $('.slides').css('transform', 'translateX(' + translateValue + ')');
    
        // Atualize os pontos indicadores
        updateDots(index);
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    }

    function createDots() {
        var dotsContainer = $('.dots');
        for (var i = 0; i < totalSlides; i++) {
            dotsContainer.append('<span class="dot"></span>');
        }
        updateDots(currentIndex);
    }

    function updateDots(index) {
        $('.dot').removeClass('active');
        $('.dot').eq(index).addClass('active');
    }

    // Inicialização
    createDots();
    showSlide(currentIndex);

    // Adiciona eventos para os botões de próximo e anterior
    $('.slider').append('<button class="prev">Prev</button><button class="next">Next</button>');
    $('.next').click(nextSlide);
    $('.prev').click(prevSlide);

    // Adiciona evento para os dots
    $('.dot').click(function () {
        var dotIndex = $(this).index();
        showSlide(dotIndex);
    });

    // Configura carrossel automático a cada 3 segundos (3000 milissegundos)
    slideInterval = setInterval(nextSlide, 3000);

    // Pára o carrossel quando o mouse passa sobre o slider
    $('.slider').hover(
        function () {
            clearInterval(slideInterval);
        },
        function () {
            slideInterval = setInterval(nextSlide, 3000);
        }
    );
});
