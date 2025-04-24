interface Blog {
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
  }
  
  const BlogCard: React.FC<BlogCardProps> = ({ mainBlog, smallBlogs, buttonText = "Baca Selengkapnya", buttonColor = "black", textColor = "white" }) => {
    return (
      <div className="flex flex-col items-center space-y-12">
        {mainBlog && (
          <div className="flex bg-white border border-gray-200 rounded-lg shadow-md w-[1312px] h-[523px]">
            <div className="w-[676px] h-[523px] bg-cover bg-center rounded-l-lg" style={{ backgroundImage: 'url(${mainBlog.image})' }}></div>
            <div className="p-12 flex flex-col justify-between w-[636px]">
              <div className="flex items-center justify-between">
                <div className="bg-black text-white text-sm px-3 py-1 rounded">{mainBlog.category}</div>
                <span className="text-sm text-gray-600">{mainBlog.date}</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 leading-snug">{mainBlog.title}</h2>
              <p className="text-gray-600 text-lg opacity-60">{mainBlog.description}</p>
              <button className="mt-4 border border-black px-6 py-2 rounded flex items-center space-x-2">
                <span>{buttonText}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        )}
  
        <div className="grid grid-cols-3 gap-6 w-[1312px]">
          {smallBlogs.map((blog, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md p-4 w-[400px] flex flex-col">
              <div className="w-full h-[180px] bg-cover bg-center rounded-lg" style={{ backgroundImage: 'url(${blog.image})' }}></div>
              <div className="mt-4 flex flex-col flex-grow">
                <div className="bg-black text-white text-xs px-2 py-1 rounded w-fit">{blog.category}</div>
                <h3 className="text-lg font-semibold mt-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm">{blog.date}</p>
                <button 
                  className="mt-auto border border-black px-4 py-2 rounded flex items-center space-x-2 self-start" 
                  style={{ backgroundColor: buttonColor, color: textColor }}
                >
                  <span className="text-sm">{buttonText}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default BlogCard;