import * as React from 'react';

interface IndexPageProps extends React.Props<{}> {
}

interface IndexPageState {
    answer: number;
}

export default class IndexPage extends React.Component<IndexPageProps, IndexPageState> {

    constructor(props: IndexPageProps) {
        super(props);
        this.state = { answer: 0 };
    }

    private handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        var x = (this.refs['x'] as HTMLInputElement).value;
        var y = (this.refs['y'] as HTMLInputElement).value;
        fetch('api/Calc?x=' + x + '&y=' + y)
            .then(x => {
                if (x.status !== 200) {
                    throw new Error();
                }
                return x.json();
            }).then((x: number) => {
                this.setState({ answer: x });
            }).catch(_ => {
                alert('Error');
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input type='text' ref='x' />
                &nbsp;
                +
                &nbsp;
                <input type='text' ref='y' />
                &nbsp;
                <input type='submit' value='=' />
                &nbsp;
                <span>{this.state.answer}</span>
            </form>
        );
    }
}
