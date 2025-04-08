import { useRef, useCallback, FC, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { MdClear } from "react-icons/md";

interface Props {
  className?: string;
}

const Search: FC<Props> = (props) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.trim();
    if (!val) {
      return navigate("/search");
    }
    val = encodeURIComponent(val);
    navigate("/search?query=" + val);
  };

  const clearSearchInputHandler = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, []);

  return (
    <InputGroup className={props.className}>
      <Form.Control placeholder="Search products..." aria-label="Search products..." aria-describedby="search1" onChange={onChangeHandler} ref={inputRef} />
      <Button type="submit" variant="outline-info" id="search1" className="bg-white" onClick={clearSearchInputHandler}>
        <MdClear />
      </Button>
    </InputGroup>
  );
};

export default Search;
