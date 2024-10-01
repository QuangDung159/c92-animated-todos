/* eslint-disable react/display-name */
import { useStyledSystemPropsResolver } from 'native-base';
import React, { forwardRef } from 'react';

export const makeStyledComponent = (Comp: any) => {
  return forwardRef((props: any, ref: any) => {
    const [style, restProps] = useStyledSystemPropsResolver(props);
    return (
      <Comp {...restProps} style={style} ref={ref}>
        {props.children}
      </Comp>
    );
  });
};
