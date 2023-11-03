async function searchSongsByGenre(accessToken, genre, limit) {
  const searchEndpoint = `https://api.spotify.com/v1/search?q=genre:${encodeURIComponent(genre)}&type=track&limit=${limit}`;

  const response = await fetch(searchEndpoint, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
    },
  });

  const data = await response.json();
  return data.tracks.items;
}

// Function to create a new playlist
async function createPlaylist(accessToken, userId, playlistName) {
  const createPlaylistEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
  

  const response = await fetch(createPlaylistEndpoint, {
    method: "POST",
        body: JSON.stringify({
            'name': playlistName,
        }),
        headers: { 
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        }
    });

  const data = await response.json();
  return data.id;
}

// Function to add tracks to a playlist
async function addTracksToPlaylist(accessToken, playlistId, trackUris) {
  const addTracksEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  const response = await fetch(addTracksEndpoint, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uris: trackUris }),
  });

  return response.status;
}


async function fetchProfile (token) {
  const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", 
      headers: { 'Authorization': 'Bearer ' + token }
  });

  return await result.json();
}

exports.createSpotifyPlaylist = async function (access_token,genre,songnum) {
  
  try {
    const profile=await fetchProfile(access_token);
    userId=profile.id;

   
    const genreName=["Rock","Lo-Fi","Pop","Indian Classical","Rap","Desi Hip Hop","EDM","Alt Z","Hip Hop","Pixel"];
    var genreNums=[];

    
    for (var i=0;i<genre.length;i++){
      
      var temp=""; 
      var j=i; 
      while(j<genre.length && genre[j]!=","){
        temp+=genre[j];
        j++;
      }
      var genrenum=Number(temp);
      if(genrenum!=0){

        genreNums.push(genrenum);
      }
    }


    
    songs=Number(songnum);
    const numberOfSongsPerGenre = Math.ceil(songs/ genreNums.length); // from user
    const playlistName = 'Mixed Genre Playlist ' + Math.round( Math.random() * (100000000000-1) + 1); // Random name each time
    const playlistId = await createPlaylist(access_token, userId, playlistName);

    const trackUris = [];

    for (var i=0;i<genreNums.length;i++) {
      
      var songs = await searchSongsByGenre(access_token, genreName[genreNums[i]-1], numberOfSongsPerGenre);
      trackUris.push(...songs.map(song => song.uri));
    }
    

    const responseStatus = await addTracksToPlaylist(access_token, playlistId, trackUris);
    const playlistLink = `https://open.spotify.com/playlist/${playlistId}`;
    
    // LinkDisplay.textContent = playlistLink;
    if (responseStatus === 201) {
      console.log('Songs added to the playlist successfully.');
    } else {
      console.error('Failed to add songs to the playlist.');
    }
    return playlistLink;
  } 

  catch (error) {
    console.error('An error occurred:', error);
  }

}



