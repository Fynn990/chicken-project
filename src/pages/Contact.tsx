
import { useState } from "react";
import Layout from "../components/Layout";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    // In a real application, you would send this data to your backend
    toast({
      title: "Message sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    
    // Clear form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <Layout>
      <div className="section-container">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Have questions or want to place a special order? We're here to help!
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-cartus-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Our Location</h3>
                  <p className="text-muted-foreground">
                    1234 Farm Road, Rural County<br />
                    Countryside, CS 56789
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-cartus-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <a 
                    href="tel:+15551234567" 
                    className="text-muted-foreground hover:text-cartus-primary transition-colors"
                  >
                    (555) 123-4567
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-cartus-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a 
                    href="mailto:info@cartusagri.com" 
                    className="text-muted-foreground hover:text-cartus-primary transition-colors"
                  >
                    info@cartusagri.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-cartus-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Business Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Friday: 8:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-6">Farm Tours</h2>
              <p className="text-muted-foreground mb-4">
                We offer educational tours of our farm facilities every Saturday 
                morning at 10:00 AM. Learn about our sustainable farming practices 
                and see how we raise our chickens.
              </p>
              <p className="text-muted-foreground">
                Tours are $12 per person and free for children under 5. 
                Reservations required at least 48 hours in advance.
              </p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <div className="bg-cartus-neutral/5 p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field w-full"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field w-full"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field w-full"
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="input-field w-full resize-none"
                    placeholder="What can we help you with?"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-cartus-primary text-white py-3 rounded-md font-medium hover:bg-cartus-primary/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="rounded-xl overflow-hidden h-[400px] mb-16">
          <img
            src="https://images.unsplash.com/photo-1569336415962-a4bd9f69c07a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
            alt="Farm location map"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-medium mb-2">Do you deliver?</h3>
              <p className="text-muted-foreground">
                Yes, we offer local delivery within a 30-mile radius of our farm for orders over $50. 
                We also ship nationwide using refrigerated shipping.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-medium mb-2">Are your products organic?</h3>
              <p className="text-muted-foreground">
                Many of our products are certified organic. Each product page clearly indicates 
                whether a product is organic or conventionally raised.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-medium mb-2">Can I place a custom order?</h3>
              <p className="text-muted-foreground">
                Absolutely! For special cuts, bulk orders, or custom processing, please contact us 
                directly by phone or email.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-medium mb-2">How fresh are your products?</h3>
              <p className="text-muted-foreground">
                All our products are processed within 24-48 hours before delivery or shipping to 
                ensure maximum freshness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
