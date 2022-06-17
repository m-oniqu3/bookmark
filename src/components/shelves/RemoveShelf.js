import React, { useContext } from "react";
import styled from "./RemoveShelf.module.css";
import { TiDelete } from "react-icons/ti";
import { AuthContext } from "../../contexts/authContext";
import { useDispatch } from "react-redux";
import { removeShelf } from "../../store/features/shelf/shelfSlice";

const RemoveShelf = (props) => {
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const urlParams = props.searchParams.get("shelf");

  //dispatch the action to remove the shelf
  const removeShelfHandler = () => {
    dispatch(
      removeShelf({ shelf: props.selectedShelf, user: currentUser.email })
    );

    //if the shelf in the url is the same as the shelf being renamed, update the url
    if (urlParams === props.selectedShelf) {
      props.setSearchParams({ shelf: "All" });
    }

    props.setOpenMenuAction(false);
  };

  return (
    <div className={styled["remove-container"]}>
      <section className={styled.remove}>
        <TiDelete size="50px" style={{ color: "var(--yellow)" }} />

        <h2>Remove Shelf</h2>
        <p>
          Are you sure you want to remove your
          <span> {props.selectedShelf}</span> shelf? Books on this shelf will be
          removed. This action cannot be undone.
        </p>

        <div className="button-actions">
          <button onClick={removeShelfHandler}>Remove</button>
          <button onClick={() => props.setOpenMenuAction(false)}>Cancel</button>
        </div>
      </section>
    </div>
  );
};

export default RemoveShelf;
