import {
  Box,
  Button,
  ButtonGroup,
  createStyles,
  makeStyles,
  MenuItem,
  Paper,
} from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuList from '@material-ui/core/MenuList';
import Popper from '@material-ui/core/Popper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React, { useRef, useState } from 'react';
import { IIdentifiable } from '../../apollo_client/types';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      display: 'flex',
    },
    grow: {
      flex: '1 1 auto',
    },
  }),
);
const defaultSelecte: IIdentifiable = { id: '0', name: 'None' };

interface ISelectProps<T extends IIdentifiable> {
  state: T;
  options: T[];
  onChange: (selected: T) => void;
}
const Select = <T extends IIdentifiable>({
  state,
  options,
  onChange,
}: ISelectProps<T>) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    onChange(options[index]);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };
  return (
    <Box className={styles.root}>
      <ButtonGroup
        variant='contained'
        color='primary'
        ref={anchorRef}
        className={styles.grow}
      >
        <Button className={styles.grow}>
          {state?.name || defaultSelecte.name}
        </Button>
        <Button color='primary' size='small' onClick={handleToggle}>
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id='split-button-menu'>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option.id}
                      selected={
                        index === options?.findIndex((o) => o?.id === state?.id)
                      }
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
};

export default Select;
