import React, { useState, useCallback, memo, useEffect, useRef } from 'react';
import { Video, Users, Send, Mic, MicOff, VideoIcon, VideoOff, Settings, MessageCircle } from 'lucide-react';

const LiveSessionPage = memo(() => {
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'Eng. Godwin Ofwono',
      message: 'Welcome everyone to our AI & Machine Learning session!',
      time: '2:00 PM',
      isInstructor: true
    },
    {
      id: 2,
      sender: 'Sarah Nakato',
      message: 'Thank you for having us, excited to learn!',
      time: '2:01 PM',
      isInstructor: false
    },
    {
      id: 3,
      sender: 'James Okello',
      message: 'Can you share the slides mentioned earlier?',
      time: '2:03 PM',
      isInstructor: false
    },
    {
      id: 4,
      sender: 'Eng. Godwin Ofwono',
      message: 'Absolutely! I\'ll share them in the resources section after this demo.',
      time: '2:04 PM',
      isInstructor: true
    },
    {
      id: 5,
      sender: 'Grace Auma',
      message: 'This neural network example is fascinating!',
      time: '2:06 PM',
      isInstructor: false
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOff, setIsVideoOff] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const lectureDetails = {
    title: 'Advanced AI & Machine Learning for African Contexts',
    instructor: 'Eng. Godwin Ofwono & Eng. Cissyln Musiimenta',
    course: 'Software & AI Development',
    duration: '2 hours',
    currentTime: '45 minutes',
    topic: 'Neural Networks and Deep Learning Applications'
  };

  const participants = [
    { name: 'Eng. Godwin Ofwono', role: 'Instructor', isOnline: true, isSpeaking: true },
    { name: 'Eng. Cissyln Musiimenta', role: 'Co-Instructor', isOnline: true, isSpeaking: false },
    { name: 'Sarah Nakato', role: 'Student', isOnline: true, isSpeaking: false },
    { name: 'James Okello', role: 'Student', isOnline: true, isSpeaking: false },
    { name: 'Grace Auma', role: 'Student', isOnline: true, isSpeaking: false },
    { name: 'David Ssemakula', role: 'Student', isOnline: true, isSpeaking: false },
    { name: 'Mary Atim', role: 'Student', isOnline: false, isSpeaking: false },
    { name: 'Peter Wanyama', role: 'Student', isOnline: true, isSpeaking: false },
    { name: 'Ruth Nambi', role: 'Student', isOnline: true, isSpeaking: false },
    { name: 'Moses Kiprotich', role: 'Student', isOnline: true, isSpeaking: false }
  ];

  const handleSendMessage = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: 'You',
        message: newMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isInstructor: false
      };
      setChatMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  }, [newMessage, chatMessages.length]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const toggleVideo = useCallback(() => {
    setIsVideoOff(prev => !prev);
  }, []);

  const toggleHandRaise = useCallback(() => {
    setIsHandRaised(prev => !prev);
  }, []);

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Simulate new messages from instructor
  useEffect(() => {
    const interval = setInterval(() => {
      const instructorMessages = [
        'Let\'s move on to the next concept...',
        'Any questions about this implementation?',
        'Great observation from the chat!',
        'Remember to practice these algorithms at home.',
        'We\'ll have a 5-minute break in a moment.'
      ];
      
      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        const randomMessage = instructorMessages[Math.floor(Math.random() * instructorMessages.length)];
        const message = {
          id: Date.now(),
          sender: 'Eng. Godwin Ofwono',
          message: randomMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isInstructor: true
        };
        setChatMessages(prev => [...prev, message]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{lectureDetails.title}</h1>
            <p className="text-gray-400 text-sm">
              {lectureDetails.instructor} • {lectureDetails.currentTime} of {lectureDetails.duration}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              🔴 LIVE
            </span>
            <span className="text-gray-400">{participants.filter(p => p.isOnline).length} participants</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
          {/* Main Video Area */}
          <div className="lg:col-span-3 flex flex-col">
            {/* Video Player */}
            <div className="bg-black rounded-lg overflow-hidden flex-1 relative">
              <iframe
                src="https://www.youtube.com/embed/aircAruvnKk?autoplay=1&mute=1&controls=1&rel=0"
                title="Neural Networks Explained"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              
              {/* Video Overlay Info */}
              <div className="absolute top-4 left-4 bg-black bg-opacity-70 rounded-lg p-3">
                <h3 className="font-semibold text-sm">{lectureDetails.topic}</h3>
                <p className="text-xs text-gray-300">Current Topic</p>
              </div>

              {/* Instructor Video (Picture-in-Picture) */}
              <div className="absolute bottom-4 right-4 w-48 h-32 bg-gray-800 rounded-lg border-2 border-teal-500 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Instructor"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 rounded px-2 py-1">
                  <span className="text-xs font-medium">Eng. Godwin</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-gray-800 rounded-lg mt-4 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleMute}
                    className={`p-3 rounded-full ${isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'} transition-colors`}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={toggleVideo}
                    className={`p-3 rounded-full ${isVideoOff ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'} transition-colors`}
                  >
                    {isVideoOff ? <VideoOff className="w-5 h-5" /> : <VideoIcon className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={toggleHandRaise}
                    className={`px-4 py-2 rounded-lg ${isHandRaised ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-gray-600 hover:bg-gray-700'} transition-colors text-sm font-medium`}
                  >
                    {isHandRaised ? '✋ Hand Raised' : 'Raise Hand'}
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 flex flex-col space-y-4">
            {/* Participants */}
            <div className="bg-gray-800 rounded-lg p-4 flex-1">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="w-5 h-5 text-teal-400" />
                <h3 className="font-semibold">Participants ({participants.filter(p => p.isOnline).length})</h3>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {participants.map((participant, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${participant.isOnline ? 'bg-green-400' : 'bg-gray-500'}`} />
                      <span className="text-sm">{participant.name}</span>
                      {participant.isSpeaking && (
                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                      )}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      participant.role === 'Instructor' || participant.role === 'Co-Instructor' 
                        ? 'bg-teal-600 text-teal-100' 
                        : 'bg-gray-600 text-gray-300'
                    }`}>
                      {participant.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat */}
            <div className="bg-gray-800 rounded-lg p-4 flex-1 flex flex-col">
              <div className="flex items-center space-x-2 mb-4">
                <MessageCircle className="w-5 h-5 text-teal-400" />
                <h3 className="font-semibold">Chat</h3>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-64">
                {chatMessages.map((message) => (
                  <div key={message.id} className="text-sm">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`font-medium ${message.isInstructor ? 'text-teal-400' : 'text-gray-300'}`}>
                        {message.sender}
                      </span>
                      <span className="text-xs text-gray-500">{message.time}</span>
                      {message.isInstructor && (
                        <span className="bg-teal-600 text-teal-100 text-xs px-1 py-0.5 rounded">
                          Instructor
                        </span>
                      )}
                    </div>
                    <p className="text-gray-200 pl-2 border-l-2 border-gray-600">{message.message}</p>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 rounded-lg px-3 py-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

LiveSessionPage.displayName = 'LiveSessionPage';

export default LiveSessionPage;