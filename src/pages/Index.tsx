
import { useEffect } from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import BlogSection from '../components/BlogSection';
import UserChat from '../components/UserChat';

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Hero />
      <FeaturedProducts />
      <BlogSection />
      <UserChat />
    </Layout>
  );
};

export default Index;
