import * as React from 'react';

interface IndexPageProps extends React.Props<{}> {
}

interface IndexPageState {
    answer?: number;
    accessToken?: string;
}

export default class IndexPage extends React.Component<IndexPageProps, IndexPageState> {

    constructor(props: IndexPageProps) {
        super(props);
        this.state = { answer: 0, accessToken: '' };
    }

    private handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        var x = (this.refs['x'] as HTMLInputElement).value;
        var y = (this.refs['y'] as HTMLInputElement).value;
        // 認証ヘッダーを追加してAPI呼び出し
        fetch('api/Calc?x=' + x + '&y=' + y, {
            headers: {
                'Authorization': 'Bearer ' + this.state.accessToken
            }
        }).then(x => {
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

    private handleAuthClick(e: React.SyntheticEvent) {
        e.preventDefault();
        // 認証してアクセストークンを保持しておく
        fetch('Token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=password&username=admin&password=p@ssw0rd'
        }).then(x => {
            return x.json();
        }).then(x => {
            this.setState({ accessToken: x.access_token });
        });;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this) }>
                <input type='text' ref='x' />
                &nbsp;
                +
                &nbsp;
                <input type='text' ref='y' />
                &nbsp;
                <input type='submit' value='=' />
                &nbsp;
                <span>{this.state.answer}</span>
                <hr/>
                <button onClick={this.handleAuthClick.bind(this) }>Auth</button>
                <br/>
                <span>{this.state.accessToken}</span>
                </form>
        );
    }
}
