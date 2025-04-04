
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center bg-blue-600 text-white p-6 rounded-lg">
          <h1 className="text-4xl font-bold">Button Mapper Tool</h1>
          <p className="text-xl mt-3">Connect buttons to components - Simple as 1-2-3!</p>
        </header>

        <div className="space-y-8">
          {/* COMPONENT JSON SECTION */}
          <Card>
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-xl">Your Component JSON</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-3 font-bold">Paste your component data in JSON format:</p>
              <Textarea 
                className="font-mono h-48 resize-none border-2 border-gray-300"
                value={jsonInput}
                onChange={handleJsonChange}
              />
              {error && <p className="text-red-500 mt-2 text-lg font-bold">{error}</p>}
            </CardContent>
          </Card>
          
          {/* MAPPING SECTION - Steps 1 & 2 */}
          <div className="space-y-6">
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

          {/* CONNECTIONS SUMMARY SECTION */}
          <Card>
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-xl">Step 3: Your Connections</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {connections.length > 0 ? (
                <div className="space-y-4">
                  {connections.map((connection, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-md border-2 border-gray-300 hover:border-blue-300">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="bg-blue-100 p-2 rounded-lg border border-blue-300 font-bold">
                            {connection.sourceComponentName}
                          </span>
                          <span className="text-2xl">→</span>
                          <span className="px-3 py-1 bg-blue-200 rounded text-blue-800 font-bold">
                            {connection.sourceButtonText.length > 20 
                              ? connection.sourceButtonText.substring(0, 20) + "..." 
                              : connection.sourceButtonText
                            }
                          </span>
                          <span className="text-2xl">→</span>
                          <span className="bg-green-100 p-2 rounded-lg border border-green-300 font-bold">
                            {connection.targetComponentName}
                          </span>
                        </div>
                        
                        {connection.conditions && (
                          <p className="text-sm bg-yellow-50 p-2 rounded border border-yellow-200">
                            <span className="font-bold">Conditions:</span> {connection.conditions}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteConnection(connection.sourceComponentName, connection.sourceButtonText)}
                        className="font-bold"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <p className="text-2xl font-bold text-gray-500 mb-3">No connections yet!</p>
                  <p className="text-lg text-gray-500">Complete Steps 1 and 2 to create connections</p>
                </div>
              )}
              
              {connections.length > 0 && (
                <div className="mt-6 flex justify-end">
                  <Button variant="outline" size="lg" onClick={resetAll} className="border-2 border-red-300 text-red-600 font-bold">
                    Reset All Connections
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* GENERATED CONFIGURATION SECTION */}
          {connections.length > 0 && (
            <Card>
              <CardHeader className="bg-green-50">
                <CardTitle className="text-xl">Ready! Your Connection Configuration</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="font-bold mb-3">Here's your configuration in JSON format:</p>
                <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-auto text-sm border-4 border-green-600">
                  {JSON.stringify(connections, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
