import React, { useEffect, useState } from "react";
import { Fab, Tooltip } from "@mui/material";
import { Add, Logout } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { initialize, reset } from "redux-form";
import _ from "lodash";
import { useNavigate, Navigate } from "react-router-dom";
import {
  Container,
  FloatingActionButtonContainer,
  FloatingButtonSpacer,
} from "../features/styled-components";
import { useActions } from "../redux/useActions";
import UserForm from "./UserForm";
import ViewUser from "./ViewUser";
import UserTable from "./UserTable";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openForm, setOpenForm] = React.useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const {
    deleteUser,
    loadUsers,
    updateUser,
    addUser,
    setUserDetails,
    cleanUserDetails,
    cleanUser,
    logout,
  } = useActions();
  const { isSignedIn } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const { details: userDetails } = useSelector(
    (state) => state.users
  );
  const handleLogout = () => logout(navigate);
  const form = {
    open: () => setOpenForm(true),
    close: () => {
      dispatch(reset("userForm"));
      setOpenForm(false);
    },
  };
  const actions = {
    submit: (formValues) => {
      form.close();
      if (isEditing) {
        updateUser(formValues);
      } else {
        addUser(formValues);
      }
    },
    create: () => {
      setIsEditing(false);
      dispatch(initialize("userForm", {}));
      form.open();
    },
    edit: (user) => {
      setIsEditing(true);
      dispatch(initialize("userForm", user));
      form.open();
    },
    view: {
      open: (user) => {
        setUserDetails(user);
      },
      close: () => cleanUserDetails(),
    },
    delete: (userIds) => {
      deleteUser(userIds);
    },
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      loadUsers();
    }
    return () => {
      mounted = false;
      cleanUser();
    };
  }, [loadUsers, cleanUser]);
  if (!isSignedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <UserTable
        data={users.map((user) => ({
          ..._.omit(user, ["listId"]),
        }))}
        onDelete={actions.delete}
      />

      <FloatingActionButtonContainer>
        <FloatingButtonSpacer>
          <Tooltip title="Add new contact">
            <Fab color="primary" onClick={actions.create}>
              <Add />
            </Fab>
          </Tooltip>
        </FloatingButtonSpacer>
        <FloatingButtonSpacer>
          <Tooltip title="Logout">
            <Fab color="secondary" onClick={handleLogout}>
              <Logout />
            </Fab>
          </Tooltip>
        </FloatingButtonSpacer>
      </FloatingActionButtonContainer>
      <UserForm
        open={openForm}
        onClose={form.close}
        onSubmit={actions.submit}
      />
      {userDetails !== null && (
        <ViewUser
          open={userDetails !== null}
          onClose={actions.view.close}
          users={userDetails}
        />
      )}
    </div>
  );
};

export default Home;
