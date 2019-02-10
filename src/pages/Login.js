import React, { Component } from 'react';

import twitterLogo from '../twitter.svg';
import './Login.css';

export default class Login extends Component {
    // estado: um objeto js. toda vez que uma informação desse estado
    // for alterada, ele renderiza do zero. a info é alterada automáticamente
    state = {
        username: '',
    };

    handleInputChange = () => {
        this.setState({ }); // username
    }

    render() {
        return (
            <div className="login-wrapper">
                <img src={twitterLogo} alt="GoTwitter"/>
                <form>
                    {/* 
                        onChange: um evento js. toda vez que ele
                        sofre uma alteração de texto, uma função
                        vai ser chamada
                     */}
                    <input
                        value={this.state.username} 
                        onChange={this.handleInputChange}
                        placeholder="Nome de Usuário"
                    />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        );
  }
}
