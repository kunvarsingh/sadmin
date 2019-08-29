import React from 'react';
// import TextField from '@material-ui/core/TextField';
import SelectField from 'material-ui/SelectField'



import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';

// import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import MaterialSelectField from 'material-ui-selectfield';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import AutoComplete from 'material-ui/AutoComplete';
import { DatePicker, InlineTimePicker } from "material-ui-pickers";
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import Select, { components } from 'react-select';
import Radio from '@material-ui/core/Radio';
import CreatableSelect from 'react-select';
// import { showWarningMessage } from '../actions/utilAction';
import RaisedButton from 'material-ui/RaisedButton';

const materialTheme = createMuiTheme({
  overrides: {
    MuiFormControl: {
      root: {
        width: '100%'
      }
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#00BAC3',
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: "white",
      },
    },
    MuiPickersDay: {
      day: {
        color: '#00BAC3',
      },
      isSelected: {
        backgroundColor: '#00BAC3',
      },
      current: {
        color: '#00BAC3',
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: '#00BAC3',
      },
    },
    MuiInput: {
      underline: {
        "&&&&:hover:before": {
          borderBottom: "1px solid rgba(0, 0, 0, 0.42)"
        },
        "&&&&:after": {
          borderBottom: "2px solid #66D6DB"
        },
        // borderBottom: "1px solid #66D6DB"
      }
    },
    MuiFormLabel: {
      focused: {
        "&$focused": {
          color: "#66D6DB"
        }
      }
    }
  },
});



export const renderTextField = ({
  input,
  label,
  id,
  multiLine,
  rowsMax,
  fullWidth,
  disabled,
  hintText,
  defaultValue,
  onChange,
  maxLength,
  loader,
  meta: { touched, error },
  customError,
  autoFocus,
  floatingLabelFixed,
  ...custom
}) => {
  return (
    <TextField
      id={id}
      defaultValue={defaultValue}
      autoFocus={autoFocus}
      floatingLabelText={label}
      floatingLabelFixed={floatingLabelFixed}
      errorText={touched && (error || customError)}
      multiLine={multiLine}
      hintText={hintText}
      rowsMax={rowsMax}
      disabled={disabled}
      fullWidth={true}
      className="valuefont"
      autoComplete='new-type'
      onChange={(event) => onChange}
      maxLength={maxLength}
      floatingLabelStyle={{ top: '30px', color: '#7a7a7a' }}
      floatingLabelFocusStyle={{ color: '#01B9C1' }}
      style={{ height: '62px ' }}
      inputStyle={{ marginTop: '10px' }}
      {...input}
      {...custom}
    />

  );
};


