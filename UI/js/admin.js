// Call functions for display  on dashboard
var eventsListeners = () => {
    document
        .getElementById("manage-users")
        .addEventListener("click", manage_users);
    document.getElementById("subscribe").addEventListener("click", subscribe);
    document.getElementById("queries").addEventListener("click", view_queries);
    document.getElementById("newsletter").addEventListener("click", newsletter);
    document
        .getElementById("manage_posts")
        .addEventListener("click", manage_posts);
    document.getElementById("menu-icon").addEventListener("click", click_me);
    document.getElementById("close").addEventListener("click", click_exit);
    document.getElementById("logout").addEventListener("click", function() {
        localStorage.removeItem('adminToken');
        window.close("admin_panel");
        window.open("login.html");
    });
};
eventsListeners();
// Admin menu  section
function click_me() {
    document.getElementById("model").style.display = "block";
}

function click_exit() {
    document.getElementById("model").style.display = "none";
}
// Section for managing users!
function manage_users() {
    var divs = `<div id="for-users"><table id="users-table"></table></div>`;
    document.getElementById("col-2").innerHTML = divs;
    document.querySelector(".col-1").style.height = "600px";

    // Retrieving users from database
    var table = document.getElementById("users-table");
    // This is row for table header
    var row = table.insertRow(0);
    var cell1 = (row.insertCell(0).innerHTML = ` <th> No </th>`);
    var cell2 = (row.insertCell(1).innerHTML = `<th>Name</th>`);
    var cell3 = (row.insertCell(2).innerHTML = `<th> User type </th>`);
    var cell4 = (row.insertCell(3).innerHTML = `<th>Email</th>`);
    var cell5 = (row.insertCell(4).innerHTML = `<th> Date joined </th>`);
    var cell6 = (row.insertCell(5).innerHTML = `<th>Action</th> `);
    const adminToken = localStorage.getItem('adminToken');
    fetch('https://desolate-bayou-90268.herokuapp.com/api/user', {
        method: 'GET',
        headers: {
            'Accept': 'application/json,text/plain,*/*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`
        }
    }).then(res => res.json()).then((result) => {
        const data = result.docs;
        var i = 0;
        data.forEach((value) => {

            //    Display single user details on one row
            var row = table.insertRow(i + 1);
            var cell1 = (row.insertCell(0).innerHTML = i + 1);
            var cell2 = (row.insertCell(1).innerHTML = value.fullName);
            var cell3 = (row.insertCell(2).innerHTML = value.role);
            var cell4 = (row.insertCell(3).innerHTML = value.email);
            var cell5 = (row.insertCell(4).innerHTML = value.createdAt);
            var cell6 = (row.insertCell(5).innerHTML = `<button style="color:red;" id="${value._id}" onclick="remove_me(this);">Remove</button>`);
            i += 1;
        })
    }).catch((err) => {
        alert("Something went wrong!")
    });



}

// Removing user from database
function remove_me(take) {
    var id = take.getAttribute("id");
    const accessToken = localStorage.getItem('adminToken');
    var x = confirm("Are you sure you want to delete?");
    if (x) {
        const url = 'https: //desolate-bayou-90268.herokuapp.com/api/user/' + id;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
        }).then(res => res.json()).then((result) => {
            alert(result)
        }).catch((err) => {
            console.log(err)
            alert("Something went wrong!")
        });
        manage_users();
        return true;
    } else {
        return false;
    }
}

// subscribers section

function subscribe() {
    var divs = `<div id="for-sub"><table id="subscribers-table"></table></div>`;
    document.getElementById("col-2").innerHTML = divs;
    document.querySelector(".col-1").style.height = "600px";

    // Retrieving subscribers from database
    var table = document.getElementById("subscribers-table");
    // This is row for table header
    var row = table.insertRow(0);
    var cell1 = (row.insertCell(0).innerHTML = ` <th> No </th>`);
    var cell2 = (row.insertCell(1).innerHTML = `<th>Name</th>`);
    var cell3 = (row.insertCell(2).innerHTML = `<th>Email</th>`);
    var cell4 = (row.insertCell(3).innerHTML = `<th> Date subscribed </th>`);

    firebase
        .database()
        .ref("subscribers/")
        .on("value", (sub) => {
            var all_users = sub.val();
            var data_key = Object.keys(all_users);
            for (var i = 0; i < data_key.length; i++) {
                var k = data_key[i];
                var myUsername = all_users[k].fullname;
                var myEmail = all_users[k].mail;
                var createdAt = all_users[k].createdAt;

                //    Display single user details on one row
                var row = table.insertRow(i + 1);
                var cell1 = (row.insertCell(0).innerHTML = i + 1);
                var cell2 = (row.insertCell(1).innerHTML = myUsername);
                var cell3 = (row.insertCell(2).innerHTML = myEmail);
                var cell4 = (row.insertCell(3).innerHTML = createdAt);
            }
        });
}

