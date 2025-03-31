import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface TabProps {
  id: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

const Tab = ({ id, label, active, onClick }: TabProps) => {
  return (
    <li role="presentation">
      <button
        className={`inline-block px-6 py-4 font-medium transition-all ${
          active 
            ? "bg-gradient-to-br from-primary/10 to-primary/5 text-primary border-b-2 border-primary" 
            : "border-transparent text-muted-foreground hover:text-white hover:bg-muted/30"
        }`}
        id={`${id}-tab`}
        type="button"
        role="tab"
        aria-controls={id}
        aria-selected={active}
        onClick={onClick}
      >
        {label}
      </button>
    </li>
  );
};

interface TabContentProps {
  id: string;
  active: boolean;
  children: React.ReactNode;
}

const TabContent = ({ id, active, children }: TabContentProps) => {
  return (
    <div
      className={`${active ? "block" : "hidden"} py-6`}
      id={id}
      role="tabpanel"
      aria-labelledby={`${id}-tab`}
    >
      {children}
    </div>
  );
};

const ConceptsSection = () => {
  const [activeTab, setActiveTab] = useState<string>("basic");

  const { data: content, isLoading } = useQuery({
    queryKey: ["/api/content"],
    staleTime: Infinity,
  });

  // Get content by section
  const getContentBySection = (section: string) => {
    if (!content || !Array.isArray(content)) return [];
    return content.filter((item: any) => item.section === section);
  };

  const basicChargesContent = getContentBySection("basic_charges");
  const coulombsLawContent = getContentBySection("coulombs_law");

  return (
    <div className="container mx-auto px-4">
      <h2 className="font-header font-bold text-3xl md:text-4xl mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Key Concepts
      </h2>

      <div className="max-w-4xl mx-auto bg-card/40 backdrop-blur-sm rounded-xl shadow-lg border border-border/40 overflow-hidden">
        {/* Concepts tabs */}
        <div className="border-b border-border">
          <ul className="flex flex-wrap text-sm font-medium" role="tablist">
            <Tab
              id="basic"
              label="Electric Charges"
              active={activeTab === "basic"}
              onClick={() => setActiveTab("basic")}
            />
            <Tab
              id="coulombs"
              label="Coulomb's Law"
              active={activeTab === "coulombs"}
              onClick={() => setActiveTab("coulombs")}
            />
          </ul>
        </div>

        {/* Tab content */}
        <div id="conceptTabContent" className="px-6">
          {/* Basic Charges Tab */}
          <TabContent id="basic" active={activeTab === "basic"}>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="font-header font-medium text-xl mb-4 text-primary">Electric Charges</h3>
                <p className="mb-4">
                  Electric charge is a fundamental property of matter. There are two types of electric charges: <span className="font-medium text-primary">positive</span> and <span className="font-medium text-secondary">negative</span>.
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>Like charges repel each other (positive repels positive, negative repels negative)</li>
                  <li>Unlike charges attract each other (positive attracts negative)</li>
                  <li>The SI unit of electric charge is the coulomb (C)</li>
                  <li>Charge is conserved - it cannot be created or destroyed</li>
                </ul>
                <p>
                  The elementary charge (e) is the charge of a proton or electron: e = 1.602 × 10<sup>-19</sup> C
                </p>
              </div>
              <div className="flex-1 max-w-sm">
                <div className="bg-card rounded-xl p-6 relative border border-border shadow-lg">
                  {/* Simple charge visualization */}
                  <div className="mb-6 text-center font-header font-medium text-lg">Charge Behavior</div>
                  <div className="flex justify-around items-center mb-8">
                    <div className="flex flex-col items-center">
                      <div className="flex space-x-6 mb-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20 flex items-center justify-center text-white text-lg font-bold">+</div>
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20 flex items-center justify-center text-white text-lg font-bold">+</div>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <polyline points="19 12 12 19 5 12"></polyline>
                      </svg>
                      <p className="text-sm font-medium mt-1">Repulsion</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="flex space-x-6 mb-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20 flex items-center justify-center text-white text-lg font-bold">+</div>
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-secondary to-secondary/80 shadow-lg shadow-secondary/20 flex items-center justify-center text-white text-lg font-bold">−</div>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="19" x2="12" y2="5"></line>
                        <polyline points="5 12 12 5 19 12"></polyline>
                      </svg>
                      <p className="text-sm font-medium mt-1">Attraction</p>
                    </div>
                  </div>
                  <div className="text-center text-sm text-muted-foreground bg-muted/30 rounded-lg p-2">
                    Charges exert forces on each other according to their signs
                  </div>
                </div>
              </div>
            </div>
          </TabContent>

          {/* Coulomb's Law Tab */}
          <TabContent id="coulombs" active={activeTab === "coulombs"}>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="font-header font-medium text-xl mb-4 text-primary">Coulomb's Law</h3>
                <p className="mb-4">Coulomb's Law describes the electrostatic force between two charged particles:</p>
                <div className="bg-muted rounded-lg p-5 mb-6 font-mono text-center shadow-inner">
                  <span className="text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">F = k × |q₁ × q₂| / r²</span>
                </div>
                <div className="space-y-2 mb-6">
                  <p><strong>Where:</strong></p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>F</strong> is the electrostatic force (in newtons, N)</li>
                    <li><strong>k</strong> is Coulomb's constant (8.99 × 10⁹ N·m²/C²)</li>
                    <li><strong>q₁, q₂</strong> are the magnitudes of the charges (in coulombs, C)</li>
                    <li><strong>r</strong> is the distance between the charges (in meters, m)</li>
                  </ul>
                </div>
                <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                  <p className="font-medium">
                    The force is <span className="text-primary">repulsive</span> if the charges have the same sign, and <span className="text-secondary">attractive</span> if they have opposite signs.
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-card rounded-xl p-6 border border-border shadow-lg">
                  <h4 className="font-header font-medium text-lg mb-4 text-center">Coulomb's Law Visualization</h4>
                  <div className="aspect-video bg-gradient-to-br from-muted to-muted/70 rounded-lg mb-4 relative overflow-hidden shadow-inner" id="coulomb-visual">
                    {/* Visualization */}
                    <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-lg flex items-center justify-center text-white font-bold text-xl">+</div>
                    <div className="absolute right-1/4 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-full bg-gradient-to-r from-secondary to-secondary/80 shadow-lg flex items-center justify-center text-white font-bold text-xl">−</div>
                    {/* Force line indicator */}
                    <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-center">
                      <div className="h-1 bg-white/30 w-1/2 pulse"></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">
                      The force is <span className="text-secondary">attractive</span> because the charges have opposite signs.
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      As the distance (r) between charges increases, the force (F) decreases by the square of the distance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabContent>
        </div>
      </div>
    </div>
  );
};

export default ConceptsSection;