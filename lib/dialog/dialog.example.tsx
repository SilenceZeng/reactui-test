import React, { useState } from 'react';
import Dialog, { alert, confirm, modal } from './dialog';

export default function () {
  const [x, setX] = useState(false);
  const [y, setY] = useState(false);
  const openModal = () => {
    const close = modal(
      <h1>你好<button onClick={() => close()}>close</button></h1>
    )
  }

  return (
    <div>
      <div>
        <h1>example 1</h1>
        <button onClick={() => setX(!x)}>click</button>
        <Dialog
          visible={x}
          buttons={[
            <button onClick={() => setX(false)}>1</button>,
            <button onClick={() => setX(false)}>2</button>,
          ]}
          onClose={() => setX(false)}
        />
      </div>
      <div>
        <h1>example 2</h1>
        <button onClick={() => setY(!y)}>click</button>
        <Dialog
          visible={y}
          buttons={[
            <button onClick={() => setY(false)}>1</button>,
            <button onClick={() => setY(false)}>2</button>,
          ]}
          onClose={() => setY(false)}
        />
      </div>
      <div>
        <h1>example 3</h1>
        <button
          onClick={() => {
            alert('hi');
          }}
        >
          click
        </button>
        <button
          onClick={() => {
            confirm(
              'hi',
              () => {
                console.log('你点击了 yes');
              },
              () => {
                console.log('你点击了 no');
              }
            );
          }}
        >
          click
        </button>
      </div>
      <div>
        <h1>example 4</h1>
        <button
          onClick={openModal}
        >
          click
        </button>
      </div>
    </div>
  );
}
