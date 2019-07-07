import { Button } from "reactstrap";

const ControlMenu = (props) => {

  return (
    <div className="control-menu">
      <h1 className="title">Blog Editor</h1>
      <div className="status-box">
        { props.isLoading ? "Saving..." : "Saved." }
      </div>
      <Button disabled={ props.isLoading } color="success" onClick={ props.save }>Save</Button>
    </div>
  );
}

export default ControlMenu;