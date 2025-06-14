import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const APIkey = "3df068b01b6e8123f4a77cbaff89bd6c";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",  (req, res) => {
  
    res.render("index.ejs");
  
});

app.post("/", async (req,res)=>{
    console.log(req.body);
    const { type } = req.body; 
    const [lat, lon] = type.split(',');
    console.log(req.body.type);
    try{
        const response  = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`)
    
    const result = response.data;
    console.log(result);
    res.render("index.ejs",{data:result});
    }
    catch (error) {
        console.error("Failed to make request:");
        res.render("index.ejs");
    }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
  

