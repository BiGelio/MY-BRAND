// My web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCM1FMDqbdssTMN2k7ZWr96oK-2FIA2qpE",
    authDomain: "new-app-43895.firebaseapp.com",
    databaseURL: "https://new-app-43895.firebaseio.com",
    projectId: "new-app-43895",
    storageBucket: "new-app-43895.appspot.com",
    messagingSenderId: "412332630016",
    appId: "1:412332630016:web:e70fabc4c9b8b6a2e438e5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const getLocation = () => {
    if (navigator.geolocation) {
        var k = navigator.geolocation.getCurrentPosition(getPosition);
        console.log(k)
    }
}
const getPosition = (position) => {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    firebase.database().ref("VisitorsLocation/").push().set({
        Latitude: lat,
        longitude: long,
        date: Date(Date.now())
    })
}
getLocation();