/*
 * Sıradan Tilki - Etkileşimler
 * Tüm site davranışları bu dosyada tutulur.
 */

// Gezinti çubuğu kaydırma efekti
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }
        });

        // Mobil menü açma/kapatma
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        let menuOpen = false;

        mobileMenuBtn.addEventListener('click', () => {
            menuOpen = !menuOpen;
            if (menuOpen) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('visible');
                mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark text-lg"></i>';
            } else {
                mobileMenu.classList.remove('visible');
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars text-lg"></i>';
            }
        });

        // Bağlantıya tıklanınca mobil menüyü kapat
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuOpen = false;
                mobileMenu.classList.remove('visible');
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars text-lg"></i>';
            });
        });

        // Kaydırırken görünür olma animasyonu
        const revealElements = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {threshold: 0.1, rootMargin: '0px 0px -50px 0px'});

        revealElements.forEach(el => revealObserver.observe(el));

        // Sayaç animasyonu
        const counters = document.querySelectorAll('.counter-value');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.target);
                    const duration = 2000;
                    const start = performance.now();

                    const updateCounter = (now) => {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(easeOut * target);

                        if (target >= 1000) {
                            entry.target.textContent = (current / 1000).toFixed(current >= 10000 ? 0 : 1) + 'K';
                        } else {
                            entry.target.textContent = current + '+';
                        }

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            if (target >= 1000) {
                                entry.target.textContent = (target / 1000).toFixed(target >= 10000 ? 0 : 1) + 'K';
                            } else {
                                entry.target.textContent = target + '+';
                            }
                        }
                    };

                    requestAnimationFrame(updateCounter);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, {threshold: 0.5});

        counters.forEach(counter => counterObserver.observe(counter));

        // Sohbet kutusu
        const chatToggle = document.getElementById('chatToggle');
        const chatWindow = document.getElementById('chatWindow');
        const closeChat = document.getElementById('closeChat');
        const chatInput = document.getElementById('chatInput');
        const sendMessage = document.getElementById('sendMessage');
        const chatMessages = document.getElementById('chatMessages');

        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('open');
            chatWindow.classList.toggle('closed');
        });

        closeChat.addEventListener('click', () => {
            chatWindow.classList.remove('open');
            chatWindow.classList.add('closed');
        });

        const botResponses = {
            'merhaba': 'Merhaba! Size nasıl yardımcı olabilirim?',
            'selam': 'Selam! Hoş geldiniz!',
            'nasılsın': 'Ben bir botum, her zaman iyiyim! Siz nasılsınız?',
            'videolar': 'Videolarımı YouTube kanalımda bulabilirsiniz! Yukarıdaki "İçerikleri Keşfet" butonuna tıklayabilirsiniz.',
            'video': 'Videolarımı YouTube kanalımda bulabilirsiniz! Yukarıdaki "İçerikleri Keşfet" butonuna tıklayabilirsiniz.',
            'abone': 'Kanalıma abone olmak için YouTube\'a gidip "Abone Ol" butonuna tıklayabilirsiniz!',
            'iletişim': 'Bana iletişim formundan veya sosyal medya hesaplarımdan ulaşabilirsiniz!',
            'sosyal': 'Beni YouTube, Twitter, Instagram ve Discord\'da takip edebilirsiniz!',
            'discord': 'Discord sunucuma katılmak için sosyal medya bağlantılarımı kontrol edin!',
            'instagram': 'Instagram hesabım: @siradantilki',
            'twitter': 'Twitter hesabım: @siradantilki',
            'youtube': 'YouTube kanalım: youtube.com/@siradantilki',
            'iş birliği': 'İş birliği teklifleri için iletişim formunu doldurabilirsiniz!',
            'işbirliği': 'İş birliği teklifleri için iletişim formunu doldurabilirsiniz!',
            'teşekkür': 'Rica ederim! Başka bir sorunuz var mı?',
            'teşekkürler': 'Rica ederim! Başka bir sorunuz var mı?',
            'görüşürüz': 'Görüşürüz! İyi günler dilerim!',
            'bay': 'Bay bay! Kendinize iyi bakın!',
            'saat': () => `Şu an saat ${new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute: '2-digit'})}.`,
            'tarih': () => `Bugün ${new Date().toLocaleDateString('tr-TR', {day: 'numeric', month: 'long', year: 'numeric'})}.`,
        };

        function addMessage(text, isUser = false) {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'flex gap-2.5 message-in';

            if (isUser) {
                msgDiv.innerHTML = `
                    <div class="flex-1 flex justify-end">
                        <div class="bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm max-w-[80%]">
                            <p class="text-sm text-white leading-relaxed">${escapeHtml(text)}</p>
                        </div>
                    </div>
                `;
            } else {
                msgDiv.innerHTML = `
                    <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center flex-shrink-0">
                        <i class="fa-solid fa-fox text-white text-xs"></i>
                    </div>
                    <div class="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-slate-100 max-w-[80%]">
                        <p class="text-sm text-slate-700 leading-relaxed">${text}</p>
                    </div>
                `;
            }

            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function showTyping() {
            const typingDiv = document.createElement('div');
            typingDiv.id = 'typingIndicator';
            typingDiv.className = 'flex gap-2.5 message-in';
            typingDiv.innerHTML = `
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center flex-shrink-0">
                    <i class="fa-solid fa-fox text-white text-xs"></i>
                </div>
                <div class="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-slate-100">
                    <div class="flex gap-1">
                        <div class="w-2 h-2 rounded-full bg-slate-300 typing-dot"></div>
                        <div class="w-2 h-2 rounded-full bg-slate-300 typing-dot"></div>
                        <div class="w-2 h-2 rounded-full bg-slate-300 typing-dot"></div>
                    </div>
                </div>
            `;
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function removeTyping() {
            const typing = document.getElementById('typingIndicator');
            if (typing) typing.remove();
        }

        function getBotResponse(text) {
            const lowerText = text.toLowerCase();

            for (const [key, response] of Object.entries(botResponses)) {
                if (lowerText.includes(key)) {
                    return typeof response === 'function' ? response() : response;
                }
            }

            return 'Anladım! Daha fazla bilgi için iletişim formunu kullanabilir veya yukarıdaki hızlı yanıtlardan birini seçebilirsiniz.';
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        function handleSend() {
            const text = chatInput.value.trim();
            if (!text) return;

            addMessage(text, true);
            chatInput.value = '';

            showTyping();

            setTimeout(() => {
                removeTyping();
                addMessage(getBotResponse(text));
            }, 1200 + Math.random() * 800);
        }

        sendMessage.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });

        function sendQuickReply(text) {
            chatInput.value = text;
            handleSend();
        }

        // İletişim formu
        const contactForm = document.getElementById('contactForm');
        const toast = document.getElementById('toast');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast();
            contactForm.reset();
        });

        function showToast() {
            toast.classList.add('show');
            setTimeout(hideToast, 4000);
        }

        function hideToast() {
            toast.classList.remove('show');
        }

        // Çapa bağlantıları için yumuşak kaydırma
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({top: targetPosition, behavior: 'smooth'});
                }
            });
        });

        // Dışarı tıklanınca sohbeti kapat
        document.addEventListener('click', (e) => {
            if (!chatWindow.contains(e.target) && !chatToggle.contains(e.target) && chatWindow.classList.contains('open')) {
                chatWindow.classList.remove('open');
                chatWindow.classList.add('closed');
            }
        });


// Vlog video penceresi
const videoModal = document.getElementById('videoModal');
const videoModalFrame = document.getElementById('videoModalFrame');
const videoModalTitle = document.getElementById('videoModalTitle');
const videoModalClose = document.getElementById('videoModalClose');
const videoOpenButtons = document.querySelectorAll('.video-open-btn');

function openVideoModal(videoId, title) {
    if (!videoModal || !videoModalFrame) return;

    videoModalTitle.textContent = title || 'Video';
    videoModalFrame.title = title || 'YouTube Video';
    videoModalFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    videoModal.classList.add('open');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('video-modal-open');
}

function closeVideoModal() {
    if (!videoModal || !videoModalFrame) return;

    videoModal.classList.remove('open');
    videoModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('video-modal-open');
    videoModalFrame.src = '';
}

videoOpenButtons.forEach(button => {
    button.addEventListener('click', () => {
        openVideoModal(button.dataset.videoId, button.dataset.videoTitle);
    });
});

videoModalClose?.addEventListener('click', closeVideoModal);
videoModal?.querySelector('[data-video-close]')?.addEventListener('click', closeVideoModal);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && videoModal?.classList.contains('open')) {
        closeVideoModal();
    }
});
