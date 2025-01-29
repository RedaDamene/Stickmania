import React from 'react';
import './Touiller.css';
import { useState } from 'react';




const Touiller = () => {
    const [Score, setScore] = useState(0);
    const [CenterCoords, setCenterCoords] = useState({ x: 0, y: 0 });
    const Cuillere = React.useRef<HTMLDivElement>(null);
    const Center = React.useRef<HTMLDivElement>(null);
    const radius = 150; // Half the size of the circle (Bol width/height)
    const pointRadius = 5; // Size of each point
    const numberOfPoints = 50; // Number of points to place

    const points = Array.from({ length: numberOfPoints }, (_, index) => {
        const angle = (2 * Math.PI * index) / numberOfPoints;
        const x = CenterCoords.x + radius * Math.cos(angle) - pointRadius;
        const y = CenterCoords.y + radius * Math.sin(angle) - pointRadius;
        const distance = Math.sqrt((x - CenterCoords.x) ** 2 + (y - CenterCoords.y) ** 2);
        const angleDegrees = (Math.atan2(y - CenterCoords.y, x - CenterCoords.x) * 180) / Math.PI;
        return { distance, angleDegrees };
      });

    const Collision = (Cuillere: HTMLDivElement, Check1: HTMLDivElement) => {
        
        const CuillereRect = Cuillere.getBoundingClientRect();
        const Check1Rect = Check1.getBoundingClientRect();
        return !(
            CuillereRect.top > Check1Rect.bottom ||
            CuillereRect.right < Check1Rect.left ||
            CuillereRect.bottom < Check1Rect.top ||
            CuillereRect.left > Check1Rect.right
        );
    }
    const checkLineCollision = () => {
        const lines = document.querySelectorAll('.Line');
        const line2Count = document.querySelectorAll('.Line2').length;
        if (line2Count >= (lines.length * 2)) {
            document.querySelectorAll('.Line2').forEach((line2) => {
                line2.classList.replace('Line2', 'Line');
            });
        }
        lines.forEach((line) => {
            if (Cuillere.current && Collision(Cuillere.current, line as HTMLDivElement)) {
                const distanceDuCentre = Math.sqrt(
                    (Cuillere.current.getBoundingClientRect().left - CenterCoords.x) ** 2 +
                    (Cuillere.current.getBoundingClientRect().top - CenterCoords.y) ** 2
                );
                if ((distanceDuCentre / 1000) > 1) {
                    setScore((prevScore) => 
                        prevScore + (distanceDuCentre / 1000)
                    );
                    line.classList.replace('Line', 'Line2');
                }
            }
        });
        
    };

    const getCenterCoordinates = () => {
        const centerElement = document.querySelector('.Center');
        if (centerElement) {
          const rect = centerElement.getBoundingClientRect();
          setCenterCoords(() => ({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          }));
        }
      };

    React.useEffect(() => {

        document.addEventListener('mousemove', (e) => {
            const clientX = e.clientX;
            const clientY = e.clientY;
            if (Cuillere.current) {
                const mouseX = clientX - Cuillere.current.clientWidth / 2;
                const mouseY = clientY - Cuillere.current.clientHeight / 2;
                Cuillere.current.style.left = `${mouseX}px`;
                Cuillere.current.style.top = `${mouseY}px`;
            }
        });
        getCenterCoordinates();
        window.addEventListener('resize', getCenterCoordinates);
        const interval = setInterval(() => {
            checkLineCollision();
        }, 100);
        return () => clearInterval(interval);
        }, []);
        React.useEffect(() => {
            if (Score >= 200) {
                (document.querySelector('.Bol') as HTMLElement)!.style.backgroundColor = 'purple';
                console.log("you win");
            } else if (Score >= 150) {
                (document.querySelector('.Bol') as HTMLElement)!.style.backgroundColor = 'red';
            } else if (Score >= 50) {
                (document.querySelector('.Bol') as HTMLElement)!.style.backgroundColor = 'orange';
            }
            console.log(Score);
            }, [Score]);
    return (
        <div>
            {Score}
            <div className='Bol'></div>
            <div className='Center' ref={Center}></div>
            <div className='Cuillere' ref={Cuillere}></div>
            <div>
                {points.map((point, index) => (
                    <div key={index} className="Line" style={{width: `${point.distance}px`, left: `${CenterCoords.x}px`, top:`${CenterCoords.y}px`, transform: `rotate(${point.angleDegrees}deg)`}}></div>
                ))}
            </div>            
        </div>
    );
};

export default Touiller;