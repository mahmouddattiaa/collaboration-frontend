import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CollaborationProvider } from './contexts/CollaborationContext';
import CollaborationRoom from './pages/CollaborationRoom';

function App() {
  return (
    <CollaborationProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/collaboration" />} />
        <Route path="/collaboration/:roomId?" element={<CollaborationRoom />} />
      </Routes>
    </CollaborationProvider>
  );
}

export default App; 