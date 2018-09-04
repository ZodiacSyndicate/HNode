import 'core-js/modules/es.object.keys'
import * as React from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import Helmet from 'react-helmet'
import { push } from 'connected-react-router'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles, WithStyles } from '@material-ui/core/styles'

import { GlobalState, TopicStore, TopicActions } from '@/store'
import TopicListItem from '@/components/list-item'
import Pagination from '@/components/pagination'
import Container from '@/components/container'

import { tabs, Tabs as T, getTab } from '@/util'
import { topicListStyles } from './styles'

interface TopicListActions extends TopicActions {
  push: typeof push
}

type TopicListProps =
  & RouteComponentProps<any>
  & WithStyles<typeof topicListStyles>
  & TopicStore
  & TopicListActions

interface TopicListState {
  page: number
  pageSize: number
  tab: T
}
class TopicList extends React.Component<TopicListProps, TopicListState> {
  public static getDerivedStateFromProps(nextProps: TopicListProps, prevState: TopicListState) {
    const tab = getTab(nextProps.location.search)
    if (tab !== prevState.tab) {
      return {
        tab,
        page: 1
      }
    }
    return null
  }

  public readonly state: TopicListState = {
    page: 1,
    pageSize: 20,
    tab: 'all'
  }

  public componentDidMount() {
    this.fetchTopics()
  }

  public componentDidUpdate(_: any, prevState: TopicListState) {
    if (prevState.tab !== this.state.tab) {
      this.fetchTopics()
    }
  }

  public render() {
    const { topics, fetching, classes, location } = this.props
    const tab = getTab(location.search)
    return (
      <>
        <Container>
          <Helmet>
            <title>话题列表</title>
            <meta name="description" content="CNode 社区为国内最专业的 Node.js 开源技术社区,致力于 Node.js 的技术研究" />
          </Helmet>
          <Tabs
            fullWidth={true}
            value={tab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
          >
            {
              Object.keys(tabs).map(t => (
                <Tab
                  label={tabs[t]}
                  value={t}
                  key={t}
                />
              ))
            }
          </Tabs>
          {
            fetching ? (
              <div className={classes.loadingPlaceholder}>
                <CircularProgress color="primary" size={100} />
              </div>
            ) : (
              <List>
                {topics.map(topic => (
                  <TopicListItem
                    key={topic.id}
                    onClick={() => this.handleItemClick(topic.id)}
                    topic={topic}
                  />
                ))}
              </List>
            )
          }
        </Container>
        {/*tab变化是pagination会重新渲染，但是pagesize会还原，利用defaultpagesize保留当前pagesize的状态*/}
        <Pagination
          key={tab}
          onChange={this.handlePaginationChange}
          pageSizes={[20, 30, 40]}
          defaultPageSize={this.state.pageSize}
        />
      </>
    )
  }

  private handleItemClick = (id: string) => {
    this.props.push(`/detail/${id}`)
  }

  private fetchTopics = () => {
    const { tab, page, pageSize } = this.state
    this.props.fetchTopics({
      tab,
      page,
      mdrender: false,
      limit: pageSize,
    })
  }

  private handleTabChange = (_: any, value: T) => {
    this.props.push({
      pathname: '/list',
      search: `tab=${value}`
    })
  }

  private handlePaginationChange = (page: number, pageSize: number) => {
    this.setState(
      { page, pageSize },
      () => { this.fetchTopics() }
    )
  }
}

export default withStyles(topicListStyles)(connect<TopicStore, TopicListActions>(
  (state: GlobalState) => state.topics,
  (dispatch: Dispatch) => bindActionCreators({ ...TopicActions, push }, dispatch),
)(TopicList))
