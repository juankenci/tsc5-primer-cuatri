
import React, {useState} from 'react';

import '../styles/LandingArrowTop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowUp, faCoffee } from '@fortawesome/free-solid-svg-icons'

const LandingArrowTop = () =>{

  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400){
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400){
      setShowScroll(false)
    }
  };

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  window.addEventListener('scroll', checkScrollTop)

  return (
        <>
      
        <FontAwesomeIcon icon={faCircleArrowUp} className="scrollTop" onClick={scrollTop} style={{height: 40, justifyContent:  'flex-end' ,display: showScroll ? 'flex' : 'none'}} />
        
      
        </>
        );
}

export default LandingArrowTop;