import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/introduction">Introduction</Link></li>
        <li><Link to="/contract">Contract</Link></li>
      </ul>
    </nav>
  )
}
