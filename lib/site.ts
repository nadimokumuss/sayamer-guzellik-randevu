import type { Metadata } from "next";

export const siteContent = {
  brand: {
    name: "Sayamer Güzellik",
    shortName: "Sayamer",
    tagline: "Şehir ritmini yavaşlatan bakım deneyimi",
    description:
      "Sayamer Güzellik; saç, cilt, tırnak ve bakım ritüellerini sakin, planlı ve premium-soft bir deneyim içinde sunan güzellik salonudur.",
  },
  contact: {
    phoneRaw: "905388887766",
    phoneDisplay: "+90 538 888 77 66",
    email: "hello@sayamer.com",
    whatsappUrl: "https://wa.me/905388887766",
    addressTitle: "Bağdat Caddesi çevresi",
    addressLines: [
      "Cadde hattına yakın sakin salon konumu",
      "Konum bilgisi rezervasyon sonrası paylaşılır",
      "İstanbul / Anadolu Yakası",
    ],
    hours: [
      { label: "Pazartesi - Cuma", value: "10:00 - 20:00" },
      { label: "Cumartesi", value: "10:00 - 19:00" },
      { label: "Pazar", value: "Kapalı" },
    ],
    socials: [
      { label: "Instagram", handle: "@sayamerbeauty" },
      { label: "WhatsApp", handle: "+90 538 888 77 66" },
    ],
  },
  cta: {
    bookingHref: "/randevu",
    bookingLabel: "Online Randevu",
    whatsappLabel: "WhatsApp",
    servicesHref: "/hizmetler",
    servicesLabel: "Hizmetler",
  },
  navigationGroups: [
    {
      label: "Anasayfa",
      href: "/",
    },
    {
      label: "Kurumsal",
      items: [
        { label: "Hakkımızda", href: "/hakkimizda" },
        { label: "Vizyon ve Misyon", href: "/vizyon-ve-misyon" },
      ],
    },
    {
      label: "Hizmetler",
      items: [
        { label: "Saç Tasarımı", href: "/hizmetler#kuafor" },
        { label: "Cilt Bakımı", href: "/hizmetler#cilt-bakimi" },
        { label: "Tırnak Bakımı", href: "/hizmetler#tirnak-bakimi" },
        { label: "Epilasyon", href: "/hizmetler#epilasyon" },
        { label: "Vücut Bakımı", href: "/hizmetler#g5" },
        { label: "Masaj ve Head Spa", href: "/hizmetler#masaj" },
      ],
    },
    {
      label: "Medya",
      items: [
        { label: "Blog", href: "/blog" },
        { label: "Bilgi Bankası", href: "/bilgi-bankasi" },
      ],
    },
    {
      label: "İletişim",
      href: "/iletisim",
    },
  ],
  hero: {
    title: "Sayamer Güzellik ile kendinizi yenileyin",
    copy:
      "Profesyonel bakım, modern uygulamalar ve huzur hissini aynı akışta sunan bir salon deneyimi tasarlıyoruz. Hizmetlerimizi inceleyin, uygun bakım rotanızı seçin ve online randevunuzu oluşturun.",
    slides: [
      {
        src: "https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?auto=compress&cs=tinysrgb&w=1400",
        alt: "Siyah koltukları ve modern tasarımıyla güzellik salonu iç mekanı",
        title: "Şehir ortasında sakin bakım alanı",
        copy: "İlk bakışta güven veren, aydınlık ve düzenli salon atmosferi.",
        href: "/hizmetler",
        label: "Hizmetler",
      },
      {
        src: "https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?auto=compress&cs=tinysrgb&w=1400",
        alt: "Profesyonel manikür uygulaması — uzman kalıcı oje çalışıyor",
        title: "Uzman elinde hızlı ve temiz uygulama",
        copy: "Her hizmet için uzman bazlı planlanan, hijyenik ve net bir akış.",
        href: "/randevu",
        label: "Randevu Oluştur",
      },
      {
        src: "https://images.pexels.com/photos/3997995/pexels-photo-3997995.jpeg?auto=compress&cs=tinysrgb&w=1400",
        alt: "Serin bir ortamda yüz bakımı uygulaması alan kadın",
        title: "Bakım ve dinginlik birlikte",
        copy: "Sakin aydınlatma, özenli hazırlık ve uzman eşliğinde sürdürülen bakım seansları.",
        href: "/iletisim",
        label: "İletişim",
      },
    ],
  },
  sections: {
    welcomeTitle: "Güzelliğinize Sayamer dokunuşu",
    welcomeCopy:
      "Sayamer Güzellik, bakım ve güzellik hizmetlerinde profesyonellik ile rahatlığı bir araya getirir. Cilt bakımı, saç tasarımı, tırnak bakımı, epilasyon, paket uygulamalar ve destekleyici bakım ritüelleri ile her müşterimizin ihtiyacına uygun çözümler sunuyoruz.",
    comfortTitle: "Kendinize vakit ayırmanın en zarif yolu",
    comfortCopy:
      "Bakım yalnızca sonuç değil, aynı zamanda süreçtir. Salon içinde kullanılan görsel dil, uzman eşleşmesi ve rezervasyon akışı müşterinin kendini rahat hissetmesini destekler.",
  },
  trust: [
    "Hijyenik ve düzenli bakım alanları",
    "Uzman bazlı planlanan randevu yapısı",
    "Açık fiyat, net süre ve kolay rezervasyon",
  ],
  categoryHighlights: [
    {
      id: "epilasyon",
      title: "Pürüzsüz bir cilt için kalıcı çözümler",
      copy:
        "Konforu önceleyen epilasyon çözümleriyle, farklı bölgelere ve farklı ihtiyaçlara uygun bakım rotaları sunuyoruz.",
      href: "/hizmetler#epilasyon",
      image:
        "https://images.pexels.com/photos/3997984/pexels-photo-3997984.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: "cilt",
      title: "Işıltılı cilt ve dengeli bakım programları",
      copy:
        "Cilt tipine göre seçilen uygulamalarla arınma, nem dengesi ve daha canlı bir görünüm hedeflenir.",
      href: "/hizmetler#cilt-bakimi",
      image:
        "https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: "body",
      title: "Vücut bakımında daha sıkı ve dinç görünüm",
      copy:
        "G5, lenf drenaj ve destekleyici seanslarla vücut bakımını planlı bir programa dönüştürüyoruz.",
      href: "/hizmetler#g5",
      image:
        "https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ],
  serviceCategoryMedia: {
    // Saç yıkama / kuaför — yakın plan saç hizmeti
    kuafor:
      "https://images.pexels.com/photos/3993454/pexels-photo-3993454.jpeg?auto=compress&cs=tinysrgb&w=1400",
    // Ayak bakımı — aromaterapi/masaj dokunuşu, rahatlama
    "ayak-bakimi":
      "https://images.pexels.com/photos/3997990/pexels-photo-3997990.jpeg?auto=compress&cs=tinysrgb&w=1400",
    // Tırnak bakımı — uzman elinde kalıcı oje
    "tirnak-bakimi":
      "https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?auto=compress&cs=tinysrgb&w=1400",
    // Epilasyon — pürüzsüz cilt / sakin sırt seansı
    epilasyon:
      "https://images.pexels.com/photos/3997984/pexels-photo-3997984.jpeg?auto=compress&cs=tinysrgb&w=1400",
    // G5 / vücut bakımı — sırt masajı, yağ uygulaması
    g5: "https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=1400",
    // Cilt bakımı — uzman uygulamada maske
    "cilt-bakimi":
      "https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=1400",
    // Masaj — dingin spa ortamı
    "kafa-masaji":
      "https://images.pexels.com/photos/3997988/pexels-photo-3997988.jpeg?auto=compress&cs=tinysrgb&w=1400",
    masaj:
      "https://images.pexels.com/photos/3997986/pexels-photo-3997986.jpeg?auto=compress&cs=tinysrgb&w=1400",
    // Saç taraması / şekillendirme — tarak ile uygulama
    "sac-taramasi":
      "https://images.pexels.com/photos/7755513/pexels-photo-7755513.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  promos: [
    {
      title: "G5 Masajı",
      oldPrice: "3.100 TL",
      price: "2.500 TL",
      detail: "8 seans paket",
      href: "/paketler",
    },
    {
      title: "Cilt Bakımı",
      oldPrice: "4.000 TL",
      price: "3.000 TL",
      detail: "4 seans bakım serisi",
      href: "/randevu",
    },
    {
      title: "Elegant Nails",
      oldPrice: "2.250 TL",
      price: "1.850 TL",
      detail: "paket avantajı",
      href: "/paketler",
    },
  ],
  visionMission: {
    vision:
      "Şehir içinde sakin, güven veren ve modern hissettiren bir güzellik evi kurmak; bakım deneyimini yalnızca hizmet sonucu ile değil, tüm müşteri yolculuğuyla birlikte tasarlamak.",
    mission:
      "Her müşteriye açık bilgi, uzman yönlendirmesi ve planlı randevu akışıyla konforlu bir bakım deneyimi sunmak. Hizmet anlatımını ve rezervasyon sürecini tek bir anlaşılır yapıda buluşturmak.",
  },
  media: {
    editorial: [
      {
        src: "https://images.pexels.com/photos/35884502/pexels-photo-35884502.jpeg?auto=compress&cs=tinysrgb&w=1400",
        alt: "Masaj masası, havlular, mumlar ve aromaterapi yağları",
        eyebrow: "Bakım Odası",
        title: "Dingin hazırlık alanı",
        copy: "Sitenin yoğun yazı yerine his taşımaya başladığı ilk katman.",
      },
      {
        src: "https://images.pexels.com/photos/7755512/pexels-photo-7755512.jpeg?auto=compress&cs=tinysrgb&w=1400",
        alt: "Pembe havlu üzerinde profesyonel kuaför aletleri",
        eyebrow: "Uygulama Hazırlığı",
        title: "Uygulama öncesi düzen",
        copy: "Her seansın ardındaki titiz hazırlığı temsil eden yakın plan.",
      },
      {
        src: "https://images.pexels.com/photos/3997388/pexels-photo-3997388.jpeg?auto=compress&cs=tinysrgb&w=1400",
        alt: "Beyaz kumaş üzerinde tek kırmızı tırnak detayı",
        eyebrow: "Tırnak Bakımı",
        title: "Detay odaklı uygulama",
        copy: "Tırnak ve el bakımında minimal ama net bir sahne.",
      },
      {
        src: "https://images.pexels.com/photos/3736277/pexels-photo-3736277.jpeg?auto=compress&cs=tinysrgb&w=1400",
        alt: "Siyah deri koltuk ve ayna bulunan salon köşesi",
        eyebrow: "Salon Hissi",
        title: "Karşılama ve bekleme alanı",
        copy: "Kurumsal ve iletişim sayfalarında mekân hissini güçlendirir.",
      },
    ],
  },
  blogPosts: [
    {
      slug: "mevsim-gecislerinde-cilt-bakimi",
      title: "Mevsim geçişlerinde cilt bakımını nasıl planlamalı?",
      excerpt:
        "Nem dengesi, arınma ve hassasiyet yönetimi için bakım ritmini mevsime göre ayarlamanın pratik yolları.",
      category: "Cilt Bakımı",
      readMinutes: 5,
      body: [
        "Mevsim geçişlerinde cilt, farklı sıcaklık ve nem koşullarına uyum sağlamak için destek bekler. Kış aylarının koruyucu nem yoğunluğundan ilkbaharın daha hafif dokularına geçerken bakım ritmini yeniden düzenlemek, cildin hem dengesini korumasına hem de canlı görünüme kavuşmasına yardımcı olur.",
        "İlk adım, temizleme rutinini sadeleştirmek. Yoğun yağ bariyeri gerektirmeyen dönemlerde daha hafif temizleyiciler cildin doğal bariyerini yormadan ihtiyacı karşılar. İkinci adım, nem ve peeling dengesi. Haftada bir veya iki kez yapılan kontrollü peeling, ölü hücre birikimini azaltır; ardından uygulanan nemlendirici ise cildin ışıltısını geri getirir.",
        "Salon seanslarında, terapistiniz cildinizin sezonluk ihtiyacını değerlendirir ve gerekiyorsa ek uygulamalar (arınma, nemlendirme veya ışıltı serisi) önerir. Amaç, evde uygulanan rutinle seansları tamamlayıcı biçimde birleştirmektir.",
      ],
      href: "/hizmetler#cilt-bakimi",
    },
    {
      slug: "kalici-oje-mi-protez-tirnak-mi",
      title: "Kalıcı oje mi protez tırnak mı?",
      excerpt:
        "Günlük kullanım alışkanlığına göre hangi tırnak hizmetinin daha uygun olduğuna hızlı bir bakış.",
      category: "Tırnak Bakımı",
      readMinutes: 4,
      body: [
        "Kalıcı oje ve protez tırnak arasındaki seçim, günlük alışkanlıklarınızdan kozmetik beklentinize kadar birden fazla unsura bağlıdır. İkisi de uzun süreli dayanıklılık sunar; ancak bakım ritmi ve estetik sonuç farklılaşır.",
        "Kalıcı oje, kendi tırnağınızın yapısını koruyarak renk ve parlaklık sağlar. Doğal görünümü tercih edenler ve iki-üç haftalık bakım periyodunu yeterli bulanlar için uygundur. Protez tırnak ise uzunluk, şekil ve daha iddialı tasarımlar için ideal bir alan yaratır; bununla birlikte periyodik dolgu seanslarını gerekli kılar.",
        "Nail Artist ile yapılacak kısa bir ön görüşme, hangi seçeneğin sizin için daha mantıklı olduğunu netleştirir. Sayamer'de her iki alanda da uzman kadro ile çalışıyoruz.",
      ],
      href: "/hizmetler#tirnak-bakimi",
    },
    {
      slug: "ilk-epilasyon-randevusu-hazirligi",
      title: "İlk epilasyon randevusundan önce ne yapılmalı?",
      excerpt:
        "Daha konforlu ve planlı bir ilk seans için küçük ama etkili hazırlık notları.",
      category: "Epilasyon",
      readMinutes: 3,
      body: [
        "İlk epilasyon seansında konforu artırmak için birkaç basit hazırlık adımı yeterli olabilir. Seansa 24 saat kala bölgenin jiletle tıraş edilmesi, cihazın foliküle doğru etki etmesini sağlar. Cilt tahrişini azaltmak için tıraş sonrası sabunsuz, hafif bir nemlendirici tercih edin.",
        "Seans günü cilde krem, losyon veya parfüm uygulanmaması önerilir. Bu, cihazın verimli çalışması ve reaksiyon riskinin en aza inmesi için önemlidir. Açık renk ve bol kıyafetler, uygulama sonrasında cildin nefes almasını kolaylaştırır.",
        "Sayamer'de ilk seans öncesi bir değerlendirme yapılır; cilt tipi, hassasiyet ve beklentilere göre enerji ayarı belirlenir. Seanslar arası planlama, uzmanın yönlendirmesiyle bölgesel bazda takip edilir.",
      ],
      href: "/hizmetler#epilasyon",
    },
    {
      slug: "g5-ve-destek-seanslari",
      title: "G5 ve destek seansları hangi beklentide tercih edilir?",
      excerpt:
        "Vücut bakımında ritimli programlar oluştururken hangi başlıklar öne çıkar, ne beklenmeli?",
      category: "Vücut Bakımı",
      readMinutes: 4,
      body: [
        "G5, kısa sürede sıkılaşma ve toparlanma hissi yaratan mekanik bir masaj uygulamasıdır. Tek başına bir mucize değildir; ancak düzenli, planlı bir programla birlikte görünür bir fark yaratır.",
        "En iyi sonuç için G5, haftada iki seans ritmiyle ortalama 8-12 seans programı halinde uygulanır. Seanslar arasında cildin ve kasların dinlenmesi için en az bir günlük aralık bırakılır. Programın başında ve sonunda yapılan kısa ölçüm ve fotoğraf kayıtları, değişimi somut olarak takip etmenizi sağlar.",
        "Beslenme ve hareket alışkanlığı, seansların etkisini doğrudan destekler. Uzmanınız size özel bir rutin önermez; ancak genel bir çerçeve sunarak seansların verimini artırır. Sayamer'de G5 seanslarını ritimli ve planlı bir programın parçası olarak tasarlıyoruz.",
      ],
      href: "/hizmetler#g5",
    },
  ],
  knowledgeBase: [
    {
      question: "Online randevu nasıl ilerliyor?",
      answer:
        "Önce hizmet veya paket seçilir, ardından uygun uzman ve boş saat listelenir. Müşteri bilgileri tamamlandığında rezervasyon anında oluşturulur.",
    },
    {
      question: "Fiyatlar neden açık gösteriliyor?",
      answer:
        "Karar anını hızlandırmak ve müşterinin önceden net bilgi görmesini sağlamak için süre ve fiyatlar hizmet kartlarında görünür tutulur.",
    },
    {
      question: "WhatsApp hangi noktada devreye giriyor?",
      answer:
        "Randevu oluşturulduğunda hazır mesaj bağlantısı hazırlanır; hızlı teyit ve soru cevap süreci kolaylaşır.",
    },
    {
      question: "Paket ile tekli hizmet farkı nedir?",
      answer:
        "Paketler tek blokta planlanan hazır bakım rotalarıdır. Tekli hizmette müşteri daha esnek seçim yapar.",
    },
  ],
} as const;

export function buildPageMetadata(title?: string, description?: string): Metadata {
  return {
    title,
    description: description ?? siteContent.brand.description,
  };
}
