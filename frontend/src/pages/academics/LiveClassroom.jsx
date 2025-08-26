import React, { useState, useRef } from 'react';
import { Layout } from '../../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { useAuth } from '../../context/AuthContext';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Users,
  MessageCircle,
  Hand,
  Monitor,
  Pen,
  Eraser,
  Send
} from 'lucide-react';

export function LiveClassroom({ embedded = false }) {
  const { user } = useAuth();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Dr. Smith', message: "Welcome to today's class!", time: '10:00', role: 'instructor' },
    { id: 2, user: 'John Doe', message: 'Thank you professor!', time: '10:01', role: 'student' }
  ]);

  // Whiteboard state
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingTool, setDrawingTool] = useState('pen');
  const [drawingColor, setDrawingColor] = useState('#000000');

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineWidth = drawingTool === 'eraser' ? 20 : 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = drawingTool === 'eraser' ? '#ffffff' : drawingColor;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const sendMessage = () => {
    const text = chatMessage.trim();
    if (!text) return;
    const newMessage = {
      id: chatMessages.length + 1,
      user: user?.name || 'Anonymous',
      message: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      role: user?.role || 'student'
    };
    setChatMessages([...chatMessages, newMessage]);
    setChatMessage('');
  };

  const participants = [
    { id: 1, name: 'Dr. Smith', role: 'instructor', video: true, audio: true },
    { id: 2, name: 'John Doe', role: 'student', video: true, audio: false },
    { id: 3, name: 'Jane Smith', role: 'student', video: false, audio: true },
    { id: 4, name: 'Mike Johnson', role: 'student', video: true, audio: true },
  ];

  const content = (
      <div className="space-y-4">
        {!embedded && (
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
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main Video Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Main Video Area */}
            <Card className="h-96 bg-white dark:bg-white">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 h-full">
                  {participants.map((participant, index) => (
                    <div 
                      key={participant.id} 
                      className={`relative rounded-lg overflow-hidden ${
                        index === 0 ? 'col-span-2 row-span-2' : ''
                      }`}
                    >
                      <div className="absolute inset-0 bg-gray-900/10 dark:bg-gray-900/30">
                        {participant.video ? (
                          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-blue-100 dark:from-orange-900/20 dark:to-blue-900/20 flex items-center justify-center">
                            {/* Video placeholder - in a real app, this would be a video stream */}
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-200 to-blue-200 dark:from-orange-800 dark:to-blue-800 flex items-center justify-center text-2xl font-bold text-orange-600 dark:text-orange-300">
                              {participant.name.charAt(0)}
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <VideoOff className="h-8 w-8 text-gray-400 dark:text-gray-600" />
                          </div>
                        )}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-white text-sm font-medium">
                            {participant.name}
                            {participant.role === 'instructor' && (
                              <Badge variant="outline" className="ml-2 bg-orange-500/20 text-orange-200 border-orange-500/30">
                                Instructor
                              </Badge>
                            )}
                          </span>
                          <div className="flex gap-2">
                            {!participant.audio && (
                              <div className="bg-red-500/20 p-1 rounded">
                                <MicOff className="h-4 w-4 text-red-300" />
                              </div>
                            )}
                            {!participant.video && (
                              <div className="bg-gray-500/20 p-1 rounded">
                                <VideoOff className="h-4 w-4 text-gray-300" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interactive Whiteboard */}
            <Card className="bg-white dark:bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Interactive Whiteboard</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Button
                        variant={drawingTool === 'pen' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setDrawingTool('pen')}
                      >
                        <Pen className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={drawingTool === 'eraser' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setDrawingTool('eraser')}
                      >
                        <Eraser className="h-4 w-4" />
                      </Button>
                      <input
                        type="color"
                        value={drawingColor}
                        onChange={(e) => setDrawingColor(e.target.value)}
                        className="w-8 h-8 rounded border"
                        aria-label="Drawing color"
                      />
                    </div>
                    <Button variant="outline" size="sm" onClick={clearCanvas}>Clear</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={300}
                  className="w-full h-full border rounded-lg bg-white cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
              </CardContent>
            </Card>

            {/* Controls */}
            <Card className="bg-white dark:bg-white">
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
            <Card className="bg-white dark:bg-white">
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

            <Card className="flex flex-col bg-white dark:bg-white">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-1 flex flex-col">
                <div className="flex-1 mb-3 h-48 overflow-y-auto">
                  <div className="space-y-3">
                    {chatMessages.map((m) => (
                      <div key={m.id} className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{m.user}</span>
                          {m.role === 'instructor' && (
                            <Badge variant="secondary" className="text-xs">Instructor</Badge>
                          )}
                          <span className="text-xs text-gray-500">{m.time}</span>
                        </div>
                        <p className="text-sm bg-gray-100 p-2 rounded-lg">{m.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );

  return embedded ? content : (
    <Layout>
      {content}
    </Layout>
  );
}
