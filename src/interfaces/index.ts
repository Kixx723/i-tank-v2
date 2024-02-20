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

  export interface Tank {
    id: number;
    nodeId?: number;
    elevation?: number;
    initialLevel?: number;
    minimumLevel?: number;
    maximumLevel?: number;
    diameter?: number;
    minimumVolume?: number;
    volumeCurve?: string;
  }

  export interface ModalTankProps {
    isOpen: boolean;
    onClose: () => void;
    tank: Tank | null;
    onUpdate: (tankId: number, updatedData: Partial<Junction>) => void;
  }