// Single Select No Async.
export const renderAutoCompleteSingleSelect = ({
  input,
  label,
  value,
  meta: { touched, error },
  handleUpdateInput,
  handleNewRequest,
  options,
  hintText,
  disabled,
  require,
  floatingLabelFixed,
  isCreatable,
  openOnFocus, customError,
  isScheduler,
  ...custom
}) => {

  let sourceArr = [];
  if (options && options.length) {
    options.map((obj) => {
      sourceArr[obj.id] = obj.value;
      return sourceArr;
    });
  }

  // let optionsList = [];
  if (options && options.length) {

    if (label === 'Default Location' || label === 'Location' || label === 'Office Location') {
      options.map(({ id, locationName }) => (
        <div key={id} value={id} label={locationName}>
          {locationName}
        </div>
      ));

    } else {
      options && options.length && options.map(({ id, value }) => (
        <div key={id} value={id} label={value}>
          {value}
        </div>
      ));
    }
  }
  let selectedObj = null;
  if (typeof input === 'object') {

    if (options && options.length) {
      if (label === 'Discipline' && options.length === 1) {
        selectedObj = { 'value': '', 'label': '' };
        selectedObj['value'] = options[0].id;
        selectedObj['label'] = options[0].value;
        if (options[0].key) selectedObj['key'] = options[0].key;
      }
      else if (label === 'Payer Name' && options.length === 1) {
        selectedObj = { 'value': '', 'label': '' };
        selectedObj['value'] = options[0].id;
        selectedObj['label'] = options[0].value;
        if (options[0].key) selectedObj['key'] = options[0].key;
        handleNewRequest(input, selectedObj);
      }
      else {
        options.map((i) => {
          if (i.id === input.value) {
            selectedObj = { 'value': '', 'label': '' };
            selectedObj['value'] = i.id;
            // selectedObj['label'] = label === 'Default Location' ? i.locationName.slice(0) : i.value;
            selectedObj['label'] = label === 'Default Location' || label === 'Office Location' ? i.locationName : i.value;
            if (i.key) selectedObj['key'] = i.key;
          }
          else if (isNaN(input.value) && isCreatable) {
            selectedObj = { 'value': '', 'label': '' };
            selectedObj['value'] = 0;
            selectedObj['label'] = input.value;
            if (input.key) selectedObj['key'] = input.key;
          }
          return selectedObj;
        });
      }
    }
  }


  const changeSelectedObj = (selectedValue) => {
    if (selectedValue === null) { //  Remove selection
      selectedObj = { 'value': null, 'label': '', key: '' };
      handleNewRequest(input, selectedObj);
    }
    else if (isCreatable && selectedValue.__isNew__) {
      selectedObj = { 'value': selectedValue.label, 'label': selectedValue.label, 'isNew': selectedValue.__isNew__, 'key': selectedValue.key };
      handleNewRequest(input, selectedObj);
    }
    else { // Apply Selection
      selectedObj = { 'value': selectedValue.id, 'label': selectedValue.label, 'key': selectedValue.key };
      handleNewRequest(input, selectedObj);
    }
  };


  // handleChange = (newValue, actionMeta) => {
  //   console.group('Value Changed');
  //   console.log(newValue);
  //   console.log(`action: ${actionMeta.action}`);
  //   console.groupEnd();
  // };
  const handleInputChange = (inputValue, actionMeta) => {
    // console.group('Input Changed');
    // console.log(inputValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
  }

  let optionsListItem = [];
  if (options && options.length) {
    options && options.forEach(function (data) {
      let obj = {};
      obj = { ...data };
      obj.label = data.value;
      if (data.key) {
        // console.log('i found key',data.key)
        obj.key = data.key;
      }
      optionsListItem.push(obj);
    });
  }
  return (
    <div style={{ marginTop: isScheduler ? '0px' : '-34px' }}>
      <span style={{
        color: 'rgba(0, 0, 0, 0.54)',
        'paddingLeft': 10,
        'fontSize': '0.8rem',
        'fontFamily': '"Roboto", "Helvetica", "Arial", sans-serif',
      }}>
        {input.value && input.value.length ? label : ''}
        {(input.value && input.value.length && require) ? (<span style={{ color: '#ff0000' }}> *</span>) : ''}
      </span>
      {!isCreatable ? <div><Select
        isClearable
        // components={{ DropdownIndicator }}
        // styles={customStyles}
        value={selectedObj}
        onChange={(value) => changeSelectedObj(value) && input.onChange(value)}
        onBlur={(value) => !selectedObj && input.onBlur(value)}
        options={optionsListItem}
        isSearchable={true}
        placeholder={<span style={{ color: '#ff0000' }}><span style={{ color: 'grey' }}>{label}</span> {require ? ' *' : ''}</span>}
        // isMulti
        // defaultValue={[selectedObj]}
        isDisabled={disabled ? disabled : false}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          error: error,
          touched: touched,
          colors: {
            ...theme.colors,
            // primary25: 'hotpink',
            primary: '#2FB9C1',
            borderBottom: '#ff0000'
          },
        })}
      />
        <div>{(touched && error) &&
          <div style={{ position: 'relative', fontSize: 12, color: 'rgb(244, 67, 54)', transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms' }}>
            {error}</div>}</div>
      </div>
        :
        <div>
          <CreatableSelect
            isClearable
            onChange={(value) => changeSelectedObj(value) && input.onChange(value)}
            onBlur={(value) => !selectedObj && input.onBlur(value)}
            // onInputChange={handleInputChange}
            // components={{ DropdownIndicator }}
            // styles={customStyles}
            value={selectedObj}
            options={optionsListItem}
            isSearchable={true}
            placeholder={<span style={{ color: '#ff0000' }}><span style={{ color: 'grey' }}>{label}</span> {require ? ' *' : ''}</span>}
            // isMulti
            // defaultValue={[selectedObj]}
            // isDisabled={isLoading}
            // isLoading={isLoading}
            isDisabled={disabled ? disabled : false}
            theme={(theme) => ({
              ...theme,
              error: error,
              touched: touched,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                // primary25: 'hotpink',
                primary: '#2FB9C1',
              },
            })}
          />
          <div>{(touched && error) &&
            <div style={{ position: 'relative', fontSize: 12, color: 'rgb(244, 67, 54)', transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms' }}>
              {error}</div>}</div>
        </div>
      }
    </div>
  );
};
// render MultiSelection Fields for multiple items ...
export const renderAutoCompleteMultipleSelection = ({
  input,
  label,
  meta: { touched, error },
  handleUpdateInput,
  handleNewRequest,
  options,
  require,
  className,
  disabled,
  customError,
  isCreatable,
  ...custom
}) => {

  // let optionsList = [];
  let defaultSelected = [];
  let newValue = null;

  if (options && options.length) {
    if (label === 'Location') {
      options.map(({ id, locationName }) => {
        if (input.value.length) {
          input.value.map((selected) => {
            if (selected === id) {
              defaultSelected.push({
                label: locationName,
                value: id,
              });
            }
            return defaultSelected;
          });
        }
        return (
          <div key={id} value={id} label={locationName}>
          {locationName}
        </div>
        );
      });
    } else {
      options.map(({ id, value }) => {
        if (input.value.length) {
          input.value.map((selected) => {
            if (selected === id) {
              defaultSelected.push({
                label: value,
                value: id,
              });
            }
            else if (isNaN(selected) && isCreatable && !newValue) {
              defaultSelected.push({
                label: selected,
                value: 0,
              });
              newValue = { 'value': 0, 'label': selected };
            }
            return defaultSelected;
          });
        }
        return (
          <div key={id} value={id} label={value}>
            {value}
          </div>
        );
      });
    }
  }
}

