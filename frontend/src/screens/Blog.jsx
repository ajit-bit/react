import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { PlayCircleFill } from 'react-bootstrap-icons';
import '../styles/Blog.css';

// Image imports
import blogImg1 from '../assets/images/blog1.jpg';
import blogImg2 from '../assets/images/blog2.jpg';
import blogImg4 from '../assets/images/blog4.jpg';

const Blog = () => {
  const blogPosts = [
    { id: 1, date: { day: '15', month: 'APR' }, image: blogImg1, category: 'Info Styles', title: 'HOW TO STYLE MISMATCHED EARRINGS', excerpt: 'Mismatched earrings have become a bold and trendy fashion statement...', hasVideo: false },
    { id: 2, date: { day: '15', month: 'APR' }, image: blogImg2, category: 'Info Trends', title: 'THE JEWELLERY TRENDS WE\'RE SEEING EVERYWHERE', excerpt: 'Jewelry has the remarkable ability to elevate any outfit, adding a touch of glamour...', hasVideo: true },
    { id: 3, date: { day: '14', month: 'APR' }, image: blogImg4, category: 'Info Styles', title: 'WHAT IS ROSE GOLD AND WHY IS IT SO POPULAR?', excerpt: 'Rose gold is a type of gold alloy that has a distinctive pinkish or reddish hue...', hasVideo: false },
    { id: 4, date: { day: '07', month: 'APR' }, image: blogImg4, category: 'Collections Info', title: '10 MUST-HAVE JEWELLERY PIECES FOR SPRING SUMMER 2024', excerpt: 'As the seasons change, so do fashion trends...', hasVideo: false },
    { id: 5, date: { day: '12', month: 'MAR' }, image: blogImg1, category: 'Gifts Info', title: 'SHOW HER THE LOVE: MOTHER\'S DAY GIFTS FOR EVERY...', excerpt: 'Mother\'s Day is a special occasion to celebrate the incredible women who have shaped our lives...', hasVideo: false },
    { id: 6, date: { day: '04', month: 'MAR' }, image: blogImg2, category: 'Gemstone Info', title: 'GEMSTONE SPOTLIGHT: AQUAMARINE', excerpt: 'Aquamarine, with its serene blue hues reminiscent of the ocean depths...', hasVideo: false },
  ];

  return (
    <div className="blog-page-background">
      <div className="page-content-wrapper">
        <Container className="py-5 px-3">
          <div className="text-center mb-5">
            <h1 className="font-playfair display-4 text-goldenrod">BLOG</h1>
          </div>
          
          {/* We remove xs={1}, change g-5 to g-lg-5, and add our custom class */}
          <Row lg={3} className="g-lg-5 mobile-horizontal-scroll">
            {blogPosts.map((post) => (
              <Col key={post.id} className="text-center text-lg-start">
                <div className="blog-post-category-header">
                  {post.category}
                </div>

                <Card className="h-100 border-0 blog-card-custom rounded-4">
                  <div className="blog-card-image-wrapper rounded-top-4">
                    <Card.Img variant="top" src={post.image} alt={post.title} />
                    <Badge className="position-absolute top-0 start-0 m-3 z-1 blog-date-badge">
                    </Badge>
                    {post.hasVideo && <div className="video-overlay-icon position-absolute top-50 start-50 translate-middle"><PlayCircleFill color="white" size={50} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} /></div>}
                  </div>
                  
                  <Card.Body className="d-flex flex-column p-4">
                    <Card.Title className="blog-card-title">{post.title}</Card.Title>
                    <Card.Text className="text-secondary small mb-4">{post.excerpt}</Card.Text>
                    
                    <Button href="#" variant="outline-dark" size="sm" className="mt-auto align-self-center align-self-lg-start blog-read-more-btn">
                      Read more →
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Blog;