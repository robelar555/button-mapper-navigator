
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
  if (!selectedButton) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Create Connection</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 py-4 text-center">
            Select a button from a component to start creating a connection
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Connection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="px-3 py-2 bg-indigo-100 rounded-md flex-grow">
              <p className="text-sm text-gray-500">Source Component</p>
              <p className="font-medium">{selectedButton.componentName}</p>
            </div>
            <div className="px-3 py-2 bg-indigo-100 rounded-md flex-grow">
              <p className="text-sm text-gray-500">Button</p>
              <p className="font-medium truncate">
                {selectedButton.buttonText.length > 20 
                  ? selectedButton.buttonText.substring(0, 20) + "..." 
                  : selectedButton.buttonText}
              </p>
            </div>
          </div>
          
          <div className="px-3 py-2 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-500">Target Component</p>
            <p className="font-medium">{targetComponent || "Not selected"}</p>
          </div>

          <div>
            <label htmlFor="conditions" className="block text-sm font-medium text-gray-700 mb-1">
              Navigation Conditions
            </label>
            <Textarea
              id="conditions"
              placeholder="Describe any conditions required for this navigation (e.g., 'User must be logged in' or 'Form must be valid')"
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
              className="resize-none h-24"
            />
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={onClearSelection}>
              Cancel
            </Button>
            <Button
              onClick={onCreateConnection}
              disabled={!targetComponent}
              className="bg-teal-600 hover:bg-teal-700"
            >
              {!targetComponent ? "Select Target Component" : "Create Connection"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
