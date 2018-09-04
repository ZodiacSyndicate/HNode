import * as React from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TestField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button'
import IconReply from '@material-ui/icons/Reply'
import { withStyles, WithStyles } from '@material-ui/core/styles'

import Container from '@/components/container'
import SimpleMDE from '@/components/simple-mde'
import { topicCreateStyles } from './styles'
import { TopicActions } from '@/store'

const tabs = {
  share: '分享',
  job: '工作',
  ask: '问答',
  dev: '测试'
}

type TopicCreateProps =
  & WithStyles<typeof topicCreateStyles>
  & TopicActions

interface TopicCreateState {
  title: string
  content: string
  tab: string
}

class TopicCreate extends React.Component<TopicCreateProps, TopicCreateState> {
  public state: TopicCreateState = {
    title: '',
    content: '',
    tab: 'dev'
  }

  public render() {
    const { classes: c } = this.props
    const { title, content } = this.state
    return (
      <Container>
        <div className={c.root}>
          <TestField
            className={c.title}
            label="标题"
            value={title}
            fullWidth={true}
            onChange={this.handleTitleChange}
          />
          <SimpleMDE
            onChange={this.handleContentChange}
            value={content}
            options={{
              spellChecker: false,
              placeholder: '发表你的精彩意见',
            }}
          />
          <div>
            {
              Object.keys(tabs).map(tab => (
                <span key={tab} className={c.selectItem}>
                  <Radio
                    value={tab}
                    checked={tab === this.state.tab}
                    onChange={this.handleTabChange}
                  />
                  {tabs[tab]}
                </span>
              ))
            }
          </div>
          <Button
            variant="fab"
            color="primary"
            className={c.replyButton}
            onClick={this.handleCreateTopic}
          >
            <IconReply />
          </Button>
        </div>
      </Container>
    )
  }

  private handleCreateTopic = () => {
    const { title, content, tab } = this.state
    this.props.createTopic(title, tab, content)
  }

  private handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: e.target.value
    })
  }

  private handleContentChange = (value: string) => {
    this.setState({
      content: value
    })
  }

  private handleTabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      tab: e.currentTarget.value
    })
  }
}

export default withStyles(topicCreateStyles)(
  connect<{}, TopicActions>(
    () => ({}),
    (dispatch: Dispatch) => bindActionCreators(TopicActions, dispatch)
  )(TopicCreate)
)