// Queries section
function view_queries() {
    var divs = `<div id="for-queries"><table id="queries-table"></table></div>`;
    document.getElementById("col-2").innerHTML = divs;
    document.querySelector(".col-1").style.height = "600px";

    // Retrieving queries from database
    var table = document.getElementById("queries-table");
    // This is row for table header
    var row = table.insertRow(0);
    var cell1 = (row.insertCell(0).innerHTML = ` <th> No </th>`);
    var cell2 = (row.insertCell(1).innerHTML = `<th>Name</th>`);
    var cell3 = (row.insertCell(2).innerHTML = `<th>Email</th>`);
    var cell3 = (row.insertCell(3).innerHTML = `<th>Message</th>`);
    var cell5 = (row.insertCell(4).innerHTML = `<th> Date received </th>`);
    var cell = (row.insertCell(5).innerHTML = `<th> Action </th>`);
    fetch('https://desolate-bayou-90268.herokuapp.com/api/query', {
        method: 'GET',
        headers: {
            'Accept': 'application/json,text/plain,*/*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
    }).then(res => res.json()).then((result) => {
        console.log(result)
        const data = result.docs;
        var i = 0;
        data.forEach((data) => {

            //    Display single arti details on one row
            var row = table.insertRow(i + 1);
            var cell1 = (row.insertCell(0).innerHTML = i + 1);
            var cell2 = (row.insertCell(1).innerHTML = data.fullName);
            var cell3 = (row.insertCell(2).innerHTML = data.email);
            var cell4 = (row.insertCell(3).innerHTML = data.Message);
            var cell5 = (row.insertCell(4).innerHTML = data.createdAt);
            var cell6 = (row.insertCell(5).innerHTML = `<button style="color:red;" id="${data._id}" onclick="remove_me(this);">Remove</button>`);
            i += 1;
        })
    }).catch((err) => {
        alert("Something went wrong!")
    });
}

// newsletters section
function newsletter() {
    var divs = `<div class="newsletter"> <button class="news" onclick="newsletter();"> Create news </button id="old">
    <button class="news" onclick="old_news();"> View old news</button> <form id="newsForm">
  <select style="padding:10px;" id="options"> </select>
    <textarea rows ="10"columns="50"
placeholder="Type news here..." style="padding:15px;" id="newstext"> </textarea> 
<input type="submit" value="send" onclick="sendNews(event);"></form></div>`;
    document.getElementById("col-2").innerHTML = divs;
    document.querySelector(".col-1").style.height = "600px";

    var getParentel = document.getElementById("options");

    firebase
        .database()
        .ref("subscribers/")
        .on("value", (subs) => {
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
    var divs = `<div class="newsletter"> <button class="news" onclick="newsletter();"> Create news </button>
    <button id="old" class="news" onclick="old_news();"> View old news</button> 
    <table id="for-newsletter"> </table></div>`;
    document.getElementById("col-2").innerHTML = divs;
    document.querySelector(".col-1").style.height = "600px";

    var table = document.getElementById("for-newsletter");
    // This is row for table header
    var row = table.insertRow(0);
    var cell1 = (row.insertCell(0).innerHTML = ` <th> No </th>`);
    var cell2 = (row.insertCell(1).innerHTML = `<th>Message</th>`);
    var cell3 = (row.insertCell(2).innerHTML = `<th>Received by</th>`);
    var cell4 = (row.insertCell(3).innerHTML = `<th>Date sent</th>`);

    firebase
        .database()
        .ref("newsletter/")
        .on("value", (news) => {
            var all_users = news.val();
            var data_key = Object.keys(all_users);
            for (var i = 0; i < data_key.length; i++) {
                var k = data_key[i];
                var message = all_users[k].message;
                var receiver = all_users[k].receiver;
                var dateTime = all_users[k].createdAt;
                //    Display single query details on one row
                var row = table.insertRow(i + 1);
                var cell1 = (row.insertCell(0).innerHTML = i + 1);
                var cell2 = (row.insertCell(1).innerHTML = message);
                var cell3 = (row.insertCell(2).innerHTML = receiver);
                var cell6 = (row.insertCell(5).innerHTML = dateTime);
            }
        });
}

// document.getElementById("send").addEventListener('click', sendNews);

function sendNews(event) {
    event.preventDefault();
    const Message = document.getElementById("newstext").value;
    const Receiver = document.getElementById("options").value;
    if (Receiver == null || Receiver == "") {
        alert("Please, choose receiver!")
        return false;
    } else if (Message == null || Message == "") {
        alert("Please,Add news!");
        return false;
    } else {
        firebase
            .database()
            .ref("newsletter/")
            .push()
            .set({
                message: Message,
                receiver: Receiver,
                createdAt: Date(Date.now()),
            })
            .then(() => {
                alert("News sent successfully!")
            })
            .catch(() => alert("Request to send news failed! try again!"));
        document.getElementById("newsForm").reset();
        return true;
    }
}

//This is posts management section
function manage_posts() {
    var divs = `  <div class="col-3" id="col-3">
    <button class="btn" id="create" onclick="manage_posts();">Create post</button>
    <button class="btn" id="view" onclick="retrieve_posts();">View posts</button>
    <h2>Create new post here.</h2>
    <form action="" name="myform" id="myform">
        <label id="titleLabel">Title</label><br>
        <input type="text" name="title" id="title" placeholder="title"><br>
        <span id="err-title"></span><br>
        <input type="file" name="image" id="file" accept="image/*">
        <span id="err-file"></span><br>
        <label id="textareaLabel"> Post description</label><br>
        <textarea name="textarea" id="postTextarea" cols="30" rows="10" placeholder="Description........."></textarea><br>
        <span id="err-text"></span><br>
        <input type="submit" value="post" onclick="savePosts(event);">
    </form>
</div>`;
    document.getElementById("col-2").innerHTML = divs;
    document.querySelector(".col-1").style.height = "600px";
}
// Section for saving a posts to database

function savePosts(event) {
    event.preventDefault()
    var title = document.getElementById("title").value;
    var description = document.getElementById("postTextarea").value;
    // Validation for emptytring andull value
    if (title == null || title == "") {
        var errTitle = document.getElementById("err-title");
        errTitle.style.display = "block";
        errTitle.innerHTML = "Add title please!";
        errTitle.style.color = "red"
        return false;
    } else if (description == null || description == "") {
        var errText = document.getElementById("err-text");
        errText.style.display = "block";
        errText.innerHTML = "Add description please!";
        errText.style.color = "red"
        return false;
    } else {
        const adminToken = localStorage.getItem('adminToken')
        fetch('https://desolate-bayou-90268.herokuapp.com/api/article', {
            method: 'POST',
            headers: {
                'Accept': 'application/json,text/plain,*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminToken}`
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        }).then(res => res.json()).then((result) => {
            alert(result.Message);
        }).catch((err) => {
            alert("Something went wrong!")
        });
    }
}
// Section for retrieving posts !
function retrieve_posts() {
    var divs = `  <div class="col-3" id="col-3">
    <button class="btn" id="create" onclick="manage_posts();">Create post</button>
    <button class="btn" id="view" onclick="retrieve_posts();">View posts</button>
  <table id="postsTable"></table>
</div>`;
    document.getElementById("col-2").innerHTML = divs;
    document.querySelector(".col-1").style.height = "600px";
    // Retrieving posts from database
    var table = document.getElementById("postsTable");
    // This is row for table header
    var row = table.insertRow(0);
    var cell1 = (row.insertCell(0).innerHTML = ` <th> No </th>`);
    var cell2 = (row.insertCell(1).innerHTML = `<th>Title</th>`);
    var cell3 = (row.insertCell(2).innerHTML = `<th>Description </th>`);
    var cell4 = (row.insertCell(3).innerHTML = `<th>Date created</th>`);
    var cell5 = (row.insertCell(4).innerHTML = `<th>Actions</th> `);

    fetch('https://desolate-bayou-90268.herokuapp.com/api/article', {
        method: 'GET',
        headers: {
            'Accept': 'application/json,text/plain,*/*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
    }).then(res => res.json()).then((result) => {
        var i = 0;

        result.forEach((value) => {
            /**    Display single user details on one row*/
            var row = table.insertRow(i + 1);
            var cell1 = (row.insertCell(0).innerHTML = i + 1);
            var cell2 = (row.insertCell(1).innerHTML = value.title);
            var cell3 = (row.insertCell(2).innerHTML = value.description);
            var cell4 = (row.insertCell(3).innerHTML = value.createdAt);
            var cell5 = (row.insertCell(4).innerHTML = `<button style="color:blue;" id="${value._id}" onclick="edit_post(this);">Edit</button><button style="color:blue;" id="${value._id}" onclick="remove_post(this);">Delete</button>`);
            i += 1;
        })
    }).catch((err) => {
        alert("Something went wrong!");
    });
}

function edit_post(take) {
    var attr = take.getAttribute("id");
    firebase
        .database()
        .ref("posts/")
        .on("value", (post) => {
            var all_posts = post.val();
            var data_key = Object.keys(all_posts);
            for (var i = 0; i < data_key.length; i++) {
                var ke = data_key[i];
                if (attr == ke) {
                    var title = all_posts[ke].Title;
                    var description = all_posts[ke].Description;
                    var divs = ` < div class = "col-3"
                id = "col-3" >
                    <
                    button class = "btn"
                id = "create"
                onclick = "manage_posts();" > Create post < /button> <
                    button class = "btn"
                id = "view"
                onclick = "retrieve_posts();" > View posts < /button> <
                    h2 > Create new post here. < /h2> <
                    form action = ""
                name = "myform"
                id = "myform" >
                    <
                    label id = "titleLabel" > Title < /label><br> <
                    input type = "text"
                name = "title"
                id = "title"
                value = "${title}"
                placeholder = "title" > < br >
                    <
                    span id = "err-title" > < /span><br> <
                    input type = "file"
                name = "image"
                id = "file"
                accept = "image/*" >
                    <
                    span id = "err-file" > < /span><br> <
                    label id = "textareaLabel" > Post description < /label><br> <
                    textarea name = "textarea"
                id = "postTextarea"
                cols = "30"
                rows = "10"
                value = "${description}"
                placeholder = "Description........." > < /textarea><br> <
                    span id = "err-text" > < /span><br> <
                    input type = "submit"
                value = "post"
                onclick = "saveUpdate(event,attr);" >
                    <
                    /form> <
                    /div>`;
                    document.getElementById("col-2").innerHTML = divs;
                    document.querySelector(".col-1").style.height = "600px";
                }


            }
        });

}

function saveUpdate(event, attr) {
    event.preventDefault();
    firebase.database().ref("posts/" + attr).update({ Title: title, Description: description })
        .then(done => alert("Updated successfully!"))
        .catch(err => alert("Failed to update!"))
}

function remove_post(take) {
    var id = take.getAttribute("id");
    var x = confirm("Are you sure you want to delete?");
    if (x) {
        const url = 'https: //desolate-bayou-90268.herokuapp.com/api/article/' + id;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
        }).then(res => res.json()).then((result) => {
            alert(result)
        }).catch((err) => {
            console.log(err)
            alert("Something went wrong!")
        });
        retrieve_posts();
        return true;
    } else {
        return false;
    }
}
// Visitors management section
document.getElementById("visitors").addEventListener('click', manage_visitors);

function manage_visitors() {
    var divs = `<div id="for-visitors"><table id="visitors-table"></table></div>`;
    document.getElementById("col-2").innerHTML = divs;
    document.querySelector(".col-1").style.height = "600px";

    // Retrieving visitors from database
    var table = document.getElementById("visitors-table");
    // This is row for table header
    var row = table.insertRow(0);
    var cell1 = (row.insertCell(0).innerHTML = ` <th> No </th>`);
    var cell2 = (row.insertCell(1).innerHTML = `<th>latitude</th>`);
    var cell3 = (row.insertCell(2).innerHTML = `<th> longitude</th>`);
    var cell4 = (row.insertCell(3).innerHTML = `<th> Date visited </th>`);

    firebase
        .database()
        .ref("VisitorsLocation/")
        .on("value", (visitor) => {
            var all_visitors = visitor.val();
            var data_key = Object.keys(all_visitors);
            for (var i = 0; i < data_key.length; i++) {
                var k = data_key[i];
                var latitude = all_visitors[k].Latitude;
                var longitude = all_visitors[k].longitude;
                var createdAt = all_visitors[k].date;

                //    Display single user details on one row
                var row = table.insertRow(i + 1);
                var cell1 = (row.insertCell(0).innerHTML = i + 1);
                var cell2 = (row.insertCell(1).innerHTML = latitude);
                var cell3 = (row.insertCell(2).innerHTML = longitude);
                var cell4 = (row.insertCell(3).innerHTML = createdAt);
            }
        });
}