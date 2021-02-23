import React from 'react';

const Message = props => {
  return (
    <h5 className="message pt-5 px-3">
      {props.children}
    </h5>
  );
}

export default Message;
