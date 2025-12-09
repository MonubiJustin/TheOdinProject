import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const assetsPath = path.join(__dirname, "public")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.static(assetsPath));
app.use(express.urlencoded({extended: true}))

const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
]

const links = [
    { href: "/", text: "Home" },
    {href: "/new", text: "Add Message"}
]

app.get("/", (req, res) => {
    res.render("index", {title: "Mini Messageboard", messages, links})
})

app.get("/new", (req, res) => {
    res.render("form", {title: "Messaging Form", links});
})

app.get("/message/:id", (req, res) => {
    const id = parseInt(req.params.id);
   const {user, text, added} = messages[id]
    res.render("message", {user, text, added})
})

app.post("/new", (req, res) => {
    const { name, message: msg } = req.body;
    const message = {
        text: msg,
        user: name,
        added: new Date()
    }
    messages.push(message);
    res.redirect("/")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));