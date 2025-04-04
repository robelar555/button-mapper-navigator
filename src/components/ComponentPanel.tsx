
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ComponentData } from "@/lib/types";

interface ComponentPanelProps {
  component: ComponentData;
  onSelectButton: (componentName: string, buttonText: string) => void;
  onSelectTarget: (componentName: string) => void;
  selectedButton: { componentName: string, buttonText: string } | null;
  targetComponent: string | null;
  isSelectionMode: boolean;
}

const ComponentPanel: React.FC<ComponentPanelProps> = ({
  component,
  onSelectButton,
  onSelectTarget,
  selectedButton,
  targetComponent,
  isSelectionMode
}) => {
  const isSelected = targetComponent === component.name;
  const isSource = selectedButton?.componentName === component.name;

  return (
    <Card className={`
      border-2
      ${isSelected ? 'border-green-500 bg-green-50' : ''}
      ${isSource ? 'border-blue-500 bg-blue-50' : ''}
      ${!isSource && !isSelected ? 'border-gray-300' : ''}
    `}>
      <CardHeader className="pb-2 flex justify-between items-center">
        <CardTitle className="text-lg">
          <span className="font-bold">{component.name}</span>
          {isSource && <span className="ml-2 text-blue-600">(Source Component)</span>}
          {isSelected && <span className="ml-2 text-green-600">(Target Component)</span>}
        </CardTitle>
        {isSelectionMode && !isSource && (
          <Button 
            size="sm" 
            variant={isSelected ? "default" : "outline"}
            onClick={() => onSelectTarget(component.name)}
            className={isSelected ? "bg-green-600 hover:bg-green-700" : "border-2 border-green-500 text-green-600 hover:bg-green-50"}
          >
            {isSelected ? "✓ Selected as Target" : "Select as Target"}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <h3 className="text-gray-700 font-bold">Buttons in this component:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {component.buttons.map((button, index) => {
              const isButtonSelected = 
                selectedButton?.componentName === component.name && 
                selectedButton?.buttonText === button;
                
              return (
                <div key={index} className="flex items-center">
                  <Button
                    size="sm"
                    variant={isButtonSelected ? "default" : "outline"}
                    className={`w-full justify-start truncate p-3 text-left ${
                      isButtonSelected 
                        ? 'bg-blue-600 hover:bg-blue-700 border-2 border-blue-300' 
                        : 'border-2 border-gray-300 hover:border-blue-300'
                    }`}
                    onClick={() => onSelectButton(component.name, button)}
                  >
                    {isButtonSelected && "✓ "}
                    {button.length > 30 ? button.substring(0, 30) + "..." : button}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComponentPanel;
