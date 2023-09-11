import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from 'react-native';


export default PhotoDisplay = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [isDetail, setIsDetail] = useState(false)
    console.log(data);
    let { height, width } = useWindowDimensions()


    useEffect(() => {
        fetch('https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=f9736f4d370f9c7115a952951b506569&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

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
                                console.log(str)
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