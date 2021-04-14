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
import "./react-contextmenu.css"

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

const attributes = {
  className: "custom-root",
  disabledclassname: "custom-disabled",
  dividerclassname: "custom-divider",
  selectedclassname: "custom-selected",
}

export class Chat extends Component {
  componentDidMount() {
    this.props.getProfileByUserName("bot")
  }

  render() {
    const {
      selected,
      title,
      lastMessage,
      delChat,
      handleNavigate,
      addChat,
    } = this.props

    const { author = "", message = "", createdTs = "" } = lastMessage ?? {}

    return (
      <div>
        <ContextMenuTrigger id={title}>
          <StyledListItem
            button={true}
            selected={selected}
            className={classnames({
              [styles.blink]: author === "bot",
            })}
            onClick={handleNavigate}
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
            data={{ action: "add" }}
            onClick={() => {
              addChat()
            }}
            attributes={attributes}
          >
            Добавить
          </MenuItem>

          <MenuItem
            data={{ action: "delete" }}
            onClick={() => {
              delChat(title)
            }}
            attributes={attributes}
          >
            Удалить
          </MenuItem>
        </ContextMenu>
      </div>
    )
  }
}
