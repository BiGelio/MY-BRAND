// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCM1FMDqbdssTMN2k7ZWr96oK-2FIA2qpE",
    authDomain: "new-app-43895.firebaseapp.com",
    databaseURL: "https://new-app-43895.firebaseio.com",
    projectId: "new-app-43895",
    storageBucket: "new-app-43895.appspot.com",
    messagingSenderId: "412332630016",
    appId: "1:412332630016:web:e70fabc4c9b8b6a2e438e5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Saving data for queries and question to database
function submitData() {

    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var mail1 = document.getElementById("email").value;
    var Message = document.getElementById("msg").value;

    if (fname == null || fname == "") {
        document.getElementById("error-fname").innerText = "Fill this field!";
        document.getElementById("error-fname").style.color = "red";
        return false;
    } else if (lname == null || lname == "") {
        document.getElementById("error-lname").innerText = "Fill this field!";
        document.getElementById("error-lname").style.color = "red";

        return false;
    } else if (mail1 == null || mail1 == "") {
        document.getElementById("error-email").innerText = "Fill this field!";
        document.getElementById("error-email").style.color = "red";
        alert("data missed here")
        return false;
    } else if (Message == null || Message == "") {
        document.getElementById("error-msg").innerText = "Fill this field!";
        document.getElementById("error-msg").style.color = "red";

        return false;
    } else {
        var contactsQueries = {
            firstname: fname,
            lastname: lname,
            mail: mail1,
            message: Message
        }
        var data = firebase.database().ref("contacts/").push().set(contactsQueries)
            .then((success) => {
                alert("sent successfuly!")
            })
            .catch((err) => {
                console.error(err);
            });
        document.getElementById("subForm").reset();
        document.getElementById("error-fname").innerText = "";
        document.getElementById("error-lname").innerText = "";
        document.getElementById("error-email").innerText = "";
        document.getElementById("error-msg").innerText = "";
        return true;
    }
}

// Saving data from subscription to database
function subData() {

    var name = document.getElementById("name").value;
    var email = document.getElementById("mail").value;
    if (name == null || name == "") {
        alert("Please ,check your name!")
        return false;
    } else if (email == null || email == "") {
        alert("Please , use valid email address!");
        return false;
    } else {
        var savedData = {
            fullname: name,
            mail: email
        }

        var data = firebase.database().ref("subscribers/").push().set(savedData)
            .then((success) => {})
            .catch((err) => {
                console.error(err);
            });
        document.getElementById("subForm").reset();
        return true;
    }
}