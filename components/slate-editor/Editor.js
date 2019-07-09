import React from "react";
import HTML from "slate-html-serializer";
import HoverMenu from "./HoverMenu";
import ControlMenu from "./ControlMenu";

import { Editor } from "slate-react";
import { Value } from "slate";
import { initialValue } from "./initial-value";
import { renderMark, renderBlock } from "./renderers";
import { rules } from "./rules";

const html = new HTML({ rules });

export default class SlateEditor extends React.Component {

  // Set the initial value when the app is first constructed.
  state = {
    value: Value.create(),
    isLoaded: false
  };

  componentDidMount() {
    const propsVal = this.props.initialValue;

    const value = propsVal ? Value.fromJSON(html.deserialize(propsVal)) : Value.fromJSON(initialValue);

    this.updateMenu();
    this.setState({ isLoaded: true, value });
  }

  componentDidUpdate() {
    this.updateMenu();
  }

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    this.setState({ value });
  }

  onKeyDown = (event, change, next) => {
    const { isLoading } = this.props;

    if (!isLoading && event.which === 83 && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      this.save();
      return;
    }

    next();
  }

  updateMenu = () => {
    const menu = this.menu;
    if (!menu) return;

    const { value } = this.state;
    const { fragment, selection } = value;

    if (selection.isBlurred || selection.isCollapsed || fragment.text === "") {
      menu.removeAttribute("style");
      return;
    }

    const native = window.getSelection();
    const range = native.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    menu.style.opacity = 1;
    menu.style.top = `${ rect.top + window.pageYOffset - menu.offsetHeight }px`;

    menu.style.left = `${ rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2
    }px`;
  }

  getTitle() {
    const { value } = this.state;
    const firstBlock = value.document.getBlocks().get(0);
    const secondBlock = value.document.getBlocks().get(1);

    const title = firstBlock && firstBlock.text ? firstBlock.text : "Untitled";
    const subTitle = secondBlock && secondBlock.text ? secondBlock.text : "No subtitle";

    return { title, subTitle };
  }

  save() {
    const { save, isLoading } = this.props;
    const { value } = this.state;
    const headingValues = this.getTitle();
    const text = html.serialize(value);

    !isLoading && save(text, headingValues);
  }

  // Render the editor.
  render() {
    const { isLoaded } = this.state;

    return (
      <React.Fragment>
        { isLoaded &&
          <Editor
            placeholder="Enter some text..."
            value={ this.state.value }
            onChange={ this.onChange }
            onKeyDown={ this.onKeyDown }
            renderMark={ renderMark }
            renderBlock={ renderBlock }
            renderEditor={ this.renderEditor }
            { ...this.props }
          />
        }
      </React.Fragment>
    );
  }

  renderEditor = (props, editor, next) => {
    const { isLoading } = props;
    const children = next();

    return (
      <React.Fragment>
        <ControlMenu isLoading={ isLoading } save={ () => this.save() }></ControlMenu>
        { children }
        <HoverMenu innerRef={ (menu) => (this.menu = menu) } editor={ editor }></HoverMenu>
        <style jsx>
          {`
            @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
          `}
        </style>
      </React.Fragment>
    );
  }

}