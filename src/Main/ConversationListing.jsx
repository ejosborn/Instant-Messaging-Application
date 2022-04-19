import React from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import "./conversation.scss"
import { baseUrl } from "../constants";

const ConversationListings = (props) => {
  const { conversations, user_id } = props;

  const navigate = useNavigate();

  return (
    <div className="listing-container">
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {conversations.map((conversation) => (
          <React.Fragment key={conversation.conversation_id}>
            <ListItem alignItems="flex-start" className="conversation" onClick={() => navigate(`/conversation/${conversation.conversation_id}`)}>
              {conversation.unread && <div className={"unread"} />}
              <ListItemAvatar>
                <Avatar
                  alt={conversation.name}
                  src={conversation.users.length == 1 ? `${baseUrl}/profile/${conversation.users[0].user_id}/picture` : ""}
                />
              </ListItemAvatar>
              <ListItemText
                primary={conversation.name}
                secondary={
                  <React.Fragment>
                    {conversation?.users?.filter(u => u.user_id !== user_id).map((user, idx, convs) => (
                      <Typography
                        className="users-label"
                        sx={{ display: "inline" }}
                        component="span"
                        variant="caption"
                        key={user.user_id}
                      >
                        {user.name}
                        {idx < convs.length - 1 ? ", " : ""}
                      </Typography>
                    ))}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" className={conversation.unread ? "extra-divider" : ""} />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default ConversationListings;
