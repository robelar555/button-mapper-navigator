
export interface ComponentData {
  name: string;
  buttons: string[];
  children?: ComponentData[];
}

export interface Connection {
  sourceComponentName: string;
  sourceButtonText: string;
  targetComponentName: string;
  conditions: string;
}
