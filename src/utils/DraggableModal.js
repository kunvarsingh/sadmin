import React, { Component } from 'react';
import ReactDynamicModal from 'react-draggable-resizable-modal';
import Alert from 'react-s-alert';

export default class DraggableModal extends Component {


  handleOnRequestClose = (e, payerServiceCodeId) => {
    Alert.warning('Are you sure, you want close this modal?', {
      position: 'bottom-right',
      effect: 'slide',
      timeout: 10000,
      customFields: {
        displayComponent: true,
        handleButtonClick: this.handleAlertClick,
        // id: payerServiceCodeId,
      },
    });
  };

  handleAlertClick = (event, payerServiceCodeId) => {
    this.props.handleClose();
    Alert.closeAll();
  };


  render() {
    const { handleClose } = this.props
    let that = this;
    document.onkeydown = function (evt) {
      evt = evt || window.event;
      var isEscape = false;
      if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
      } else {
        isEscape = (evt.keyCode === 27);
      }
      if (isEscape) {
        that.props.isOpen && that.handleOnRequestClose();
      }
    };
    let heightCheck = window.screen.availHeight - 200 < this.props.minHeight ? true : false;
    let width = Math.floor((window.screen.availWidth * 12) / 100);
    // this.props.handleClose
    return (
      <ReactDynamicModal onRequestClose={this.handleOnRequestClose}
        // initHeight={this.props.minHeight<400?400:this.props.minHeight}
        // minHeight={this.props.minHeight}
        initHeight={heightCheck ? window.screen.availHeight - 200 : (this.props.minHeight < 400 ? 400 : this.props.minHeight - 50)}
        minWidth={width}
        minHeight={heightCheck ? window.screen.availHeight - 200 : (this.props.minHeight < 400 ? 400 : this.props.minHeight - 50)}
        // minWidth={800}
        initWidth={this.props.width ? this.props.width : 800}
        isOpen={this.props.isOpen}
        headerValue={this.props.headerValue}
        data={this.props.data}
        actions={this.props.actions}
        footerText={this.props.footerText ? this.props.footerText : ''}
        iscloseButton={this.props.iscloseButton ? this.props.iscloseButton : false}
        overlay={this.props.overlay === false ? this.props.overlay : true}
      />
    );
  }
}