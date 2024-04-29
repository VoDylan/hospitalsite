import React, {useState} from 'react';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import {Box, IconButton} from "@mui/material";

const ScrollTopButton = () =>{

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300){
      setVisible(true);
    }
    else if (scrolled <= 300){
      setVisible(false);
    }
  };

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
        in place of 'smooth' */
    });
  };

  const scrollTimeout = () => {
    // Scrolls again after webpage updates from weather interrupting scroll
    scrollToTop();
    setTimeout(scrollToTop, 665);
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <Box
      style={{display: visible ? 'inline' : 'none'}}
    >
      <IconButton
        onClick={scrollTimeout}
        aria-label={"scroll up"}
        sx={{
          backgroundColor: "lightgray",
          position: "fixed",
          bottom: "40px",
          left: "95%",
        }}
      >
        <ArrowUpwardRoundedIcon
          sx={{
            color: "Black"
          }}
        />
      </IconButton>
    </Box>
  );
};

export default ScrollTopButton;
