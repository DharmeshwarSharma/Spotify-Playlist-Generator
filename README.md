# Spotimix

**Spotimix** is a web application that allows users to create personalized Spotify playlists based on their preferred genres and number of songs. The app integrates with the Spotify API, offering a streamlined way to generate unique playlists directly from the browser.

## Features

- **Genre-Based Song Search**: Users can select multiple genres, and Spotimix will curate songs that match these choices.
- **Playlist Creation**: Automatically creates a new playlist on the user’s Spotify account.
- **Song Limit**: Allows users to specify the desired number of songs in the playlist.

## Technologies Used

- **Frontend**: HTML, CSS
  - **CSS Styling**: Custom styling in `style.css` for a vibrant, interactive interface with hover effects and animations.
- **Backend**: Node.js, Express
- **Spotify API**: Authorization, song search, and playlist management.

## Prerequisites

- **Spotify Developer Account**: Register and get a client ID and client secret from the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
- **Node.js**: Ensure Node.js is installed on your system.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/spotimix.git
   cd spotimix
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Configure the Spotify API credentials in `auth.js`:

   ```javascript
   const client_id = 'your-client-id';
   const client_secret = 'your-client-secret';
   const redirect_uri = 'http://localhost:8888/callback';
   ```

4. Start the server:

   ```bash
   node index.js
   ```

5. Open your browser and go to `http://localhost:8888` to use Spotimix.

## Usage

1. On the homepage, log in with your Spotify account.
2. After authentication, enter the genres and number of songs you want in the playlist.
3. Submit, and Spotimix will generate a playlist link that redirects you to Spotify.

## File Structure

- **index.js**: Server and routing configuration for Express.
- **api.js**: Contains functions for Spotify API interactions, including song search and playlist management.
- **auth.js**: Manages user authentication via Spotify’s OAuth 2.0.
- **style.css**: CSS styling for the frontend.

