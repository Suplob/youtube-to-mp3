import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import {
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

function App() {
  const [id, setId] = useState("e5HfCcII84M");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const PRIVATE_KEY = "800ca2c1fcmsh9ca9f6652222ee2p1533b1jsn3032f3627602";
  const API_HOST = "youtube-mp36.p.rapidapi.com";

  const handleFetch = () => {
    setLoading(true);

    axios
      .get(`https://youtube-mp36.p.rapidapi.com/dl?id=${id}`, {
        headers: {
          "x-rapidapi-key": PRIVATE_KEY,
          "x-rapid-api-host": API_HOST,
        },
      })
      .then((res) => {
        setData(res.data);
        setLoading(null);
        console.log(res.data);
      });
  };

  return (
    <Container>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Youtube Video To mp3 converter
      </Typography>
      <Box sx={{ mt: 4 }}>
        <TextField
          id="outlined-basic"
          label="Enter Youtube Video id"
          variant="outlined"
          sx={{ width: "100%" }}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
      </Box>
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleFetch}>
        Convert
      </Button>
      {loading ? (
        <Box>
          <CircularProgress sx={{ mt: 5 }} />
        </Box>
      ) : loading === null ? (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">{data.title}</Typography>
          <Button variant="contained" sx={{ mt: 1 }}>
            <a
              href={data.link}
              style={{ color: "white", textDecoration: "none" }}
            >
              Download mp3 converted
            </a>
          </Button>
        </Box>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default App;
