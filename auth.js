const fs = require("fs");
const bcrypt = require("bcrypt");

const usersFile = "users.json";
let users = [];

if(fs.existsSync(usersFile)){
    users = JSON.parse(fs.readFileSync(usersFile,"utf8"));
}
//1.step always existence check
//2.adding user => so get the username , password => hash the password => push => write to json
//3.just checking whether there or not
function register(username,password){
    if(users.find(u=>u.username===username)){
        console.log("Username already exists , Please choose another");
        return;
    }

    const hashedPassword = bcrypt.hashSync(password,10);

    const newUser = {username,password:hashedPassword};

    users.push(newUser);
    fs.writeFileSync(usersFile,JSON.stringify(users,null,4));

    console.log("User registered successfully");
}

function authenticate(username,password){
    const user = users.find(u=>u.username===username);
    if(user && bcrypt.compareSync(password,user.password)){
        console.log("Login successfull");
        return user;
    }
    else{
        console.log("Invalid credentials");
    }
}
register("Pratheesha","123");
authenticate("john_doe","password123");
