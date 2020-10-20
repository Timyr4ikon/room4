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
import { API_KEY } from "../../utils/index";

export default function TopTracksScreen() {
  const topTracks = useSelector((state) => state.topTracks);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(true);
  useEffect(() => {
    axios
      .get(
        `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${API_KEY}&limit=33&format=json`
      )
      .then((data) => dispatch(setTopTracks(data.data.tracks.track)))
      .then(() => setIsLoaded(!isLoaded));
  }, []);
  return (
    <View style={styles.container}>
      {isLoaded ? (
        <ActivityIndicator size="large" color="purple" />
      ) : (
        <>
          <Text style={styles.title}>Trends</Text>
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
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    paddingBottom: 10,
  },
  list: {
    width: "100%",
    borderTopColor: "#b4b4b4",
    borderTopWidth: 1,
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
