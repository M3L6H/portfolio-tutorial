import React from 'react';
import Header from '../shared/Header';
import Head from "next/head";

const BaseLayout = (props) => {
  const { children, className, isAuthenticated } = props;
  const headerType = props.headerType || "default";

  return (
    <React.Fragment>
      <Head>
        <title>Michael Hollingworth</title>
        <script src="https://kit.fontawesome.com/a77a0b5033.js"></script>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"/>
      </Head>
      <div className="layout-container">
        <Header className={ `port-nav-${ headerType }` } isAuthenticated={ isAuthenticated } />
        <main className={`cover ${ className }`}>
          <div className="wrapper">{ children }</div>
        </main>
      </div>
    </React.Fragment>
  )
}

export default BaseLayout;