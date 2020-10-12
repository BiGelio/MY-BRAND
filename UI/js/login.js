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

function register() {
    document.querySelector(".register").style.display = "block";
    document.querySelector(".sign-in").style.display = "none";
}

function sign_in() {
    document.querySelector(".register").style.display = "none";
    document.querySelector(".sign-in").style.display = "block";
}


document.getElementById("submit-and-register").addEventListener('click', (event) => {
    event.preventDefault();
    getRegisterValues();
});
document.getElementById("submit-and-login").addEventListener('click', (event) => {
    event.preventDefault();
    getLoginValues();
});
// Register functionalities section
function getRegisterValues() {
    var fullname = document.getElementById("full-name").value;
    var Email = document.getElementById("Email").value;
    var Pass = document.getElementById("Pass").value;
    var confirmpass = document.getElementById("confirm-pass").value;
    if (fullname == null || fullname == "") {
        alert("Check your full name field!");
        return false;
    } else if (Email == null || Email == "") {
        alert("Check your email field!");
        return false;
    } else if (Pass == null || Pass == "") {
        alert("Check your password field!");
        return false;
    } else if (confirmpass == null || confirmpass == "") {
        alert("Check your Re-type password field!");
        return false;
    } else if (Pass.length < 8 || confirmpass.length < 8) {
        alert("password length must be more than 8");
        return false;
    } else if (Pass != confirmpass) {
        alert("Your password mismatch!");
        return false;
    } else {
        console.log(fullname + "" + Pass + "" + Email)
        alert(fullname + "" + Pass + "" + Email);
        saveUser(fullname, Email, Pass);
        return true;
    }
}

function saveUser(fullname, Email, Password) {
    firebase.auth().createUserWithEmailAndPassword(Email, Password)
        .then((response) => {
            var database = firebase.database().ref("users/");
            var createUser = database.push().set({
                full_name: fullname,
                email: firebase.auth().currentUser.email,
                userId: firebase.auth().currentUser.uid
            });
            firebase.auth().signOut();
            full_name = "",
                email = "",
                Password = ""
        }).catch((error) => {
            console.log(error);
        });


}
// Login functionalities section

function getLoginValues() {
    var username = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    if (username == null || username == "" || password == null || password == "") {
        document.getElementById("error-msg").style.display = "block";
        document.getElementById("error-msg").innerText = "Incorrect username or password!";
        document.getElementById("error-msg").style.color = "red";
        return false;
    } else {
        firebase.auth().signInWithEmailAndPassword(username, password).then(() => {
            console.log("Login successfully!")
        }).catch(function(error) {

            console.log("Use valid user name and password!")
            document.getElementById("error-msg").style.display = "block";
            document.getElementById("error-msg").innerText = "User does not exists!";
            document.getElementById("error-msg").style.color = "red";
        });

        document.getElementById("error-msg").style.display = "none";
        document.getElementById("error-msg").innerText = "";
        return true;
    }
}