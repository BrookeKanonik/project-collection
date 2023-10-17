import React from "react";
import { AuthProvider } from "./components/AuthContext"
import AppContent from "./AppContent";

function App() {
  return (
    // Wrapping the AppContent component with AuthProvider to provide authentication context
    <AuthProvider>
      <AppContent />  {/* This is where the main content of the application will be rendered */}
    </AuthProvider>
  );
}
//app content is the children when referenced in the AuthContext.js

export default App;
