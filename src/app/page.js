'use client';
import { useState, useEffect, useRef} from 'react';
import Image from 'next/image';

export default function Home() {
  const [chatHistory, setChatHistory] = useState([{ role: 'assistant', content: 'Hi! I am Anish Kumar.' }]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const chatEndRef = useRef(null);

  useEffect(() => {
    const support = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    setIsSupported(support);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const userText = event.results[0][0].transcript;
      setInputText(userText);
      setIsListening(false);
      playSound('end');
      recognition.stop();
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      alert('Voice input failed. Try again in Chrome or Safari.');
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    setIsListening(true);
    playSound('start');
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
    playSound('end');
  };

  const playSound = (type) => {
    const audio = new Audio(type === 'start' ? '/sounds/start.mp3' : '/sounds/end.mp3');
    audio.play();
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) return;
    const userMessage = { role: 'user', content: inputText };
    const updatedHistory = [...chatHistory, userMessage];
    setChatHistory(updatedHistory);
    setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: updatedHistory.slice(-5), // send last 5 messages
        }),
      });

      const data = await res.json();
      const botMessage = { role: 'assistant', content: data.reply };
      setChatHistory([...updatedHistory, botMessage]);
      speakText(data.reply);
    } catch (err) {
      console.error(err);
      setChatHistory([...updatedHistory, { role: 'assistant', content: 'Something went wrong.' }]);
    }

    setLoading(false);
  };

  return (
    <div style={{ background: '#eee', height: '100vh' }}>
      <header className="p-3 text-white" style={{ background: '#000' ,height: '8vh'}}>
        <h3 className="text-center">
          <Image
            src="/ai.png"
            alt="AI"
            width={30}
            height={30}
          />
          <span className='mx-3'>Anish Voice Bot</span>
        </h3>
      </header>

      <div className="container py-4 d-flex" style={{ width: '100vw', height: '92vh', justifyContent:'center'}}>
        <div className="py-3" style={{ maxHeight: '70vh',minWidth: '100%', overflowY: 'auto' }}>
          {!isSupported && (
            <div className="alert alert-danger">
              Voice input is only supported in Chrome and Safari.<br />
              Please use Chrome or type your message below.
            </div>
          )}
          {chatHistory.map((msg, index) => (
            <div key={index} className={`d-flex ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'} mb-3`}>
              {msg.role !== 'user' && (
              <Image
                src="/robot.png"
                alt="robot"
                width={30}
                height={30}
              />
              )}
              <div
                className={`mx-2 p-2 px-3`}
                style={{
                  background: msg.role === 'user' ? '#0065F8' : '#ADD8E6',
                  color: msg.role === 'user' ? '#fff' : '#000',
                  maxWidth: '80%',
                  borderRadius: msg.role === 'user' ? '10px 0px 10px 10px':'0px 10px 10px 10px'
                }}
              >
                {msg.content}
              </div>
              {msg.role === 'user' && (
              <Image
                src="/user.png"
                alt="user"
                width={30}
                height={30}
              />
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="input-group mt-3 rounded" style={{background:'#fff',position:'fixed',bottom:'15px',maxWidth:'80%',height:'55px'}}>
          <input
            className="form-control"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or use voice..."
            disabled={loading || isListening}
          />
          <button
            className='btn'
            type="button"
            onClick={isListening ? stopListening : startListening}
            disabled={loading}
            title={isListening ? 'Stop' : 'Speak'}
            style={{
              background: isListening ? '#097969': '#000'
            }}
          >
            <Image
              src="/voice2.png"
              alt="Voice"
              width={30}
              height={30}
            />
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSubmit}
            disabled={inputText.trim() === '' || loading || isListening}
          >
            {loading ?
            <Image
              src="/loading2.png"
              alt="Voice"
              width={30}
              height={30}
            />:
            <Image
              src="/send2.png"
              alt="Voice"
              width={30}
              height={25}
            /> 
            }
          </button>
        </div>
      </div>
    </div>
  );
}
