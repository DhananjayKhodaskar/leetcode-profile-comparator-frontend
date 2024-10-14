import { decrement, increment } from "@/slices/authSlice";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const count = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  return (
    <div>
      {" "}
      <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
