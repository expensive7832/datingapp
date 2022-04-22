import {
  Box,
  Card,
  Grid,
  TextField,
  CardContent,
  Container,
  Typography,
  Avatar,
  Button,
} from "@material-ui/core";
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import "./chat.css";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import Moment from "react-moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Chat = () => {
  const navigate = useNavigate();
  const [im, setIm] = useState("");

  const [clickUser, setClickUser] = useState("");
  const [chat, setChat] = useState([]);

  const [tick, setTick] = useState(false);

  const { id } = useParams();

  const loginUser = JSON?.parse(localStorage?.getItem("userData"));

  useEffect(() => {
    const getMsg = async () => {
      await Axios.post("/chat", {
        loginId: loginUser?._id,
        clickId: id,
      })
        .then((res) => setChat(res?.data?.msg))
        .catch((err) => {
          console.log(err);
        });
    };
    getMsg();
  }, [tick]);

  const getClickUSer = async () => {
    await Axios.post("/clickUser", {
      clickId: id,
    })
      .then((res) => setClickUser(res?.data?.user))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getClickUSer();
  }, [id]);

  const sendMessage = async () => {
    Axios.post("/message/", {
      swipeId: id,
      loginId: loginUser?._id,
      message: im,
    })
      .then((res) => {
        setTick(true);
        if (res?.data?.msg === "newchat") {
          toast.success("You initiated the conversation!!!");
        }
      })
      .catch((e) => {
        console.log(e.message);
      });

    setIm("");
    setTick(false);
  };

  return (
    <div id="chat">
     <Card>
        {!chat ? (
          "No conversation Yet, send a romantic text now!!!"
        ) : (
          <>
            <CardContent>
              <Stack direction="column">
                {chat?.message?.map((e) => (
                  <Box
                    style={{
                      display: "flex",
                      margin: ".4rem 0",
                      justifyContent: `${
                        e?.from === clickUser?._id && "flex-end"
                      }`,
                    }}
                  >
                    <Card
                      style={{
                        display: "flex",
                        color: `${e?.from === clickUser?._id && "#fff"}`,
                        backgroundColor: `${
                          e?.from === clickUser?._id && "pink"
                        }`,
                        width: "14rem",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Avatar
                          src={
                            e?.from === loginUser?._id
                              ? loginUser?.photo
                              : clickUser?.photo
                          }
                          alt="user photo"
                        />
                        <Typography
                        className="text"
                        >
                          {e?.msg}
                        </Typography>
                      </Box>
                      <em style={{ padding: "0 1rem", alignSelf: "flex-end" }}>
                        <Moment fromNow>{e?.time}</Moment>
                      </em>
                    </Card>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </>
        )}
        <>
          <Box className="sendBox">
            <TextField
              fullWidth
              id="filled-basic"
              name="imessage"
              value={im}
              onChange={(e) => setIm(e.target.value)}
              label="Send Message"
              variant="filled"
            />
            <Button
                    style={{
                      backgroundColor: "#d3d3d3",
                      borderRadius: "0 3rem 3rem 0 ",
                      padding: ".6rem",
                    }}
                  >
                    <SendIcon
                      onClick={sendMessage}
                      style={{ justifySelf: "flex-end" }}
                      fontSize="large"
                    />
             </Button>
          </Box>
        </>
      </Card>
    </div>
  );
};

export default Chat;

