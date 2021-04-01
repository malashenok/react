import PropTypes from "prop-types"
import React, { Component } from "react"
import { Container, Grid } from '@material-ui/core'
import styles from "./layout.module.css"

export class Layout extends Component {
  static propTypes = {
    messages: PropTypes.node.isRequired,
    chats: PropTypes.node.isRequired,
    header: PropTypes.node.isRequired,
  }

  render() {
    const { header, chats, messages } = this.props
    return (
      <Container maxWidth="lg" className={styles.root}>
        <Grid container spacing={3}>
          <Grid item lg={12}>
            {header}
          </Grid>
          <Grid item lg={4}>
            {chats}
          </Grid>
          <Grid item lg={8}>
            {messages}
          </Grid>
        </Grid>
      </Container>
    )
  }
}