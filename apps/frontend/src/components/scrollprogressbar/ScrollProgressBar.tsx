import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { linearProgressClasses, styled } from '@mui/material';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    width: '100%',
    paddingTop: '119px',
    zIndex: -1,

  },
});

const StatusBar: React.FC = () => {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const computeProgress = () => {
      // The scrollTop gives length of window that has been scrolled
      const scrolled = document.documentElement.scrollTop;
      // scrollHeight gives total length of the window and
      // The clientHeight gives the length of viewport
      const scrollLength =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const newProgress = (100 * scrolled) / scrollLength;

      setProgress(newProgress);
    };

    // Adding event listener on mounting
    window.addEventListener('scroll', computeProgress);

    // Removing event listener upon unmounting
    return () => window.removeEventListener('scroll', computeProgress);
  }, []);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },

  }));

  return (
    <div className={classes.root}>
      <BorderLinearProgress variant="determinate" value={progress} />
    </div>
  );
};

export default StatusBar;
