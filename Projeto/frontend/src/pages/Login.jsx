// src/Login.jsx
import { useState } from 'react';
import { login } from '../services/authService';
import axios from 'axios';
import '../styles/login.css';


export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(user, password);

      const { token, usuario } = response;

      localStorage.setItem('token', token);
      if(usuario.tipo === 'admin') {
        localStorage.setItem('tipoUsuario', usuario.tipo);
        localStorage.setItem('nomeUsuario', usuario.nome);
      } else if(usuario.tipo === 'aluno') {
        localStorage.setItem('tipoUsuario', usuario.tipo);
        localStorage.setItem('nomeUsuario', usuario.nome);
        localStorage.setItem('ra', usuario.ra);
        localStorage.setItem('dataNascimento', usuario.dataNascimento);
      } 

      alert(`Login bem-sucedido! Tipo de usuário: ${usuario.tipo}`);
    } catch (err) {
      console.error(err);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='loginContainer'>
        <form onSubmit={handleLogin} className='loginForm'>
            <div className='loginLogo'>
                <img src="../../public/logo-navbar.png" alt="" />
            </div>
        
            <div className='loginTitle'>
                <h2>Bem vindo</h2>
                <p>Bem-vindo ao sistema da ELLP!</p>
            </div>
        
            <div>
                <input
                    type="text"
                    placeholder="Usuário"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                    style={{ width: '100%', marginBottom: '10px' }}
                />  
        
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', marginBottom: '10px' }}
                />
            </div>
            
        
            <button type="submit" disabled={loading} style={{ width: '100%' }}>
                {loading ? 'Entrando...' : 'Entrar'}
            </button>
        </form>

        <div className='banner'>

        </div>
    </div>


  );
}
