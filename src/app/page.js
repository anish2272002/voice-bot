'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [transcript, setTranscript] = useState('');
  const [typedMessage, setTypedMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const support = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    setIsSupported(support);
  }, []);


  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const userText = event.results[0][0].transcript;
      setTranscript(userText);
      askChatGPT(userText);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);

      if (event.error === 'network') {
        alert('Speech recognition is blocked by your browser. Try using Chrome or Safari instead.');
      }
    };

    recognition.start();
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  const askChatGPT = async (question) => {
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question }),
      });
      const data = await res.json();
      setResponse(data.reply);
      speakText(data.reply);
    } catch (err) {
      console.error('Error calling OpenAI API', err);
      setResponse('Sorry, something went wrong.');
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typedMessage.trim()) {
      setTranscript(typedMessage);
      askChatGPT(typedMessage);
      setTypedMessage('');
    }
  };

  return (
    <div className="container py-5 text-center">
      <h1 className="mb-4">Meet Anish Bot</h1>

      {!isSupported && (
        <div className="alert alert-danger">
          Voice input is only supported in Chrome and Safari.<br />
          Please use Chrome or type your message below.
        </div>
      )}

      {isSupported && (
        <>
          <button
            className="btn btn-primary btn-lg px-4 mb-3"
            onClick={handleVoiceInput}
            disabled={loading}
          >
            {loading ? 'Listening / Thinking...' : 'Speak'}
          </button>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Or type your message here"
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                disabled={loading}
              />
              <button className="btn btn-outline-secondary" type="submit" disabled={loading}>
                Send
              </button>
            </div>
          </form>

          {transcript && (
            <div className="alert alert-secondary mt-4">
              <strong>You said:</strong> {transcript}
            </div>
          )}

          {response && (
            <div className="alert alert-success mt-3">
              <strong>Bot:</strong> {response}
            </div>
          )}
        </>
      )}
    </div>
  );
}
