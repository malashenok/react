import classNames from "classnames"
import PropTypes from "prop-types"
import React, { Component } from "react"
import styles from "./message.module.css"

export class Message extends Component {
  static propTypes = {
    msg: PropTypes.shape({
      author: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      createdTs: PropTypes.string.isRequired
    }),
  }

  render() {
    const { msg: { message, author, createdTs } } = this.props

    return (
      <div className={classNames(styles.message, {
        [styles.user]: author === "User",
      })}>
        <h3>{author}</h3>
        <p>{message}</p>
        <p>{createdTs}</p>
      </div>
    )
  }
}