import Axios from "axios";
import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import Header from "../components/shared/Header";

import "../styles/main.scss";

// Class Component
class Index extends React.Component {

  static async getInitialProps() {
    let userData = {};

    try {
      const response = await Axios.get("https://jsonplaceholder.typicode.com/todos/1");
      userData = response.data;
    } catch (e) {
      console.error(e);
    }

    return { userData };
  }

  constructor(props) {
    super(props);

    this.state = {
      title: "This is the index page"
    };
  }

  updateTitle = () => {
    this.setState({
      title: "This is the updated index page"
    });
  }

  // Renderer. Must be implemented from React.Component
  render() {
    const { title } = this.state;
    const { userData } = this.props;

    return (
      <BaseLayout>
        <h1>Welcome to the Index Page</h1>
        <h2>{ title }</h2>
        <h2>{ userData.title }</h2>
        <button onClick={ this.updateTitle }>Update Index Page</button>
        <p className="customClassFromFile">Hello this is a test.</p>
      </BaseLayout>
    )
  }

}

export default Index;