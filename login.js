const button=document.getElementById("Login");
const querystring = require('querystring');
const Buffer = require('buffer').Buffer;
const fetch = require('node-fetch');

var client_id = '211393e0459a4506a4547f4c17991fa9';
var client_secret = 'e43fcc63e293433d9a63c6499e6c05c2';
var redirect_uri = 'http://127.0.0.1:5500/Main.html';

button.addEventListener('click', () => {
    

    const getAuthLink =  function() {
        const scope = 'ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read user-read-email user-read-private';
        return 'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        });
    }

    

  });
  