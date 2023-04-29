import logosrc from './logo.svg'
import { useNavigate } from 'react-router-dom'

export const Logo = () => {
    const navigate = useNavigate();

    return (
    <a href="#" onClick={() => navigate('/')}>
        <img src={logosrc} alt="" />
    </a>)
}