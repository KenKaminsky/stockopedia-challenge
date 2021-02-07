import {
  Box,
  Button,
  ButtonGroup,
  createStyles,
  makeStyles,
  MenuItem,
  Paper,
  Theme,
} from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import MenuList from '@material-ui/core/MenuList';
import Popper from '@material-ui/core/Popper';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React, { useRef, useState } from 'react';
import { IIdentifiable } from '../../../apollo_client/types';

const useStyles = makeStyles((theme: Theme) =>
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

interface ISelectProps<T extends IIdentifiable> {
  options: T[];
  initialIndex?: number;
  onChange: (selected: T) => void;
}

const Select = <T extends IIdentifiable>({
  options,
  onChange,
  initialIndex,
}: ISelectProps<T>) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(initialIndex || 0);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex].name}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
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
        <Button onClick={handleClick} className={styles.grow}>
          {options[selectedIndex].name}
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
        // placement={'bottom'}
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
                      selected={index === selectedIndex}
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
