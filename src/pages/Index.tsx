
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ComponentPanel from "@/components/ComponentPanel";
import MappingCanvas from "@/components/MappingCanvas";
import { ConnectionInterface } from "@/components/ConnectionInterface";
import { initialSampleData } from "@/lib/sample-data";
import { ComponentData, Connection } from "@/lib/types";

const Index = () => {
  const [componentData, setComponentData] = useState<ComponentData[]>(initialSampleData);
  const [jsonInput, setJsonInput] = useState<string>(JSON.stringify(initialSampleData, null, 2));
  const [selectedButton, setSelectedButton] = useState<{componentName: string, buttonText: string} | null>(null);
  const [targetComponent, setTargetComponent] = useState<string | null>(null);
  const [conditions, setConditions] = useState<string>("");
  const [connections, setConnections] = useState<Connection[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      setComponentData(parsed);
      setError(null);
    } catch (err) {
      setError("Invalid JSON format");
    }
  };

  const handleSelectButton = (componentName: string, buttonText: string) => {
    setSelectedButton({ componentName, buttonText });
    setTargetComponent(null);
  };

  const handleSelectTarget = (componentName: string) => {
    setTargetComponent(componentName);
  };

  const handleCreateConnection = () => {
    if (!selectedButton || !targetComponent) return;
    
    const newConnection: Connection = {
      sourceComponentName: selectedButton.componentName,
      sourceButtonText: selectedButton.buttonText,
      targetComponentName: targetComponent,
      conditions: conditions.trim(),
    };

    // Check if connection already exists
    const existingIndex = connections.findIndex(
      conn => 
        conn.sourceComponentName === selectedButton.componentName && 
        conn.sourceButtonText === selectedButton.buttonText
    );

    if (existingIndex >= 0) {
      const updatedConnections = [...connections];
      updatedConnections[existingIndex] = newConnection;
      setConnections(updatedConnections);
    } else {
      setConnections([...connections, newConnection]);
    }

    // Reset after creating connection
    setSelectedButton(null);
    setTargetComponent(null);
    setConditions("");
  };

  const handleDeleteConnection = (sourceComponentName: string, sourceButtonText: string) => {
    setConnections(connections.filter(
      conn => !(conn.sourceComponentName === sourceComponentName && conn.sourceButtonText === sourceButtonText)
    ));
  };

  const resetAll = () => {
    setSelectedButton(null);
    setTargetComponent(null);
    setConditions("");
    setConnections([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-indigo-700">Button Mapper Navigator</h1>
          <p className="text-gray-600 mt-2">Connect buttons to components with custom navigation conditions</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Component JSON</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                className="font-mono h-64 resize-none"
                value={jsonInput}
                onChange={handleJsonChange}
              />
              {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            </CardContent>
          </Card>
          
          <div className="lg:col-span-2 space-y-6">
            <MappingCanvas 
              componentData={componentData}
              connections={connections}
              selectedButton={selectedButton}
              targetComponent={targetComponent}
              onSelectButton={handleSelectButton}
              onSelectTarget={handleSelectTarget}
            />

            <ConnectionInterface
              componentData={componentData}
              selectedButton={selectedButton}
              targetComponent={targetComponent}
              conditions={conditions}
              setConditions={setConditions}
              onCreateConnection={handleCreateConnection}
              onClearSelection={() => {
                setSelectedButton(null);
                setTargetComponent(null);
                setConditions("");
              }}
            />
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connection Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {connections.length > 0 ? (
                <div className="space-y-4">
                  {connections.map((connection, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
                      <div>
                        <span className="font-medium text-indigo-700">{connection.sourceComponentName}</span>
                        <span className="mx-2">→</span>
                        <span className="px-2 py-1 bg-gray-200 rounded text-sm">
                          {connection.sourceButtonText}
                        </span>
                        <span className="mx-2">→</span>
                        <span className="font-medium text-teal-600">{connection.targetComponentName}</span>
                        
                        {connection.conditions && (
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Conditions:</span> {connection.conditions}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteConnection(connection.sourceComponentName, connection.sourceButtonText)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-6">No connections created yet</p>
              )}
              
              {connections.length > 0 && (
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" onClick={resetAll}>
                    Reset All Connections
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Generated Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto">
                {JSON.stringify(connections, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
