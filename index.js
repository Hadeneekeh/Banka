import express from 'express';
import bodyParser from 'body-parser';


const app = express();

const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.listen(port, () => console.log(`Server is running on PORT ${port}`));