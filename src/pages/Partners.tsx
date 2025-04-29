
import React, { useEffect } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServicePartnerCard } from '@/components/partners/ServicePartnerCard';
import { Check, FileText, Link as LinkIcon, Search, Star, UserCheck } from 'lucide-react';

// Partner data with more detailed information
const partnerData = [
  {
    id: 'partner1',
    name: 'MindWell Therapy',
    logo: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
    description: 'Specializing in cognitive behavioral therapy and mindfulness-based approaches for anxiety and depression.',
    specialties: ['Anxiety', 'Depression', 'Trauma', 'Stress Management'],
    location: 'Multiple locations nationwide',
    verified: true,
    featured: true,
    rating: 4.8,
    reviews: 127,
    website: 'https://mindwelltherapy.com',
    type: 'clinical',
    acceptingNew: true
  },
  {
    id: 'partner2',
    name: 'Serenity Counseling',
    logo: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
    description: 'Holistic counseling services focusing on the mind-body connection and integrative wellness approaches.',
    specialties: ['Couples Therapy', 'Family Counseling', 'Grief Support', 'Life Transitions'],
    location: 'Boston, MA and Online',
    verified: true,
    featured: false,
    rating: 4.6,
    reviews: 98,
    website: 'https://serenitycounseling.org',
    type: 'clinical',
    acceptingNew: true
  },
  {
    id: 'partner3',
    name: 'Breathe Meditation Center',
    logo: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
    description: 'Guided meditation programs and mindfulness training for stress reduction and emotional regulation.',
    specialties: ['Meditation', 'Mindfulness', 'Stress Reduction', 'Workplace Wellness'],
    location: 'San Francisco, CA and Online',
    verified: true,
    featured: true,
    rating: 4.9,
    reviews: 215,
    website: 'https://breathemeditation.center',
    type: 'wellness',
    acceptingNew: true
  },
  {
    id: 'partner4',
    name: 'Recovery Path',
    logo: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
    description: 'Specialized addiction recovery programs combining evidence-based treatments and supportive community.',
    specialties: ['Substance Abuse', 'Addiction Recovery', 'Relapse Prevention', 'Support Groups'],
    location: 'Chicago, IL and Online',
    verified: true,
    featured: false,
    rating: 4.7,
    reviews: 152,
    website: 'https://recoverypath.org',
    type: 'addiction',
    acceptingNew: false
  },
  {
    id: 'partner5',
    name: 'Thrive Corporate Wellness',
    logo: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
    description: 'Comprehensive workplace wellness programs designed to improve employee mental health and productivity.',
    specialties: ['Corporate Programs', 'Employee Assistance', 'Workplace Stress', 'Team Building'],
    location: 'Nationwide',
    verified: true,
    featured: true,
    rating: 4.5,
    reviews: 87,
    website: 'https://thrivecorporate.com',
    type: 'corporate',
    acceptingNew: true
  },
  {
    id: 'partner6',
    name: 'Youth Mental Health Alliance',
    logo: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
    description: 'Specialized mental health services for children, teens, and young adults facing developmental challenges.',
    specialties: ['Child Psychology', 'Teen Counseling', 'ADHD', 'Behavioral Issues'],
    location: 'New York, NY and Online',
    verified: true,
    featured: false,
    rating: 4.8,
    reviews: 106,
    website: 'https://ymhalliance.org',
    type: 'clinical',
    acceptingNew: true
  },
  {
    id: 'partner7',
    name: 'Spiritual Growth Center',
    logo: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
    description: 'Integrating spiritual practices with psychological support for holistic healing and personal growth.',
    specialties: ['Spiritual Counseling', 'Meditation', 'Life Purpose', 'Holistic Wellness'],
    location: 'Denver, CO and Online',
    verified: true,
    featured: false,
    rating: 4.7,
    reviews: 93,
    website: 'https://spiritualgrowth.center',
    type: 'spiritual',
    acceptingNew: true
  },
  {
    id: 'partner8',
    name: 'Veterans Support Network',
    logo: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
    description: 'Specialized mental health services for veterans and military families dealing with trauma and reintegration.',
    specialties: ['PTSD', 'Military Trauma', 'Reintegration', 'Family Support'],
    location: 'Multiple locations nationwide',
    verified: true,
    featured: true,
    rating: 4.9,
    reviews: 176,
    website: 'https://veteranssupport.net',
    type: 'clinical',
    acceptingNew: true
  },
  {
    id: 'partner9',
    name: 'Wellness Collective',
    logo: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
    description: 'Collaborative wellness center offering various holistic approaches to mental and physical health.',
    specialties: ['Yoga Therapy', 'Nutritional Psychology', 'Art Therapy', 'Ecotherapy'],
    location: 'Portland, OR and Online',
    verified: false,
    featured: false,
    rating: 4.4,
    reviews: 62,
    website: 'https://wellnesscollective.co',
    type: 'wellness',
    acceptingNew: true
  },
  {
    id: 'partner10',
    name: 'Global Minds Institute',
    logo: '/lovable-uploads/b97cd24e-d99c-413c-84ad-e51e71795119.png',
    description: 'Research-focused organization providing evidence-based mental health education and resources worldwide.',
    specialties: ['Research', 'Education', 'Global Mental Health', 'Training'],
    location: 'Online - Global',
    verified: true,
    featured: false,
    rating: 4.6,
    reviews: 84,
    website: 'https://globalminds.institute',
    type: 'education',
    acceptingNew: false
  }
];

