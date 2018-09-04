import { createStyles } from '@material-ui/core/styles'

export const replyStyle = createStyles({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: 20,
    paddingBottom: 0,
    borderBottom: '1px solid #dfdfdf',
  },
  left: {
    marginRight: 20,
  },
  right: {
    '& img': {
      maxWidth: '100%',
      display: 'block',
    },
  },
})
