import {
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
} from "@material-ui/core"
import { AccountCircle } from "@material-ui/icons"
import React, { Component } from "react"

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
    const {
      selected,
      title,
      lastMessage: [msg = {}],
    } = this.props

    const { author = "", message = "", createdTs = "" } = msg ?? {}

    return (
      <StyledListItem button={true} selected={selected}>
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
    )
  }
}
