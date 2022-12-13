import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "./../../services/userService";
import ModalUser from "./ModalUser";
class UserManage extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModelUser: false,
    };
  }

  /** Life cycle
   * Run component:
   * 1. Run constructor -> init state
   * 2. Did mount (Call API -> set state)
   * 3. Render
   */

  async componentDidMount() {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState(
        {
          arrUsers: response.users,
        },
        () => {
          console.log("data user: ", this.state.arrUsers);
        }
      );
    }
  }

  handleAddNewUser = () => {
    this.setState({
      isOpenModelUser: true,
    })
  }

  // use react table to render table
  render() {
    let arrUsers = this.state.arrUsers;
    // properties, nested
    return (
      <div className="users-container mt-3 mx-1">
        <ModalUser
          isOpen={this.state.isOpenModelUser}
          test={'abc'}
        />
        <div className="title text-center">Management Users With Eric</div>
        <div className="my-3">
          <button className="btn btn-primary px-3" onClick={() => this.handleAddNewUser()}>
            <i className="fas fa-plus"></i>
            Add new users
          </button>
        </div>
        <table id="customers">
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
          {arrUsers &&
            arrUsers.map((item, index) => {
              return (
                <tr>
                  <td>{item.email}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.address}</td>
                  <td>
                    <button className="btn-edit"><i className="fas fa-pencil-alt"></i></button>
                    <button className="btn-delete"><i className="fas fa-trash"></i></button>
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
