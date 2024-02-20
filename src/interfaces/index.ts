export interface Node {
    id: number,
    longitude: number,
    latitude: number,
    type: string,
  }
  
  export interface EpanetNode {
    id: number,
    type: string,
  }

  export interface Junction {
    id: number;
    nodeId?: number;
    elevation?: number;
    demand?: number;
    demandPattern?: string;
  }

  export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    junction: Junction | null;
    onUpdate: (junctionId: number, updatedData: Partial<Junction>) => void;
  }