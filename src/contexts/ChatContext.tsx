import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Message } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string, receiverId?: string) => void;
  getMessagesByUser: (userId: string) => Message[];
  getUnreadMessagesCount: () => number;
  markMessagesAsRead: (messageIds: string[]) => void;
  activeUsers: string[];
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeUsers, setActiveUsers] = useState<string[]>(['2']); // Hardcoded user ID for demo
  
  // Load messages from localStorage on initial render
  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch (error) {
        console.error('Failed to parse messages from localStorage:', error);
      }
    }
  }, []);
  
  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);
  
  const sendMessage = (content: string, receiverId?: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to send messages",
        variant: "destructive",
      });
      return;
    }
    
    // If receiverId is not provided and user is admin, send to first active user
    // Otherwise if user is not admin, send to admin (ID: 1)
    const actualReceiverId = receiverId || (user.role === 'admin' ? activeUsers[0] : '1');
    
    const newMessage: Message = {
      id: uuidv4(),
      senderId: user.id,
      receiverId: actualReceiverId,
      content,
      read: false,
      createdAt: new Date().toISOString(),
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    toast({
      title: "Message sent",
      description: "Your message has been delivered",
    });
  };
  
  const getMessagesByUser = (userId: string) => {
    if (!user) return [];
    
    // If the current user is admin, get messages between admin and specific user
    if (user.role === 'admin') {
      return messages.filter(
        msg => (msg.senderId === user.id && msg.receiverId === userId) || 
               (msg.receiverId === user.id && msg.senderId === userId)
      );
    } 
    
    // If the current user is not admin, get messages between user and admin
    return messages.filter(
      msg => (msg.senderId === user.id && msg.receiverId === '1') || 
             (msg.receiverId === user.id && msg.senderId === '1')
    );
  };
  
  const getUnreadMessagesCount = () => {
    if (!user) return 0;
    
    return messages.filter(msg => msg.receiverId === user.id && !msg.read).length;
  };
  
  const markMessagesAsRead = (messageIds: string[]) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        messageIds.includes(msg.id) ? { ...msg, read: true } : msg
      )
    );
  };
  
  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        getMessagesByUser,
        getUnreadMessagesCount,
        markMessagesAsRead,
        activeUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
