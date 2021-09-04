import React, { useState } from 'react';
import Dialog from './dialog';

export default function () {
  const [x, setX] = useState(false);

  return (
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
  );
}
