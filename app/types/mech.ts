// types/mech.ts

export interface Tool {
    id: string;
    name: string;
  }
  
  export interface Message {
    type: 'user' | 'assistant' | 'error';
    content: string;
  }
  
  export interface MechRequest {
    prompt: string;
    agentId: number;
    tool?: string;
  }
  
  export interface MechResponse {
    result: string;
    error?: string;
  }