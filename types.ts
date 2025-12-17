export enum PinType {
  DIGITAL = 'Digital',
  ANALOG = 'Analog',
  PWM = 'PWM',
  I2C = 'I2C',
  UART = 'UART'
}

export interface ComponentDef {
  id: string;
  name: string;
  icon: string; // Icon name from Lucide
  defaultPins: string[];
  description: string;
  category: 'Input' | 'Output' | 'Communication';
}

export interface ActiveComponent {
  id: string; // unique instance id
  defId: string;
  name: string; // user readable label e.g., "Red LED"
  pins: Record<string, string>; // pin label -> arduino pin (e.g., "Signal": "D3")
}

export interface GeneratedResult {
  code: string;
  wiring: string;
  explanation: string;
}
