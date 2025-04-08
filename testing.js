import jwt from "jsonwebtoken";

const User = {
    name:"Rocky",
    email:"rocky@gmail.com",
    id:"Rs123"
};

const encUser = jwt.sign(User, "Rocky");
const decoded = jwt.verify(encUser, "Rocky");
console.log(encUser)
console.log("decoded User", decoded)

