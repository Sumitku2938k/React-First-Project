import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
//import './styles/pages.css'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Service from './pages/Service.jsx'
import Register2 from './pages/Register2.jsx'
import Login from './pages/Login.jsx'
import Navbar from './components/Navbar.jsx'
import Error from './pages/Error.jsx'
import Footer from './components/Footer/Footer.jsx'

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App
