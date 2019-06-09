import React, { Component } from "react";


class NotFoundComponent extends Component {
    
    goToHome = event => {
        this.props.history.push("/");
    };

    render() {
        return (
            <div className="App">
                <h1>Uh-Oh!</h1>
                <p>
                    {" "}
                    We can't seem to find the page you're looking for.
                    <br /> Either something went wrong or the page doesn't exist anymore!
                </p>
                <button
                    className="primary-btn"
                    type="submit"
                    onClick={event => this.goToHome(event)}
                >
                    Go to Home
                </button>
            </div>
        );
    }
}

export default NotFoundComponent;
