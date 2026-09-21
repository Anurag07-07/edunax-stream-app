import React from 'react';

const ChatLoading = () => {
  // We generate an array of 7 elements to simulate a screen full of messages
  const skeletonMessages = Array.from({ length: 7 });

  return (
    <div className="p-4 h-full w-full flex flex-col gap-4 bg-gray-900 overflow-hidden rounded-xl shadow-xl border border-gray-800" 
         aria-live="polite" 
         aria-label="Chat content is loading">
      
      {skeletonMessages.map((_, index) => {
        // Alternate messages: true for user's message (right), false for others (left)
        const isUser = index % 2 === 0;
        
        return (
          <div 
            key={index} 
            // Base flex layout
            className={`flex items-start gap-3 w-full ${isUser ? 'justify-end flex-row-reverse' : 'justify-start flex-row'}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full bg-gray-700 animate-pulse flex-shrink-0 ${isUser ? 'order-2' : 'order-1'}`} />
            
            {/* Message Bubble */}
            <div className={`flex flex-col gap-2 p-3 max-w-[80%] sm:max-w-[65%] rounded-xl shadow-md ${isUser 
                // Dark theme user bubble (slightly darker gray)
                ? 'bg-gray-800 rounded-br-none' 
                // Dark theme other user bubble (slightly lighter gray)
                : 'bg-gray-700 rounded-tl-none'
            }`}>
              
              {/* First line (longer) */}
              {/* Lines are a lighter gray to pulse against the bubble background */}
              <div className="h-3 rounded-full bg-gray-600 animate-pulse" style={{ width: `${80 - (index % 3) * 10}%` }}></div>
              
              {/* Second line (shorter or sometimes missing) */}
              {index % 4 !== 3 && ( // Occasionally skip the second line for variety
                <div className="h-3 rounded-full bg-gray-600 animate-pulse w-3/5"></div>
              )}
            </div>
          </div>
        );
      })}

      {/* Status Text */}
      <div className="mt-4 flex items-center justify-center text-sm text-gray-300 font-medium space-x-2">
        <svg className="animate-spin h-4 w-4 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Fetching Data...</span>
      </div>
    </div>
  );
};

export default ChatLoading;