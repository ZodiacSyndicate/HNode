import { createStyles } from '@material-ui/core/styles'

const inputWidth = 300

export const loginStyles = createStyles({
  root: {
    padding: '60px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: inputWidth,
    marginBottom: 20,
  },
  loginButton: {
    width: inputWidth,
  },
})