const Partners = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState('all');

  useEffect(() => {
    document.title = "Mental Health Partners - MeantToHelp";
    window.scrollTo(0, 0);
  }, []);

  const filteredPartners = partnerData.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         partner.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         partner.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeFilter === 'all') return matchesSearch;
    return matchesSearch && partner.type === activeFilter;
  });

  const featuredPartners = partnerData.filter(p => p.featured);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-meant-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Our Mental Health <span className="text-meant-600">Partners</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-700 mb-8"
              >
                Discover our network of verified mental health service providers, from professional therapists 
                to wellness specialists, all committed to supporting your mental health journey.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative max-w-xl mx-auto"
              >
                <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="search"
                  placeholder="Search by name, specialty, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-6 rounded-full border border-gray-300 shadow-sm focus:ring-meant-500 focus:border-meant-500"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Partner Stats */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="p-4"
              >
                <p className="text-3xl md:text-4xl font-bold text-meant-600 mb-2">150+</p>
                <p className="text-gray-600">Verified Partners</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-4"
              >
                <p className="text-3xl md:text-4xl font-bold text-meant-600 mb-2">25+</p>
                <p className="text-gray-600">Specializations</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="p-4"
              >
                <p className="text-3xl md:text-4xl font-bold text-meant-600 mb-2">50k+</p>
                <p className="text-gray-600">Clients Served</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-4"
              >
                <p className="text-3xl md:text-4xl font-bold text-meant-600 mb-2">4.8</p>
                <p className="text-gray-600">Average Rating</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Partners */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h2 className="text-2xl font-bold mb-4">Featured Partners</h2>
              <p className="text-gray-700">
                Highly-rated mental health service providers that have demonstrated exceptional quality of care.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPartners.slice(0, 3).map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ServicePartnerCard partner={partner} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* All Partners */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h2 className="text-2xl font-bold mb-4">Partner Directory</h2>
              <p className="text-gray-700">
                Explore our network of mental health service providers by category.
              </p>
            </motion.div>

            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveFilter}>
              <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-10">
                <TabsTrigger value="all">All Partners</TabsTrigger>
                <TabsTrigger value="clinical">Clinical Services</TabsTrigger>
                <TabsTrigger value="wellness">Wellness Providers</TabsTrigger>
                <TabsTrigger value="spiritual">Spiritual Guidance</TabsTrigger>
                <TabsTrigger value="corporate">Corporate Services</TabsTrigger>
                <TabsTrigger value="addiction">Addiction Recovery</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {filteredPartners.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No partners found matching your search criteria.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setSearchQuery('')}
                    >
                      Clear Search
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPartners.map((partner, index) => (
                      <motion.div
                        key={partner.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <ServicePartnerCard partner={partner} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="clinical" className="space-y-4">
                {filteredPartners.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No clinical partners found matching your search criteria.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setSearchQuery('')}
                    >
                      Clear Search
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPartners.map((partner, index) => (
                      <motion.div
                        key={partner.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <ServicePartnerCard partner={partner} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="wellness" className="space-y-4">
                {filteredPartners.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No wellness partners found matching your search criteria.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setSearchQuery('')}
                    >
                      Clear Search
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPartners.map((partner, index) => (
                      <motion.div
                        key={partner.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <ServicePartnerCard partner={partner} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="spiritual" className="space-y-4">
                {filteredPartners.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No spiritual guidance partners found matching your search criteria.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setSearchQuery('')}
                    >
                      Clear Search
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPartners.map((partner, index) => (
                      <motion.div
                        key={partner.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <ServicePartnerCard partner={partner} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="corporate" className="space-y-4">
                {filteredPartners.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No corporate partners found matching your search criteria.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setSearchQuery('')}
                    >
                      Clear Search
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPartners.map((partner, index) => (
                      <motion.div
                        key={partner.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <ServicePartnerCard partner={partner} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="addiction" className="space-y-4">
                {filteredPartners.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No addiction recovery partners found matching your search criteria.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setSearchQuery('')}
                    >
                      Clear Search
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPartners.map((partner, index) => (
                      <motion.div
                        key={partner.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <ServicePartnerCard partner={partner} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Partner Benefits */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-4">Why Partner With Us?</h2>
                <p className="text-gray-700 mb-6">
                  Joining our network as a mental health service provider offers numerous benefits and opportunities.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-meant-100 p-2 rounded-full mr-3 mt-1">
                      <UserCheck size={18} className="text-meant-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Increased Visibility</h3>
                      <p className="text-gray-600">Reach thousands of potential clients through our platform.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-meant-100 p-2 rounded-full mr-3 mt-1">
                      <Check size={18} className="text-meant-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Verification Badge</h3>
                      <p className="text-gray-600">Earn our trusted verification to enhance your credibility.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-meant-100 p-2 rounded-full mr-3 mt-1">
                      <FileText size={18} className="text-meant-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Simplified Administration</h3>
                      <p className="text-gray-600">Use our tools for appointments, billing, and client management.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-meant-100 p-2 rounded-full mr-3 mt-1">
                      <LinkIcon size={18} className="text-meant-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Professional Network</h3>
                      <p className="text-gray-600">Connect with other mental health professionals and specialists.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button className="bg-meant-600 hover:bg-meant-700">
                    Apply to Become a Partner
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-lg overflow-hidden shadow-xl"
              >
                <img 
                  src="/lovable-uploads/574d7e65-696e-471c-849d-e785d5f54a9d.png" 
                  alt="Mental health professionals in a meeting" 
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Partner Selection */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 max-w-3xl mx-auto"
            >
              <h2 className="text-2xl font-bold mb-4">Our Partner Selection Process</h2>
              <p className="text-gray-700">
                We maintain high standards for our partners to ensure quality care for our users.
                Every provider in our network undergoes a thorough vetting process.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white p-6 rounded-lg shadow"
              >
                <div className="w-12 h-12 bg-meant-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-meant-600 font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Credential Verification</h3>
                <p className="text-gray-600">
                  We verify all professional licenses, certifications, and educational backgrounds to ensure every provider is properly qualified.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white p-6 rounded-lg shadow"
              >
                <div className="w-12 h-12 bg-meant-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-meant-600 font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Quality Assessment</h3>
                <p className="text-gray-600">
                  Our team evaluates service quality through client feedback, professional reputation, and consistency in care standards.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white p-6 rounded-lg shadow"
              >
                <div className="w-12 h-12 bg-meant-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-meant-600 font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Ongoing Monitoring</h3>
                <p className="text-gray-600">
                  Partners undergo regular reviews based on client satisfaction, outcome measures, and adherence to our platform standards.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-meant-600">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold mb-6 text-white"
              >
                Ready to Find the Right Support?
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg text-white/90 mb-8"
              >
                Connect with our network of mental health partners today and take the first step on your journey to better mental health.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Button className="bg-white text-meant-600 hover:bg-gray-100">
                  Find a Provider
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Become a Partner
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Partners;
