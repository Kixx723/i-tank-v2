"use client"

import React from 'react';

interface ToolProps {
  onSelectNodeType: (nodeType: string) => void;
}

const FloatingTool: React.FC<ToolProps> = ({ onSelectNodeType }) => {
  return (
    <div
     style={{
      position: 'fixed',
      top: '50%',
      right: '0',
      transform: 'translateY(-50%)',
      zIndex: 1000,
      backgroundColor: 'rgba(220, 255, 255, 0.5)', // white background with 80% opacity
      padding: '10px',
      borderRadius: '8px',
    }}>
       <button onClick={() => onSelectNodeType('tank')} title="Tank" style={{ display: 'block', margin: '10px 0' }}><img src="/tankIcon.png" alt="Tank" style={{ width: '24px', height: '24px' }} /></button>
       <button onClick={() => onSelectNodeType('reservoir')} title="Reservoir" style={{ display: 'block', margin: '10px 0' }}><img src="/well.png" alt="Reservoir" style={{ width: '24px', height: '24px' }} /></button>
       <button onClick={() => onSelectNodeType('junction')} title="Junction" style={{ display: 'block', margin: '10px 0' }}><img src='/circle.png' alt="Junction" style={{ width: '24px', height: '24px' }} /></button>
       {/* <button onClick={() => onSelectLinkType('pipe')} title="Pipes" style={{ display: 'block', margin: '10px 0' }}><img src={pipes} alt="Pipes" style={{ width: '24px', height: '24px' }} /></button> */}
       {/* <button title="Valve" style={{ display: 'block', margin: '10px 0' }}><img src={valve} alt="Valve" style={{ width: '24px', height: '24px' }} /></button> */}
       {/* <button onClick={() => onSelectLinkType('pump')} title="Pump" style={{ display: 'block', margin: '10px 0' }}><img src={pump} alt="Pump" style={{ width: '24px', height: '24px' }} /></button> */}
    </div>
  );
};

export default FloatingTool;
