import React, { useState } from 'react';
import { X, Mic, MicOff, Video, VideoOff, ScreenShare, MessageSquare, Users, MoreVertical, Settings2 } from 'lucide-react'; // Added Users, MoreVertical, Settings2
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // For conditional class names

interface Participant {
  id: string;
  name: string;
  isMicMuted: boolean;
  isVideoOff: boolean;
  isSpeaking: boolean; // Placeholder for speaking indicator
  avatarUrl?: string; // Optional: for future use if actual avatars are available
}

interface ConferencePanelProps {
  isOpen?: boolean;
  onClose?: () => void;
  // Mock participants for now
  participants?: Participant[];
}

// Mock data for participants
const mockParticipants: Participant[] = [
  { id: 'user-self', name: 'You', isMicMuted: false, isVideoOff: false, isSpeaking: false },
  { id: 'user-2', name: 'Alice Wonderland', isMicMuted: true, isVideoOff: false, isSpeaking: false },
  { id: 'user-3', name: 'Bob The Builder', isMicMuted: false, isVideoOff: true, isSpeaking: true },
  { id: 'user-4', name: 'Charlie Brown', isMicMuted: false, isVideoOff: false, isSpeaking: false },
];


export function ConferencePanel({
  isOpen = false,
  onClose,
  participants = mockParticipants
}: ConferencePanelProps) {
  const [selfMicEnabled, setSelfMicEnabled] = useState(!participants.find(p=>p.id === 'user-self')?.isMicMuted);
  const [selfVideoEnabled, setSelfVideoEnabled] = useState(!participants.find(p=>p.id === 'user-self')?.isVideoOff);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showParticipantList, setShowParticipantList] = useState(false);
  const [showChat, setShowChat] = useState(false);

  if (!isOpen) return null;

  const toggleMic = () => setSelfMicEnabled(prev => !prev);
  const toggleVideo = () => setSelfVideoEnabled(prev => !prev);
  const toggleScreenShare = () => setIsScreenSharing(prev => !prev); // Actual screen share logic is complex

  // Determine grid layout based on screen sharing and number of participants
  const mainContentGridCols = isScreenSharing ? 'grid-cols-1' :
                             participants.length <= 2 ? 'grid-cols-1 sm:grid-cols-2' :
                             participants.length <= 4 ? 'grid-cols-2' :
                             'grid-cols-2 md:grid-cols-3';

  const participantTileHeight = isScreenSharing ? 'h-24 sm:h-32' : 'h-48 sm:h-64 md:h-auto';


  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex flex-col items-center justify-center p-2 sm:p-4">
      <div className="bg-dark-secondary shadow-2xl border border-white/10 rounded-xl w-full h-full max-w-screen-2xl max-h-[95vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 shrink-0">
          <h3 className="text-lg sm:text-xl font-semibold text-white">Virtual Meeting Room</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
                <Settings2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Main Content Area (Video Grid + Side Panels) */}
        <div className="flex-1 flex overflow-hidden">
          {/* Video Grid / Screen Share Area */}
          <div className={cn("flex-1 p-2 sm:p-4 overflow-y-auto transition-all duration-300", isScreenSharing ? 'grid place-items-center' : `grid ${mainContentGridCols} gap-2 sm:gap-4`)}>
            {isScreenSharing ? (
              <div className="w-full h-full bg-black rounded-lg flex items-center justify-center text-white">
                Screen Share Active (Content Placeholder)
              </div>
            ) : (
              participants.map(participant => (
                <ParticipantTile
                  key={participant.id}
                  participant={participant}
                  isSelf={participant.id === 'user-self'}
                  selfVideoEnabled={selfVideoEnabled}
                  className={participantTileHeight}
                />
              ))
            )}
          </div>

          {/* Side Panels (Participants List / Chat) - conditional rendering */}
          {(showParticipantList || showChat) && (
            <div className="w-full sm:w-72 md:w-80 bg-dark/70 border-l border-white/10 flex flex-col shrink-0 transition-all duration-300">
              {showParticipantList && <ParticipantsListPanel participants={participants} onClose={() => setShowParticipantList(false)} />}
              {showChat && <ChatPanel onClose={() => setShowChat(false)} />}
            </div>
          )}
        </div>

        {/* Screen Share Thumbnail Strip (if screen sharing) */}
        {isScreenSharing && (
          <div className="shrink-0 bg-dark/50 p-2 border-t border-white/10 overflow-x-auto">
            <div className="flex space-x-2 h-24">
              {participants.map(participant => (
                <ParticipantTile
                  key={participant.id}
                  participant={participant}
                  isSelf={participant.id === 'user-self'}
                  selfVideoEnabled={selfVideoEnabled}
                  isThumbnail={true}
                  className="w-32 h-full"
                />
              ))}
            </div>
          </div>
        )}


        {/* Controls Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-t border-white/10 bg-dark-secondary/50 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
             {/* Time/Recording status - Placeholder */}
            <span className="text-xs text-white/60 hidden sm:block">10:35 | REC 00:15:30</span>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <ControlButton
              label={selfMicEnabled ? "Mute Mic" : "Unmute Mic"}
              onClick={toggleMic}
              isActive={selfMicEnabled}
              activeColor="bg-theme-emerald/80"
            >
              {selfMicEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5 text-theme-red" />}
            </ControlButton>

            <ControlButton
              label={selfVideoEnabled ? "Stop Video" : "Start Video"}
              onClick={toggleVideo}
              isActive={selfVideoEnabled}
              activeColor="bg-theme-emerald/80"
            >
              {selfVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5 text-theme-red" />}
            </ControlButton>

            <ControlButton
              label={isScreenSharing ? "Stop Sharing" : "Share Screen"}
              onClick={toggleScreenShare}
              isActive={isScreenSharing}
            >
              <ScreenShare className="h-5 w-5" />
            </ControlButton>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ControlButton label="Participants" onClick={() => {setShowParticipantList(p => !p); setShowChat(false);}} isActive={showParticipantList}>
              <Users className="h-5 w-5" />
              <span className="ml-1.5 text-xs font-medium hidden lg:inline">{participants.length}</span>
            </ControlButton>
            <ControlButton label="Chat" onClick={() => {setShowChat(c => !c); setShowParticipantList(false);}} isActive={showChat}>
              <MessageSquare className="h-5 w-5" />
            </ControlButton>
            <Button
              variant="destructive"
              size="sm"
              onClick={onClose}
              className="px-3 py-2 sm:px-4"
            >
              Leave Call
            </Button>
             <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full lg:hidden">
                <MoreVertical className="h-5 w-5" /> {/* Overflow for smaller screens */}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper components for ConferencePanel

interface ParticipantTileProps {
  participant: Participant;
  isSelf: boolean;
  selfVideoEnabled?: boolean; // Only relevant for self tile
  isThumbnail?: boolean;
  className?: string;
}

function ParticipantTile({ participant, isSelf, selfVideoEnabled, isThumbnail = false, className }: ParticipantTileProps) {
  const videoActuallyOff = isSelf ? !selfVideoEnabled : participant.isVideoOff;
  const micActuallyMuted = isSelf ? !selfMicEnabled : participant.isMicMuted; // Assuming selfMicEnabled is passed for self

  return (
    <div className={cn(
      "aspect-video bg-dark rounded-lg flex flex-col items-center justify-center overflow-hidden relative border-2",
      participant.isSpeaking && !isThumbnail ? "border-theme-primary shadow-lg" : "border-transparent",
      isThumbnail && participant.isSpeaking ? "border-theme-primary/70" : isThumbnail ? "border-white/10" : "",
      className
    )}>
      {videoActuallyOff ? (
        <div className={cn("w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 flex items-center justify-center mb-2", isThumbnail && "w-10 h-10 sm:w-12 sm:h-12")}>
          <UserIcon className={cn("w-8 h-8 sm:w-10 sm:h-10 text-white/50", isThumbnail && "w-5 h-5 sm:w-6 sm:h-6")} />
        </div>
      ) : (
        // Placeholder for actual video stream
        <div className={cn("text-white/50 text-sm", isThumbnail && "text-xs")}>
          {participant.name}'s Video
        </div>
      )}
      <div className={cn(
        "absolute bottom-1 left-1 sm:bottom-2 sm:left-2 text-xs sm:text-sm text-white bg-black/60 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md flex items-center gap-1.5",
        isThumbnail && "bottom-0.5 left-0.5 px-1 py-0.5 text-[10px]"
      )}>
        {micActuallyMuted ?
          <MicOff className={cn("w-3 h-3 sm:w-4 sm:h-4 text-theme-red", isThumbnail && "w-2.5 h-2.5")} /> :
          <Mic className={cn("w-3 h-3 sm:w-4 sm:h-4 text-theme-emerald", isThumbnail && "w-2.5 h-2.5")} />}
        <span className="truncate max-w-[100px] sm:max-w-[150px]">{participant.name}</span>
      </div>
       {participant.isSpeaking && !isThumbnail && (
        <div className="absolute top-2 right-2 p-1.5 bg-theme-primary/80 rounded-full animate-pulse">
            <Mic className="w-3 h-3 text-white" />
        </div>
      )}
    </div>
  );
}

// Placeholder UserIcon if not imported elsewhere
function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}


interface ControlButtonProps extends React.ComponentProps<typeof Button> {
  label: string;
  isActive?: boolean;
  activeColor?: string; // e.g. "bg-green-500"
}

function ControlButton({ children, label, isActive, onClick, variant = "outline", size = "icon", className, activeColor, ...props }: ControlButtonProps) {
  return (
    <Button
      variant={isActive && variant === "outline" ? "default" : variant}
      size={size}
      onClick={onClick}
      className={cn(
        "p-2 sm:p-2.5 rounded-lg text-white/80 hover:text-white transition-colors group relative",
        "border-white/20 hover:bg-white/10 data-[state=open]:bg-white/10",
        isActive && variant === "outline" && (activeColor ? activeColor : "bg-theme-primary/80 hover:bg-theme-primary"),
        isActive && variant === "default" && (activeColor ? activeColor : "bg-theme-primary hover:bg-theme-primary/90"),
        className
      )}
      {...props}
    >
      {children}
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-dark-elevation text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity pointer-events-none">
        {label}
      </span>
    </Button>
  );
}

function ParticipantsListPanel({ participants, onClose }: { participants: Participant[], onClose: () => void }) {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h4 className="text-md font-semibold text-white">Participants ({participants.length})</h4>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-4 h-4"/></Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {participants.map(p => (
          <div key={p.id} className="flex items-center justify-between p-2 rounded-md hover:bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <UserIcon className="w-4 h-4 text-white/60" />
              </div>
              <span className="text-sm text-white/90">{p.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {p.isMicMuted ? <MicOff className="w-4 h-4 text-theme-red/80"/> : <Mic className="w-4 h-4 text-theme-emerald/80"/>}
              {p.isVideoOff ? <VideoOff className="w-4 h-4 text-white/50"/> : <Video className="w-4 h-4 text-white/50"/>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatPanel({ onClose }: { onClose: () => void }) {
   return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h4 className="text-md font-semibold text-white">Meeting Chat</h4>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-4 h-4"/></Button>
      </div>
      <div className="flex-1 p-4 space-y-3 overflow-y-auto text-sm text-white/70">
        {/* Chat messages would go here */}
        <p>Chat feature coming soon...</p>
         <p>[10:30 AM] Alice: Hi everyone!</p>
         <p>[10:31 AM] Bob: Hello! 👋</p>
      </div>
      <div className="p-4 border-t border-white/10">
        <input type="text" placeholder="Type your message..." className="w-full p-2 rounded-md bg-dark border border-white/20 text-sm text-white placeholder:text-gray-500 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary"/>
      </div>
    </div>
  );
}