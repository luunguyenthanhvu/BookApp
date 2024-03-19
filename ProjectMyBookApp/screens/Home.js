import React, { useState, useEffect } from "react";
import {TextInput, Button } from 'react-native';
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

const fetchData = async (category) => {
    try {
        let url = 'https://openlibrary.org/search.json?q=';

        switch (category) {
            case 'manga':
                url += 'manga&limit==15&mode=everything';
                break;
            case 'novel':
                url += 'light%20novel&limit=15&mode=everything';
                break;
            case 'commons':
                url += 'commons&limit=15&mode=everything';
                break;
            default:
                url += 'manga&limit=15&mode=everything';
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
          }
        const bookData = await response.json();
        const docs = bookData.docs.slice(0, 20);
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
        return books;
    } catch (error) {
        console.error(error);
        return []
    }
}

const profileAccount = {
    name: "Vũ Lưu",
    point: 500
}

const categoriesData = [
    {
        id: 1,
        categoryName: "Manga",
        books: []
    },
    {
        id: 2,
        categoryName: "Novel",
        books: []
    },
    {
        id: 3,
        categoryName: "Commons",
        books: []
    },
];  


const Home = ({ navigation }) => {
    
    const [myBooks, setMyBooks] = useState([]);
    const [profile, setProfile] = useState(profileAccount);
    const [categories, setCategories] = useState(categoriesData);
    const [selectedCategory, setSelectedCategory] = useState(1);
    
    useEffect(() => {
        const fetchDataAndSetBooks = async () => {
            try {
                const manga = await fetchData('manga');
                const novel = await fetchData('novel');
                const commons = await fetchData('commons');

                setCategories([
                    { id: 1, categoryName: "Manga", books: manga },
                    { id: 2, categoryName: "Novel", books: novel },
                    { id: 3, categoryName: "Commons", books: commons }
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDataAndSetBooks();
        initializeSampleData();
    }, [selectedCategory]);

    const initializeSampleData = () => {
        // Dữ liệu mẫu sách
        const sampleBooks = [
            {
                id: 11111,
                bookName: "Java for beginner",
                bookCover: 'https://imgv2-2-f.scribdassets.com/img/word_document/383247616/original/d6f1411abe/1602826335?v=1',
                rating: 4.5,
                language: "Eng",
                pageNo: 341,
                author: "Jasmine Warga",
                genre: [
                    
                ],
                readed: "12k",
                description: "This book written for who want to learn java but don't know where to start.",
                backgroundColor: "rgba(240,240,232,0.9)",
                navTintColor: "#000"
            },
            {
                id: 22222,
                bookName: "Your name",
                bookCover: 'https://omegacenter.es/blog/wp-content/uploads/2017/04/portada_your-name-novela_makoto-shinkai_201703091007.jpg',
                rating: 4.1,
                language: "Eng",
                pageNo: 272,
                author: "Makoto Shinkai",
                genre: [
                    "Romance", "Drama"
                ],
                readed: "13k",
                description: "Makoto Shinkai continue write a new light novel about love who was called by the name 'magic of love' this sience will make you cry because of many moment but this will help you relax after work, study.....",
                backgroundColor: "rgba(247,239,219,0.9)",
                navTintColor: "#000"
        
            },
            {
                id: 33333,
        bookName: "Oregairu",
        bookCover: 'https://i.pinimg.com/originals/16/77/65/1677656c0fb11b8e1179d441679de9ae.png',
        rating: 3.5,
        language: "Eng",
        pageNo: 110,
        author: "Wataru Watari",
        genre: [
            "Drama", "Romance"
        ],
        readed: "13k",
        description: "Hachiman Hikigaya is an apathetic high school student with narcissistic and semi-nihilistic tendencies. He firmly believes that joyful youth is nothing but a farce, and everyone who says otherwise is just lying to themselves.In a novel punishment for writing an essay mocking modern social relationships, Hachiman's teacher forces him to join the Volunteer Service Club, a club that aims to extend a helping hand to any student who seeks their support in achieving their goals. With the only other club member being the beautiful ice queen Yukino Yukinoshita, Hachiman finds himself on the front line of other people's problems—a place he never dreamed he would be. As Hachiman and Yukino use their wits to solve many students' problems, will Hachiman's rotten view of society prove to be a hindrance or a tool he can use to his advantage? ",
        backgroundColor: "rgba(247,239,219,0.9)",
        navTintColor: "#000"

            }
        ];

        // Thêm dữ liệu mẫu vào danh sách myBooks
        setMyBooks(sampleBooks);
    };
    const addToMyBooks = (book) => {
        const isBookExist = myBooks.some(existingBook => existingBook.id === book.id);
        if (isBookExist) {
            const updatedBooks = myBooks.filter(books => books.id !== book.id);
            setMyBooks(updatedBooks);
        } else {
            setMyBooks([...myBooks, book]);
        }
    };


    fetchData();

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
                    <View style={{ flex: 1 , marginLeft: 10}}>
                        <View style={{ marginRight: SIZES.padding }} >
                            <Text style={{ ...FONTS.h2, color: COLORS.white }}>{profileAccount.name}</Text>
                        </View>
                        <TouchableOpacity style={{flexDirection:'row'}}>
                                <Text style={{ ...FONTS.h4, color: COLORS.white, marginRight:3 }}>Logout</Text>
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
                        justifyContent: 'center',width: 30, height: 30,
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
                            ...FONTS.body3}}>
                                {profileAccount.point} point
                            </Text>
                    </View>

                </TouchableOpacity>
            </View>
        );
    }

    function renderMyBookSection(myBooks) {

        const renderItem = ({ item, index }) => {
            return (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        marginLeft: index == 0 ? SIZES.padding : 0,
                        marginRight: SIZES.radius
                    }}
                    onPress={() => navigation.navigate("BookDetail", {
                        book:item
                    })}
                >
                    {/* Book Cover */}
                    <Image
                        source = {{uri: item.bookCover}}
                        resizeMode="cover"
                        style={{
                            width: 180,
                            height: 250,
                            borderRadius: 20
                        }}
                    />

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

                </TouchableOpacity>
            )
        }
       
        return (
            <View style={{flex:1}}>
                <View style={{
                    paddingHorizontal: SIZES.padding, flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{...FONTS.h2, color:COLORS.white}}>My Book</Text>
                   
                    <TouchableOpacity onPress={() => navigation.navigate("BookDetail", {
                            book: item
                        })}>

                        <Text style={{
                            ...FONTS.body3, color: COLORS.lightGray, alignSelf: 'flex-start',
                        textDecorationLine: 'underline'}}>See more</Text>
                    </TouchableOpacity>
                </View>

                {/* Books */}
                <View style={{flex:1, marginTop: SIZES.padding}}>
                    <FlatList
                        data={myBooks}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        
                    </FlatList>
                </View>
            </View>
        );
    }

    function renderCategoryHeader() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity style={{ flex: 1, marginRight: 15 }}
                    onPress={() => setSelectedCategory(item.id)}
                >   
                    {selectedCategory == item.id && 
                        <Text style={{
                        ...FONTS.h2,color: COLORS.white
                        }}>{item.categoryName}</Text>}
                    
                    {selectedCategory != item.id && 
                        <Text style={{
                        ...FONTS.h2,color: COLORS.lightGray
                    }}>{item.categoryName}</Text>}

                </TouchableOpacity>
            );
        }
        return (
            <View style={{flex: 1, paddingLeft: SIZES.padding}}>
                <FlatList
                    data={categories}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                ></FlatList>
            </View>
        );
    }

    function renderCategoryData() {
        var books = []

        let selectedCategoryBooks = categories.filter(a => a.id == selectedCategory)

        if (selectedCategoryBooks.length > 0) {
            books = selectedCategoryBooks[0].books
        }

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
                            source={{uri: item.bookCover}}
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
                    data={books}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }


    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }} >
            {/* Header Section */}
            <View style={{ height: 100 }}>
                {renderHeader(profile)}
            </View>

            {/* Body Section */}
            <ScrollView style={{ marginTop: SIZES.radius }}>
                {/* Book Section */}
                <View>
                    {renderMyBookSection(myBooks)}
                </View>

                {/* Categories Section */}
                <View style={{marginTop: SIZES.padding}}>
                    <View>
                        {renderCategoryHeader()}
                    </View>

                    <View>
                        {renderCategoryData()}
                    </View>
                </View>

            </ScrollView>

      </SafeAreaView>
    );

}


export default Home;