// app/components/ChatMessage.tsx - WhatsApp-style chat bubbles
'use client';

interface ChatMessageProps {
  id?: string | number;
  type: 'sent' | 'received';
  text: string;
  time?: string;
  isRead?: boolean;
  sender?: string;
  isTyping?: boolean;
}

export default function ChatMessage({
  type,
  text,
  time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  isRead = false,
  sender,
  isTyping = false,
}: ChatMessageProps) {
  const isSent = type === 'sent';

  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} animate-slide-in`}>
      <div className={`max-w-[85%] ${isSent ? 'message-sent' : 'message-received'} rounded-lg p-3 ${
        isSent ? 'rounded-br-none' : 'rounded-bl-none'
      }`}>
        {sender && !isSent && (
          <div className="text-xs font-semibold text-whatsapp-dark mb-1">{sender}</div>
        )}
        
        {isTyping ? (
          <div className="flex space-x-1 py-1 px-2">
            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></span>
          </div>
        ) : (
          <p className="text-sm text-gray-800">{text}</p>
        )}
        
        <div className="flex items-center justify-end space-x-1 mt-1">
          <span className="text-xs text-gray-500">{time}</span>
          {isSent && (
            <span className="text-xs">
              {isRead ? '✓✓' : '✓'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}