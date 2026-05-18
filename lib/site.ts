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
        { label: "Masaj ve Saç Derisi Spası", href: "/hizmetler#masaj" },
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
        src: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1600",
        portraitSrc:
          "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1200",
        alt: "Doğal ışıkta yumuşak makyajıyla model — yakın plan portre",
        title: "Güzelliğinizi uzman ellere bırakın",
        copy: "Saç, cilt ve bakım ritüellerinizi sakin bir atmosferde planlıyoruz.",
        href: "/randevu",
        label: "Cilt Bakımı",
      },
      {
        src: "https://images.pexels.com/photos/2253833/pexels-photo-2253833.jpeg?auto=compress&cs=tinysrgb&w=1600",
        portraitSrc:
          "https://images.pexels.com/photos/2253833/pexels-photo-2253833.jpeg?auto=compress&cs=tinysrgb&w=1200",
        alt: "Modern saç tasarımı — yakın plan portre",
        title: "Detaya özen, sonuca odak",
        copy: "Her hizmet için uzman bazlı planlanan, hijyenik ve net bir akış.",
        href: "/hizmetler",
        label: "Saç Tasarımı",
      },
      {
        src: "https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=1600",
        portraitSrc:
          "https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=1200",
        alt: "Yakın plan pembe manikür uygulaması",
        title: "Bakım ve dinginlik bir arada",
        copy: "Sakin aydınlatma, özenli hazırlık ve uzman eşliğinde bakım seansları.",
        href: "/randevu",
        label: "Tırnak Bakımı",
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
        "Konforu önceleyen epilasyon çözümleriyle, farklı bölgelere ve ihtiyaçlara uygun bakım rotaları sunuyoruz.",
      href: "/hizmetler#epilasyon",
      image:
        "https://images.pexels.com/photos/3992870/pexels-photo-3992870.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: "cilt",
      title: "Bütüncül Yaklaşım",
      copy:
        "Cilt tipine göre seçilen uygulamalarla arınma, nem dengesi ve daha canlı bir görünüm hedeflenir.",
      href: "/hizmetler#cilt-bakimi",
      image:
        "https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg?auto=compress&cs=tinysrgb&w=1400",
    },
    {
      id: "body",
      title: "Vücut bakımında dinç görünüm",
      copy:
        "G5, lenf drenaj ve destekleyici seanslarla vücut bakımını planlı bir programa dönüştürüyoruz.",
      href: "/hizmetler#g5",
      image:
        "https://images.pexels.com/photos/3373737/pexels-photo-3373737.jpeg?auto=compress&cs=tinysrgb&w=1200",
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
      title: "Zarif Tırnak",
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
        src: "https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=1400",
        alt: "Cilt bakımı uygulaması — yakın plan portre",
        eyebrow: "Cilt Bakımı",
        title: "Arınma ve ışıltı",
        copy: "Cildinizin ihtiyacına göre planlanan profesyonel uygulama.",
      },
      {
        src: "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=1400",
        alt: "Mermer rafta bakım ve kozmetik ürünleri",
        eyebrow: "Detay",
        title: "Premium ürün ve özenli sunum",
        copy: "Seçilmiş profesyonel ürünlerle her seans için hazır bir atmosfer.",
      },
      {
        src: "https://images.pexels.com/photos/853427/pexels-photo-853427.jpeg?auto=compress&cs=tinysrgb&w=1400",
        alt: "Modern ve geniş salon iç mekanı",
        eyebrow: "Salon",
        title: "Geniş ve sakin atmosfer",
        copy: "Açık plan, modern aydınlatma ve özenli düzenle huzurlu bir bakım alanı.",
      },
      {
        src: "https://images.pexels.com/photos/3997393/pexels-photo-3997393.jpeg?auto=compress&cs=tinysrgb&w=1400",
        alt: "Salon iç mekanı — modern ve sakin",
        eyebrow: "Salon",
        title: "Karşılama alanı",
        copy: "Sakin, modern ve düzenli bir bakım atmosferi.",
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
      author: "Nazlı Duran",
      publishedAt: "2026-04-12",
      coverUrl:
        "https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=1400",
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
      author: "Merve Aktaş",
      publishedAt: "2026-03-28",
      coverUrl:
        "https://images.pexels.com/photos/3997392/pexels-photo-3997392.jpeg?auto=compress&cs=tinysrgb&w=1400",
      body: [
        "Kalıcı oje ve protez tırnak arasındaki seçim, günlük alışkanlıklarınızdan kozmetik beklentinize kadar birden fazla unsura bağlıdır. İkisi de uzun süreli dayanıklılık sunar; ancak bakım ritmi ve estetik sonuç farklılaşır.",
        "Kalıcı oje, kendi tırnağınızın yapısını koruyarak renk ve parlaklık sağlar. Doğal görünümü tercih edenler ve iki-üç haftalık bakım periyodunu yeterli bulanlar için uygundur. Protez tırnak ise uzunluk, şekil ve daha iddialı tasarımlar için ideal bir alan yaratır; bununla birlikte periyodik dolgu seanslarını gerekli kılar.",
        "Tırnak sanatçısıyla yapılacak kısa bir ön görüşme, hangi seçeneğin sizin için daha mantıklı olduğunu netleştirir. Sayamer'de her iki alanda da uzman kadro ile çalışıyoruz.",
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
      author: "Tuğçe Baş",
      publishedAt: "2026-03-15",
      coverUrl:
        "https://images.pexels.com/photos/3997984/pexels-photo-3997984.jpeg?auto=compress&cs=tinysrgb&w=1400",
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
      author: "İlayda Özen",
      publishedAt: "2026-02-22",
      coverUrl:
        "https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=1400",
      body: [
        "G5, kısa sürede sıkılaşma ve toparlanma hissi yaratan mekanik bir masaj uygulamasıdır. Tek başına bir mucize değildir; ancak düzenli, planlı bir programla birlikte görünür bir fark yaratır.",
        "En iyi sonuç için G5, haftada iki seans ritmiyle ortalama 8-12 seans programı halinde uygulanır. Seanslar arasında cildin ve kasların dinlenmesi için en az bir günlük aralık bırakılır. Programın başında ve sonunda yapılan kısa ölçüm ve fotoğraf kayıtları, değişimi somut olarak takip etmenizi sağlar.",
        "Beslenme ve hareket alışkanlığı, seansların etkisini doğrudan destekler. Uzmanınız size özel bir rutin önermez; ancak genel bir çerçeve sunarak seansların verimini artırır. Sayamer'de G5 seanslarını ritimli ve planlı bir programın parçası olarak tasarlıyoruz.",
      ],
      href: "/hizmetler#g5",
    },
  ],
  testimonials: [
    {
      id: "t1",
      name: "Zeynep A.",
      rating: 5,
      text: "Cilt bakımı için gittiğimde o kadar profesyoneldi ki beklentimin çok üzerinde bir deneyim yaşadım. Salon temizliği ve düzeni de ayrıca takdire şayan.",
      service: "Cilt Bakımı",
      photoUrl:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=240",
    },
    {
      id: "t2",
      name: "Merve T.",
      rating: 5,
      text: "Online randevu sistemi çok kolay ve net. Hangi uzmanla çalışacağımı, fiyatı ve süreyi önceden bilmek büyük avantaj.",
      service: "Tırnak Bakımı",
      photoUrl:
        "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=240",
    },
    {
      id: "t3",
      name: "Selin K.",
      rating: 5,
      text: "Zarif Tırnak paketi tam benim aradığım şeydi. Hem manikür hem pedikür aynı seansta, uzmanı gerçekten işini seviyor.",
      service: "Zarif Tırnak Paketi",
      photoUrl:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=240",
    },
    {
      id: "t4",
      name: "Ayşe D.",
      rating: 5,
      text: "G5 seanslarını buradan başlattım, 8 seans sonunda farkı net görebildim. Uzman her seansta durumu değerlendiriyor, süreci takip ediyor.",
      service: "Vücut Bakımı",
      photoUrl:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=240",
    },
    {
      id: "t5",
      name: "Nihan Ö.",
      rating: 5,
      text: "Saç boyama için geldim, sonuç tam istediğim gibi çıktı. Üstüne üstlük saat ve fiyat tahminleri tuttu — bu nadir bir şey.",
      service: "Saç Tasarımı",
      photoUrl:
        "https://images.pexels.com/photos/712521/pexels-photo-712521.jpeg?auto=compress&cs=tinysrgb&w=240",
    },
    {
      id: "t6",
      name: "Buse Y.",
      rating: 5,
      text: "Masaj seansı için rezervasyon yaptırdım. Ortam sakin, uzman işini biliyor. Kesinlikle tekrar geleceğim.",
      service: "Masaj & Saç Derisi Spası",
      photoUrl:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=240",
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
