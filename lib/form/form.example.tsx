import React, { useState } from 'react';
import Button from '../button/button';
import Form from './form';
import { FormValue } from './form';
import Validator, { noError } from './validator';

const usernames = ['frank', 'jack', 'frankfrank', 'alice', 'bob'];
const checkUserName = (
  username: string,
  succeed: () => void,
  fail: () => void
) => {
  setTimeout(() => {
    console.log('我现在知道用户名是否存在');
    if (usernames.indexOf(username) >= 0) {
      fail();
    } else {
      succeed();
    }
  }, 2000);
};

const FormExample = () => {
  const [value, setValue] = useState<FormValue>({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const onChange = (value: FormValue) => {
    // console.log(value);
    setValue(value);
  };

  const validator = (username: string) => {
    return new Promise<string | void>((resolve, reject) => {
      checkUserName(
        username,
        () => resolve(),
        () => reject('unique')
      );
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const rules = [
      { key: 'username', required: true },
      { key: 'username', min: 3, max: 8 },
      { key: 'username', validator },
      { key: 'username', pattern: /^[A-Za-z0-9]+$/ },
      { key: 'password', required: true },
    ];
    Validator(value, rules, (errors) => {
      console.log(errors);
      setErrors(errors);
      if (noError(errors)) {
        // 没错
      }
    });
  };

  const transformError = (message: string) => {
    const map: any = {
      unique: 'username is taken',
      required: 'required',
      min: 'too short',
      max: 'too long',
    };
    return map[message];
  };

  return (
    <div>
      <h1>example 1</h1>
      <Form
        value={value}
        onSubmit={onSubmit}
        fields={[
          {
            name: 'username',
            label: '用户名',
            input: {
              type: 'text',
            },
          },
          {
            name: 'password',
            label: '密码',
            input: {
              type: 'password',
            },
          },
        ]}
        errors={errors}
        buttons={
          <>
            <Button type="submit" level="important">
              提交
            </Button>
            <Button>返回</Button>
          </>
        }
        transformError={transformError}
        onChange={onChange}
      />
    </div>
  );
};

export default FormExample;
