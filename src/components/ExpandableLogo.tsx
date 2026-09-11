import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ExpandableLogoProps {
  className?: string;
}

const ExpandableLogo: React.FC<ExpandableLogoProps> = ({ className = "h-10 w-auto object-contain rounded" }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <img 
        src="/logo.jpg" 
        alt="UZHAMI Logo" 
        className={`${className} cursor-pointer hover:opacity-80 transition-opacity`}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      />
      
      {isOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative flex flex-col items-center justify-center w-full h-full max-w-5xl max-h-screen">
            <button 
              className="absolute top-4 right-4 md:-top-12 md:right-0 text-white hover:text-gray-300 p-2 bg-black/50 rounded-full transition-colors z-10"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
            <img 
              src="/logo.jpg" 
              alt="UZHAMI Logo Full" 
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ExpandableLogo;
