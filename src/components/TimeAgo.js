import { h, Component } from 'preact';
import { formatDistanceToNow } from 'date-fns';

class TimeAgo extends Component {
  state = {
    timeAgo: ''
  };

  componentDidMount() {
    this.updateTimeAgo();
    this.timer = setInterval(() => this.updateTimeAgo(), 60000); // Update every minute
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateTimeAgo() {
    const { date } = this.props;
    const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });
    this.setState({ timeAgo });
  }

  render() {
    const { timeAgo } = this.state;
    return <span>{timeAgo}</span>;
  }
}

export default TimeAgo;
