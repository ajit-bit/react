import React from 'react';
import '../styles/Blog.css';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      date: { day: '15', month: 'APR' },
      image: 'images/blog1.jpg',
      category: 'Info Styles',
      title: 'HOW TO STYLE MISMATCHED EARRINGS',
      excerpt: 'Mismatched earrings have become a bold and trendy fashion statement...',
      hasVideo: false
    },
    {
      id: 2,
      date: { day: '15', month: 'APR' },
      image: 'images/blog2.jpg',
      category: 'Info Trends',
      title: 'THE JEWELLERY TRENDS WE\'RE SEEING EVERYWHERE',
      excerpt: 'Jewelry has the remarkable ability to elevate any outfit, adding a touch of glamour...',
      hasVideo: true
    },
    {
      id: 3,
      date: { day: '14', month: 'APR' },
      image: 'images/blog4.jpg',
      category: 'Info Styles',
      title: 'WHAT IS ROSE GOLD AND WHY IS IT SO POPULAR?',
      excerpt: 'Rose gold is a type of gold alloy that has a distinctive pinkish or reddish hue...',
      hasVideo: false
    },
    {
      id: 4,
      date: { day: '07', month: 'APR' },
      image: 'images/blog4.jpg',
      category: 'Collections Info',
      title: '10 MUST-HAVE JEWELLERY PIECES FOR SPRING SUMMER 2024',
      excerpt: 'As the seasons change, so do fashion trends...',
      hasVideo: false
    },
    {
      id: 5,
      date: { day: '12', month: 'MAR' },
      image: 'images/blog1.jpg',
      category: 'Gifts Info',
      title: 'SHOW HER THE LOVE: MOTHER\'S DAY GIFTS FOR EVERY...',
      excerpt: 'Mother\'s Day is a special occasion to celebrate the incredible women who have shaped our lives...',
      hasVideo: false
    },
    {
      id: 6,
      date: { day: '04', month: 'MAR' },
      image: 'images/blog2.jpg',
      category: 'Gemstone Info',
      title: 'GEMSTONE SPOTLIGHT: AQUAMARINE',
      excerpt: 'Aquamarine, with its serene blue hues reminiscent of the ocean depths...',
      hasVideo: false
    }
  ];

  return (
    <div className="blog-container">
      <div id="overlay" className="overlay"></div>

      <main style={{ padding: '40px', maxWidth: '1200px', margin: 'auto' }}>
        <h1 style={{ 
          fontFamily: "'Playfair Display', serif", 
          fontSize: '32px', 
          marginBottom: '30px' 
        }}>
          BLOG
        </h1>
        
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-card">
              <div className="blog-date">
                {post.date.day} <span>{post.date.month}</span>
              </div>
              
              <div style={{ position: 'relative' }}>
                <img src={post.image} alt={post.title} />
                {post.hasVideo && (
                  <div className="video-overlay">►</div>
                )}
              </div>
              
              <div className="blog-category">{post.category}</div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <a href="#">Read more →</a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Blog;