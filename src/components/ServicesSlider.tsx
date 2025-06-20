
import ImageSlider from "./ImageSlider";

const ServicesSlider = () => {
  const serviceSlides = [
    {
      image: "https://images.unsplash.com/photo-1591027866135-b2bb82b6a9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      caption: "Discover inner peace through our spiritual wellness programs",
      fallback: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      caption: "Professional therapy support for your mental wellbeing journey",
      fallback: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      caption: "Join our supportive community of like-minded individuals",
      fallback: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
      image: "https://images.unsplash.com/photo-1545156521-77bd85671d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      caption: "Explore our range of wellness products designed to enhance your wellbeing",
      fallback: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-meant-50/50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="inline-block py-1 px-3 rounded-full bg-meant-100 text-meant-800 text-sm font-medium mb-3">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-meant-800">
            Supporting Your Journey to Wellness
          </h2>
          <p className="text-muted-foreground">
            Explore our comprehensive range of services designed to support your mental health and spiritual wellbeing.
          </p>
        </div>
        
        <div className="shadow-xl max-w-4xl mx-auto">
          <ImageSlider slides={serviceSlides} />
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="/services" 
            className="inline-flex items-center text-meant-600 hover:text-meant-800 font-medium transition-colors"
          >
            View All Services
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSlider;
