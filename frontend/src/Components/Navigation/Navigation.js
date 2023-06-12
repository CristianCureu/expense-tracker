import React, { useEffect, useState } from "react";
import styled from "styled-components";
import avatar from "../../img/avatar.png";
import { signout, edit, cancel } from "../../utils/Icons";
import { menuItems } from "../../utils/menuItems";
import { useGlobalContext } from "../../context/globalContext";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Navigation({ active, setActive }) {
  const navigate = useNavigate();
  const { totalBalance, updateUser } = useGlobalContext();
  const [editable, setEditable] = useState(false);
  const [user, setUser] = useState(null);

  const userId = localStorage.getItem("user-id");
  const userName = localStorage.getItem("user-name");
  const userPicture = localStorage.getItem("user-picture");

  const logout = () => {
    localStorage.removeItem("user-token");
    localStorage.removeItem("user-name");
    localStorage.removeItem("user-picture");
    navigate("/login");
  };

  const editUser = async (e) => {
    e.preventDefault();
    try {
      const { response, responseJson } = await updateUser(user, userId);
      console.log(responseJson);
      if (response.status === 200) {
        localStorage.setItem("user-name", responseJson.name);
        localStorage.setItem("user-picture", responseJson.picture);
        window.location.reload();
      } else {
        swal("Error", responseJson.message, "error");
      }
    } catch (error) {
      console.log("Navigation::editUser::", error);
    }
  };

  return (
    <NavStyled>
      <div className="user-con" onClick={() => setEditable(true)}>
        <img
          src={
            userPicture !== "undefined" || !userPicture.length
              ? userPicture
              : avatar
          }
          alt="profile"
        />
        <div className="text">
          <h2>{userName ? userName : "No name"}</h2>
          <p>$ {totalBalance()}</p>
        </div>
      </div>
      {editable && (
        <form onSubmit={editUser}>
          <div className="form-group">
            <input
              type="text"
              autoComplete="off"
              name="name"
              required
              defaultValue={userName}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <label htmlFor="name" className="label">
              <span className="form-content">Name</span>
            </label>
          </div>
          <div className="form-group">
            <input
              type="text"
              autoComplete="off"
              name="picture"
              defaultValue={userPicture !== "undefined" ? userPicture : ""}
              onChange={(e) => setUser({ ...user, picture: e.target.value })}
            />
            <label htmlFor="picture" className="label">
              <span className="form-content">Picture</span>
            </label>
          </div>
          <div className="buttons">
            <button type="submit" className="edit-button">
              {edit} Edit
            </button>
            <button
              className="cancel-button"
              onClick={() => {
                setEditable(false);
              }}
            >
              {cancel}
            </button>
          </div>
        </form>
      )}
      <ul className="menu-items">
        {menuItems.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={active === item.id ? "active" : ""}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
      <div className="bottom-nav" onClick={() => logout()}>
        <li>{signout} Sign Out</li>
      </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  .form-group {
    width: 100%;
    border-radius: 4px;
  }
  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .edit-button,
  .cancel-button {
    font-size: 1.2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in;
  }
  .edit-button:hover,
  .cancel-button:hover {
    transform: scale(1.2);
  }
  .edit-button {
    color: #00e508;
    padding: 0.5rem 1rem;
  }
  .cancel-button {
    color: red;
  }
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: rgba(50, 50, 50, 0.9);
  border: 3px solid rgba(79, 79, 79, 0.8);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  .user-con {
    cursor: pointer;
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
  }
  .bottom-nav {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bottom-nav li {
    cursor: pointer;
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(240, 240, 240, 0.7);
      padding-left: 1rem;
      position: relative;
      i {
        color: rgba(240, 240, 240, 0.7);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }

  .active {
    color: rgba(255, 255, 255, 1) !important;
    i {
      color: rgba(255, 255, 255, 1) !important;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: rgba(255, 255, 255, 1);
      border-radius: 0 10px 10px 0;
    }
  }
`;

export default Navigation;
