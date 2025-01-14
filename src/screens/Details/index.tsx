import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import { api } from "../../services/api";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigate, useNavigation } from "react-router-dom";

type MovieDetails = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    runtime: string;
    release_date: string;
    vote_average: number;
}

type RouterProps = {
    movieId: number;
}

export function Details() {

    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const route = useRoute();
    const { movieId } = route.params as RouterProps;

    const navigation = useNavigate();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/movie/${movieId}`);
                console.log(JSON.stringify(response.data, null))
                setMovieDetails(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchMovieDetails();
    }, [movieId])

    function getYear(data: string) {
        const ano = new Date(data).getFullYear();
        return ano;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation(-1)}>
                    <Icon name="caret-left" color="#fff" size={32} weight="thin" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Detalhes</Text>
                <TouchableOpacity>
                    <Icon name="bookmark-o" color="#fff" size={32} weight="thin" />
                </TouchableOpacity>
            </View>

            {loading && <ActivityIndicator size="large" color="#FFF"/>}
            {!loading && <>
                <View>
                <Image
                    source={{
                        uri: `https://image.tmdb.org/t/p/w500${movieDetails?.backdrop_path}`,
                    }}
                    style={styles.detailsImage}
                />
                <Image
                    source={{
                        uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`
                    }}
                    style={styles.detailsPosterImage}
                />
                <Text style={styles.titleMovie}>{movieDetails?.title}</Text>
                <View style={styles.description}>
                    <View style={styles.descriptionGroup}>
                        <Icon name="calendar" color="#92929D" size={25} weight="thin" />
                        <Text style={styles.descriptionText}>
                            {getYear(movieDetails?.release_date)}
                        </Text>
                    </View>
                    <View style={styles.descriptionGroup}>
                        <Icon name="clock-o" color="#92929D" size={25} weight="thin" />
                        <Text
                            style={styles.descriptionText}
                        >{`${movieDetails?.runtime} minutos`}</Text>
                    </View>
                    <View style={styles.descriptionGroup}>
                        <Icon
                            name="star-o"
                            color={
                                movieDetails?.vote_average.toFixed(2) >= "7"
                                    ? "#FF8700"
                                    : "#92929D"
                            }
                            size={25}
                            weight={
                                movieDetails?.vote_average.toFixed(2) >= "7"
                                    ? "duotone"
                                    : "thin"
                            }
                        />
                        <Text
                            style={[
                                movieDetails?.vote_average.toFixed(2) >= "7"
                                    ? styles.descriptionText1
                                    : styles.descriptionText,
                            ]}
                        >
                            {movieDetails?.vote_average.toFixed(1)}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.about}>
                <Text style={styles.aboutText}>Sinopse</Text>
                <Text style={styles.aboutText}>
                    {movieDetails?.overview === ""
                        ? "Ops! Parece que esse filme ainda não tem sinopse :-("
                        : movieDetails?.overview}
                </Text>
            </View>
            </> }

 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E1E1E",
    },
    header: {
        paddingTop: 30,
        height: 115,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    headerText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 18,
    },
    detailsImage: {
        position: "absolute",
        width: "100%",
        height: 210,
    },
    detailsPosterImage: {
        width: 100,
        height: 160,
        borderRadius: 16,
        left: 29,
        right: 251,
        top: 140,
    },
    titleMovie: {
        position: "absolute",
        height: 50,
        left: 140,
        right: 32,
        top: 240,
        color: "#fff",
        fontSize: 18,
        lineHeight: 27,
        fontWeight: "700",
    },
    description: {
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 170,
    },
    descriptionGroup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
    },
    descriptionText: {
        marginRight: 10,
        color: "#92929D",
    },
    descriptionText1: {
        marginRight: 10,
        color: "#FF8700",
    },
    about: {
        padding: 20,
    },
    aboutText: {
        color: "#fff",
        textAlign: "justify",
    },
});