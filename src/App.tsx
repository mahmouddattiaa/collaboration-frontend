import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CollaborationProvider } from './contexts/CollaborationContext';
import CollaborationRoom from './pages/CollaborationRoom';

function App() {
  return (
    <CollaborationProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/room" />} />
        <Route path="/room/:roomId?" element={<CollaborationRoom />} />
      </Routes>
    </CollaborationProvider>
  );
}

export default App; 