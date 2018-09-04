import * as React from 'react'
import { generateId } from './generate-id'

const noop = (): void => { }

interface EditorProps {
  onChange: (...args: any[]) => void
  options: object
  value: string
  extraKeys: string
  className: string
  id: string
}

interface EditorState {
  keyChange: boolean
}

export default class Editor extends React.Component<EditorProps, EditorState> {
  public static defaultProps: EditorProps = {
    onChange: noop,
    options: {},
    value: '',
    extraKeys: '',
    className: '',
    id: ''
  }

  public id: string

  public simplemde: any

  public editorEl: Element

  public editorToolbarEl: Element

  public state = {
    keyChange: false
  }

  public componentWillMount() {
    const { id } = this.props
    if (id) {
      this.id = id
    } else {
      this.id = generateId()
    }
  }

  public componentDidMount() {
    this.createEditor()
    this.addEvents()
    this.addExtraKeys()
  }

  public componentWillReceiveProps(nextProps: EditorProps) {
    if (!this.state.keyChange && (nextProps.value !== this.simplemde.value())) {
      this.simplemde.value(nextProps.value!)
    }

    this.setState({
      keyChange: false
    })
  }

  public componentWillUnmount() {
    this.removeEvents()
  }

  public render() {
    const textarea = React.createElement('textarea', { id: this.id })
    return React.createElement(
      'div',
      {
        id: `${this.id}-wrapper`,
        className: this.props.className
      },
      textarea
    )
  }

  private createEditor = () => {
    const SimpleMDE = require('simplemde')
    const { value, options } = this.props
    const initOptions = {
      element: document.getElementById(this.id) as HTMLElement,
      initialValue: value
    }
    const finalOptions = {
      ...initOptions,
      ...options
    }

    this.simplemde = new SimpleMDE(finalOptions)
  }

  private eventWrapper = () => {
    this.setState({
      keyChange: true
    })
    this.props.onChange!(this.simplemde.value())
  }

  private addEvents = () => {
    const wrapperId = `${this.id}-wrapper`
    const wrapperEl = document.getElementById(`${wrapperId}`) as HTMLElement

    this.editorEl = wrapperEl.getElementsByClassName('CodeMirror')[0]
    this.editorToolbarEl = wrapperEl.getElementsByClassName('editor-toolbar')[0]

    this.editorEl.addEventListener('keyup', this.eventWrapper)
    if (this.editorToolbarEl) {
      this.editorToolbarEl.addEventListener('click', this.eventWrapper)
    }
  }

  private removeEvents = () => {
    this.editorEl.removeEventListener('keyup', this.eventWrapper)
    if (this.editorToolbarEl) {
      this.editorEl.removeEventListener('click', this.eventWrapper)
    }
  }

  private addExtraKeys = () => {
    if (this.props.extraKeys) {
      this.simplemde.codemirror.setOption('extraKeys', this.props.extraKeys)
    }
  }
}
