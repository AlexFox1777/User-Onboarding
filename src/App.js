import React from 'react';
import UserForm from "./components/form/UserForm";


class App extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }


    render() {
        return (
            <div>
                <UserForm />
            </div>
        );
    }
}

export default App;
