import { Container, Grid } from '@material-ui/core'
import PropTypes from "prop-types"
import React, { Component } from "react"
import styles from "./layout.module.css"

export class Layout extends Component {
  static propTypes = {
    chats: PropTypes.node.isRequired,
    header: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired
  }

  render() {
    const { header, chats, children } = this.props
    return (
      <Container maxWidth="lg" className={styles.root}>
        <Grid container={true} spacing={3}>
          <Grid item={true} xs={12} sm={12} md={12} lg={12}>
            {header}
          </Grid>
          <Grid item={true} xs={4} sm={4} md={4} lg={4}>
            {chats}
          </Grid>
          <Grid item={true} xs={8} sm={8} md={8} lg={8}>
            {children}
          </Grid>
        </Grid>
      </Container>
    )
  }
}