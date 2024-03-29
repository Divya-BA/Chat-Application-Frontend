import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { RiLogoutBoxRLine } from "react-icons/ri";

SideBar.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default function SideBar({ user }) {
  const navigate = useNavigate();

  const [showUserDetails, setShowUserDetails] = useState(false);
  const userDetailsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userDetailsRef.current &&
        !userDetailsRef.current.contains(event.target)
      ) {
        setShowUserDetails(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logoutHandler = () => {
    if (localStorage.getItem("ChatterSphere-user")) {
      localStorage.removeItem("ChatterSphere-user");
    }
    navigate("/login");
  };

  return (
    <TopBarContainer>
      <div
        className="profilePhoto"
        onClick={() => setShowUserDetails(!showUserDetails)}
      >
        <img src={user.imageUrl} alt="" />
      </div>
      {showUserDetails && (
        <UserDetailsBox>
          <div className="profile-pic" ref={userDetailsRef}>
            <img
              src={user.imageUrl}
              alt="User avatar"
              style={{ width: "100px", display: "block", margin: "0 auto" }}
            />
          </div>
          <div className="user-info">
            <div className="name">
              <h2>{user.username}</h2>
            </div>
            <div className="email">
              <a href={`mailto:${user.email}`}>{user.email}</a>
            </div>
            <div className="bio">{/* <p>{user.bio}</p> */}</div>
            <button onClick={() => setShowUserDetails(false)}>Close</button>
          </div>
        </UserDetailsBox>
      )}
      <div className="options">
        <i>
        <RiLogoutBoxRLine onClick={logoutHandler} />
        </i>
      </div>
    </TopBarContainer>
  );
}

const TopBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  background-color: #e9e9e9;
  background-color: #213555;
  border-bottom: 1px solid #d3d3d3;
  .profilePhoto {
    img {
      display: block;
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }
  .options {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    color: #ececec;
    i {
      display: block;
      padding: 15px 10px;
      cursor: pointer;
      font-size: 37px;
      
    }
  }
  @media (max-width: 768px) {
    img {
      width: 400px;
      height: 40px;
    }
  }
`;

const UserDetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60%;
  width: 30%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  .profile-pic {
    img {
      border: 2px solid black;
      width: 12rem !important;
      object-fit: cover;
      height: 12rem;
      border-radius: 50%;
    }
  }
  .user-info {
    margin: 10px 0;
    div {
      margin: 5px;
    }
    .name {
      text-align: center;
    }
    .email {
      text-align: center;
      a {
        color: black;
        text-decoration: none;

        &:hover {
          text-decoration: underline; // adding underline on hover
        }
      }
    }
  }
  button {
    display: block;
    margin: 0 auto;

    background-color: #333; // dark background
    color: #fff; // white text
    border: none;
    border-radius: 5px; // rounded edges
    padding: 10px 15px; // some padding
    cursor: pointer; // hand cursor on hover
    margin-top: 20px; // some spacing from the elements above
    transition: background-color 0.3s ease; // smooth color transition on hover

    &:hover {
      background-color: #555; // slightly lighter background on hover
    }

    &:focus {
      outline: none; // remove focus outline
      box-shadow: 0 0 3px 2px rgba(0, 123, 255, 0.5); // add a subtle blue glow on focus
    }
  }
`;
