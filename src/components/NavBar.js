import { useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'

const NavBar =() =>{

    const navigate = useNavigate()
    return (
        <nav>
            <div className="logo-container">
                <img src={logo} alt="logo" onClick={() => navigate('/')} />            
            </div>
            <div className='controls-container'>
                <div className='icon' onClick={() => navigate('/reservation')}> + </div>
                <div className='icon' onClick={() => navigate('/')}> « </div>
            </div>
        </nav>

    )
}

export default NavBar