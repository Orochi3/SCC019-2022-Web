import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Header.css"
import Cookies from 'universal-cookie';
import cartIcon from '../assets/cart_icon.png';
import gearIcon from '../assets/gear_icon.png';

const Header = ({user, setUser, setInputPesquisa, pesquisaBool, updatePesquisa}) => {
    //determina o que colocar no header
    let location = useLocation();
    let navigate = useNavigate();
    let locationFormatted = location.pathname.slice(1);
    if (locationFormatted === ""){
        locationFormatted = "Home";
    }
    else{
        locationFormatted = locationFormatted[0].toUpperCase() + locationFormatted.slice(1);
    }
    
    const handleLogout = () =>{
        let cookies = new Cookies();
        cookies.remove("logged_user", {path: '/'});
        setUser(undefined);
    }
    
    const handlePesquisaClick = () => {
        let inputPesquisa = document.getElementById("pesquisar").value;
        setInputPesquisa(inputPesquisa);
        updatePesquisa(!pesquisaBool);
        
        if(location.pathname !=='/admin/products/search'){
            navigate("/pesquisa");
        }



    }

    return (
        <nav>
            <div className='parte-vermelha'>
                <div className="parte-esquerda-wrapper">
                    <h1>Retro Archive Store &gt; </h1>
                    <span id="location">{locationFormatted}</span>
                </div>
                <div className="parte-direita-wrapper">
                    {user ? (<Link id='name' to="/usuario">{user.nome}</Link>) : 
                    <span id='name'>anônimo</span>
                    }

                    {user && user.adm && (<Link to="/admin"> <img src={gearIcon} alt="carrinho" className="icon"/></Link>)}

                    <a href="/cart"><img src={cartIcon} alt="carrinho" className="icon"/></a>
                </div>

            </div>
            <div className='parte-cinza'> 
                <div className="parte-esquerda-wrapper">
                <Link className='link' to="/">Home</Link>
                {/* logica para mostrar botoes diferentes se estiver logado ou nao */}
                {(user ? (
                <Link className='link' to='/' onClick={handleLogout}>Logout</Link>) :
                (<>
                <Link className='link' to='/login'>Login</Link>
                <Link className='link' to='/cadastro'>Cadastro</Link>
                </>))}
                </div>

                <div className='pesquisa parte-direita-wrapper'>
                <input id="pesquisar" type="text" />
                <span  id="pesquisar-texto" onClick={handlePesquisaClick}>Pesquisar</span>
                </div>
            </div>
        </nav>
    );
    

}
 
export default Header;