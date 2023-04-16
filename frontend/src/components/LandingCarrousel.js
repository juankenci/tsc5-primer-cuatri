import '../styles/LandingCarrousel.css';
import Carousel from 'react-bootstrap/Carousel';
import dataCarrousel from '../data/carrousel'


function LandingCarrousel() {
    return (
    

      <div className = "Carrousel hideMobile">
    
          <Carousel>
            {dataCarrousel.map((item,ix) => 
                      
                <Carousel.Item key={ix}>
                         <img
                           className="d-block w-100"
                           src={item.img}
                           alt=""
                         />
                    <Carousel.Caption>
                      <div className="carrouselText">
                        <h1 className="carrouselTitle" >{item.title}</h1>
                        <hr />
                        <p className="carrouselDesc">{item.desc}</p>
                      </div>
                    </Carousel.Caption>
                </Carousel.Item>
                       
             )


            }
            
            </Carousel>


      </div>
    

    );
  }
  
  export default LandingCarrousel;