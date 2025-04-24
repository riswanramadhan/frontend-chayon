// This file serves as a mock database/CMS for articles
// In a real application, this would be replaced with a database or CMS integration

export interface Article {
    slug: string
    title: string
    date: string
    category: string
    image: string
    bgColor: string
    description: string
    content: {
      title?: string
      paragraphs: string[]
      bulletPoints?: string[]
    }[]
    relatedArticles?: string[] // Array of slugs for related articles
  }
  
  // Article database
  export const articles: Record<string, Article> = {
    "masa-depan-teknologi-yang-harus-kamu-kuasai": {
      slug: "masa-depan-teknologi-yang-harus-kamu-kuasai",
      title: "Masa Depan Teknologi yang Harus Kamu Kuasai",
      date: "14 Apr 2023",
      category: "Machine Learning",
      image: "/placeholder.svg?height=400&width=600",
      bgColor: "#fff9e6",
      description:
        "Pelajari tren teknologi terbaru yang mengubah industri dan keterampilan teknologi yang akan dibutuhkan.",
      content: [
        {
          title: "Perkembangan Teknologi yang Pesat",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
          ],
        },
        {
          title: "Keterampilan yang Dibutuhkan di Masa Depan",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
          ],
          bulletPoints: [
            "Pemahaman mendalam tentang kecerdasan buatan",
            "Kemampuan analisis data yang kuat",
            "Adaptasi terhadap teknologi baru",
          ],
        },
        {
          title: "Langkah Persiapan untuk Masa Depan",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
          ],
        },
      ],
      relatedArticles: [
        "langkah-strategis-menuju-sukses",
        "rahasia-sukses-melamar-kerja-di-era-digital",
        "desain-pengguna-dengan-produk-digital",
      ],
    },
    "langkah-strategis-menuju-sukses": {
      slug: "langkah-strategis-menuju-sukses",
      title: "Langkah Strategis Menuju Sukses",
      date: "12 Apr 2023",
      category: "Strategi Digital",
      image: "/placeholder.svg?height=400&width=600",
      bgColor: "#e6ffe6",
      description:
        "Pelajari cara merencanakan dan mengimplementasikan strategi digital yang efektif untuk mencapai tujuan organisasi.",
      content: [
        {
          title: "Memahami Strategi Digital",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
          ],
        },
        {
          title: "Komponen Strategi yang Efektif",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
          ],
          bulletPoints: [
            "Analisis pasar yang komprehensif",
            "Penetapan tujuan yang jelas",
            "Implementasi yang konsisten",
          ],
        },
        {
          title: "Mengukur Keberhasilan Strategi",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
          ],
        },
      ],
      relatedArticles: [
        "masa-depan-teknologi-yang-harus-kamu-kuasai",
        "menjangkau-audiens-dan-meningkatkan-penjualan",
        "berkarir-di-bidang-yang-berbeda-berani-untuk-mencoba",
      ],
    },
    "rahasia-sukses-melamar-kerja-di-era-digital": {
      slug: "rahasia-sukses-melamar-kerja-di-era-digital",
      title: "Rahasia Sukses Melamar Kerja di Era Digital",
      date: "12 Apr 2023",
      category: "Karir Digital",
      image: "/placeholder.svg?height=400&width=600",
      bgColor: "#f5e6ff",
      description: "Pelajari cara membuat CV, portofolio, dan menghadapi wawancara kerja dengan percaya diri.",
      content: [
        {
          title: "Mempersiapkan CV yang Menarik",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
          ],
        },
        {
          title: "Membangun Portofolio Digital",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
          ],
          bulletPoints: [
            "Pilih proyek terbaik untuk ditampilkan",
            "Jelaskan kontribusi dan hasil yang dicapai",
            "Perbarui portofolio secara berkala",
          ],
        },
        {
          title: "Tips Menghadapi Wawancara",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
          ],
        },
      ],
      relatedArticles: [
        "berkarir-di-bidang-yang-berbeda-berani-untuk-mencoba",
        "masa-depan-teknologi-yang-harus-kamu-kuasai",
        "langkah-strategis-menuju-sukses",
      ],
    },
    "desain-pengguna-dengan-produk-digital": {
      slug: "desain-pengguna-dengan-produk-digital",
      title: "Desain Pengguna dengan Produk Digital",
      date: "12 Apr 2023",
      category: "UI/UX Design",
      image: "/placeholder.svg?height=400&width=600",
      bgColor: "#f8f9fa",
      description: "Konsep desain produk yang menciptakan pengalaman pengguna lebih mudah dan menyenangkan.",
      content: [
        {
          title: "Prinsip Dasar UI/UX Design",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
          ],
        },
        {
          title: "Elemen Penting dalam Desain Produk",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
          ],
          bulletPoints: ["Konsistensi dalam desain", "Kemudahan navigasi", "Responsif di berbagai perangkat"],
        },
        {
          title: "Proses Pengembangan Desain",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
          ],
        },
      ],
      relatedArticles: [
        "menjangkau-audiens-dan-meningkatkan-penjualan",
        "masa-depan-teknologi-yang-harus-kamu-kuasai",
        "langkah-strategis-menuju-sukses",
      ],
    },
    "menjangkau-audiens-dan-meningkatkan-penjualan": {
      slug: "menjangkau-audiens-dan-meningkatkan-penjualan",
      title: "Menjangkau Audiens dan Meningkatkan Penjualan",
      date: "12 Apr 2023",
      category: "Digital Marketing",
      image: "/placeholder.svg?height=400&width=600",
      bgColor: "#fff4ff",
      description:
        "Pelajari strategi pemasaran online untuk memperkuat brand dan meningkatkan hasil penjualan perusahaan.",
      content: [
        {
          title: "Memahami Target Audiens",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
          ],
        },
        {
          title: "Strategi Pemasaran Digital",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
          ],
          bulletPoints: [
            "Optimasi mesin pencari (SEO)",
            "Pemasaran konten yang efektif",
            "Strategi media sosial yang terintegrasi",
          ],
        },
        {
          title: "Mengukur Keberhasilan Kampanye",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
          ],
        },
      ],
      relatedArticles: [
        "desain-pengguna-dengan-produk-digital",
        "langkah-strategis-menuju-sukses",
        "masa-depan-teknologi-yang-harus-kamu-kuasai",
      ],
    },
    "berkarir-di-bidang-yang-berbeda-berani-untuk-mencoba": {
      slug: "berkarir-di-bidang-yang-berbeda-berani-untuk-mencoba",
      title: "Berkarir di Bidang yang Berbeda? Berani untuk Mencoba",
      date: "12 Apr 2023",
      category: "Karir Digital",
      image: "/placeholder.svg?height=400&width=600",
      bgColor: "#fff9e6",
      description: "Hindari jebakan bukan halangan! Pelajari cara beralih ke bidang yang baru.",
      content: [
        {
          title: "Mengenali Potensi Diri",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
          ],
        },
        {
          title: "Langkah Beralih Karir",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
          ],
          bulletPoints: [
            "Identifikasi keterampilan yang dapat ditransfer",
            "Perluas jaringan profesional",
            "Investasikan waktu untuk belajar keterampilan baru",
          ],
        },
        {
          title: "Mengatasi Tantangan",
          paragraphs: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec scelerisque viverra maecenas accumsan lacus vel. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.",
          ],
        },
      ],
      relatedArticles: [
        "rahasia-sukses-melamar-kerja-di-era-digital",
        "langkah-strategis-menuju-sukses",
        "masa-depan-teknologi-yang-harus-kamu-kuasai",
      ],
    },
  }
  
  // Function to get all articles
  export function getAllArticles() {
    return Object.values(articles)
  }
  
  // Function to get an article by slug
  export function getArticleBySlug(slug: string) {
    return articles[slug]
  }
  
  // Function to get related articles
  export function getRelatedArticles(slug: string, limit = 3) {
    const article = articles[slug]
    if (!article || !article.relatedArticles) {
      // If no related articles are specified, return random articles excluding the current one
      return Object.values(articles)
        .filter((a) => a.slug !== slug)
        .slice(0, limit)
    }
  
    return article.relatedArticles
      .map((relatedSlug) => articles[relatedSlug])
      .filter(Boolean)
      .slice(0, limit)
  }
  