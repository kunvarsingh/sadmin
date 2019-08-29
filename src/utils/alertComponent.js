import React from 'react';
import Alert from 'react-s-alert';


export default class AlertContentTemplate extends React.Component {
  render() {
    let style = this.props.customFields && this.props.customFields.displayComponent ? { backgroundColor: '#f39500', zIndex: 2000 } : { zIndex: 2000 };
    
    return (
      <div className={this.props.classNames} id={this.props.id} style={style}>
        {
          this.props.customFields && this.props.customFields.displayComponent ? (
            <div>
              <div className='s-alert-box-inner'>
                {this.props.message}
              </div>
              {this.props.customFields.customButtons ? (
                <div>
                  {this.props.customFields.customButtons.map((button, index) => {
                    return <button key={index} className="whtbtnsm" onClick={(e) => button.handleClick(e, button.param)}>{button.name.toUpperCase()}</button>;
                  })
                  }
                </div>
              ) : (
                <div>
                  <h3>{this.props.customFields.customerName}</h3>
                  <button className="whtbtnsm" onClick={(e) => this.props.customFields.handleButtonClick(e, this.props.customFields.id, this.props.customFields.userID, this.props.customFields.isActive)}>YES</button>
                  <button className="whtbtnsm" onClick={(e) => Alert.closeAll(this.props.id)}>No</button>
                </div>
              )
              }
            </div>
          ) : (
            <div className='s-alert-box-inner'>
              {this.props.message}
              {/* use this api to customize alert style */}
              {/* {this.props.condition} */}
            </div>
          )
        }
        <span className='s-alert-close' onClick={(e) => Alert.close(this.props.id)}>close</span>
      </div>
    );
  }
}
