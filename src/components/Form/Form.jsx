import React, { Component, Fragment } from 'react';
import Form from 'arui-feather/form';
import FormField from 'arui-feather/form-field';
import Input from 'arui-feather/input';
import Button from 'arui-feather/button';
import Label from 'arui-feather/label';
import GridRow from "arui-feather/grid-row";
import GridCol from "arui-feather/grid-col";
import Select from 'arui-feather/select';
import { connect } from "react-redux";
import { loadForm } from '../../redux/actions/formActions';
import { sendForm } from '../../redux/actions/formActions';
import { bindActionCreators } from "redux";
import Plate from "arui-feather/plate";
import Heading from "arui-feather/heading";
import Paragraph from "arui-feather/paragraph";
import Spin from 'arui-feather/spin';

import './Form.css';

class FormTable extends Component {

  state = {
    form: {
      text: '',
      numeric: '',
      list: []
    }
  };

  componentDidMount() {
    this.props.loadForm();
  }

  configureInputs = (field, props={}) => {
    const inputs = {
      'TEXT': Input,
      'NUMERIC': Input,
      'LIST': Select
    };
    const Component = inputs[field.type];
    const computedProps = {
      ...props,
      width: 'available',
      name: field.name,
      placeholder: field.title,
      options: field.type === 'LIST' ? Object.keys(field.values)
        .map(item => ({
          value: item,
          text: field.values[item],
        })) : null,
      mode: field.type === 'LIST' ? 'radio': null,
      type: field.type === 'NUMERIC' ? 'number' : 'text',
      onChange: this.handleChange(field.name),
      value: this.state.form[field.name],

    };
    return <Component {...computedProps} />
  };

  handleChange = (name) => (value) => {
    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    })
  };

  handleSubmit = () => {
    const formToSend = {
      ...this.state.form,
      list: this.state.form.list[0]
    };
    this.props.sendForm(formToSend)
  };

  render() {
    const { form, formLoaded, formSend, sendFormResult } = this.props;
    if(!formLoaded) {
      return <span>
        <Button className="button_center"
          icon={
            <Spin
              size="m"
              visible={ true }
            />
          }
          size="m"
        >
                        Loading...
                    </Button>
      </span>
    }
    return (
      <Fragment>
        <h2 className='title-form'>{form.title}</h2>
        <Form onSubmit={ this.handleSubmit }>
          {form.fields.map((field, index) => {
            return (
              <FormField key={index}>
                <GridRow align='middle'>
                  <GridCol width={ { mobile: 4, tablet: 4, desktop: 4 } }>
                    <Label>{field.title}</Label>
                  </GridCol>
                  <GridCol width={ { mobile: 8, tablet: 8, desktop: 8 } }>
                    {this.configureInputs(field)}
                  </GridCol>
                </GridRow>
              </FormField>
              )
          })}
          <FormField>
            <Button className="button_center" view='extra' type='submit'>Отправить</Button>
          </FormField>
        </Form>
        {formSend ? <Plate hasCloser className="text-center">
            <Heading size='s'>
              Результат передачи данных
            </Heading>
            <Paragraph>
              {sendFormResult}
            </Paragraph>
          </Plate> :
          null}
        <img className="img-center" src={form.image} alt="images" />
      </Fragment>

    );
  }
}

const mapStateToProps = ({formReducer}) => ({
  form: formReducer.form,
  formLoaded: formReducer.formLoaded,
  formSend: formReducer.formSend,
  sendFormResult: formReducer.sendFormResult.result
});

const mapDispatchToProps = (dispatch) => bindActionCreators({loadForm, sendForm}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FormTable);