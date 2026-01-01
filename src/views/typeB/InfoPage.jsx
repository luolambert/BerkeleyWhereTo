import React from 'react';
import BuildingInfoContainer from '../../components/containers/BuildingInfoContainer';

function InfoPage() {
  return (
    <div 
        key="info"
        className="absolute inset-0 w-full h-full z-50 overflow-hidden bg-neutral-50"
    >
         <div className="relative z-10 w-full h-full flex flex-col items-center">
             <div className="flex-1 w-full overflow-hidden mx-auto pb-8">
                <BuildingInfoContainer 
                    currentView="info"
                />
             </div>
         </div>
    </div>
  );
}

export default InfoPage;
