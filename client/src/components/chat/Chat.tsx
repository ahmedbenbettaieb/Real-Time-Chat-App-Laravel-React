import React from 'react'
import SideBar from './SideBar';
import MainChat from './MainChat';

export default function Conversation() {
    console.log("conversation");
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <SideBar  />
      {/* Main Chat Area */}
      <MainChat />
    </div>
  );
}
