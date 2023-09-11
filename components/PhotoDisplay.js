import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, Image, useWindowDimensions, TouchableOpacity, Alert, Platform } from 'react-native';
import Realm from 'realm';
import NetInfo from "@react-native-community/netinfo";





export default PhotoDisplay = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    let { height, width } = useWindowDimensions()
    const Photo = {
        name: "Photo",
        properties: {
            id: "string",
            owner: "string",
            secret: "string",
            server: "string",
            farm: { type: "int", default: 0 },
            title: "string",
            isfriend: { type: "int", default: 0 },
            isfamily: { type: "int", default: 0 },
            ispublic: { type: "int", default: 0 },
            is_primary: { type: "int", default: 0 },
            has_comment: { type: "int", default: 0 },




        },
        primaryKey: "id",
    };

    const realm = new Realm({
        schema: [Photo],
        deleteRealmIfMigrationNeeded: true,
    });


    useEffect(() => {
        if (Platform.OS === "android") {
            NetInfo.fetch().then(state => {
                if (state.isConnected) {
                    Alert.alert("You are online!");
                    fetch('https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=f9736f4d370f9c7115a952951b506569&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1')
                        .then((response) => response.json())
                        .then((json) => {
                            setData(json)
                            savePhotos(json.photos.photo)

                        })
                        .catch((error) => console.error(error))
                        .finally(() => {
                            console.log("Hi")
                            setLoading(false)
                        });
                } else {
                    Alert.alert("You are offline!");
                    const js = {}
                    const photo = realm.objects("Photo");
                    //const photo = {};
                    console.log(photo)
                    js.photos = {}
                    js.photos.photo = photo
                    setData(js)
                    setLoading(false)
                }
            })

        }



    }, []);

    // function to save photos in mobile front end db after fetch
    const savePhotos = (photos) => {
        {

            photos.forEach(photo => {
                realm.write(() => {
                    realm.create("Photo", {
                        id: photo.id,
                        owner: photo.owner,
                        secret: photo.secret,
                        server: photo.server,
                        farm: photo.farm,
                        title: photo.title,
                        isfriend: photo.isfriend,
                        isfamily: photo.isfamily,
                        ispublic: photo.ispublic,
                        is_primary: photo.is_primary,
                        has_comment: photo.has_comment,
                    });
                });
            })
        }

    }


    return (


        <View style={{ flex: 1 }}>
            {isLoading ? <Text>Loading...</Text> :
                (

                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={data.photos.photo}
                            ListHeaderComponent={() => (
                                <View style={{ paddingVertical: 10 }}>
                                    <Text numberOfLines={2} style={{ color: "#1b261e", fontWeight: 'bold', fontSize: 18 }}>Photo Gallery</Text>
                                </View>
                            )}
                            ListFooterComponent={() => (
                                <View style={{ padding: 5 }}>

                                </View>
                            )}
                            keyExtractor={({ id }, index) => id}
                            numColumns={2}
                            contentContainerStyle={styles.container}
                            renderItem={({ item }) => {
                                let str = `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`
                                return (
                                    <View style={{ padding: 10, flex: 1 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text numberOfLines={2} style={{ color: "#1b261e", fontWeight: 'bold', fontSize: 14 }}>{item.title}</Text>
                                        </View>
                                        <View style={[styles.logoContainer, { width: (width / 2) - 50 }
                                        ]}>
                                            <Image
                                                style={styles.logo}
                                                source={{
                                                    uri: str,
                                                }}
                                            />
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    </View>


                )}
        </View>

    );
};
const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    logoContainer: {
        justifyContent: 'flex-start',
        height: 100,

    },
    logo: {
        justifyContent: 'flex-start',
        resizeMode: 'contain',
        height: 100
    },
});