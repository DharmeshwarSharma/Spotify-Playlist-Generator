const querystring = require('querystring');
// const Buffer = require('buffer').Buffer;
// const fetch = require('node-fetch');

var client_id = 'id';
var client_secret = 'secret';
var redirect_uri = 'http://localhost:8888/callback';

exports.getAuthLink =  function() {
    const scope = 'ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-follow-modify user-follow-read user-read-playback-position user-top-read user-read-recently-played user-library-modify user-library-read user-read-email user-read-private';
    return 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
    });
}

exports.getAccessToken = async function(code){
  const params = new URLSearchParams();
  params.append("code", code);
  params.append("redirect_uri", redirect_uri);
  params.append("grant_type", 'authorization_code');
  const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST', 
      body: params,
      headers: {
          'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
  });
  const result_json = await result.json();
  return result_json.access_token;
}
