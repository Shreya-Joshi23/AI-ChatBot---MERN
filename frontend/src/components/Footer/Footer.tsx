import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <div style={{
        width:"100%",
        padding:20,
        minHeight:"20vh",
        maxHeight:"30vh",
        marginTop:60
      }}>
        <p style={{fontSize:"30px",textAlign:"center",padding:"20px",fontFamily:"monospace"}}>Build with love by<span><Link to="https://www.linkedin.com/in/shreyajoshi23/" className="nav-link" style={{color:"white"}} >Shreya❤️❤️</Link></span></p>
      </div>
    </footer>
  )
}

export default Footer
