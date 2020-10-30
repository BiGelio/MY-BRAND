// var firebaseConfig = {
//     apiKey: "AIzaSyCM1FMDqbdssTMN2k7ZWr96oK-2FIA2qpE",
//     authDomain: "new-app-43895.firebaseapp.com",
//     databaseURL: "https://new-app-43895.firebaseio.com",
//     projectId: "new-app-43895",
//     storageBucket: "new-app-43895.appspot.com",
//     messagingSenderId: "412332630016",
//     appId: "1:412332630016:web:e70fabc4c9b8b6a2e438e5"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

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
    var fullName = document.getElementById("full-name").value;
    var Email = document.getElementById("Email").value;
    var Pass = document.getElementById("Pass").value;
    var confirmpass = document.getElementById("confirm-pass").value;
    if (fullName == null || fullName == "") {
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
        console.log(fullName + "" + Pass + "" + Email)
        alert(fullName + "" + Pass + "" + Email);
        saveUser(fullName, Email, Pass, confirmpass);
        return true;
    }
}

function saveUser(fullName, Email, Password, confirmpass) {
    fetch('https://desolate-bayou-90268.herokuapp.com/api/user', {
        method: 'POST',
        headers: {
            'Accept': 'application/json,text/plain,*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fullName: fullName,
            email: Email,
            password: Password,
            confirmPassword: confirmpass
        })
    }).then(res => res.json()).then((result) => {
        console.log(result)
        if (result.token !== "undefined") {
            localStorage.setItem('userToken', result.token);
            alert(result.Message);
        }
        alert(result.Message);
    }).catch((err) => {
        alert("Something went wrong!")
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
        fetch('https://desolate-bayou-90268.herokuapp.com/api/user/loginUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json,text/plain,*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: username,
                password: password
            })
        }).then(res => res.json()).then((result) => {
            if (result.Role == "Admin" && result.token !== "undefined") {
                localStorage.setItem('adminToken', result.token);
                window.open("admin_panel.html")
            } else if (result.Role == "member" && result.token !== "undefined") {
                localStorage.setItem('userToken', result.token);
                window.open("index.html");
            } else if (result.token == 'undefined') {
                const getResult = () => {
                    alert(result.Message)
                }
                return getResult;
            } else {
                document.getElementById("error-msg").style.display = "block";
                document.getElementById("error-msg").innerText = "User does not exists!";
                document.getElementById("error-msg").style.color = "red";
            }
        }).catch((err) => {
            alert("Something went wrong!");

        });

        document.getElementById("error-msg").style.display = "none";
        document.getElementById("error-msg").innerText = "";
        return true;
    }
}