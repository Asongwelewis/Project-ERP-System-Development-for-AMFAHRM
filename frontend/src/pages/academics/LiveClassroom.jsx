import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Users,
  MessageCircle,
  Hand,
  Monitor
} from 'lucide-react';

export function LiveClassroom() {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const participants = [
    { id: 1, name: 'Dr. Smith', role: 'instructor', video: true, audio: true },
    { id: 2, name: 'John Doe', role: 'student', video: true, audio: false },
    { id: 3, name: 'Jane Smith', role: 'student', video: false, audio: true },
    { id: 4, name: 'Mike Johnson', role: 'student', video: true, audio: true },
  ];

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-orange-700">Live Classroom</h1>
            <p className="text-gray-600">
              Computer Science 101 - Introduction to Programming
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Live
            </Badge>
            <Badge variant="outline">{participants.length} participants</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main Video Area */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="h-96">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 h-full">
                  {participants.map((participant) => (
                    <div key={participant.id} className="relative bg-gray-100 rounded-lg overflow-hidden">
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                        <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                          {participant.name}
                        </span>
                        <div className="flex gap-1">
                          {!participant.audio && <MicOff className="h-4 w-4 text-red-400" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Controls */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant={isVideoOn ? 'default' : 'destructive'}
                    onClick={() => setIsVideoOn(!isVideoOn)}
                  >
                    {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant={isAudioOn ? 'default' : 'destructive'}
                    onClick={() => setIsAudioOn(!isAudioOn)}
                  >
                    {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setHandRaised(!handRaised)}
                    className={handRaised ? 'bg-orange-100' : ''}
                  >
                    <Hand className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setIsScreenSharing(!isScreenSharing)}
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="destructive">
                    <PhoneOff className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Participants
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between py-2">
                    <span>{participant.name}</span>
                    <div className="flex gap-2">
                      {participant.video ? 
                        <Video className="h-4 w-4 text-green-500" /> : 
                        <VideoOff className="h-4 w-4 text-gray-400" />
                      }
                      {participant.audio ? 
                        <Mic className="h-4 w-4 text-green-500" /> : 
                        <MicOff className="h-4 w-4 text-red-500" />
                      }
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="h-48 border rounded-lg p-2 mb-2 overflow-y-auto">
                    {/* Chat messages would go here */}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                    />
                    <Button>Send</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
