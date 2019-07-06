import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

import withAuth from "../components/hoc/withAuth";

import SlateEditor from "../components/slate-editor/Editor";

class BlogEditor extends React.Component {
  render() {
    return (
      <BaseLayout { ...this.props.auth }>
        <BasePage containerClass="editor-wrapper" className="blog-editor-page">
          <SlateEditor />
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth("siteOwner")(BlogEditor);