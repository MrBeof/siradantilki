# Sıradan Tilki Sitesi

## Dosya yapısı
- `index.html`: Sayfanın HTML yapısı
- `css/stil.css`: Özel CSS stilleri
- `js/uygulama.js`: Site etkileşimleri, sayaçlar, video penceresi ve iletişim formu
- `js/bot.js`: Ayrı yardımcı bot ve bilgi bankası

## Yardımcı botu düzenleme
Botun temel bilgileri `js/bot.js` içindeki `SITE_BILGILERI` bölümündedir.

Yeni soru-cevap eklemek için `BOT_KURALLARI` dizisine yeni bir nesne ekleyebilirsin:

```js
{
  id: 'yeni-konu',
  keywords: ['örnek soru', 'başka ifade'],
  answers: [
    'Bu konu için verilecek cevap.'
  ]
}
```

`keywords` alanına ziyaretçinin kullanabileceği farklı ifadeleri eklemek eşleşmeyi güçlendirir. `answers` içine birden fazla cevap koyarsan bot bunlardan rastgele birini seçer.

Bot tarayıcı içinde çalışır ve bir yapay zekâ API'sine bağlı değildir. Gerçek bir yapay zekâ sohbeti için ayrıca bir sunucu/API bağlantısı gerekir.
