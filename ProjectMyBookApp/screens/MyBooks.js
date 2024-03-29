import React from "react";
import { SafeAreaView, View, Image, TouchableOpacity, FlatList, Text } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../constants';

const MyBooks = ({ route, navigation}) => {
    const { myBooks } = route.params;

    const renderItem = ({ item }) => {
        return (
            <View style={{ marginVertical: SIZES.base }}>
                <TouchableOpacity
                    style={{ flex: 1, flexDirection: 'row' }}
                    onPress={() => navigation.navigate("BookDetail", { book: item })}
                >
                    {/* Book Cover */}
                    <Image
                        source={{ uri: item.bookCover }}
                        resizeMode="cover"
                        style={{ width: 100, height: 150, borderRadius: 10 }}
                    />

                    <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                        {/* Book name and author */}
                        <View>
                            <Text style={{ paddingRight: SIZES.padding, ...FONTS.h2, color: COLORS.white }}>{item.bookName}</Text>
                            <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>{item.author}</Text>
                        </View>

                        {/* Book Info */}
                        <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
                            <Image
                                source={icons.page_filled_icon}
                                resizeMode="contain"
                                style={{ width: 20, height: 20, tintColor: COLORS.lightGray }}
                            />
                            <Text style={{ ...FONTS.body4, color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>{item.pageNo}</Text>

                            <Image
                                source={icons.read_icon}
                                resizeMode="contain"
                                style={{ width: 20, height: 20, tintColor: COLORS.lightGray }}
                            />
                            <Text style={{ ...FONTS.body4, color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>{item.readed}</Text>
                        </View>

                        {/* Genre */}
                        <View style={{ flexDirection: 'row', marginTop: SIZES.base }}>
                            {item.genre.includes("Adventure") &&
                                <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkGreen, height: 40, borderRadius: SIZES.radius }}>
                                    <Text style={{ ...FONTS.body3, color: COLORS.lightGreen }}>Adventure</Text>
                                </View>
                            }
                            {item.genre.includes("Romance") &&
                                <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkRed, height: 40, borderRadius: SIZES.radius }}>
                                    <Text style={{ ...FONTS.body3, color: COLORS.lightRed }}>Romance</Text>
                                </View>
                            }
                            {item.genre.includes("Drama") &&
                                <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkBlue, height: 40, borderRadius: SIZES.radius }}>
                                    <Text style={{ ...FONTS.body3, color: COLORS.lightBlue }}>Drama</Text>
                                </View>
                            }
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Bookmark Button */}
                <TouchableOpacity
                    style={{ position: 'absolute', top: 5, right: 15 }}
                    onPress={() => console.log("Bookmark")}
                >
                    <Image
                        source={icons.bookmark_icon}
                        resizeMode="contain"
                        style={{ width: 25, height: 25, tintColor: COLORS.lightGray }}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }} >
            {/* Body Section */}
            <FlatList
                data={myBooks}
                renderItem={renderItem}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: SIZES.radius }}
            />
        </SafeAreaView>
    );
}

export default MyBooks;
