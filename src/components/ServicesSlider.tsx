
import ImageSlider from "./ImageSlider";

const ServicesSlider = () => {
  const serviceSlides = [
    {
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb",
      caption: "Discover inner peace through our spiritual wellness programs"
    },
    {
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      caption: "Professional support for your mental wellbeing journey"
    },
    {
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
      caption: "Join our supportive community of like-minded individuals"
    },
    {
      image: "/public/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png",
      caption: "Explore our range of products designed to enhance your wellbeing"
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
