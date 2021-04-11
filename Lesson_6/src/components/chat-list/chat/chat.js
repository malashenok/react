import {
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
} from "@material-ui/core"
import { AccountCircle } from "@material-ui/icons"
import classnames from "classnames"
import React, { Component } from "react"
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"
import styles from "./chat.module.css"
const StyledListItem = withStyles(() => ({
  root: {
    "&": {
      borderRadius: 5,
    },
    "&.Mui-selected": {
      backgroundColor: "#2b5278",
    },
    "&.Mui-selected:hover": {
      backgroundColor: "#2b5278",
    },
  },
}))(ListItem)

export class Chat extends Component {
  render() {
    const { selected, title, lastMessage, delChat, onClick } = this.props

    const { author = "", message = "", createdTs = "" } = lastMessage ?? {}

    return (
      <div>
        <ContextMenuTrigger id={title}>
          <StyledListItem
            button={true}
            selected={selected}
            // if last message author is bot then blink
            className={classnames({
              [styles.blink]: author === "bot",
            })}
            onClick={() => {
              onClick()
            }}
          >
            <ListItemIcon>
              <AccountCircle fontSize="large" className={styles.icon} />
            </ListItemIcon>
            <div className={styles.description}>
              <ListItemText className={styles.text} primary={title} />
              <ListItemText
                className={styles.text}
                primary={author && message ? author + " - " + message : ""}
              />
              <ListItemText className={styles.text} primary={createdTs} />
            </div>
          </StyledListItem>
        </ContextMenuTrigger>
        <ContextMenu id={title}>
          <MenuItem
            data={{ action: "delete" }}
            onClick={() => {
              delChat(title)
            }}
          >
            Удалить
          </MenuItem>
        </ContextMenu>
      </div>
    )
  }
}
