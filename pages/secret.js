import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";

import { getSecretData } from "../actions";

class Secret extends React.Component {

  state = {
    secretData: []
  };

  static async getInitialProps({ req }) {
    const anotherSecretData = await getSecretData(req);

    console.log(anotherSecretData);

    return { anotherSecretData };
  }

  async componentDidMount() {
    const secretData = await getSecretData();

    this.setState({
      secretData
    });
  }

  displaySecretData() {
    const { secretData } = this.state;

    if (secretData && secretData.length > 0) {
      return secretData.map((data, index) => {
        return (
          <div key={ index }>
            <p>{ data.title }</p>
            <p>{ data.description }</p>
          </div>
        )
      })
    }

    return null;
  }

  render() {
    return (
      <BaseLayout { ...this.props.auth }>
        <BasePage>
          <h1>My Secret Page</h1>
          <h2>{ this.props.superSecretValue }</h2>
          <p>Secret content. Shhh don't tell anyone!</p>
          { this.displaySecretData() }
        </BasePage>
      </BaseLayout>
    );
  }

}

export default withAuth()(Secret);