export const renderTimePicker = ({ input, name, dialogBodyStyle, dialogStyle, hintText, onDismiss, onShow, onDateChange, format, selected, fullWidth, disabled, placeholder, meta: { touched, error, warning } }) => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <MuiThemeProvider theme={materialTheme}>
        <InlineTimePicker
          keyboard
          label={placeholder}
          value={selected !== null ? new Date(selected) : {}}
          onChange={(value) => onDateChange(input, value)}
          mask={[/\d/, /\d/, ":", /\d/, /\d/, " ", /a|p/i, "M"]}
          disabled={disabled}
          autoOk={true}
        />
      </MuiThemeProvider>
    </MuiPickersUtilsProvider>
  );
};

export const renderToggleButton = ({
  input,
  name,
  label,
  fullWidth,
  defaultToggled,
  className,
  toggled,
  meta: { touched, error },
  onChange,
  thumbStyle,
  trackStyle,
  thumbSwitchedStyle,
  trackSwitchedStyle,
}) => {
  return (
    <Toggle
      name={name}
      label={label}
      className={className}
      thumbStyle={thumbStyle}
      trackStyle={trackStyle}
      thumbSwitchedStyle={thumbSwitchedStyle}
      trackSwitchedStyle={trackSwitchedStyle}
      defaultToggled={defaultToggled}
      toggled={toggled}
      onToggle={(value) => input.onChange(value)}
      labelPosition="right"
    />
  );
};


export const CommonButton = ({ name, title, label, onTouchTap, onClick, disabled, type, primary, fullWidth, className, icon }) => {
  return (
    <RaisedButton
      name = {name}
      title = {title}
      primary= {primary}
      fullWidth = {fullWidth}
      type = {type}
      className= {className}
      label={label}
      onClick={onClick}
      onTouchTap={onTouchTap}
      disabled= {disabled}>
      {icon}
    </RaisedButton>
  );
};