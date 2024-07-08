import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import './App.css';

interface chatAction {
    type?: string;
    role: string;
    text: string;
}
interface chatState {
    messages: chatAction[]
}

const chatReducer = (state: chatState, action: chatAction): chatState => {
    const { type, role, text } = action;

    switch (type) {
        case 'SET':            
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {role, text}
                ]
            };
        default:
            return state;
    }
};

const App: React.FC = () => {
    const chatRef = useRef<HTMLDivElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState('');
    const [chatState, dispatch] = useReducer(chatReducer, {
        messages: []
    });

    const submitHandler = useCallback(async (event?: React.FormEvent) => {
        event?.preventDefault();
        dispatch({
            type: 'SET',
            role: 'user',
            text: input
        });
        setInput('');
        try {
            const res = await fetch('http://localhost:5001/api/gpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({input}),
            });
            if (!res.ok) {
                throw new Error(`Request failed with status ${res.status}`);
            }
            const data = await res.json();
            dispatch({
                type: 'SET',
                role: 'assistant',
                text: data.choice?.message?.content
            });
        } catch (error: any) {
            console.error('Errore durante la richiesta:', error.message);
        }
    }, [input]);

    useEffect(() => {
        (chatRef.current?.getBoundingClientRect() && chatRef.current?.getBoundingClientRect().height > window.innerHeight)
        && chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatState.messages]);

    return (
        <div className='App'>
            <div className='chat' ref={chatRef}>
                {chatState.messages?.map((message, index) => {
                    return (
                        <div className={`chat-bubble --${message.role}`} key={`message-${index}`}>
                            <div className='chat-role'>{message.role}</div>
                            <div className='chat-text'>{message.text}</div>
                        </div>
                    )
                })}
                <div ref={chatEndRef} className='chat-end'/>
            </div>
            <form onSubmit={submitHandler}>
                <input
                    type='text'
                    value={input}
                    placeholder='Chiedi qualcosa'
                    onChange={event => setInput(event.target.value)}
                />
                <button type='submit'>Invia</button>
            </form>
        </div>
    );
}

export default App;
