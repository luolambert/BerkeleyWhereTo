// TypeA InfoPage - Optimized for mobile portrait + iPad portrait (< 1024px)
// Uses BuildingInfoContainer_TypeA for mobile-optimized layout

import React from 'react';
import BuildingInfoContainer_TypeA from '../../components/containers/BuildingInfoContainer_TypeA';

function InfoPage() {
  return (
    <div 
        key="info"
        className="absolute inset-0 w-full h-full z-50 overflow-hidden bg-neutral-50"
    >
         <div className="relative z-10 w-full h-full flex flex-col items-center">
             <div className="flex-1 w-full overflow-hidden mx-auto">
                <BuildingInfoContainer_TypeA 
                    currentView="info"
                />
             </div>
         </div>
    </div>
  );
}

export default InfoPage;
