import React, { ReactFragment } from 'react';
import Input from '../input/input';
import './form.scss';

export interface FormField {
  name: string;
  label: string;
  input: {
    type: string;
  };
}

export interface FormValue {
  [K: string]: any;
}

interface Props {
  value: FormValue;
  fields: FormField[];
  buttons: ReactFragment;
  onChange: (value: FormValue) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  errors: { [K: string]: string[] };
  errorsDisplayMode?: 'first' | 'all';
  transformError?: (message: string) => string;
}

const Form: React.FC<Props> = (props) => {
  const { value, fields, buttons, onChange } = props;
  const formData = value;

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    props.onSubmit(e);
  };

  const onInputChange = (name: string, value: string) => {
    onChange({ ...formData, [name]: value });
  };

  const transformError = (message: string) => {
    const map: any = {
      required: '必填',
      min: '太短',
      max: '太长',
    };
    return (
      (props.transformError && props.transformError(message)) ||
      map[message] ||
      '未知错误'
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <table className="aui-form-table">
        <tbody>
          {fields.length > 0 &&
            fields.map((item) => (
              <tr className="aui-form-tr" key={item.name}>
                <td className="aui-form-td">
                  <span className="aui-form-label">{item.label}</span>
                </td>
                <td className="aui-form-td">
                  <Input
                    className="aui-form-input"
                    type={item.input.type}
                    value={formData[item.name]}
                    onChange={(e) => onInputChange(item.name, e.target.value)}
                  />
                  <div className="fui-form-error">
                    {props.errors[item.name] ? (
                      props.errorsDisplayMode === 'first' ? (
                        transformError!(props.errors[item.name][0])
                      ) : (
                        props.errors[item.name].map(transformError!).join()
                      )
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          <tr className="aui-form-tr">
            <td className="aui-form-td" />
            <td className="aui-form-td">{buttons}</td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

Form.defaultProps = {
  errorsDisplayMode: 'first',
};

export default Form;
