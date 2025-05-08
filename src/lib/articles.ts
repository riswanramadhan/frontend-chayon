// This file serves as a mock database/CMS for articles
// In a real application, this would be replaced with a database or CMS integration

interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  image: string;
  content: {
    title: string;
    paragraphs: string[];
    bulletPoints?: string[];
  }[];
  relatedArticles?: Article[];
}

const articles: Article[] = [
  {
    slug: 'machine-learning-data-intelligence',
    title: "Machine Learning: Mengubah Data Menjadi Kecerdasan Buatan yang Bermanfaat",
    description: "Pelajari bagaimana Machine Learning bekerja dalam mengolah data, mengenali pola, dan membuat keputusan cerdas. Dari teori hingga aplikasi nyata, temukan cara teknologi ini membentuk masa depan!",
    category: "Machine Learning",
    date: "12 Apr 2025",
    image: "/nlp.svg",
    content: [
      {
        title: "Apa itu Machine Learning?",
        paragraphs: [
          "Machine Learning adalah cabang dari kecerdasan buatan yang memungkinkan sistem komputer untuk belajar dan meningkatkan performa mereka dari pengalaman tanpa perlu diprogram secara eksplisit. Teknologi ini menggunakan algoritma dan model statistik untuk menganalisis data, mengenali pola, dan membuat prediksi atau keputusan.",
          "Dalam era digital saat ini, Machine Learning telah menjadi teknologi kunci yang mendorong inovasi di berbagai sektor, mulai dari rekomendasi produk hingga diagnosa medis."
        ]
      },
      {
        title: "Komponen Utama Machine Learning",
        paragraphs: [
          "Untuk memahami Machine Learning secara mendalam, penting untuk mengenal komponen-komponen utama yang membentuk fondasi teknologi ini. Setiap komponen memiliki peran crucial dalam membangun sistem yang efektif."
        ],
        bulletPoints: [
          "Data: Bahan bakar utama untuk model Machine Learning",
          "Algoritma: Metode pembelajaran yang digunakan untuk melatih model",
          "Model: Representasi matematis dari pola yang dipelajari",
          "Training Process: Proses pembelajaran dari data yang ada",
          "Validation & Testing: Evaluasi performa model"
        ]
      },
      {
        title: "Implementasi dan Penggunaan",
        paragraphs: [
          "Machine Learning memiliki berbagai aplikasi praktis yang telah mengubah cara kita hidup dan bekerja. Beberapa contoh implementasi termasuk sistem rekomendasi di platform streaming, pengenalan wajah di smartphone, deteksi spam di email, dan assistensi pengemudi di kendaraan modern.",
          "Untuk memulai dengan Machine Learning, penting untuk memahami dasar-dasar pemrograman, statistik, dan analisis data. Berbagai tools dan framework seperti TensorFlow, PyTorch, dan scikit-learn tersedia untuk membantu pengembangan model ML."
        ]
      }
    ]
  },
  {
    slug: 'menjangkau-audiens-dan-meningkatkan-penjualan',
    title: "Menjangkau Audiens dan Meningkatkan Penjualan",
    category: "Digital Marketing",
    date: "11 Apr 2025",
    image: "/keyboard.svg",
    description: "Pelajari strategi pemasaran digital untuk meningkatkan jangkauan pasar dan mengoptimalkan penjualan produk digital.",
    content: [
      {
        title: "Memahami Digital Marketing",
        paragraphs: [
          "Digital marketing telah menjadi komponen krusial dalam strategi bisnis modern. Dengan memanfaatkan teknologi digital dan platform online, bisnis dapat menjangkau audiens yang lebih luas dan meningkatkan konversi penjualan.",
          "Strategi pemasaran digital yang efektif membutuhkan pemahaman mendalam tentang perilaku konsumen online dan kemampuan untuk mengoptimalkan berbagai kanal digital."
        ]
      },
      {
        title: "Strategi Pemasaran Digital",
        paragraphs: [
          "Untuk mencapai kesuksesan dalam pemasaran digital, ada beberapa strategi kunci yang perlu diimplementasikan."
        ],
        bulletPoints: [
          "Content Marketing yang berkualitas",
          "Search Engine Optimization (SEO)",
          "Social Media Marketing",
          "Email Marketing yang personal",
          "Analisis data dan optimasi kampanye"
        ]
      },
      {
        title: "Optimasi Konversi",
        paragraphs: [
          "Meningkatkan konversi adalah tujuan utama dari setiap kampanye digital marketing. Hal ini melibatkan optimasi setiap tahap dalam customer journey, mulai dari awareness hingga purchase.",
          "Penggunaan data analytics dan A/B testing dapat membantu mengidentifikasi area yang perlu ditingkatkan dan mengoptimalkan strategi untuk hasil yang lebih baik."
        ]
      }
    ]
  },
  {
    slug: 'masa-depan-teknologi-yang-harus-kamu-kuasai',
    title: "Masa Depan Teknologi yang Harus Kamu Kuasai",
    category: "Machine Learning",
    date: "10 Apr 2025",
    image: "/ddos.svg",
    description: "Pelajari teknologi terkini yang akan membentuk masa depan dan bagaimana kamu bisa mempersiapkan diri untuk menghadapi perkembangan teknologi yang semakin pesat.",
    content: [
      {
        title: "Teknologi Kunci di Era Digital",
        paragraphs: [
          "Di era digital yang berkembang pesat, beberapa teknologi telah muncul sebagai kunci pembentuk masa depan. Menguasai teknologi-teknologi ini akan membuka peluang karir yang luas dan memungkinkan partisipasi aktif dalam revolusi digital.",
          "Keamanan cyber, AI, dan komputasi awan menjadi semakin penting seiring dengan transformasi digital yang terus berlanjut."
        ]
      },
      {
        title: "Skills yang Dibutuhkan",
        paragraphs: [
          "Untuk tetap relevan di era digital, profesional teknologi perlu mengembangkan berbagai keterampilan penting."
        ],
        bulletPoints: [
          "Keamanan Informasi dan Cybersecurity",
          "Kecerdasan Buatan dan Machine Learning",
          "Cloud Computing dan Arsitektur Cloud",
          "Pengembangan Software Modern",
          "Analisis Data dan Data Science"
        ]
      },
      {
        title: "Persiapan Menghadapi Masa Depan",
        paragraphs: [
          "Mempersiapkan diri untuk masa depan teknologi membutuhkan pendekatan yang terstruktur dan komitmen untuk pembelajaran berkelanjutan. Mengikuti perkembangan terbaru, mengambil kursus online, dan terlibat dalam proyek praktis adalah langkah-langkah penting.",
          "Selain technical skills, soft skills seperti adaptabilitas, kreativitas, dan kemampuan berkomunikasi juga menjadi semakin penting di era digital."
        ]
      }
    ]
  },
  {
    slug: 'langkah-strategis-menuju-sukses',
    title: "Langkah Strategis Menuju Sukses",
    category: "Jenjang Karir",
    date: "8 Apr 2025",
    image: "/wordle.svg",
    description: "Pelajari strategi menyeluruh untuk membangun karir yang sukses di dunia teknologi dan mengembangkan potensi maksimal.",
    content: [
      {
        title: "Membangun Fondasi Karir",
        paragraphs: [
          "Kesuksesan karir dimulai dengan membangun fondasi yang kuat. Ini melibatkan pemahaman mendalam tentang bidang yang dipilih, pengembangan keterampilan yang relevan, dan pembentukan jaringan profesional.",
          "Perencanaan karir yang terstruktur membantu memetakan langkah-langkah yang diperlukan untuk mencapai tujuan profesional."
        ]
      },
      {
        title: "Strategi Pengembangan Diri",
        paragraphs: [
          "Pengembangan diri adalah kunci untuk mempertahankan relevansi dalam karir yang dinamis."
        ],
        bulletPoints: [
          "Pembelajaran berkelanjutan dan sertifikasi",
          "Membangun personal branding yang kuat",
          "Mengembangkan soft skills dan leadership",
          "Membangun jaringan profesional",
          "Manajemen waktu dan prioritas"
        ]
      },
      {
        title: "Mencapai Target Karir",
        paragraphs: [
          "Mencapai kesuksesan karir membutuhkan kombinasi antara perencanaan strategis, eksekusi yang konsisten, dan kemampuan beradaptasi dengan perubahan.",
          "Penting untuk secara regular mengevaluasi progress, menyesuaikan strategi bila diperlukan, dan tetap fokus pada tujuan jangka panjang sambil mengelola tantangan jangka pendek."
        ]
      }
    ]
  },
  {
    slug: 'rahasia-sukses-melamar-kerja-di-era-digital',
    title: "Rahasia Sukses Melamar Kerja di Era Digital",
    category: "Melamar Kerja",
    date: "5 Apr 2025",
    image: "/notes.svg",
    description: "Dapatkan tips memaksimalkan profil digital dan strategi melamar kerja yang berhasil di lingkungan kerja modern.",
    content: [
      {
        title: "Mempersiapkan Profil Digital",
        paragraphs: [
          "Di era digital, profil online Anda adalah etalase profesional yang dapat dilihat oleh recruiter dan perusahaan. Membangun presence digital yang kuat menjadi semakin penting dalam proses pencarian kerja.",
          "LinkedIn, portfolio online, dan jejak digital lainnya menjadi faktor penting dalam proses rekrutmen modern."
        ]
      },
      {
        title: "Strategi Aplikasi Kerja",
        paragraphs: [
          "Beberapa strategi kunci untuk meningkatkan peluang kesuksesan dalam proses lamaran kerja di era digital."
        ],
        bulletPoints: [
          "Optimasi CV untuk ATS (Applicant Tracking System)",
          "Personal Branding yang Kuat",
          "Networking Digital yang Efektif",
          "Portfolio Online yang Impresif",
          "Follow-up yang Professional"
        ]
      },
      {
        title: "Persiapan Interview Digital",
        paragraphs: [
          "Interview virtual telah menjadi norma baru dalam proses rekrutmen. Persiapan yang matang untuk interview digital sama pentingnya dengan interview tatap muka.",
          "Memahami etika interview virtual, setup teknis yang optimal, dan kemampuan komunikasi digital menjadi kunci kesuksesan dalam proses interview."
        ]
      }
    ]
  },
  {
    slug: 'desain-pengguna-dengan-produk-digital',
    title: "Desain Pengguna dengan Produk Digital",
    category: "UI/UX Design",
    date: "2 Apr 2025",
    image: "/browser.svg",
    description: "Pelajari cara mendesain pengalaman pengguna lebih efektif dan menciptakan produk digital yang bermanfaat bagi pengguna.",
    content: [
      {
        title: "Fundamental UI/UX Design",
        paragraphs: [
          "User Interface (UI) dan User Experience (UX) design adalah komponen vital dalam pengembangan produk digital. Desain yang baik tidak hanya tentang estetika, tetapi juga tentang menciptakan pengalaman yang intuitif dan menyenangkan bagi pengguna.",
          "Memahami prinsip-prinsip dasar desain dan psikologi pengguna adalah langkah pertama dalam menciptakan produk digital yang sukses."
        ]
      },
      {
        title: "Elemen Penting dalam UI/UX",
        paragraphs: [
          "Beberapa elemen kunci yang perlu diperhatikan dalam mendesain produk digital yang efektif."
        ],
        bulletPoints: [
          "User Research dan Persona Development",
          "Information Architecture",
          "Visual Hierarchy dan Layout",
          "Interaction Design",
          "Usability Testing"
        ]
      },
      {
        title: "Implementasi Design System",
        paragraphs: [
          "Design system adalah fondasi penting dalam menciptakan produk digital yang konsisten dan skalabel. Sistem ini mencakup komponen, pattern, dan guidelines yang memastikan konsistensi desain di seluruh produk.",
          "Implementasi design system yang baik dapat meningkatkan efisiensi pengembangan dan menjaga kualitas pengalaman pengguna."
        ]
      }
    ]
  },
  {
    slug: 'berkarir-di-bidang-yang-berbeda-berani-untuk-mencoba',
    title: "Berkarir di Bidang yang Berbeda? Berani untuk Mencoba",
    category: "Lintas Minat",
    date: "30 Mar 2025",
    image: "/hacking.svg",
    description: "Pelajari jalur karier bidang teknologi yang berbeda untuk memperluas peluang jika keinginan untuk beralih profesi muncul.",
    content: [
      {
        title: "Mengapa Beralih Karir?",
        paragraphs: [
          "Beralih karir ke bidang yang berbeda bisa menjadi keputusan yang menantang namun berpotensi mengubah hidup. Di era digital yang terus berkembang, peluang untuk mengeksplorasi jalur karir baru semakin terbuka luas.",
          "Perubahan teknologi yang cepat dan munculnya bidang-bidang baru menciptakan kesempatan bagi siapa saja yang berani mengambil langkah untuk berubah."
        ]
      },
      {
        title: "Persiapan Alih Karir",
        paragraphs: [
          "Sebelum memutuskan untuk beralih karir, ada beberapa aspek penting yang perlu dipersiapkan dengan matang."
        ],
        bulletPoints: [
          "Pemetaan skill yang dapat ditransfer",
          "Identifikasi bidang yang diminati",
          "Perencanaan pembelajaran yang dibutuhkan",
          "Networking dengan profesional di bidang target",
          "Manajemen resiko dan keuangan selama transisi"
        ]
      },
      {
        title: "Langkah Strategis Alih Karir",
        paragraphs: [
          "Proses alih karir membutuhkan strategi yang terencana dan eksekusi yang konsisten. Mulai dari mengidentifikasi peluang, membangun portofolio, hingga mencari mentor yang dapat membimbing perjalanan karir baru Anda.",
          "Penting untuk tetap fleksibel dan terbuka terhadap berbagai kemungkinan selama proses transisi, karena seringkali peluang muncul dari arah yang tidak terduga."
        ]
      }
    ]
  }
];

export function getArticleBySlug(slug: string): Article | null {
  return articles.find(article => article.slug === slug) || null;
}

export function getRelatedArticles(currentSlug: string, count: number = 3): Article[] {
  const currentArticle = articles.find(article => article.slug === currentSlug);
  if (!currentArticle) return [];

  return articles
    .filter(article => 
      article.slug !== currentSlug && 
      article.category === currentArticle.category
    )
    .slice(0, count);
}

export default articles;
