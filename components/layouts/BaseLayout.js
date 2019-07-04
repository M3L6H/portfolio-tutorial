import React from 'react';
import Header from '../shared/Header';

const BaseLayout = (props) => {
  const { children, className, isAuthenticated } = props;
  const headerType = props.headerType || "default";

  return (
    <div className="layout-container">
      <Header className={ `port-nav-${ headerType }` } isAuthenticated={ isAuthenticated } />
      <main className={`cover ${ className }`}>
        <div className="wrapper">{ children }</div>
      </main>
    </div>
  )
}

export default BaseLayout;