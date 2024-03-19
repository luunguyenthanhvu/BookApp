import React, { useState, useEffect } from "react";
import { TextInput, Button, ActivityIndicator } from 'react-native';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList
} from 'react-native';

import { COLORS, FONTS, SIZES, icons, images } from '../constants';
import { Colors } from "react-native/Libraries/NewAppScreen";

const SearchBook = ({ navigation }) => {
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Trạng thái tải dữ liệu

    const [myBooks, setMyBooks] = useState([]);
    const addToMyBooks = (book) => {
        const isBookExist = myBooks.some(existingBook => existingBook.id === book.id);
        if (isBookExist) {
            const updatedBooks = myBooks.filter(books => books.id !== book.id);
            setMyBooks(updatedBooks);
        } else {
            setMyBooks([...myBooks, book]);
        }
    };
    
    const fetchData = async () => {
        try {
            setIsLoading(true); // Bắt đầu tải dữ liệu

            let url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchKeyword)}&limit=5&mode=everything`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Could not fetch resource");
            }

            const bookData = await response.json();
            const docs = bookData.docs.slice(0, 30);
            const defaultCoverUrl = 'http://zippypixels.com/wp-content/uploads/2015/04/2-book-cover-psd-mockup-hardcover-Vol3-2-824x542.jpg';
            const books = docs.map((item, index) => {
                let description;
                if (item.description) {
                    description = item.description;
                } else {
                    description = `Explore the pages of this captivating book and immerse yourself in a world of imagination and discovery. Written by the talented author ${item.author_name ? item.author_name.join(', ') : 'Unknown'}, this book invites readers on a journey of wonder and excitement. With engaging storytelling and intriguing characters, this literary masterpiece promises to transport you to new and exciting places. Whether you're seeking adventure, mystery, or heartfelt emotions, this book has something for everyone. Lose yourself in its pages and experience the magic of storytelling at its finest.`;
                }

                return {
                    id: index + 1,
                    bookName: item.title,
                    bookCover: item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg` : defaultCoverUrl,
                    rating: item.rating ? item.rating : '4.8',
                    language: item.language ? item.language : 'N/A',
                    pageNo: item.number_of_pages ? item.number_of_pages : getRandomNumber(200, 1000),
                    author: item.author_name ? item.author_name.join(', ') : 'Unknown',
                    genre: item.subject ? item.subject.slice(0, 2) : ['N/A'],
                    readed: item.readed ? item.readed : getRandomNumber(200, 1000),
                    description: description,
                    backgroundColor: "rgba(240,240,232,0.9)",
                    navTintColor: "#000"
                };
            });

            setSearchResult(books);
            setIsLoading(false); // Kết thúc tải dữ liệu
        } catch (error) {
            setIsLoading(false); // Kết thúc tải dữ liệu nếu có lỗi
            console.error(error);
        }
    }
    

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const profile = {
        name: "Vũ Lưu",
        point: 500
    }

    function renderHeader(profile) {
        return (
            <View style={{
                flex: 1, flexDirection: 'row', paddingHorizontal: SIZES.padding
                , alignItems: 'center'
            }}>
                {/* Greeting */}
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        borderRadius: 25,
                        backgroundColor: COLORS.white,
                        borderWidth: 1,
                        borderColor: COLORS.white
                    }}>
                        <Image
                            source={images.account}
                            resizeMode="contain"
                            style={{
                                justifyContent: 'center',
                                width: 45,
                                height: 45,
                                alignItems: 'center',
                                borderRadius: 25,
                                backgroundColor: COLORS.white,
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <View style={{ marginRight: SIZES.padding }} >
                            <Text style={{ ...FONTS.h2, color: COLORS.white }}>{profile.name}</Text>
                        </View>
                        <TouchableOpacity style={{ flexDirection: 'row' }}>
                            <Text style={{ ...FONTS.h4, color: COLORS.white, marginRight: 3 }}>Logout</Text>
                            <Image
                                source={icons.logout_icon}
                                resizeMode="contain"
                                style={{
                                    tintColor: COLORS.white,
                                    width: 20,
                                    height: 20
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Point */}
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        height: 40,
                        paddingLeft: 3,
                        paddingRight: SIZES.radius,
                        borderRadius: 20
                    }}
                    onPress={() => console.log("point")}
                >
                    <View style={{
                        flex: 1, flexDirection: 'row', justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            justifyContent: 'center', width: 30, height: 30,
                            alignItems: 'center', borderRadius: 25, backgroundColor: 'rgba(0,0,0,0.5)'
                        }}>
                            <Image
                                source={icons.plus_icon}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20
                                }}
                            />
                        </View>
                        <Text style={{
                            marginLeft: SIZES.base, color: Colors.black,
                            ...FONTS.body3
                        }}>
                            {profile.point} point
                            </Text>
                    </View>

                </TouchableOpacity>
            </View>
        );
    }

    function handleSearch() {
        fetchData(searchKeyword);
    }

    function renderSearchBar() {
        return (
            <View style={{ paddingHorizontal: SIZES.padding, marginTop: SIZES.radius }}>
                <View style={{ flexDirection: 'row', height: 50, backgroundColor: COLORS.gray1, borderRadius: SIZES.radius, alignItems: 'center', paddingHorizontal: SIZES.padding }}>
                    <TextInput
                        style={{ flex: 1, ...FONTS.body3, color: COLORS.white }}
                        placeholder="Search books"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.primary}
                        value={searchKeyword}
                        onChangeText={(text) => setSearchKeyword(text)}
                    />
                    <TouchableOpacity
                        style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}
                        onPress={handleSearch}
                    >
                        <Image
                            source={icons.search_icon}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.white
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function renderCategoryData() {
        const renderItem = ({ item }) => {
            return (
                <View style={{ marginVertical: SIZES.base }}>
                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row' }}
                        onPress={() => navigation.navigate("BookDetail", {
                            book: item
                        })}
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
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.lightGray
                                    }}
                                />
                                <Text style={{ ...FONTS.body4, color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>{item.pageNo}</Text>

                                <Image
                                    source={icons.read_icon}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: COLORS.lightGray
                                    }}
                                />
                                <Text style={{ ...FONTS.body4, color: COLORS.lightGray, paddingHorizontal: SIZES.radius }}>{item.readed}</Text>
                            </View>

                            {/* Genre */}
                            <View style={{ flexDirection: 'row', marginTop: SIZES.base }}>
                                {
                                    item.genre.includes("Adventure") &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkGreen, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{ ...FONTS.body3, color: COLORS.lightGreen }}>Adventure</Text>
                                    </View>
                                }
                                {
                                    item.genre.includes("Romance") &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkRed, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{ ...FONTS.body3, color: COLORS.lightRed }}>Romance</Text>
                                    </View>
                                }
                                {
                                    item.genre.includes("Drama") &&
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
                        onPress={() => addToMyBooks(item)}
                    >
                        <Image
                            source={icons.bookmark_icon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.lightGray
                            }}
                        />
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={{ flex: 1, marginTop: SIZES.radius, paddingLeft: SIZES.padding }}>
                <FlatList
                    data={searchResult}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }} >
            {/* Header Section */}
            <View style={{ height: 100 }}>
                {renderHeader(profile)}
            </View>

            {/* Body Section */}
            <ScrollView style={{ marginTop: SIZES.radius }}>
                <View>
                    {renderSearchBar()}
                </View>

                {/* Categories Section */}
                <View style={{ marginTop: SIZES.padding }}>
                    <View>
                        {/* {renderCategoryHeader()} */}
                    </View>

                    <View>
                        {renderCategoryData()}
                    </View>
                </View>

            </ScrollView>

        </SafeAreaView>
    );

}


export default SearchBook;
