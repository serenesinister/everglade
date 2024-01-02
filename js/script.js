    $(document).ready(function () {
        var currentIndex = 0;
        var slides = $('.slide');
        var totalSlides = slides.length;

        function showSlide(index) {
            slides.hide();
            slides.eq(index).show();
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            showSlide(currentIndex);
        }

        // Inicialização
        showSlide(currentIndex);

        // Adiciona eventos para os botões de próximo e anterior
        $('.slider').append('<button class="prev">Prev</button><button class="next">Next</button>');
        $('.next').click(nextSlide);
        $('.prev').click(prevSlide);
    });
