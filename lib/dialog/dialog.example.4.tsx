import React from 'react';
import { modal } from './dialog';

export default function () {
  const openModal = () => {
    const close = modal(
      <h1>
        你好<button onClick={() => close()}>close</button>
      </h1>
    );
  };

  return (
    <div>
      <h1>example 4</h1>
      <button onClick={openModal}>click</button>
    </div>
  );
}
