// Aguarda todo o HTML (DOM) ser carregado antes de rodar os scripts
// Essa é uma excelente prática de arquitetura front-end
document.addEventListener('DOMContentLoaded', () => {

    // ==================================================
    // 1. Lógica do Contador Eterno
    // ==================================================
    const startDate = new Date('2008-12-26T03:55:00'); // Lembre-se de alterar a data!

    function updateCounter() {
        // Verifica se os elementos existem antes de tentar atualizá-los
        const yearsEl = document.getElementById('years');
        if (!yearsEl) return; // Se não achar o contador na tela, aborta a função sem gerar erro

        const now = new Date();
        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();
        let hours = now.getHours() - startDate.getHours();
        let minutes = now.getMinutes() - startDate.getMinutes();
        let seconds = now.getSeconds() - startDate.getSeconds();

        if (seconds < 0) { seconds += 60; minutes--; }
        if (minutes < 0) { minutes += 60; hours--; }
        if (hours < 0) { hours += 24; days--; }
        if (days < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) { months += 12; years--; }

        const formatNumber = (num) => String(num).padStart(2, '0');

        yearsEl.textContent = formatNumber(years);
        document.getElementById('months').textContent = formatNumber(months);
        document.getElementById('days').textContent = formatNumber(days);
        document.getElementById('hours').textContent = formatNumber(hours);
        document.getElementById('minutes').textContent = formatNumber(minutes);
        document.getElementById('seconds').textContent = formatNumber(seconds);
    }

    updateCounter();
    setInterval(updateCounter, 1000);

    // ==================================================
    // 2. Lógica da Galeria e Modal
    // ==================================================
    const carousel = document.getElementById('carousel');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalText = document.getElementById('modal-text');
    const closeModal = document.querySelector('.close-modal');

    // Só executa se o carrossel e o modal existirem no HTML
    if (carousel && modal) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let isDragging = false;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            isDragging = false;
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => { isDown = false; });
        carousel.addEventListener('mouseup', () => { isDown = false; });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            
            // Aqui está a correção: O usuário precisa arrastar mais de 5 pixels 
            // para considerarmos que não foi um simples clique (evita o problema da mão trêmula)
            if (Math.abs(walk) > 5) {
                isDragging = true; 
            }
            
            carousel.scrollLeft = scrollLeft - walk;
        });

        carouselItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (isDragging) {
                    e.preventDefault();
                    return;
                }

                const img = item.querySelector('img');
                if (img) {
                    modalImg.src = img.src;
                    // Pega o texto. Se não houver data-description, mostra um texto padrão
                    modalText.textContent = img.getAttribute('data-description') || "Uma lembrança especial.";
                    modal.classList.add('show');
                }
            });
        });

        closeModal.addEventListener('click', () => modal.classList.remove('show'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('show');
        });
    } else {
        console.warn("Aviso: Carrossel ou Modal não encontrados no HTML.");
    }

    // ==================================================
    // 3. Efeito de Fundo: Partículas Flutuantes
    // ==================================================
    function createParticles() {
        const bg = document.getElementById('particles-bg');
        
        // Proteção: Se a div #particles-bg foi deletada do HTML, avisamos e paramos sem quebrar o site
        if (!bg) {
            console.warn("Aviso: Div com id 'particles-bg' não encontrada no HTML.");
            return; 
        }

        const particleCount = 25; 

        for (let i = 0; i < particleCount; i++) {
            let particle = document.createElement('div');
            particle.classList.add('particle');
            
            let size = Math.random() * 8 + 4; 
            let posX = Math.random() * 100; 
            let delay = Math.random() * 10; 
            let duration = Math.random() * 10 + 10; 

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}vw`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;

            bg.appendChild(particle);
        }
    }

    createParticles();

}); // Fim do DOMContentLoaded