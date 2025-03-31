import HeroSection from "@/components/HeroSection";
import ConceptsSection from "@/components/ConceptsSection";
import SimulatorSection from "@/components/SimulatorSection";
import CalculatorSection from "@/components/CalculatorSection";
import QuizSection from "@/components/QuizSection";

const Home = () => {
  return (
    <div className="pb-16">
      {/* Introduction Section */}
      <section id="introduction" className="py-16 bg-background">
        <HeroSection />
      </section>
      
      {/* Objectives/Learning Outcomes Section */}
      <section id="objectives" className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Learning Objectives</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-muted p-6 rounded-lg border border-primary/20 shadow-lg hover:shadow-primary/10 transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-primary">Knowledge Objectives</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>Understand the fundamental properties of electric charges</li>
                <li>Master Coulomb's Law and its mathematical expression</li>
                <li>Recognize the different types of charges and their interactions</li>
                <li>Understand how electric forces influence particles in various contexts</li>
              </ul>
            </div>
            <div className="bg-muted p-6 rounded-lg border border-secondary/20 shadow-lg hover:shadow-secondary/10 transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-secondary">Skill Objectives</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>Calculate electric forces using Coulomb's Law</li>
                <li>Predict the behavior of charged particles</li>
                <li>Solve multi-particle force problems</li>
                <li>Apply electrical concepts to real-world technological scenarios</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Concepts Section */}
      <section id="concepts" className="py-16 bg-background">
        <ConceptsSection />
      </section>
      
      {/* Real World Applications Section */}
      <section id="applications" className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Real World Applications</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-muted p-5 rounded-lg border border-border">
              <h3 className="text-xl font-semibold mb-3 text-primary">Electronics</h3>
              <p>Electric charge principles drive the functioning of all electronic devices from smartphones to computers. Understanding these concepts helps explain how electricity flows through circuits.</p>
            </div>
            <div className="bg-muted p-5 rounded-lg border border-border">
              <h3 className="text-xl font-semibold mb-3 text-secondary">Medicine</h3>
              <p>Medical technologies like electrocardiograms (ECGs) and defibrillators rely on electrical principles to diagnose and treat heart conditions by measuring and manipulating electrical signals.</p>
            </div>
            <div className="bg-muted p-5 rounded-lg border border-border">
              <h3 className="text-xl font-semibold mb-3 text-primary">Energy Systems</h3>
              <p>Power generation and distribution systems apply fundamental electromagnetic principles to convert mechanical energy to electrical energy and efficiently transmit it over long distances.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Interactive Tools Section */}
      <section id="tools" className="py-16 bg-background">
        <div className="container mx-auto px-4 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Interactive Tools</h2>
        </div>
        <SimulatorSection />
        <CalculatorSection />
        <QuizSection />
      </section>
      
      {/* References Section */}
      <section id="references" className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">References</h2>
          <div className="bg-muted p-6 rounded-lg border border-border">
            <ul className="space-y-4">
              <li className="border-b border-border pb-2">
                <p className="font-semibold">Halliday, D., Resnick, R., & Walker, J. (2013)</p>
                <p className="text-muted-foreground">Fundamentals of Physics (10th ed.). Wiley.</p>
              </li>
              <li className="border-b border-border pb-2">
                <p className="font-semibold">Serway, R. A., & Jewett, J. W. (2018)</p>
                <p className="text-muted-foreground">Physics for Scientists and Engineers (10th ed.). Cengage Learning.</p>
              </li>
              <li className="border-b border-border pb-2">
                <p className="font-semibold">Young, H. D., & Freedman, R. A. (2019)</p>
                <p className="text-muted-foreground">University Physics with Modern Physics (15th ed.). Pearson.</p>
              </li>
              <li>
                <p className="font-semibold">Griffiths, D. J. (2017)</p>
                <p className="text-muted-foreground">Introduction to Electrodynamics (4th ed.). Cambridge University Press.</p>
              </li>
              <li className="border-b border-border pb-2">
                <p className="font-semibold">Electric charge: Properties, examples, units, & facts. (n.d.). In Encyclopedia Britannica.</p>
                <p className="text-muted-foreground">Electric Charge</p>
              </li>
              <li className="border-b border-border pb-2">
                <p className="font-semibold">The Physics Classroom. (n.d.). Coulomb’s law.</p>
                <p className="text-muted-foreground">Coulomb's law</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">About This Project</h2>
          <div className="bg-muted p-6 rounded-lg border border-border max-w-3xl mx-auto">
            <p className="mb-4">This educational website was created to help students and enthusiasts learn about electric charges and Coulomb's Law through interactive visualizations and explanations.</p>
            <p className="mb-4">Our goal is to make these physics concepts more accessible and engaging through visual demonstrations and practical examples.</p>
            <p>The visualizations and simulations are based on established physics principles and are designed to provide an intuitive understanding of how electric charges interact with each other.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
