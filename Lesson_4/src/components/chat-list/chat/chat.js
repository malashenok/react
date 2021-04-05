import {
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
} from "@material-ui/core"
import { AccountCircle } from "@material-ui/icons"
import { format } from "date-fns"
import PropTypes from "prop-types"
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

  static propTypes = {
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
  }

  render() {
    const { selected, title } = this.props

    return (
      <StyledListItem button={true} selected={selected} >
        <ListItemIcon>
          <AccountCircle fontSize="large" className={styles.icon} />
        </ListItemIcon>
        <div className={styles.description}>
          <ListItemText className={styles.text} primary={title} />
          <ListItemText className={styles.text} primary={format(new Date(), " HH:mm")} />
        </div>
      </StyledListItem>
    )
  }
}