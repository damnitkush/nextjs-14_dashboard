import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { authConfig } from "./authconfig"
import { connectToDB } from "./app/lib/utils"
import { Users } from "./app/lib/models"
import bcrypt from "bcrypt"

const login = async(credentials)  => {
  try{
    connectToDB();
    const user = await Users.findOne({username:credentials.username});

    if(!user || !user.isAdmin) throw new Error("Wrong Credentials");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if(!isPasswordCorrect) throw new Error ("Wrong Credentials");

    return user;
  }catch(err){
    console.log(err);
    throw new Error("Failed to login!")
  }
}

const register = async (credentials) => {
  try {
    connectToDB();
    // Check if the user already exists
    const existingUser = await Users.findOne({ username: credentials.username });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(credentials.password, 10);

    // Create a new user
    const newUser = new Users({
      username: credentials.username,
      password: hashedPassword,
      isAdmin: false // Modify this according to your user schema
    });

    // Save the new user to the database
    await newUser.save();

    return newUser;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to register user");
  }
};

export const {signIn, signOut, auth} = NextAuth({
  ...authConfig,
  providers:[
    CredentialsProvider({
      async authorize(credentials){
        try{
          const user = await login(credentials);
          return user;
        }catch(err){
          return null;
        }
      }
    })
  ]
});

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const user = await register(req.body);
      // Redirect the user to the login page after successful registration
      res.writeHead(302, {
        'Location': '/login' // Adjust the path according to your login page URL
      });
      res.end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
