import * as React from 'react'
import { withStyles, WithStyles } from '@material-ui/core/styles'

import ToolBar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'

import { paginationStyles } from './styles'

interface PaginationState {
  page: number
  pageSize: number
}

interface PaginationProps extends WithStyles<typeof paginationStyles> {
  onChange: (currentPage: number, currentPageSize: number) => void
  pageSizes: number[]
  defaultPageSize: number
}

class Pagination extends React.Component<PaginationProps, PaginationState> {
  public static defaultProps: Partial<PaginationProps> = {
    defaultPageSize: 20
  }

  public state: PaginationState = {
    page: 1,
    pageSize: 0
  }

  public componentWillMount() {
    this.setState({
      pageSize: this.props.defaultPageSize
    })
  }

  public render() {
    const { page, pageSize } = this.state
    const { pageSizes, classes } = this.props
    return (
      <div className={classes.root}>
        <ToolBar>
          <Button
            disabled={page === 1}
            variant="flat"
            color="primary"
            onClick={this.handlePrevPage}
          >
            <ChevronLeft />
            上一页
          </Button>
          当前页：{page}
          <Button
            variant="flat"
            color="primary"
            onClick={this.handleNextPage}
          >
            下一页
            <ChevronRight />
          </Button>
          <FormControl>
            <Select
              value={pageSize}
              inputProps={{
                name: 'pageSize',
                id: 'select-pagesize'
              }}
              onChange={this.handlePageSizeChange}
            >
              {
                pageSizes.map(size => (
                  <MenuItem key={size} value={size}>{size} 条/页</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </ToolBar>
      </div>
    )
  }

  private handleNextPage = () => {
    const { page, pageSize } = this.state
    this.setState(
      {
        page: page + 1
      },
      () => {
        this.props.onChange(this.state.page, pageSize)
      }
    )
  }

  private handlePrevPage = () => {
    const { page, pageSize } = this.state
    this.setState(
      {
        page: page - 1
      },
      () => {
        this.props.onChange(this.state.page, pageSize)
      }
    )
  }

  private handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { page } = this.state
    this.setState(
      {
        pageSize: ~~event.target.value
      },
      () => {
        this.props.onChange(page, this.state.pageSize)
      }
    )
  }
}

export default withStyles(paginationStyles)(Pagination)
