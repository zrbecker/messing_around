import { Component, ReactNode } from "react";

type Props = {
  loader: () => ReactNode
};

type State = {
  component: ReactNode | null
};

export default class LazyLoader extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      component: null
    };
  }

  async componentDidMount() {
    const component = await this.props.loader();
    if (component) {
      this.setState({ component });
    }
  }

  render() {
    return this.state.component;
  }
}
