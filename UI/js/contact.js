// Saving data for queries and question to database
function submitData() {

    const fullName = document.getElementById("fname").value;
    const email = document.getElementById("email").value;
    const Message = document.getElementById("msg").value;

    if (fullName == null || fullName == "") {
        document.getElementById("error-fname").innerText = "Fill this field!";
        document.getElementById("error-fname").style.color = "red";
        return false;
    } else if (email == null || email == "") {
        document.getElementById("error-email").innerText = "Fill this field!";
        document.getElementById("error-email").style.color = "red";
        alert("Data missed here")
        return false;
    } else if (Message == null || Message == "") {
        document.getElementById("error-msg").innerText = "Fill this field!";
        document.getElementById("error-msg").style.color = "red";

        return false;
    } else {
        const contactsQueries = {
            fullName: fullName,
            email: email,
            Message: Message
        }
        fetch('https://desolate-bayou-90268.herokuapp.com/api/query', {
            method: 'POST',
            headers: {
                'Accept': 'application/json,text/plain,*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactsQueries)
        }).then(res => res.json()).then((result) => {
            if (result.token == 'undefined') {
                const getResult = () => {
                    alert(result.Message)
                }
                return getResult;
            }
            localStorage.setItem('userToken', result.token);
            alert(result.Message)

        }).catch((err) => {
            console.log(err);

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
            mail: email,
            createdAt: Date(Date.now())
        }


        document.getElementById("subForm").reset();
        return true;
    }
}