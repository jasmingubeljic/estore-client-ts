import { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { MdClear } from "react-icons/md";
import PropTypes from "prop-types";

const Search = (props) => {
  const navigate = useNavigate();
  const inputRef = useRef();

  const onChangeHandler = (e) => {
    let val = e.target.value.trim();
    if (!val) {
      return navigate("/search");
    }
    val = encodeURIComponent(val);
    navigate("/search?query=" + val);
  };

  const clearSearchInputHandler = useCallback(() => {
    inputRef.current.value = "";
  }, []);

  return (
    <InputGroup className={props.className}>
      <Form.Control
        placeholder="Search products..."
        aria-label="Search products..."
        aria-describedby="search1"
        onChange={onChangeHandler}
        method="POST"
        ref={inputRef}
      />
      <Button type="submit" variant="outline-info" id="search1" className="bg-white" onClick={clearSearchInputHandler}>
        <MdClear />
      </Button>
    </InputGroup>
  );
};

Search.propTypes = {
  className: PropTypes.string,
};

export default Search;
