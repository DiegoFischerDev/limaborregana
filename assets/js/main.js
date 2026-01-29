// Comportamento geral do site (menu, scroll, etc)
// Web3Forms: obtém o Access Key em web3forms.com e coloca aqui (envia para o email que definires no painel)
const WEB3FORMS_ACCESS_KEY = 'e69a0e03-d178-4b3c-b9a0-1b0488c0b609';
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização do site
    console.log('Lima Borregana - Site carregado');
    
    // ============================================
    // MENU MOBILE
    // ============================================
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            
            // Anima o ícone do hamburger
            const spans = this.querySelectorAll('span');
            if (navbarMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Fecha o menu ao clicar em um link
        const navbarLinks = navbarMenu.querySelectorAll('a');
        navbarLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navbarMenu.classList.remove('active');
                    const spans = navbarToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }
    
    // ============================================
    // DROPDOWN MENU
    // ============================================
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('.navbar-link');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        if (dropdownLink && dropdownMenu) {
            // Desktop: hover
            if (window.innerWidth > 768) {
                dropdown.addEventListener('mouseenter', function() {
                    dropdown.classList.add('active');
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    dropdown.classList.remove('active');
                });
            }
            
            // Mobile: click
            if (window.innerWidth <= 768) {
                dropdownLink.addEventListener('click', function(e) {
                    // Só previne default se o link não tiver href válido ou for apenas #
                    const href = this.getAttribute('href');
                    if (!href || href === '#' || href.startsWith('#')) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                        
                        // Fecha outros dropdowns
                        dropdowns.forEach(otherDropdown => {
                            if (otherDropdown !== dropdown) {
                                otherDropdown.classList.remove('active');
                            }
                        });
                    }
                    // Se tiver href válido (link para outra página), deixa navegar normalmente
                });
            }
        }
    });
    
    // ============================================
    // SMOOTH SCROLL
    // ============================================
    const header = document.querySelector('.main-header');
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignora links vazios ou apenas #
            if (href === '#' || href === '') {
                return;
            }
            
            // Só aplica smooth scroll se o link for da mesma página
            if (href.startsWith('#')) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // Se não for âncora, deixa o navegador seguir o link normalmente
        });
    });
    
    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observa elementos para animação
    const animatedElements = document.querySelectorAll('.shortcut-card, .why-feature, .presence-region, .about-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ============================================
    // SHORTCUT CARDS INTERACTION
    // ============================================
    const shortcutCards = document.querySelectorAll('.shortcut-card');
    
    shortcutCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ============================================
    // FORM VALIDATION (básico)
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !phone || !message) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            const subjectValue = document.getElementById('subject').value;
            const subjectLabels = {
                imigracao: 'Imigração e Residência',
                financas: 'Finanças & Investimentos',
                empresa: 'Abrir Empresa',
                estudante: 'Vistos de Estudante',
                outro: 'Outro'
            };
            const subjectLabel = subjectLabels[subjectValue] || subjectValue;
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A enviar...';
            
            var web3formsNotConfigured = !WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === 'REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY';
            
            if (web3formsNotConfigured) {
                var emailSubject = 'Contacto Lima Borregana - ' + subjectLabel;
                var emailBody = 'Nome: ' + name + '\nEmail: ' + email + '\nTelefone: ' + phone + '\nAssunto: ' + subjectLabel + '\n\nMensagem:\n' + message;
                window.location.href = 'mailto:diegofischer.dev@gmail.com?subject=' + encodeURIComponent(emailSubject) + '&body=' + encodeURIComponent(emailBody);
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                return;
            }
            
            var payload = {
                access_key: WEB3FORMS_ACCESS_KEY,
                name: name,
                email: email,
                phone: phone,
                subject: 'Contacto Lima Borregana - ' + subjectLabel,
                message: message
            };
            
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            })
                .then(function(response) { return response.json(); })
                .then(function(data) {
                    if (data.success) {
                        submitButton.innerHTML = '<i class="fas fa-check"></i> Enviado!';
                        submitButton.style.background = '#25D366';
                        contactForm.reset();
                        setTimeout(function() {
                            submitButton.innerHTML = originalText;
                            submitButton.disabled = false;
                            submitButton.style.background = '';
                        }, 3000);
                    } else {
                        throw new Error(data.message || 'Erro ao enviar');
                    }
                })
                .catch(function(err) {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    alert('Não foi possível enviar a mensagem. Tente novamente ou contacte-nos por WhatsApp.');
                    console.error('Web3Forms:', err);
                });
        });
    }
    
    // ============================================
    // RESPONSIVE DROPDOWN HANDLING
    // ============================================
    window.addEventListener('resize', function() {
        // Remove active class de dropdowns em mobile quando redimensiona para desktop
        if (window.innerWidth > 768) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // ============================================
    // PERFORMANCE OPTIMIZATIONS
    // ============================================
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     (window.innerWidth <= 768);
    
    // Reduz animações em mobile
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
    
    // Previne zoom duplo toque em iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});
