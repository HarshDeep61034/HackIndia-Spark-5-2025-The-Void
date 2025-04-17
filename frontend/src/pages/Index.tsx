import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, BookOpen, Calendar, MapPin, Bell, FileText } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Nav */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/chitkara-logo.png" alt="Chitkara University" className="h-8 rounded-lg mr-3" />
            <h1 className="font-bold text-2xl gradient-heading">Athena</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Log in
            </Button>
            <Button onClick={() => navigate('/login')}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b  relative bottom-14 from-background to-muted py-20 flex-1">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-heading">Athena</span> - Your AI Wingman for Chitkara University
              </h2>
              <p className="text-lg mb-8 text-muted-foreground">
                Navigate campus life effortlessly with Athena, your personal AI companion that answers FAQs, reminds you of deadlines, 
                finds the best food nearby, and helps with all aspects of your college journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => navigate('/login')}>
                  Get Started
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                  See Demo
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-10">
              <div className="bg-card rounded-xl overflow-hidden shadow-xl border">
                <div className="bg-primary/10 p-3 border-b">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="chat-bubble chat-bubble-assistant">
                      Hi there! I'm Athena, your AI companion for Chitkara University. How can I help you today?
                    </div>
                    <div className="chat-bubble chat-bubble-user">
                      When's the next internal exam for CSE department?
                    </div>
                    <div className="chat-bubble chat-bubble-assistant">
                      The next internal exam for CSE department is scheduled for May 3rd, 2025. Would you like me to send you a reminder on WhatsApp a day before?
                    </div>
                    <div className="chat-bubble chat-bubble-user">
                      Where's the best dosa in our Campus ?
                    </div>
                    <div className="chat-bubble chat-bubble-assistant">
                      According to recent student reviews, "South Circle" inside Square One is rated highest for dosas. They're open until 9 PM and have a student discount on Tuesdays!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Your Ultimate Campus Companion
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Athena makes campus life easier by providing instant information, reminders, and assistance for all your Chitkara University needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-accent/20">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <MessageSquare className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Campus FAQs</h3>
                <p className="text-muted-foreground">
                  Get instant answers about classes, professors, facilities, events, and all aspects of Chitkara University life.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/20">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Calendar className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Deadline Reminders</h3>
                <p className="text-muted-foreground">
                  Never miss an assignment or exam again with personalized reminders and integration with your Google Calendar.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/20">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Food & Location Guide</h3>
                <p className="text-muted-foreground">
                  Find the best food spots, study areas, and navigate campus with personalized recommendations based on your preferences.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/20">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Bell className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">"Chai Break" Detector</h3>
                <p className="text-muted-foreground">
                  Get notifications when your friends are taking breaks, perfect time to catch up over a cup of chai!
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-accent/20">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <BookOpen className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Course Assistant</h3>
                <p className="text-muted-foreground">
                  Get help with course materials, find study resources, and receive explanations tailored to your learning style.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-accent/20">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Form Support</h3>
                <p className="text-muted-foreground">
                  Get assistance with KYC, tax, visa forms, and other administrative paperwork required during your university journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your Chitkara experience?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of Chitkara University students who are making campus life easier with Athena.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => navigate('/login')}>
              Get Started Now
            </Button>
            <Button size="lg" variant="outline" className="bg-accent-foreground/10 text-accent-foreground" onClick={() => navigate('/login')}>
              Watch Tutorial
            </Button>
          </div>
        </div>
      </section>

      {/* Bonus Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Advanced Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Athena goes beyond text with these powerful capabilities
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <Card className="md:w-1/3">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-accent"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                  Voice Commands
                </h3>
                <p className="text-muted-foreground">
                  Talk to Athena naturally with voice recognition powered by Whisper technology for a hands-free experience.
                </p>
              </CardContent>
            </Card>
            
            <Card className="md:w-1/3">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-accent"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  WhatsApp Notifications
                </h3>
                <p className="text-muted-foreground">
                  Receive important reminders, updates, and answers directly to your WhatsApp via Twilio integration.
                </p>
              </CardContent>
            </Card>
            
            <Card className="md:w-1/3">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-accent"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>
                  Automation Integration
                </h3>
                <p className="text-muted-foreground">
                  Connect Athena to your favorite apps and services with Zapier/N8N integration for smart campus workflows.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 flex items-center">
              <img src="/chitkara-logo.png" alt="Chitkara University" className="h-8 rounded-lg mr-3" />
              <div>
                <h2 className="font-bold text-xl gradient-heading">Athena</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Developed for Chitkara University students as part of HackIndia 2025
                </p>
              </div>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Athena - CampusCopilot for Chitkara University. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;