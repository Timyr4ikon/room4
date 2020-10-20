import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import shortid from "shortid";
import { setFindedTracks } from "../../redux/actions/index";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  Alert,
  TouchableHighlight,
} from "react-native";
import { API_KEY } from "../../utils/index";

export default function searchTracksScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();
  const findedTracks = useSelector((state) => state.findedTracks);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setSearchQuery("");
  };

  const submitRequest = () => {
    setIsLoaded(true);
    if (searchQuery.trim().length > 0) {
      axios
        .get(
          `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchQuery}&api_key=${API_KEY}&format=json`
        )
        .then((data) => {
          setIsLoaded(false);
          if (data.data.results.trackmatches.track.length < 1) {
            Alert.alert("No tracks(");
          }
          keyboardHide();
          return dispatch(
            setFindedTracks(data.data.results.trackmatches.track)
          );
        });
    } else {
      setIsLoaded(false);
      Alert.alert("Enter title!");
    }
  };
  
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        {isLoaded ? (
          <ActivityIndicator size="large" color="purple" />
        ) : (
          <>
            <TextInput
              style={styles.input}
              textAlign={"center"}
              onFocus={() => setIsShowKeyboard(true)}
              value={searchQuery}
              placeholder={"Enter track title"}
              onChangeText={(value) => setSearchQuery(value)}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={keyboardHide}
            >
              <Text style={styles.btnTitle} onPress={submitRequest}>
                Search
              </Text>
            </TouchableOpacity>
            {findedTracks.length > 0 && (
              <FlatList
                style={styles.list}
                data={findedTracks}
                renderItem={({ item }) => {
                  return (
                    <TouchableHighlight style={styles.item}>
                      <View>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemTrack}>{item.artist}</Text>
                      </View>
                    </TouchableHighlight>
                  );
                }}
                keyExtractor={() => shortid.generate()}
              />
            )}
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "purple",
    color: "purple",
    height: 40,
    fontWeight: "600",
    borderRadius: 6,
    marginHorizontal: 20,
  },
  inputTitle: {
    marginBottom: 10,
    fontSize: 18,
  },
  btn: {
    height: 40,
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    marginHorizontal: 70,
    backgroundColor: "transparent",
  },
  btnTitle: {
    color: "purple",
    fontSize: 18,
    fontWeight: "600",
  },
  list: {
    width: "100%",
  },
  item: {
    backgroundColor: "purple",
    borderBottomWidth: 20,
    borderBottomColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    position: "relative",
  },
  itemName: {
    fontWeight: "700",
    color: "#fff",
  },
  itemTrack: {
    color: "#c09e",
  },
  sorryTitle: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    color: "#f03",
  },
});
