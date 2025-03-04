import React, { Component } from 'react';
import './PlayerSubmissionForm.css';
import PropTypes from 'prop-types';

class PlayerSubmissionForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      adj1: '',
      noun1: '',
      adv: '',
      verb: '',
      adj2: '',
      noun2: '',
    };
  }

  resetState = () => {
    this.setState({
      adj1: '',
      noun1: '',
      adv: '',
      verb: '',
      adj2: '',
      noun2: '',
    });
  }

  onInputChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    
    const updatedState = {};
    updatedState[field] = value;
    this.setState(updatedState);
  }

  inputFields = () => {
    return this.props.fields.map((field, i) => {
      if (!field.key) {
        return field
      } else {
        return <input name={field.key}
          className={this.state[field.key] === '' ? 'PlayerSubmissionFormt__input--invalid' : 'PlayerSubmissionFormt__input'}
          key={i}
          placeholder={field.placeholder}
          onChange={this.onInputChange}
          value={this.state[field.key]}
          type='text'
          />
      }
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    let poem = '';
    const fields = this.props.fields

    let i;
    for (i = 0; i < fields.length; i++) {
      if (fields[i].key) {
        poem += this.state[fields[i].key] + ' ';
      } else {
        poem += fields[i] + ' ';
      }
    }

    this.props.onSubmitFormCallback(poem);
    this.resetState();
  }

  render() {
    return (
      <div className="PlayerSubmissionForm">
        <h3>Player Submission Form for Player #{this.props.playerNumber}</h3>

        <form onSubmit={this.onSubmit} className="PlayerSubmissionForm__form" >

          <div className="PlayerSubmissionForm__poem-inputs">
            {this.inputFields()}
          </div>

          <div className="PlayerSubmissionForm__submit">
            <input type="submit" value="Submit Line" className="PlayerSubmissionForm__submit-btn" />
          </div>
        </form>
      </div>
    );
  }
}

PlayerSubmissionForm.propTypes = {
  onSubmitFormCallback: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  playerNumber: PropTypes.number.isRequired,
};

export default PlayerSubmissionForm;
