import * as React from 'react';
import * as ReactDOM from 'react-dom';
import IndexPage from './components/IndexPage';

class App extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <h1>Calc app</h1>
                <hr />
                <IndexPage />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('content'));
