import { ComponentDef } from './types';

export const COMPONENT_LIBRARY: ComponentDef[] = [
  // Inputs
  {
    id: 'button',
    name: '按键开关 (Button)',
    icon: 'CircleDot',
    defaultPins: ['Pin'],
    category: 'Input',
    description: '简单的数字输入设备'
  },
  {
    id: 'potentiometer',
    name: '电位器 (Potentiometer)',
    icon: 'Gauge',
    defaultPins: ['Signal (A0-A5)'],
    category: 'Input',
    description: '模拟输入旋钮'
  },
  {
    id: 'ultrasonic',
    name: '超声波传感器 (HC-SR04)',
    icon: 'Waves',
    defaultPins: ['Trig', 'Echo'],
    category: 'Input',
    description: '测距传感器'
  },
  {
    id: 'dht',
    name: '温湿度传感器 (DHT11/22)',
    icon: 'Thermometer',
    defaultPins: ['Data'],
    category: 'Input',
    description: '环境温湿度检测'
  },
  {
    id: 'ldr',
    name: '光敏电阻 (LDR)',
    icon: 'Sun',
    defaultPins: ['Signal (Analog)'],
    category: 'Input',
    description: '光线强度检测'
  },
  // Outputs
  {
    id: 'led',
    name: 'LED 灯',
    icon: 'Lightbulb',
    defaultPins: ['Anode (+)'],
    category: 'Output',
    description: '发光二极管'
  },
  {
    id: 'rgb_led',
    name: 'RGB LED',
    icon: 'Palette',
    defaultPins: ['R', 'G', 'B'],
    category: 'Output',
    description: '全彩 LED'
  },
  {
    id: 'servo',
    name: '舵机 (Servo)',
    icon: 'RotateCw',
    defaultPins: ['Signal (PWM)'],
    category: 'Output',
    description: '精确角度控制电机'
  },
  {
    id: 'buzzer',
    name: '蜂鸣器 (Buzzer)',
    icon: 'Speaker',
    defaultPins: ['Pin (+)'],
    category: 'Output',
    description: '声音报警'
  },
  {
    id: 'lcd_i2c',
    name: 'LCD 1602 (I2C)',
    icon: 'Monitor',
    defaultPins: ['SDA', 'SCL'],
    category: 'Output',
    description: '字符显示屏'
  }
];

export const AVAILABLE_PINS = [
  'D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13',
  'A0', 'A1', 'A2', 'A3', 'A4', 'A5'
];
