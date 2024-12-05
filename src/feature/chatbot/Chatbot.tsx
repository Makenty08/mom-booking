'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * ChatBot
 *
 * @returns
 */

export const ChatBot = () => {
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.text = `
   
      import Chatbot from "https://cdn.jsdelivr.net/gh/B1rzhan07/FlowiseChatBot/cdn/web.js"
      var path = window.location.pathname
      var welcomeMessage = ''
      var placeholder = ''
      if(!path.includes('authorization')) {
        welcomeMessage = "Hello, I'm here to help you. What do you want to know?"
        
        
          Chatbot.init({
            chatflowid: "630d010b-962a-433f-8c59-55f27336aae4",
            apiHost: '${process.env.NEXT_PUBLIC_CHAT_BOT}',
            theme: {
              button: {
                backgroundColor: "#55BBEB",
                right: 200,
                bottom: 15,
                iconColor: "white",
                customIconSrc: Chatbot.data.avatar_icon,
              },
              chatWindow: {
                welcomeMessage,
                backgroundColor: "#ffffff",
                height: 600,
                width: 400,
                fontSize: 16,
                poweredByTextColor: "#303235",
                botMessage: {
                  backgroundColor: "#55BBEB",
                  textColor: "#303235",
                  showAvatar: true,
                  avatarSrc: Chatbot.data.avatar_url,
                },
                userMessage: {
                  backgroundColor: "#55BBEB",
                  textColor: "#ffffff",
                  showAvatar: false,
                },
                textInput: {
                  placeholder,
                  backgroundColor: "#ffffff",
                  textColor: "#303235",
                  sendButtonColor: "#55BBEB",
                }
              }
            }
          });
      }
    `;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};
