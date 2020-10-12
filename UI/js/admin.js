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

// Call functions for display  on dashboard
document.getElementById("manage-users").addEventListener('click', manage_users);
document.getElementById("subscribe").addEventListener('click', subscribe);
document.getElementById("queries").addEventListener('click', view_queries);
document.getElementById("newsletter").addEventListener('click', newsletter);
document.getElementById("manage-users").addEventListener('click', manage_users);

function manage_users() {
    var divs = `<div id="for-users"><table id="users-table"></table></div>`
    document.getElementById("col-2").innerHTML = divs;
    document.querySelector(".col-1").style.height = "600px";

    // Retrieving users from database
    var table = document.getElementById("users-table");
    // This is row for table header
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0).innerHTML = ` <th> No </th>`;
    var cell2 = row.insertCell(1).innerHTML = `<th>Name</th>`;
    var cell3 = row.insertCell(2).innerHTML = `<th> Profile picture </th>`;
    var cell4 = row.insertCell(3).innerHTML = `<th>Email</th>`;
    var cell5 = row.insertCell(4).innerHTML = `<th> Date joined </th>`;
    var cell6 = row.insertCell(5).innerHTML = `<th>Action</th> `;

    firebase.database().ref("users/").on('value', (user) => {
        var all_users = user.val();
        var data_key = Object.keys(all_users);
        for (var i = 0; i < data_key.length; i++) {
            var k = data_key[i];
            var myUsername = all_users[k].full_name;
            var myEmail = all_users[k].email;
            var myPass = all_users[k].userId;
            var createdAt = all_users[k].createdAt;

            //    Display single user details on one row 
            var row = table.insertRow(i + 1);
            var cell1 = row.insertCell(0).innerHTML = i + 1;
            var cell2 = row.insertCell(1).innerHTML = myUsername;
            var cell3 = row.insertCell(2).innerHTML = "my image";
            var cell4 = row.insertCell(3).innerHTML = myEmail;
            var cell5 = row.insertCell(4).innerHTML = createdAt;
            var cell6 = row.insertCell(5).innerHTML = `<button style="color:red;" id="${k}" onclick="remove_me(this);">Remove</button>`;


        }

    });
}

// Removing user from database
function remove_me(take) {
    var valu = take.getAttribute("id");
    console.log(valu)
    firebase.database().ref("users/" + valu).remove();
}

// subscribers section

function subscribe() {
    var divs = `<div id="for-sub"><table id="subscribers-table"></table></div>`
    document.getElementById("col-2").innerHTML = divs;
    document.querySelector(".col-1").style.height = "600px";

    // Retrieving subscribers from database
    var table = document.getElementById("subscribers-table");
    // This is row for table header
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0).innerHTML = ` <th> No </th>`;
    var cell2 = row.insertCell(1).innerHTML = `<th>Name</th>`;
    var cell3 = row.insertCell(2).innerHTML = `<th>Email</th>`;
    var cell4 = row.insertCell(3).innerHTML = `<th> Date subscribed </th>`;

    firebase.database().ref("subscribers/").on('value', (sub) => {
        var all_users = sub.val();
        var data_key = Object.keys(all_users);
        for (var i = 0; i < data_key.length; i++) {
            var k = data_key[i];
            var myUsername = all_users[k].fullname;
            var myEmail = all_users[k].mail;
            var createdAt = all_users[k].createdAt;

            //    Display single user details on one row 
            var row = table.insertRow(i + 1);
            var cell1 = row.insertCell(0).innerHTML = i + 1;
            var cell2 = row.insertCell(1).innerHTML = myUsername;
            var cell3 = row.insertCell(2).innerHTML = myEmail;
            var cell4 = row.insertCell(3).innerHTML = createdAt;
        }

    });
}

