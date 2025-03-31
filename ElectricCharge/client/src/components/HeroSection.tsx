import { Link } from "wouter";

const HeroSection = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="rounded-xl border border-primary/30 overflow-hidden shadow-xl shadow-primary/5">
        <section className="relative py-16 md:py-24 flex items-center">
          {/* Improved background with particles effect */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10"></div>
            
            {/* Animated particle effects */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Scattered particles */}
              <div className="absolute h-2 w-2 rounded-full bg-primary/40 top-[15%] left-[10%] animate-pulse"></div>
              <div className="absolute h-3 w-3 rounded-full bg-primary/30 top-[25%] left-[20%] animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute h-4 w-4 rounded-full bg-primary/20 top-[45%] left-[15%] animate-pulse" style={{animationDelay: '1.2s'}}></div>
              <div className="absolute h-2 w-2 rounded-full bg-primary/30 top-[65%] left-[25%] animate-pulse" style={{animationDelay: '0.7s'}}></div>
              <div className="absolute h-3 w-3 rounded-full bg-primary/40 top-[75%] left-[10%] animate-pulse" style={{animationDelay: '1.5s'}}></div>
              
              <div className="absolute h-2 w-2 rounded-full bg-secondary/40 top-[10%] right-[15%] animate-pulse" style={{animationDelay: '0.3s'}}></div>
              <div className="absolute h-3 w-3 rounded-full bg-secondary/30 top-[30%] right-[25%] animate-pulse" style={{animationDelay: '1.1s'}}></div>
              <div className="absolute h-4 w-4 rounded-full bg-secondary/20 top-[50%] right-[10%] animate-pulse" style={{animationDelay: '0.8s'}}></div>
              <div className="absolute h-2 w-2 rounded-full bg-secondary/30 top-[70%] right-[20%] animate-pulse" style={{animationDelay: '1.4s'}}></div>
              <div className="absolute h-3 w-3 rounded-full bg-secondary/40 top-[85%] right-[15%] animate-pulse" style={{animationDelay: '0.6s'}}></div>
            </div>
            
            {/* Main animated charges */}
            <div className="absolute left-[15%] top-[30%] w-16 h-16 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 animate-pulse shadow-lg shadow-primary/20" style={{animationDuration: '3s'}}></div>
            <div className="absolute right-[15%] bottom-[30%] w-16 h-16 rounded-full bg-gradient-to-br from-secondary/40 to-secondary/10 animate-pulse shadow-lg shadow-secondary/20" style={{animationDuration: '4s'}}></div>
            
          </div>
          
          {/* Content */}
          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-card/50 backdrop-blur-sm border border-primary/30 rounded-full font-medium shadow-sm">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Electricity and Electromagnetism
              </span>
            </div>
            
            <h1 className="font-header font-bold text-4xl md:text-6xl mb-6 bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent drop-shadow-sm">
              Electric Charge and Coulomb's Law
            </h1>
            
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-white/90">
              Discover how invisible forces power our world. Dive into the fundamentals of electricity and electromagnetism. 
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#concepts" 
                className="bg-gradient-to-br from-primary to-primary/90 text-white font-medium px-8 py-3 rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
              >
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 6V2H8"></path>
                    <path d="m8 10 4-4 4 4"></path>
                    <rect x="2" y="14" width="20" height="8" rx="2"></rect>
                  </svg>
                  Start Learning
                </span>
              </a>
              <a 
                href="#tools" 
                className="bg-gradient-to-br from-secondary to-secondary/90 text-white font-medium px-8 py-3 rounded-lg shadow-lg shadow-secondary/20 hover:shadow-secondary/40 transition-all"
              >
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"></path>
                    <path d="M12 13v9"></path>
                    <path d="M12 2v4"></path>
                  </svg>
                  Try Interactive Tools
                </span>
              </a>
            </div>
          </div>
        </section>
      </div>
      
      {/* Feature cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-card p-6 rounded-lg border border-primary/20 shadow-lg">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"></path>
              <path d="M12 13v9"></path>
              <path d="M12 2v4"></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Interactive Simulations</h3>
          <p className="text-muted-foreground">Explore electric field patterns with our visual simulator that lets you place and manipulate charges</p>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-secondary/20 shadow-lg">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary/10 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 3a2 2 0 0 0-2 2"></path>
              <path d="M19 3a2 2 0 0 1 2 2"></path>
              <path d="M21 19a2 2 0 0 1-2 2"></path>
              <path d="M5 21a2 2 0 0 1-2-2"></path>
              <path d="M9 3h1"></path>
              <path d="M9 21h1"></path>
              <path d="M14 3h1"></path>
              <path d="M14 21h1"></path>
              <path d="M3 9v1"></path>
              <path d="M21 9v1"></path>
              <path d="M3 14v1"></path>
              <path d="M21 14v1"></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Practical Examples</h3>
          <p className="text-muted-foreground">See how electric forces shape technology and everyday devices through real-world applications</p>
        </div>
        
        <div className="bg-card p-6 rounded-lg border border-primary/20 shadow-lg">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12h20"></path>
              <path d="M12 2v20"></path>
              <path d="m4.93 4.93 14.14 14.14"></path>
              <path d="m19.07 4.93-14.14 14.14"></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Visualized Physics</h3>
          <p className="text-muted-foreground">Understand abstract physics concepts through engaging visualizations and intuitive demonstrations</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
