import * as React from 'react'

import Paper from '@material-ui/core/Paper'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'

const styles = createStyles({
  root: {
    margin: 24,
    marginTop: 80,
  }
})

interface ContainerProps extends WithStyles<typeof styles> {}

const Container: React.SFC<ContainerProps> = ({ children, classes }) => (
  <Paper elevation={4} className={classes.root}>
    {children}
  </Paper>
)

export default withStyles(styles)(Container)
