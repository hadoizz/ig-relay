import { Slide, Dialog } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions'
import { forwardRef } from 'react';
import { DialogProps } from '@material-ui/core/Dialog';

const Transition = forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
})

export default (props: DialogProps) =>
  <Dialog
    TransitionComponent={Transition}
    keepMounted
    {...props}
  />