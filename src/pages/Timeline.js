import React, { Component } from 'react';
import api from '../services/api';
import socket from 'socket.io-client';

import twitterLogo from '../twitter.svg';
import './Timeline.css'

import Tweet from '../components/Tweet';

export default class Timeline extends Component {
  state = {
    tweets: [],
    newTweet: '',
  };

  // é executado automáticamente quando a página é exibida em tela
  async componentDidMount(){
    // chamando função subscribeToEvents automaticamente
    this.subscribeToEvents();

    const response = await api.get('/tweets');

    this.setState({ tweets: response.data }); // array com todos os tweets
  }

  // atualizar em tempo real
  // conexão com o websocket
  subscribeToEvents = () => {
    const io = socket('http://localhost:3000');

    // imutabilidade: nunca altera o valor de uma variável
    // se cria uma nova variável com as informações que devem ser alteradas
    io.on('tweet', data => {
      this.setState({ tweets: [data, ... this.state.tweets] })
    })

    // percorrer todos os tweets, procurar o que precisa ser atualizado e atualizar ele
    // vai retornar um novo array com as modificações feitas
    io.on("like", data => {
      this.setState({
        tweets: this.state.tweets.map(
          tweet => (tweet._id === data._id ? data : tweet)
        )
      });
    });
  };


  handleNewTweet = async e => {
    if (e.keyCode !== 13) return;

    const content = this.state.newTweet; // conteúdo do tweet
    const author = localStorage.getItem('@GoTwitter:username');

    await  api.post('tweets', { content, author });

    this.setState({ newTweet: '' });
  }

  handleInputChange = e => {
    this.setState({ newTweet: e.target.value });
  }

  render() {
    return (
      <div className="timeline-wrapper">
        <img height={24} src={twitterLogo} alt="GoTwitter"/>

        <form>
          <textarea
            value = {this.state.newTweet}
            onChange = {this.handleInputChange}
            onKeyDown = {this.handleNewTweet}
            placeholder = "O que está acontecendo?"
          />

        </form>

        <ul className="tweet-list">
          {this.state.tweets.map(tweet => (
            <Tweet key = {tweet._id} tweet = {tweet} />
          ))}
        </ul>
      </div>
    );
  }
}