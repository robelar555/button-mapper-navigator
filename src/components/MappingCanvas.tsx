
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ComponentPanel from "./ComponentPanel";
import { ComponentData, Connection } from "@/lib/types";

interface MappingCanvasProps {
  componentData: ComponentData[];
  connections: Connection[];
  selectedButton: { componentName: string, buttonText: string } | null;
  targetComponent: string | null;
  onSelectButton: (componentName: string, buttonText: string) => void;
  onSelectTarget: (componentName: string) => void;
}

const MappingCanvas: React.FC<MappingCanvasProps> = ({
  componentData,
  connections,
  selectedButton,
  targetComponent,
  onSelectButton,
  onSelectTarget
}) => {
  // Flatten all components including nested children
  const flattenComponents = (components: ComponentData[], result: ComponentData[] = []): ComponentData[] => {
    components.forEach(component => {
      result.push(component);
      if (component.children && component.children.length > 0) {
        flattenComponents(component.children, result);
      }
    });
    return result;
  };

  const allComponents = flattenComponents(componentData);
  
  const renderComponent = (component: ComponentData) => {
    return (
      <div key={component.name} className="mb-6">
        <ComponentPanel
          component={component}
          onSelectButton={onSelectButton}
          onSelectTarget={onSelectTarget}
          selectedButton={selectedButton}
          targetComponent={targetComponent}
          isSelectionMode={!!selectedButton}
        />
        
        {component.children && component.children.length > 0 && (
          <div className="ml-8 mt-3 pl-4 border-l-4 border-blue-300">
            <div className="text-blue-500 font-medium mb-2 text-sm">Child Components:</div>
            {component.children.map(child => renderComponent(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="bg-blue-50">
        <CardTitle className="flex items-center">
          <span className="text-xl">Step 1: Select a Button & Target</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {!selectedButton ? (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
            <p className="font-bold text-center text-lg">👇 FIRST: Click on any button below 👇</p>
          </div>
        ) : !targetComponent ? (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
            <h3 className="font-bold text-lg mb-2 text-center">Button "{selectedButton.buttonText}" selected from {selectedButton.componentName}</h3>
            <p className="text-center font-bold">👇 NOW: Click "Select as Target" on any component 👇</p>
          </div>
        ) : (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg mb-6">
            <h3 className="font-bold text-lg mb-2 text-center">Connection Ready!</h3>
            <p className="text-center">
              Button "{selectedButton.buttonText}" from <span className="font-bold">{selectedButton.componentName}</span> will connect to <span className="font-bold">{targetComponent}</span>
            </p>
            <p className="text-center font-bold mt-2">👇 Go to Step 2 below to finish 👇</p>
          </div>
        )}
        
        <div className="space-y-6">
          {componentData.map(component => renderComponent(component))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MappingCanvas;
