import classNames from "classnames"
import React, { Component } from "react"
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu"
import styles from "./message.module.css"
import "./react-contextmenu.css"

const attributes = {
  className: "custom-root",
  disabledclassname: "custom-disabled",
  dividerclassname: "custom-divider",
  selectedclassname: "custom-selected",
}

export class Message extends Component {
  render() {
    const {
      id,
      delMessage,
      msg: { message, author, createdTs },
    } = this.props

    return (
      <>
        <div
          className={classNames(styles.message, {
            [styles.user]: author === "User",
          })}
        >
          <ContextMenuTrigger id={createdTs}>
            <h3>{author}</h3>
            <p>{message}</p>
            <p>{createdTs}</p>
          </ContextMenuTrigger>
        </div>

        <ContextMenu id={createdTs}>
          <MenuItem
            data={{ action: "delete" }}
            onClick={() => {
              delMessage({
                id,
                message,
                createdTs,
              })
            }}
            attributes={attributes}
          >
            Удалить
          </MenuItem>
        </ContextMenu>
      </>
    )
  }
}
