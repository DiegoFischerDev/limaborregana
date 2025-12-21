// Comportamento geral do site (menu, scroll, etc)

document.addEventListener('DOMContentLoaded', function() {
    // Inicialização do site
    console.log('Lima Borregana - Site carregado');
    
    // Detecta se é dispositivo móvel
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     (window.innerWidth <= 768);
    
    // Adiciona efeito parallax suave ao scroll (apenas em desktop)
    if (!isMobile) {
        let ticking = false;
        const container = document.querySelector('.construction-container');
        
        function updateParallax() {
            const currentScroll = window.pageYOffset;
            
            if (container && currentScroll < window.innerHeight) {
                const parallaxValue = currentScroll * 0.3;
                container.style.transform = `translateY(${parallaxValue}px)`;
            }
            
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }
    
    // Adiciona interatividade ao logo (apenas em dispositivos com hover)
    const logo = document.querySelector('.logo');
    if (logo && window.matchMedia('(hover: hover)').matches) {
        logo.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
        });
    }
    
    // Previne zoom duplo toque em iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Otimização de performance: reduz animações em dispositivos móveis
    if (isMobile) {
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                * {
                    animation-duration: 0.6s !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

