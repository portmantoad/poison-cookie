import React, { Component } from 'react';
import debounce from 'lodash/debounce';

const debounceActiveRender = (ComponentToDebounce, ...debounceArgs) => {
    return class DebouncedContainer extends Component {
        updateDebounced = debounce(this.forceUpdate, ...debounceArgs);

        shouldComponentUpdate(nextProps, nextState) {
          if (nextProps.active && !this.props.active) {
            this.updateDebounced();
            return false;
          } else {
            this.updateDebounced.cancel();
            return true
          }
        }

        componentWillUnmount() {
            this.updateDebounced.cancel();
        }

        render() {
            return <ComponentToDebounce {...this.props} />;
        }
    }
};

export default debounceActiveRender