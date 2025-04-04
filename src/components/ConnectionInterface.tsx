
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComponentData } from "@/lib/types";

interface ConnectionInterfaceProps {
  componentData: ComponentData[];
  selectedButton: { componentName: string, buttonText: string } | null;
  targetComponent: string | null;
  conditions: string;
  setConditions: (value: string) => void;
  onCreateConnection: () => void;
  onClearSelection: () => void;
}

export const ConnectionInterface: React.FC<ConnectionInterfaceProps> = ({
  componentData,
  selectedButton,
  targetComponent,
  conditions,
  setConditions,
  onCreateConnection,
  onClearSelection
}) => {
  const isReady = selectedButton && targetComponent;
  
  return (
    <Card>
      <CardHeader className="bg-blue-50">
        <CardTitle className="flex items-center">
          <span className="text-xl">Step 2: Finish the Connection</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {!selectedButton ? (
          <div className="p-8 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <p className="text-xl font-bold mb-2">First complete Step 1 above!</p>
            <p className="text-gray-500">Select a button from any component to start.</p>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 ${selectedButton ? 'bg-blue-50' : 'bg-gray-50'} border-2 ${selectedButton ? 'border-blue-400' : 'border-gray-200'} rounded-lg`}>
                <p className="text-sm text-gray-500 mb-1">Source Component:</p>
                <p className="text-lg font-bold">{selectedButton.componentName}</p>
              </div>
              
              <div className={`p-4 ${selectedButton ? 'bg-blue-50' : 'bg-gray-50'} border-2 ${selectedButton ? 'border-blue-400' : 'border-gray-200'} rounded-lg`}>
                <p className="text-sm text-gray-500 mb-1">Selected Button:</p>
                <p className="text-lg font-bold truncate">{selectedButton.buttonText}</p>
              </div>
            </div>

            <div className={`p-4 ${targetComponent ? 'bg-green-50 border-green-400' : 'bg-gray-50 border-gray-200'} border-2 rounded-lg`}>
              <p className="text-sm text-gray-500 mb-1">Target Component:</p>
              <p className="text-lg font-bold">{targetComponent || "Not selected yet"}</p>
              {!targetComponent && (
                <p className="text-orange-500 mt-1">👆 Go back to Step 1 and select a target component!</p>
              )}
            </div>

            <div className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
              <label htmlFor="conditions" className="block text-lg font-bold text-gray-700 mb-2">
                Optional: Add Navigation Conditions
              </label>
              <p className="text-sm text-gray-600 mb-3">
                Describe any special conditions required for this button to navigate to the target 
                (e.g., "User must be logged in" or "Form must be valid")
              </p>
              <Textarea
                id="conditions"
                placeholder="Write your conditions here..."
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
                className="resize-none h-24 border-2 border-gray-300"
              />
            </div>
            
            <div className="flex justify-between pt-2">
              <Button 
                size="lg"
                variant="outline" 
                onClick={onClearSelection}
                className="border-2 border-red-300 text-red-600 hover:bg-red-50"
              >
                Cancel
              </Button>
              
              <Button
                size="lg"
                onClick={onCreateConnection}
                disabled={!targetComponent}
                className={`text-lg px-6 ${
                  !targetComponent 
                    ? 'bg-gray-400' 
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {!targetComponent ? "Select Target Component First" : "Create Connection"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
