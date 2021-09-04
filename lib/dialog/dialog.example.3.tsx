import React from 'react';
import { alert, confirm } from './dialog';

export default function () {
  return (
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
  );
}
