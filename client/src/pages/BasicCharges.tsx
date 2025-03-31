import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

const BasicCharges = () => {
  const { data: content, isLoading } = useQuery({
    queryKey: ["/api/content/basic_charges"],
    staleTime: Infinity,
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-header font-bold text-3xl md:text-4xl text-primary mb-2">Basic Electric Charges</h1>
          <p className="text-lg text-gray-600">Learn about the fundamental properties of electric charges</p>
        </div>

        <Card className="mb-8">
          <CardHeader className="bg-primary text-white">
            <CardTitle className="font-header font-medium text-xl">Electric Charges</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {isLoading ? (
              <p>Loading content...</p>
            ) : (
              <>
                <p className="mb-4">
                  Electric charge is a fundamental property of matter. There are two types of electric charges: <span className="font-medium text-destructive">positive</span> and <span className="font-medium text-primary">negative</span>.
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
              </>
            )}
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader className="bg-gray-100">
            <CardTitle className="font-header font-medium text-xl text-primary">Charge Behavior Visualization</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-around items-center mb-8">
              <div className="flex flex-col items-center">
                <div className="flex space-x-6 mb-4">
                  <div className="h-12 w-12 rounded-full bg-destructive flex items-center justify-center text-white text-lg font-bold">+</div>
                  <div className="h-12 w-12 rounded-full bg-destructive flex items-center justify-center text-white text-lg font-bold">+</div>
                </div>
                <i className="ri-arrow-up-line text-xl"></i>
                <p className="text-sm font-medium mt-1">Repulsion</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex space-x-6 mb-4">
                  <div className="h-12 w-12 rounded-full bg-destructive flex items-center justify-center text-white text-lg font-bold">+</div>
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold">−</div>
                </div>
                <i className="ri-arrow-down-line text-xl"></i>
                <p className="text-sm font-medium mt-1">Attraction</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Link href="/">
            <Button variant="outline">
              <i className="ri-arrow-left-line mr-2"></i> Back to Home
            </Button>
          </Link>
          <Link href="/coulombs-law">
            <Button>
              Next: Coulomb's Law <i className="ri-arrow-right-line ml-2"></i>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BasicCharges;
