import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { judgeSupportLabels } from '../utils/judgeSupportLabels';

interface MobileHeaderProps {
  labels?: string[];
}

const MobileHeader2: React.FC<MobileHeaderProps> = ({ labels = judgeSupportLabels }) => {
  const { selectedLabel, setSelectedLabel } = useAuth();

  const handleLabelClick = (index: number) => {
    setSelectedLabel(index);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '41px', overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {/* <div style={{ position: 'relative', width: '473px', height: '1px', top: '10px', left: '0' }}>
        <img style={{ position: 'absolute', width: '100%', height: '1px' }} alt="Vector" src={"vector2"} />
      </div> */}
      <div style={{ position: 'relative', width: '473px', height: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '25px', top: '15px', left: '4px' }}>
          {labels.map((label, index) => (
            <div
              key={index}
              style={{
                flex: 1,
                textAlign: 'center',
                height: '22px',
                color: 'black',
                fontSize: '14px',
                letterSpacing: '0',
                lineHeight: '22px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                fontFamily: 'Roboto-Regular, Helvetica',
                fontWeight: '400',
                position: 'relative'
              }}
              onClick={() => handleLabelClick(index)}
            >
              {label}
              {selectedLabel === index && (
                <div style={{ position: 'absolute', width: '100%', height: '1px', backgroundColor: 'black', bottom: '0', left: '0' }}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileHeader2;