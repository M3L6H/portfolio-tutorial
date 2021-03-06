import React from 'react';
import Header from '../shared/Header';
import Head from "next/head";

const BaseLayout = (props) => {
  const { children, className, isAuthenticated, user, isSiteOwner, title, canonical } = props;
  const headerType = props.headerType || "default";

  return (
    <React.Fragment>
      <Head>
        <title>{`Michael Hollingworth${ title ? " | " + title : "" }`}</title>
        <meta name="description" content="My name is Michael Hollingworth and I am a software developer skilled in object-oriented design, web development, and mathematics. I am seeking to leverage my research and creativity skills while working with a great team." />
        <meta name="keywords" content="hollingworth portfolio, hollingworth developer, hollingworth website, hollingworth programmer, hollingworth freelancing" />

        <meta property="og:title" content="Michael Hollingworth - Developer, Innovator, Blogger" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content={ process.env.BASE_URL } />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="My name is Michael Hollingworth and I am a software developer skilled in object-oriented design, web development, and mathematics." />

        { canonical && <link rel="canonical" href={ `${ process.env.BASE_URL }/${ canonical }` } />}

        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/ico" href="/static/favicon/favicon.ico" />
      </Head>
      <div className="layout-container">
        <Header
          className={ `port-nav-${ headerType }` }
          isAuthenticated={ isAuthenticated }
          user={ user }
          isSiteOwner={ isSiteOwner }
        />
        <main className={`cover ${ className }`}>
          <div className="wrapper">{ children }</div>
        </main>
      </div>
    </React.Fragment>
  )
}

export default BaseLayout;