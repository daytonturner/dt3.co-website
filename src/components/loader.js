import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import styled from 'styled-components';
import { IconLoader } from '@components/icons';

const StyledLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--dark-navy);
  z-index: 99;
  overflow: hidden;

  .logo-wrapper {
    width: 100%;
    max-width: 95vw; /* Increased from 90vw to 95vw */
    padding: 0 10px; /* Changed from 5% to fixed 10px */
    box-sizing: border-box;
    transition: var(--transition);
    opacity: ${props => (props.isMounted ? 1 : 0)};
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: visible;
    svg {
      display: block;
      height: auto;
      max-width: 100%;
      max-height: 70px;
      flex-shrink: 0;
      fill: none;
      user-select: none;
      #textContainer {
        opacity: 0;
      }
      #chev2 {
        opacity: 0;
      }
      #chev3 {
        opacity: 0;
      }
    }
  }

  @media (max-width: 480px) {
    .logo-wrapper {
      max-width: 95vw; /* Increased from 85vw to 95vw */
      padding: 0 5px; /* Reduced padding for mobile */
    }

    svg {
      max-height: 50px;
    }
  }
`;

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader
      .add({
        targets: '#logo #chev1',
        delay: 200,
        duration: 600,
        easing: 'easeInOutQuart',
        translateX: [-20, 0], // Reduced from 30 to 20
        translateY: [20, 0], // Reduced from 30 to 20
      })
      .add({
        targets: '#logo #chev2',
        duration: 300,
        easing: 'easeInOutQuart',
        opacity: 1,
        translateY: [-20, 0], // Reduced from 30 to 20
      })
      .add({
        targets: '#logo #chev3',
        duration: 300,
        easing: 'easeInOutQuart',
        opacity: 1,
        translateX: [20, 0], // Reduced from 30 to 20
        translateY: [20, 0], // Reduced from 30 to 20
      })
      .add({
        targets: '#logo',
        duration: 300,
        easing: 'easeInOutQuart',
        scale: 0.9,
        translateX: [0, -30], // Adjust to move logo left
      })
      .add({
        targets: '#logo #textContainer',
        duration: 300,
        easing: 'easeInOutQuart',
        opacity: 1,
        translateX: [0, 90], // Increased from 60 to 90 for more spacing
      })
      .add({
        targets: '#logo',
        delay: 500,
        duration: 300,
        easing: 'easeInOutQuart',
        opacity: 0,
        scale: 0.1,
        translateX: 0,
      })
      .add({
        targets: '.loader',
        duration: 200,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledLoader className="loader" isMounted={isMounted}>
      <Helmet bodyAttributes={{ class: `hidden` }} />

      <div className="logo-wrapper">
        <IconLoader />
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
