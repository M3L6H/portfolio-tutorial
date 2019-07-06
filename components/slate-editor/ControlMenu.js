import { Button } from "reactstrap";

const ControlMenu = (prop) => {

  return (
    <div className="control-menu">
      <h1 className="title">Blog Editor</h1>
      <div className="status-box">
        Saved
      </div>
      <Button color="success">Save</Button>
    </div>
  );
}

export default ControlMenu;