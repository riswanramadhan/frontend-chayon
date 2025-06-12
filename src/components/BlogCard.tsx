import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Update to next/navigation for App Router

interface Blog {
  slug: string; // Changed from id to slug to match our articles data structure
  title: string;
  description?: string;
  category: string;
  date: string;
  image: string;
}

interface BlogCardProps {
  mainBlog?: Blog;
  smallBlogs: Blog[];
  buttonText?: string;
  buttonColor?: string;
  textColor?: string;
  onBlogClick?: (slug: string) => void; // Updated to use slug
}

const BlogCard = ({ 
  mainBlog, 
  smallBlogs, 
  buttonText = "Baca Selengkapnya", 
  buttonColor = "white",
  textColor = "black",
  onBlogClick
}: BlogCardProps) => {
  
  const router = useRouter();
  
  const handleReadMore = (slug: string, e: React.MouseEvent) => {
    if (onBlogClick) {
      e.preventDefault();
      onBlogClick(slug);
    } else {
      // If no click handler provided, navigate directly
      e.preventDefault();
      router.push(`/blog/${slug}`);
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Main Blog Card (if provided) */}
      {mainBlog && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8">
              <div className="flex items-center mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                  {mainBlog.category}
                </span>
                <span className="text-gray-500 text-sm">{mainBlog.date}</span>
              </div>
              <h2 className="text-2xl font-bold mb-4">{mainBlog.title}</h2>
              <p className="text-gray-600 mb-6">{mainBlog.description}</p>
              <Link href={`/blog/${mainBlog.slug}`} passHref>
                <button 
                  onClick={(e) => handleReadMore(mainBlog.slug, e)}
                  className={`inline-flex items-center px-4 py-2 rounded-md bg-${buttonColor} text-${textColor} hover:bg-gray-100`}
                >
                  {buttonText}
                  <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
                </button>
              </Link>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <Image 
                src={`/${mainBlog.image}`}
                alt={mainBlog.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Small Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {smallBlogs.map((blog, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="relative h-48">
              <Image 
                src={`/${blog.image}`} 
                alt={blog.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-3">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                  {blog.category}
                </span>
                <span className="text-gray-500 text-sm">{blog.date}</span>
              </div>
              <h3 className="text-xl font-bold mb-4">{blog.title}</h3>
              <Link href={`/blog/${blog.slug}`} passHref>
                <button 
                  onClick={(e) => handleReadMore(blog.slug, e)}
                  className={`inline-flex items-center px-4 py-2 rounded-md bg-${buttonColor} text-${textColor} hover:bg-gray-100`}
                >
                  {buttonText}
                  <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCard;