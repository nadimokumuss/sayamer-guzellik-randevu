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
        src: "https://images.pexels.com/photos/3736396/pexels-photo-3736396.jpeg?auto=compress&cs=tinysrgb&w=1400",
        alt: "Aydınlık ve modern güzellik salonu iç mekanı",
        title: "Şehir ortasında sakin bakım alanı",
        copy: "İlk bakışta güven veren, aydınlık ve düzenli salon atmosferi.",
        href: "/hizmetler",
        label: "Hizmetler",
      },
      {
        src: "https://images.pexels.com/photos/3736277/pexels-photo-3736277.jpeg?auto=compress&cs=tinysrgb&w=1400",
        alt: "Bakım ürünleri ve çalışma alanı bulunan salon bölümü",
        title: "Profesyonel uygulama köşeleri",
        copy: "Bakım kararını destekleyen temiz ve düzenli hizmet alanları.",
        href: "/randevu",
        label: "Randevu Oluştur",
      },
      {
        src: "https://images.pexels.com/photos/3736519/pexels-photo-3736519.jpeg?auto=compress&cs=tinysrgb&w=1400",
        alt: "Skincare ürünlerinin raflarda sergilendiği salon köşesi",
        title: "Bakım ve ürün yaklaşımı",
        copy: "Yazı yoğunluğunu kıran ve marka hissini taşıyan görsel detaylar.",
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
        "https://images.pexels.com/photos/5069436/pexels-photo-5069436.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: "cilt",
      title: "Işıltılı cilt ve dengeli bakım programları",
      copy:
        "Cilt tipine göre seçilen uygulamalarla arınma, nem dengesi ve daha canlı bir görünüm hedeflenir.",
      href: "/hizmetler#cilt-bakimi",
      image:
        "https://images.pexels.com/photos/6621463/pexels-photo-6621463.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: "body",
      title: "Vücut bakımında daha sıkı ve dinç görünüm",
      copy:
        "G5, lenf drenaj ve destekleyici seanslarla vücut bakımını planlı bir programa dönüştürüyoruz.",
      href: "/hizmetler#g5",
      image:
        "https://images.pexels.com/photos/6621143/pexels-photo-6621143.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ],
  serviceCategoryMedia: {
    kuafor:
      "https://images.pexels.com/photos/3736277/pexels-photo-3736277.jpeg?auto=compress&cs=tinysrgb&w=1400",
    "ayak-bakimi":
      "https://images.pexels.com/photos/3736519/pexels-photo-3736519.jpeg?auto=compress&cs=tinysrgb&w=1400",
    "tirnak-bakimi":
      "https://images.pexels.com/photos/3993320/pexels-photo-3993320.jpeg?auto=compress&cs=tinysrgb&w=1400",
    epilasyon:
      "https://images.pexels.com/photos/35884502/pexels-photo-35884502.jpeg?auto=compress&cs=tinysrgb&w=1400",
    g5: "https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?auto=compress&cs=tinysrgb&w=1400",
    "cilt-bakimi":
      "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1400",
    masaj:
      "https://images.pexels.com/photos/3736396/pexels-photo-3736396.jpeg?auto=compress&cs=tinysrgb&w=1400",
    "kafa-masaji":
      "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1400",
    "sac-taramasi":
      "https://images.pexels.com/photos/3736277/pexels-photo-3736277.jpeg?auto=compress&cs=tinysrgb&w=1400",
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
        alt: "Hazırlanmış bakım odası ve havlular",
        eyebrow: "Bakım Odası",
        title: "Dingin hazırlık alanı",
        copy: "Sitenin yoğun yazı yerine his taşımaya başladığı ilk katman.",
      },
      {
        src: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1400",
        alt: "Bakım seansı için hazırlanmış yatak ve ürünler",
        eyebrow: "Cilt Bakımı",
        title: "Uygulama öncesi düzen",
        copy: "Cilt ve yüz bakımı sayfalarında ritim kuran yumuşak bir sahne.",
      },
      {
        src: "https://images.pexels.com/photos/3993320/pexels-photo-3993320.jpeg?auto=compress&cs=tinysrgb&w=1400",
        alt: "Manikür hizmeti alan müşteri elleri",
        eyebrow: "Tırnak Bakımı",
        title: "Detay odaklı uygulama",
        copy: "Tırnak ve el bakımında yakın plan kalite hissi verir.",
      },
      {
        src: "https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?auto=compress&cs=tinysrgb&w=1400",
        alt: "Salon içinde koltuk ve ayna bulunan aydınlık alan",
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
