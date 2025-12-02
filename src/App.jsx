import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Introduction from './pages/Introduction'
import Contract from './pages/Contract'
import MyIntroduction from "./pages/MyIntroduction";


export default function App() {
  return (
    <>
      
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/contract" element={<Contract />} />
          <Route path="/myintro" element={<MyIntroduction />} />

        </Routes>
      </main>
      <Footer />
    </>
  )
}
