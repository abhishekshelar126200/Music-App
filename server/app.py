import pickle
# import streamlit as st
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from flask import Flask, render_template,request,jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)



CLIENT_ID = "70a9fb89662f4dac8d07321b259eaad7"
CLIENT_SECRET = "4d6710460d764fbbb8d8753dc094d131"

# Initialize the Spotify client
client_credentials_manager = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)


global data
data={}

def get_song_album_cover_url(song_name, artist_name):
    search_query = f"track:{song_name} artist:{artist_name}"
    results = sp.search(q=search_query, type="track")

    if results and results["tracks"]["items"]:
        track = results["tracks"]["items"][0]
        album_cover_url = track["album"]["images"][0]["url"]
        # print(album_cover_url)
        return album_cover_url
    else:
        return "https://i.postimg.cc/0QNxYz4V/social.png"

def recommend(song):
    index = music[music['song'] == song].index[0]
    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    recommended_music_names = []
    recommended_music_names.append(music['song'].iloc[index])
    recommended_music_posters = []
    recommended_music_posters.append(get_song_album_cover_url(recommended_music_names[0], music.iloc[distances[0][0]].artist))
    for i in distances[1:21]:
        # fetch the movie poster
        artist = music.iloc[i[0]].artist
        # print(artist)
        # print(music.iloc[i[0]].song)
        recommended_music_posters.append(get_song_album_cover_url(music.iloc[i[0]].song, artist))
        recommended_music_names.append(music.iloc[i[0]].song)

    return recommended_music_names,recommended_music_posters

# st.header('Music Recommender System')
music = pickle.load(open('df.pkl','rb'))
similarity = pickle.load(open('similarity.pkl','rb'))
print(music)
music_list = music['song'].values


@app.route('/')
def home():
    return render_template('index.html',msg=0)

@app.route('/submit',methods=['POST'])
def submit():
    print('Hello Submit')
    global data
    if request.method == 'POST':
        data=request.json
        recommended_music_names,recommended_music_posters = recommend(data['input'])
    return jsonify(recommended_music_names,recommended_music_posters)


@app.route('/api/data', methods=['GET'])
def search():
    global data
    if 'input' in data:
        recommended_music_names, recommended_music_posters = recommend('Bones')
        return jsonify(recommended_music_names, recommended_music_posters)
    
    recommended_music_names, recommended_music_posters = recommend('Bones')
    return jsonify(recommended_music_names, recommended_music_posters)





if __name__ == '__main__':
    app.run(debug=True,port=5500)









# selected_movie = st.selectbox(
#     "Type or select a song from the dropdown",
#     music_list
# )




# if st.button('Show Recommendation'):
#     recommended_music_names,recommended_music_posters = recommend(selected_movie)
#     col1, col2, col3, col4, col5= st.columns(5)
#     with col1:
#         st.text(recommended_music_names[0])
#         st.image(recommended_music_posters[0])
#     with col2:
#         st.text(recommended_music_names[1])
#         st.image(recommended_music_posters[1])

#     with col3:
#         st.text(recommended_music_names[2])
#         st.image(recommended_music_posters[2])
#     with col4:
#         st.text(recommended_music_names[3])
#         st.image(recommended_music_posters[3])
#     with col5:
#         st.text(recommended_music_names[4])
#         st.image(recommended_music_posters[4])





