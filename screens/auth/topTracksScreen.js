import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTopTracks } from "../../redux/actions/index";
import axios from "axios";
import shortid from "shortid";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Linking,
  Image,
  ActivityIndicator,
} from "react-native";

const API_KEY = "9c7a521f8b8fed9d910ee408248ab229";

export default function TopTracksScreen() {
  const topTracks = useSelector((state) => state.topTracks);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    fetch(
      `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${API_KEY}&limit=33&format=json`
    )
      .then((response) => response.json())
      .then((data) => dispatch(setTopTracks(data.tracks.track)))
      .then(() => setIsLoaded(!isLoaded));
  }, []);
  return (
    <View style={styles.container}>
      {isLoaded ? (
        <ActivityIndicator size="large" color="purple" />
      ) : (
        <FlatList
          style={styles.list}
          data={topTracks}
          renderItem={({ item }) => {
            return (
              <View style={styles.item}>
                <Image
                  style={styles.itemImg}
                  source={{ uri: Object.values(item.image[3])[0] }}
                />
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemTrack}>{item.artist.name}</Text>
                </View>
                <Text
                  style={styles.itemLink}
                  onPress={() => Linking.openURL(item.artist.url)}
                >
                  Artist profile
                </Text>
              </View>
            );
          }}
          keyExtractor={() => shortid.generate()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#b4b4b4",
  },
  list: {
    width: "100%",
  },
  item: {
    backgroundColor: "purple",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    position: "relative",
  },
  itemImg: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemName: {
    fontWeight: "700",
    color: "#fff",
  },
  itemTrack: {
    color: "#c09e",
  },
  itemLink: {
    position: "absolute",
    bottom: 0,
    right: 20,
    color: "#006",
  },
  btnLoadMore: {
    backgroundColor: "#f06",
    height: 50,
  },
});
