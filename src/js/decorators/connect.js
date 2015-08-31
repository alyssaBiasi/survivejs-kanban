import React from 'react';

const connect = (Component, store) => {
  return class Connect extends React.Component {
    constructor(props) {
      super(props);

      this.storeChanged = this.storeChanged.bind(this);
      store.listen(this.storeChanged);
    }

    componentWillUnmount() {
      store.unlisten(this.storeChanged);
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }

    storeChanged() {
      this.setState(store.getState());
    }
  };
};

export default (store) => {
  return (target) => connect(target, store);
};

