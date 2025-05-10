/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"
import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  role: 'user' | 'assistant';
}

const NewChat: React.FC = () => {
  const { data: session, status } = useSession();
  const [userId,setUserId] = useState<string | null | undefined>("");
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lookupId,serLookupId] = useState('');

  useEffect(() => {
    if(status === "authenticated"){
      const user = session?.user?.id;
      setUserId(user);
    }
  }, [session])
  

  const sendMessageToGemini = async (text: string) => {
    try {
      const contents = [{
        parts: [{
          text: text,
        }]
      }];

      const response = await fetch(`${process.env.NEXT_PUBLIC_Gemini_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contents })
      });      
      
      const data = await response.json();      
      
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to get response from AI');
      return null;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (message.trim()) {
      setIsLoading(true);
      
      const userMessage: Message = {
        id: crypto.randomUUID(),
        content: message,
        timestamp: new Date(),
        role: 'user'
      };
      
      setMessages(prev => [...prev, userMessage]);
      const currentMessage = message;
      setMessage('');

      // Get AI response
      const aiResponse = await sendMessageToGemini(currentMessage);
      
      if (aiResponse) {
        const aiMessage: Message = {
          id: crypto.randomUUID(),
          content: aiResponse,
          timestamp: new Date(),
          role: 'assistant'
        };
        setMessages(prev => [...prev, aiMessage]);
        toast.success('Response received!');
      }

      if(lookupId){
        try {
          const response = await fetch('/api/chat-sessions', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            "type": "qa",
            lookupId,
            "question": currentMessage,
            "answer": aiResponse
            }),
          });
    
          if(!response.ok){
            toast.success("Response Saved Successfully")
          }
        } catch (error) {
          toast.error("Response Creation Failed")
        }
      } 
      
      else{
        try {
          const response = await fetch('/api/chat-sessions', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            "type": "chat_session",
            "userId": userId,
            "question": currentMessage,
            "answer": aiResponse
            }),
          });
    
          if(!response.ok){
            console.log(response);
            await response.json()
            console.log(response);
            
            toast.success("Session Created Successfully")
          }
        } catch (error) {
          toast.error("Session Creation Failed")
        }
      }
      
      setIsLoading(false);
    }
    };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value);
  };

  return (
    <div className="h-[85vh] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 dark:hover:scrollbar-thumb-gray-500">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Welcome to AI Chat</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start a conversation with our AI assistant. Ask questions, get help, or just chat!
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-2xl w-full">
              <Card className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                <h3 className="font-semibold mb-2">Ask Questions</h3>
                <p className="text-sm text-gray-500">Get answers to your queries about any topic</p>
              </Card>
              <Card className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                <h3 className="font-semibold mb-2">Get Help</h3>
                <p className="text-sm text-gray-500">Receive assistance with various tasks</p>
              </Card>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <Card 
              key={msg.id} 
              className={`p-3 mb-2 ${
                msg.role === 'assistant' 
                  ? 'bg-blue-50 dark:bg-blue-900/20' 
                  : ''
              }`}
            >
              <div className="font-semibold mb-1">
                {msg.role === 'user' ? 'You' : 'AI'}
              </div>
              <div dangerouslySetInnerHTML={{ __html: msg.content }}/>
            </Card>
          ))
        )}
      </div>

      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input 
            value={message}
            onChange={handleInputChange}
            placeholder="Type your message..." 
            className="flex-1 h-12"
            disabled={isLoading}
          />
          <Button 
            variant="outline" 
            type="submit" 
            size="icon"
            disabled={isLoading}
            className='p-4 h-12 w-12'
          >
            <Send />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewChat;