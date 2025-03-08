
import Layout from "../components/Layout";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="section-container">
        {/* Hero Section */}
        <div className="relative mb-20">
          <div className="w-full h-[300px] md:h-[400px] overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
              alt="Cartus Agri Farm"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="max-w-3xl px-6 md:px-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Our Story
                </h1>
                <p className="text-white/90 text-lg md:text-xl max-w-2xl">
                  From humble beginnings to becoming a leader in sustainable farming
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              At Cartus Agri Ltd., our mission is simple yet profound: to provide 
              families with the healthiest, most ethically raised chicken products 
              while maintaining sustainable farming practices that respect our land, 
              animals, and community.
            </p>
            <p className="text-muted-foreground mb-6">
              Founded in 1985 by the Cartus family, our farm began as a small operation 
              with just 50 free-range chickens. Today, we've grown to become one of the 
              region's most respected poultry farms, but our commitment to quality and 
              ethical practices remains unchanged.
            </p>
            <p className="text-muted-foreground">
              We believe that better farming practices lead to better food, healthier 
              communities, and a more sustainable future for all.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Free-range chickens"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <Separator className="my-16" />

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground">
              These core principles guide everything we do at Cartus Agri Ltd.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-cartus-neutral/5 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-cartus-primary">
                Animal Welfare
              </h3>
              <p className="text-muted-foreground mb-6">
                Our chickens live in humane conditions with access to fresh air, 
                natural light, and the freedom to behave naturally. We never use 
                antibiotics or growth hormones.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-cartus-primary" />
                  <span>Free-range environments</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-cartus-primary" />
                  <span>Natural, hormone-free feed</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-cartus-primary" />
                  <span>Antibiotic-free raising</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-cartus-neutral/5 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-cartus-primary">
                Sustainability
              </h3>
              <p className="text-muted-foreground mb-6">
                We implement regenerative agricultural practices that improve our soil, 
                reduce waste, and minimize our environmental impact throughout our 
                entire operation.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-cartus-primary" />
                  <span>Solar-powered facilities</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-cartus-primary" />
                  <span>Composting and waste reduction</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-cartus-primary" />
                  <span>Water conservation systems</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-cartus-neutral/5 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-cartus-primary">
                Community
              </h3>
              <p className="text-muted-foreground mb-6">
                We believe in supporting our local community through job creation, 
                educational programs, and partnerships with local businesses and 
                restaurants.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-cartus-primary" />
                  <span>Farm-to-school programs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-cartus-primary" />
                  <span>Local employment priority</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-cartus-primary" />
                  <span>Educational farm tours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground">
              Meet the passionate individuals who make Cartus Agri Ltd. what it is today.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Robert Cartus"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium">Robert Cartus</h3>
              <p className="text-cartus-primary font-medium">Founder & CEO</p>
            </div>
            
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Maria Cartus"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium">Maria Cartus</h3>
              <p className="text-cartus-primary font-medium">Head of Operations</p>
            </div>
            
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="David Turner"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium">David Turner</h3>
              <p className="text-cartus-primary font-medium">Farm Manager</p>
            </div>
            
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Sarah Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium">Sarah Chen</h3>
              <p className="text-cartus-primary font-medium">Sustainability Director</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
