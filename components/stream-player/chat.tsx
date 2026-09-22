"use client"

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ChatHeader } from "./chat-header";
import { ChatForm } from "./ChatForm";
import { ChatList } from "./ChatList";
import { ChatCommunity } from "./chat-community";
import { getChatMessages, PersistedChatMessage, saveChatMessage } from "@/actions/chat";
// import { ChatHeader } from "./chat-header";

interface ChatProps{
    hostName:string;
    hostIdentity:string;
    streamId:string;
    viewerIdentity:string;
    viewerName:string;
    isFollowing:boolean;
    isChatEnabled:boolean;
    isChatDelayed:boolean;
    isChatFollowersOnly:boolean;
}

export const Chat=({
    hostName,
    hostIdentity,
    streamId,
    viewerIdentity,
    viewerName,
    isFollowing,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly
}:ChatProps)=>{
    const matches=useMediaQuery('(max-width:1024px)')
    const {variant,onExpand}=useChatSidebar((state)=>state);
    const connectionState=useConnectionState();
    const participant=useRemoteParticipant(hostIdentity);
    const isOnline=participant && connectionState===ConnectionState.Connected

    const isHidden=!isChatEnabled || !isOnline;

    const [value,setvalue]=useState("");
    const [savedMessages, setSavedMessages] = useState<PersistedChatMessage[]>([]);
    const {chatMessages:messages,send}=useChat();

    useEffect(()=>{
        getChatMessages(streamId).then(setSavedMessages).catch(() => setSavedMessages([]));
    },[streamId])

    useEffect(()=>{
        if(matches){
            onExpand();
        }
    },[matches,onExpand])

    const reversedMessages=useMemo(()=>{
        const combined = [...savedMessages, ...messages];
        const unique = combined.filter((message, index, allMessages) =>
            allMessages.findIndex((candidate) =>
                candidate.timestamp === message.timestamp &&
                candidate.message === message.message &&
                candidate.from?.identity === message.from?.identity
            ) === index
        );
        return unique.sort((a,b)=>b.timestamp-a.timestamp);
    },[messages, savedMessages])

    const onSubmit=()=>{
        if(!send) return;

        const content = value.trim();
        if (!content) return;
        send(content);
        saveChatMessage({
            streamId,
            content,
            authorIdentity: viewerIdentity,
            authorName: viewerName,
        }).then((savedMessage) => {
            if (savedMessage) {
                setSavedMessages((current) => [...current, savedMessage]);
            }
        }).catch(() => undefined);
        setvalue("");
    };

    const onChange=(value:string)=>{
        setvalue(value)
    }

    return (
        <div className="flex flex-col bg-card border-l border-border pt-0 h-[calc(100vh-68px)]">
            <ChatHeader />
            {variant === ChatVariant.CHAT && (
              <>
              <ChatList
               messages={reversedMessages}
               isHidden={isHidden}
              ></ChatList>
              <ChatForm
              onSubmit={onSubmit}
              value={value}
              onChange={onChange}
              isHidden={isHidden}
              isFollowersOnly={isChatFollowersOnly}
              isDelayed={isChatDelayed}
              isFollowing={isFollowing}
              >

              </ChatForm>
              </>
            )}
            {variant === ChatVariant.COMMUNITY && (
              <>
              <ChatCommunity
               viewerName={viewerName}
               hostName={hostName}
               isHidden={isHidden}
              ></ChatCommunity>
              </>
            )}
        </div>
    )
}