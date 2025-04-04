
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
      <div key={component.name} className="mb-4">
        <ComponentPanel
          component={component}
          onSelectButton={onSelectButton}
          onSelectTarget={onSelectTarget}
          selectedButton={selectedButton}
          targetComponent={targetComponent}
          isSelectionMode={!!selectedButton}
        />
        
        {component.children && component.children.length > 0 && (
          <div className="ml-6 mt-2 pl-4 border-l-2 border-gray-200">
            {component.children.map(child => renderComponent(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Component Mapping</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {selectedButton && (
            <div className="p-3 bg-indigo-100 rounded-lg mb-4">
              <p className="font-medium">
                Select a target component for button <span className="px-2 py-0.5 bg-indigo-200 rounded">{selectedButton.buttonText}</span> from <span className="text-indigo-700">{selectedButton.componentName}</span>
              </p>
            </div>
          )}
          
          <div className="space-y-6">
            {componentData.map(component => renderComponent(component))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MappingCanvas;
