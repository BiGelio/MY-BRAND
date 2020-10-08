document.getElementById("subscribe").addEventListener("click", function(event) {
    event.preventDefault()
    subData();
});
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