import React, { useState } from 'react';
import Dialog from './dialog';

export default function () {
  const [y, setY] = useState(false);

  return (
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
  );
}
