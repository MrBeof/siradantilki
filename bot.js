/*
 * Sıradan Tilki Yardımcı Bot
 *
 * BOTU DÜZENLEMEK İÇİN:
 * 1) SITE_BILGILERI bölümündeki site bilgilerini değiştir.
 * 2) BOT_KURALLARI içine yeni konu ekle.
 * 3) keywords: ziyaretçinin söyleyebileceği kelimeler.
 * 4) answers: botun verebileceği cevaplar.
 *
 * Bu yapı yapay zekâ API'si kullanmaz. Tamamen tarayıcı içinde çalışır.
 */
(function () {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const SITE_BILGILERI = {
    kanal: 'Sıradan Tilki',
    youtube: 'https://www.youtube.com/@SıradanTilki',
    email: 'iletisim@siradantilki.com',
    instagram: 'https://www.instagram.com/siradantilki',
    twitter: 'https://www.x.com/@siradantilki',
    video: 'Tilki Askerde! Askerlik Maceram',
    videoUrl: 'https://www.youtube.com/watch?v=lHcWpFzT1P4',
    icerikler: 'Vlog, günlük hayat, teknoloji, oyun, eğlence ve farklı video projeleri.',
    bot: 'Sıradan Tilki Yardımcı Bot',
    kamera: 'DJI Pocket 3',
    mikrofon: 'DJI Mic 2',
    kurgu: 'Adobe Premiere Pro',
    motor: 'Mondial 50 Wing'
  };

  /*
   * BİLGİ BANKASI
   * Buraya yeni soru-cevaplar ekleyebilirsin.
   * keywords alanına farklı soru biçimleri yazmak botun eşleşmesini güçlendirir.
   */
  const BOT_KURALLARI = [
    {
      id: 'selamlama',
      keywords: ['merhaba', 'selam', 'selamlar', 'hey', 'sa', 'günaydın', 'iyi akşamlar', 'iyi geceler', 'naber', 'nasılsın'],
      answers: [
        'Merhaba! 🦊 Ben Sıradan Tilki’nin yardımcı botuyum. Videolar, kanal, iş birliği ve sosyal medya hakkında yardımcı olabilirim.',
        'Selam! 🦊 Ne merak ediyorsun? Bana istediğin soruyu yazabilirsin.',
        'Hoş geldin! 🦊 Sıradan Tilki hakkında bilgi, videolar ve iletişim konularında yardımcı olabilirim.'
      ]
    },
    {
      id: 'hakkinda',
      keywords: ['sıradan tilki kim', 'tilki kim', 'kimsin', 'sıradan tilki hakkında', 'kanal ne hakkında', 'ne yapıyor', 'ne yapıyorsun'],
      answers: [
        'Sıradan Tilki, YouTube üzerinde günlük hayat, vlog, teknoloji, oyun ve eğlence odaklı içerikler üreten bir içerik markasıdır. 🦊',
        'Sıradan Tilki’nin amacı, günlük hayatı ve farklı konuları samimi, eğlenceli ve izlenebilir videolara dönüştürmek.'
      ]
    },
    {
      id: 'icerik-turleri',
      keywords: ['ne tür videolar', 'hangi videolar', 'içerik türleri', 'içerik', 'içerikler', 'vlog', 'teknoloji', 'oyun', 'eğlence', 'günlük hayat'],
      answers: [
        `Kanaldaki içerikler genel olarak ${SITE_BILGILERI.icerikler}`,
        'Vloglardan teknoloji ve eğlence videolarına kadar farklı formatlar var. Yani tek bir kutuya sığmayan bir kanal. 🦊'
      ]
    },
    {
      id: 'videolar',
      keywords: ['video', 'videolar', 'son video', 'favori video', 'askerde', 'askerlik maceram', 'videolar nerede'],
      answers: [
        `Öne çıkan videolardan biri: “${SITE_BILGILERI.video}”.`,
        `Videoları YouTube kanalında bulabilirsin: ${SITE_BILGILERI.youtube}`
      ]
    },
    {
      id: 'askerlik-videosu',
      keywords: ['tilki askerde', 'askerlik videosu', 'askerlik maceram', 'asker videosu'],
      answers: [
        `“${SITE_BILGILERI.video}” videosunu buradan izleyebilirsin: ${SITE_BILGILERI.videoUrl}`,
        'Tilki Askerde videosu içerikler bölümündeki öne çıkan videolardan biri. 🪖🦊'
      ]
    },
    {
      id: 'youtube',
      keywords: ['youtube', 'kanal linki', 'kanal bağlantısı', 'abone', 'abonelik', 'youtube kanalı'],
      answers: [
        `YouTube kanalı: ${SITE_BILGILERI.youtube}`,
        `Sıradan Tilki YouTube: ${SITE_BILGILERI.youtube} 🦊`
      ]
    },
    {
      id: 'isbirligi',
      keywords: ['iş birliği', 'işbirliği', 'sponsor', 'sponsorluk', 'reklam', 'marka', 'tanıtım', 'ortaklık', 'reklam vermek'],
      answers: [
        `İş birliği için ${SITE_BILGILERI.email} adresine yazabilirsin. Mesajına marka, proje ve teklif detaylarını eklemen iyi olur.`,
        `Sponsorluk ve iş birliği talepleri için e-posta: ${SITE_BILGILERI.email}`
      ]
    },
    {
      id: 'iletisim',
      keywords: ['iletişim', 'iletişim adresi', 'mail', 'e-posta', 'email', 'ulaşmak', 'ulaşabilir miyim', 'size nasıl ulaşırım'],
      answers: [
        `Genel iletişim e-postası: ${SITE_BILGILERI.email}`,
        `Bana ulaşmak için en kolay yol: ${SITE_BILGILERI.email}`
      ]
    },
    {
      id: 'instagram',
      keywords: ['instagram', 'insta', 'instagram hesabı'],
      answers: [`Instagram hesabı: ${SITE_BILGILERI.instagram}`]
    },
    {
      id: 'twitter',
      keywords: ['twitter', 'twitter hesabı', 'x', 'x hesabı'],
      answers: [`X / Twitter hesabı: ${SITE_BILGILERI.twitter}`]
    },
    {
      id: 'sosyal-medya',
      keywords: ['sosyal medya', 'sosyal medya hesapları', 'hesaplarınız', 'hangi platformlar'],
      answers: [
        `Instagram: ${SITE_BILGILERI.instagram}\nX / Twitter: ${SITE_BILGILERI.twitter}\nYouTube: ${SITE_BILGILERI.youtube}`
      ]
    },
    {
      id: 'video-onerisi',
      keywords: ['hangi videoyu önerirsin', 'video öner', 'ne izleyeyim', 'hangi videoyu izleyeyim', 'öneri'],
      answers: [
        `Başlangıç için “${SITE_BILGILERI.video}” videosuna bakabilirsin.`,
        `Yeni geliyorsan önce “${SITE_BILGILERI.video}” videosunu deneyebilirsin. 🦊`
      ]
    },
    {
      id: 'ekipman',
      keywords: ['hangi kamera', 'kameran ne', 'hangi kamerayı kullanıyorsun', 'kamera', 'dji pocket 3', 'hangi mikrofon', 'mikrofonun ne', 'dji mic 2', 'kurgu', 'hangi program', 'premiere'],
      answers: [
        `Çekimlerde ${SITE_BILGILERI.kamera}, ses için ${SITE_BILGILERI.mikrofon} ve kurgu için ${SITE_BILGILERI.kurgu} kullanılıyor. 🎥`,
        `Ekipman tarafında ${SITE_BILGILERI.kamera} + ${SITE_BILGILERI.mikrofon}; kurgu tarafında ${SITE_BILGILERI.kurgu}.`
      ]
    },
    {
      id: 'motor',
      keywords: ['hangi motor', 'motorun ne', 'motor', 'mondial', '50 wing'],
      answers: [
        `Motor tarafında ${SITE_BILGILERI.motor} kullanılıyor. 🦊🏍️`,
        `${SITE_BILGILERI.motor} üzerinden de zaman zaman içerikler üretiliyor.`
      ]
    },
    {
      id: 'cek-kurgu',
      keywords: ['videoları neyle çekiyorsun', 'videoyu neyle çekiyorsun', 'videolar nasıl çekiliyor', 'hangi ekipman', 'çekim ekipmanı', 'montaj nasıl'],
      answers: [
        `Çekimlerde ${SITE_BILGILERI.kamera}, ses tarafında ${SITE_BILGILERI.mikrofon} ve kurgu tarafında ${SITE_BILGILERI.kurgu} kullanılıyor.`,
        'Çekim, ses ve kurgu tarafında kompakt ama üretime uygun bir ekipman seti kullanılıyor. İstersen kullandığım ekipmanları tek tek sorabilirsin.'
      ]
    },
    {
      id: 'site',
      keywords: ['site', 'web sitesi', 'bu site', 'burada ne var', 'sitede ne var'],
      answers: [
        'Bu sitede Sıradan Tilki hakkında bilgi, içerikler, sosyal medya bağlantıları ve iletişim seçenekleri bulunuyor.',
        'Burası Sıradan Tilki’nin küçük dijital karargâhı. 🦊 Buradan içeriklere ve iletişim kanallarına ulaşabilirsin.'
      ]
    },
    {
      id: 'bot',
      keywords: ['bot', 'yardımcı bot', 'kimsin bot', 'sen kimsin', 'ne yapabilirsin'],
      answers: [
        'Ben Sıradan Tilki’nin yardımcı botuyum. Site, videolar, iletişim, sosyal medya ve iş birliği konularında bilgi verebilirim.',
        'Ben küçük dijital tilki yardımcınım. 🦊 Bana normal cümlelerle soru sorabilirsin.'
      ]
    },
    {
      id: 'tesekkur',
      keywords: ['teşekkür', 'teşekkürler', 'sağ ol', 'eyvallah', 'çok sağ ol', 'thanks'],
      answers: [
        'Rica ederim! 🦊',
        'Ne demek, Tilki burada. 🦊'
      ]
    },
    {
      id: 'veda',
      keywords: ['görüşürüz', 'hoşça kal', 'bay bay', 'bye'],
      answers: [
        'Görüşürüz! 🦊',
        'Kendine iyi bak, yine beklerim.'
      ]
    },
    {
      id: 'yardim',
      keywords: ['yardım', 'yardım et', 'ne sorabilirim', 'hangi soruları', 'konular', 'seçenekler'],
      answers: [
        'Bana örneğin “Sıradan Tilki kim?”, “En son hangi video var?”, “Instagram hesabı ne?”, “İş birliği yapmak istiyorum” veya “İletişim adresiniz ne?” diye sorabilirsin.'
      ]
    }
  ];

  const OZGUL_CEVAPLAR = new Map([
    ['sosyal medya hesapları', `Instagram: ${SITE_BILGILERI.instagram}\nX / Twitter: ${SITE_BILGILERI.twitter}\nYouTube: ${SITE_BILGILERI.youtube}`],
    ['iş birliği yapmak istiyorum', `Harika. İş birliği için ${SITE_BILGILERI.email} adresine detaylarını gönderebilirsin.`],
    ['videolar nerede', `Videolar sayfadaki “İçerikler” bölümünde. YouTube kanalı: ${SITE_BILGILERI.youtube}`],
    ['youtube kanalın ne', `YouTube kanalımız: ${SITE_BILGILERI.youtube}`],
    ['iletişim adresiniz ne', `İletişim: ${SITE_BILGILERI.email}`]
  ]);

  const normalize = text => String(text || '')
    .toLocaleLowerCase('tr-TR')
    .replace(/[.,!?;:()[\]{}'"“”‘’]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const pick = list => list[Math.floor(Math.random() * list.length)];

  const scoreRule = (input, rule) => {
    let score = 0;
    for (const keyword of rule.keywords) {
      const k = normalize(keyword);
      if (!k) continue;
      if (input === k) score += 12;
      else if (input.includes(k)) score += k.includes(' ') ? 7 : 3;
    }
    return score;
  };

  const getBotResponse = rawText => {
    const input = normalize(rawText);
    if (!input) return 'Bir mesaj yazarsan hemen yardımcı olayım. 🦊';

    const exact = OZGUL_CEVAPLAR.get(input);
    if (exact) return exact;

    let best = null;
    let bestScore = 0;
    for (const rule of BOT_KURALLARI) {
      const score = scoreRule(input, rule);
      if (score > bestScore) {
        bestScore = score;
        best = rule;
      }
    }

    if (best && bestScore >= 3) return pick(best.answers);

    return 'Bunu henüz bilgi bankama eklemedim. 🦊 Bana “videolar”, “Sıradan Tilki kim?”, “iş birliği”, “iletişim”, “Instagram”, “YouTube” veya “sosyal medya” gibi bir konu sorabilirsin.';
  };

  const chatWindow = $('#chatWindow');
  const chatToggle = $('#chatToggle');
  const closeChat = $('#closeChat');
  const chatMessages = $('#chatMessages');
  const chatInput = $('#chatInput');
  const sendMessage = $('#sendMessage');
  const quickReplies = $('#quickReplies');

  const botOpen = () => {
    chatWindow?.classList.remove('closed');
    chatWindow?.classList.add('open');
    chatInput?.focus();
  };

  const botClose = () => {
    chatWindow?.classList.remove('open');
    chatWindow?.classList.add('closed');
  };

  const escapeHtml = text => String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const formatMessage = text => {
    const escaped = escapeHtml(text);
    return escaped
      .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="chat-link">$1</a>')
      .replace(/\n/g, '<br>');
  };

  const addMessage = (type, text) => {
    if (!chatMessages) return;
    const wrapper = document.createElement('div');
    wrapper.className = `flex gap-2.5 ${type === 'user' ? 'justify-end' : 'message-in'}`;

    if (type === 'bot') {
      const icon = document.createElement('div');
      icon.className = 'w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center flex-shrink-0';
      icon.innerHTML = '<i class="fa-solid fa-fox text-white text-xs"></i>';
      wrapper.appendChild(icon);
    }

    const bubble = document.createElement('div');
    bubble.className = type === 'user' ? 'chat-message-user' : 'chat-message-bot';
    bubble.innerHTML = formatMessage(text);
    wrapper.appendChild(bubble);
    chatMessages.appendChild(wrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const showTyping = () => {
    if (!chatMessages) return null;
    const wrapper = document.createElement('div');
    wrapper.className = 'flex gap-2.5 message-in';
    wrapper.innerHTML = '<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center flex-shrink-0"><i class="fa-solid fa-fox text-white text-xs"></i></div><div class="chat-message-bot"><div class="typing-indicator"><span></span><span></span><span></span></div></div>';
    chatMessages.appendChild(wrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return wrapper;
  };

  const sendUserMessage = text => {
    const message = String(text || '').trim();
    if (!message) return;

    botOpen();
    addMessage('user', message);
    if (chatInput) chatInput.value = '';

    const typing = showTyping();
    window.setTimeout(() => {
      typing?.remove();
      addMessage('bot', getBotResponse(message));
    }, 400 + Math.random() * 450);
  };

  window.sendQuickReply = sendUserMessage;
  window.hideToast = () => $('#toast')?.classList.remove('show');

  chatToggle?.addEventListener('click', () => {
    if (chatWindow?.classList.contains('open')) botClose();
    else botOpen();
  });

  closeChat?.addEventListener('click', botClose);
  sendMessage?.addEventListener('click', () => sendUserMessage(chatInput?.value));

  chatInput?.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendUserMessage(chatInput.value);
    }
  });

  $$('#quickReplies button').forEach(button => {
    button.addEventListener('click', () => sendUserMessage(button.textContent.trim()));
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') botClose();
  });

  // Geliştirirken konsoldan kontrol etmek için.
  window.SIRADAN_TILKI_BOT = {
    bilgiler: SITE_BILGILERI,
    kurallar: BOT_KURALLARI,
    cevapVer: getBotResponse
  };
})();
