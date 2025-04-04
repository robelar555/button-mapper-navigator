
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
      ${isSelected ? 'ring-2 ring-teal-500 shadow-md' : ''}
      ${isSource ? 'bg-indigo-50' : ''}
    `}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{component.name}</CardTitle>
          {isSelectionMode && !isSource && (
            <Button 
              size="sm" 
              variant={isSelected ? "default" : "outline"}
              onClick={() => onSelectTarget(component.name)}
              className={isSelected ? "bg-teal-600 hover:bg-teal-700" : ""}
            >
              {isSelected ? "Selected" : "Select as Target"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h3 className="text-sm text-gray-500 font-medium">Buttons:</h3>
          <div className="grid grid-cols-1 gap-2">
            {component.buttons.map((button, index) => {
              const isButtonSelected = 
                selectedButton?.componentName === component.name && 
                selectedButton?.buttonText === button;
                
              return (
                <div key={index} className="flex items-center">
                  <Button
                    size="sm"
                    variant={isButtonSelected ? "default" : "outline"}
                    className={`w-full justify-start truncate ${isButtonSelected ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
                    onClick={() => onSelectButton(component.name, button)}
                  >
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