// Queries section
function view_queries() {
    var divs = `<div id="for-queries"><table id="queries-table"></table></div>`
    document.getElementById("col-2").innerHTML = divs;
    document.querySelector(".col-1").style.height = "600px";

    // Retrieving queries from database
    var table = document.getElementById("queries-table");
    // This is row for table header
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0).innerHTML = ` <th> No </th>`;
    var cell2 = row.insertCell(1).innerHTML = `<th>First name</th>`;
    var cell2 = row.insertCell(2).innerHTML = `<th>Last name</th>`;
    var cell3 = row.insertCell(3).innerHTML = `<th>Email</th>`;
    var cell3 = row.insertCell(4).innerHTML = `<th>Message</th>`;
    var cell5 = row.insertCell(5).innerHTML = `<th> Date received </th>`;

    firebase.database().ref("contacts/").on('value', (queries) => {
        var all_users = queries.val();
        var data_key = Object.keys(all_users);
        for (var i = 0; i < data_key.length; i++) {
            var k = data_key[i];
            var myFirstname = all_users[k].firstname;
            var myLastname = all_users[k].lastname;
            var myEmail = all_users[k].mail;
            var myMessage = all_users[k].message;
            var datet = all_users[k].createdAt;

            //    Display single query details on one row 
            var row = table.insertRow(i + 1);
            var cell1 = row.insertCell(0).innerHTML = i + 1;
            var cell2 = row.insertCell(1).innerHTML = myFirstname;
            var cell3 = row.insertCell(2).innerHTML = myLastname;
            var cell4 = row.insertCell(3).innerHTML = myEmail;
            var cell5 = row.insertCell(4).innerHTML = myMessage;
            var cell6 = row.insertCell(5).innerHTML = datet;
        }

    });
}

// newsletters section
function newsletter() {
    var divs = `<div class="newsletter"> <button class="news" onclick="newsletter();"> Create news </button id="old"><button class="news"> View old news</button> <form>
    <select style="padding:10px;" id="options"> </select>
    <textarea rows ="10"columns="50"
placeholder="Type news here..." style="padding:15px;" id="newstext"> </textarea> 
<input type="submit" value="send" id="send"></form></div>`
    document.getElementById("col-2").innerHTML = divs;
    document.querySelector(".col-1").style.height = "600px";

    var getParentel = document.getElementById("options");

    firebase.database().ref("subscribers/").on('value', (subs) => {
        var all_users = subs.val();
        var data_key = Object.keys(all_users);
        for (var i = 0; i < data_key.length; i++) {
            var k = data_key[i];
            var myEmail = all_users[k].mail;
            var ne = document.createElement("OPTION");
            ne.innerHTML = myEmail;
            getParentel.appendChild(ne);
        }

    });
}


function old_news() {
    var divs = `<div class="newsletter"> <button class="news" onclick="newsletter();"> Create news </button><button id="old" class="news"> View old news</button> 
    <table id="for-newsletter"> </table></div>`
    document.getElementById("col-2").innerHTML = divs;
    document.querySelector(".col-1").style.height = "600px";

    var table = document.getElementById("for-newsletter");
    // This is row for table header
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0).innerHTML = ` <th> No </th>`;
    var cell2 = row.insertCell(1).innerHTML = `<th>Message</th>`;
    var cell2 = row.insertCell(2).innerHTML = `<th>Received by</th>`;
    var cell3 = row.insertCell(3).innerHTML = `<th>Date created</th>`;


    firebase.database().ref("newsletter/").on('value', (news) => {
        var all_users = news.val();
        var data_key = Object.keys(all_users);
        for (var i = 0; i < data_key.length; i++) {
            var k = data_key[i];
            var message = all_users[k].message;
            var receiver = all_users[k].receiver;
            var datet = all_users[k].createdAt;
            //    Display single query details on one row 
            var row = table.insertRow(i + 1);
            var cell1 = row.insertCell(0).innerHTML = i + 1;
            var cell2 = row.insertCell(1).innerHTML = message;
            var cell3 = row.insertCell(2).innerHTML = receiver;
            var cell6 = row.insertCell(5).innerHTML = datet;
        }

    });
}

document.getElementById("send").addEventListener('click', sendNews);

function sendNews() {
    firebase.database().ref("newsletter/").push().set({
            message: document.getElementById("options").value,
            receiver: document.getElementById("newstext").value,
            createdAt: Date(Date.now())
        })
        .then((res) => {
            console.log(res)
        });
}