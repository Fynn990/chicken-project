
import { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useChat } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, Circle } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

const AdminChat = () => {
  const { messages, sendMessage, getMessagesByUser, markMessagesAsRead, activeUsers } = useChat();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // This would come from your user context or service in a real app
  const users = [
    { id: '2', name: 'John Doe', email: 'user@example.com', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: '3', name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  ];
  
  const userMessages = selectedUser ? getMessagesByUser(selectedUser) : [];
  
  // Set default selected user if none is selected
  useEffect(() => {
    if (!selectedUser && users.length > 0) {
      setSelectedUser(users[0].id);
    }
  }, [users]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [userMessages]);
  
  // Mark messages as read when viewing them
  useEffect(() => {
    if (selectedUser && user) {
      const unreadMessageIds = userMessages
        .filter(msg => msg.receiverId === user.id && !msg.read)
        .map(msg => msg.id);
      
      if (unreadMessageIds.length > 0) {
        markMessagesAsRead(unreadMessageIds);
      }
    }
  }, [selectedUser, userMessages, user]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedUser) return;
    
    sendMessage(message, selectedUser);
    setMessage('');
  };
  
  const getUnreadCountForUser = (userId: string) => {
    if (!user) return 0;
    
    return messages.filter(
      msg => msg.senderId === userId && msg.receiverId === user.id && !msg.read
    ).length;
  };
  
  const getSelectedUser = () => {
    return users.find(u => u.id === selectedUser) || null;
  };
  
  const isUserActive = (userId: string) => {
    return activeUsers.includes(userId);
  };
  
  return (
    <AdminLayout title="Customer Chat">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Users list */}
        <Card className="p-4 overflow-y-auto">
          <h3 className="font-medium mb-4">Customers</h3>
          <div className="space-y-2">
            {users.map((customer) => (
              <div
                key={customer.id}
                className={`p-3 rounded-md flex items-center space-x-3 cursor-pointer ${
                  selectedUser === customer.id
                    ? 'bg-cartus-primary/10'
                    : 'hover:bg-muted'
                }`}
                onClick={() => setSelectedUser(customer.id)}
              >
                <div className="relative">
                  <img
                    src={customer.avatar}
                    alt={customer.name}
                    className="h-10 w-10 rounded-full"
                  />
                  {isUserActive(customer.id) && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-xs text-muted-foreground">{customer.email}</div>
                </div>
                {getUnreadCountForUser(customer.id) > 0 && (
                  <Badge className="bg-red-500">
                    {getUnreadCountForUser(customer.id)}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
        
        {/* Chat window */}
        <Card className="md:col-span-2 flex flex-col">
          {selectedUser ? (
            <>
              {/* Chat header */}
              <div className="p-4 border-b flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={getSelectedUser()?.avatar}
                    alt={getSelectedUser()?.name}
                    className="h-10 w-10 rounded-full"
                  />
                  {isUserActive(selectedUser) && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{getSelectedUser()?.name}</div>
                  <div className="text-xs flex items-center">
                    {isUserActive(selectedUser) ? (
                      <>
                        <Circle className="h-2 w-2 fill-green-500 text-green-500 mr-1" />
                        <span>Online</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground">Offline</span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Chat messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                {userMessages.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <User className="h-12 w-12 mx-auto mb-2 opacity-20" />
                      <p>No messages yet with this customer.</p>
                      <p className="text-sm">Send a message to start the conversation!</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.senderId === user?.id ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[70%] px-4 py-2 rounded-lg ${
                            msg.senderId === user?.id
                              ? 'bg-cartus-primary text-white'
                              : 'bg-muted'
                          }`}
                        >
                          <div>{msg.content}</div>
                          <div
                            className={`text-xs mt-1 ${
                              msg.senderId === user?.id
                                ? 'text-white/70'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {format(new Date(msg.createdAt), 'h:mm a')}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
              
              {/* Chat input */}
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    disabled={!message.trim()}
                    className="bg-cartus-primary hover:bg-cartus-primary/90"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <User className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>Select a customer to start chatting</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminChat;
