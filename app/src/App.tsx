import { BrowserRouter } from 'react-router-dom';
import AppLayout from './core/AppLayout';
import SessionProvider from './hooks/context/SessionContext';
import './App.css'

function App() {

  return (
       <BrowserRouter>
        <SessionProvider>
          <AppLayout />
        </SessionProvider>
       </BrowserRouter>
      

  )
}

export default App
