import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './JeuStopBar.css'

export default function StopGame() {
    const navigate = useNavigate()
    const [position, setPosition] = useState(0)
    const [direction, setDirection] = useState(1)
    const [estArrete, setEstArrete] = useState(false)
    const [aGagne, setAGagne] = useState(false)
    const [compteARebours, setCompteARebours] = useState(null)
    const animationRef = useRef(null)
    const positionRef = useRef(position) // Pour suivre la position actuelle
    const speed = 1

    const targetZone = {
        start: 40,
        end: 60
    }

    // Mettre à jour la référence de position en même temps que l'état
    useEffect(() => {
        positionRef.current = position
    }, [position])

    useEffect(() => {
        const animate = () => {
            setPosition(prevPosition => {
                const newPosition = prevPosition + (direction * speed)

                if (newPosition >= 100) {
                    setDirection(-1)
                    return 100
                }
                if (newPosition <= 0) {
                    setDirection(1)
                    return 0
                }

                return newPosition
            })
            animationRef.current = requestAnimationFrame(animate)
        }

        if (!estArrete) {
            animationRef.current = requestAnimationFrame(animate)
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [direction, estArrete])

    useEffect(() => {
        if (compteARebours !== null && compteARebours > 0) {
            const timer = setTimeout(() => {
                setCompteARebours(prev => prev - 1)
            }, 1000)
            return () => clearTimeout(timer)
        } else if (compteARebours === 0) {
            navigate('/app/ProchainJeu')
        }
    }, [compteARebours, navigate])

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.code === 'Space' && !estArrete) {
                event.preventDefault()
                // Utiliser la référence de position pour la vérification
                const currentPos = positionRef.current
                const estDansZoneVerte = currentPos >= targetZone.start && currentPos <= targetZone.end
                
                setEstArrete(true)
                setAGagne(estDansZoneVerte)
                setCompteARebours(3)
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [estArrete])

    const handleClick = (e) => {
        e.preventDefault()  // Empêcher le comportement par défaut
        e.stopPropagation()  // Arrêter la propagation de l'événement
        if (!estArrete) {
            const estDansZoneVerte = position >= targetZone.start && position <= targetZone.end
            setEstArrete(true)
            setAGagne(estDansZoneVerte)
            setCompteARebours(3)
        }
    }

    return (
        <div 
            className="game-container"
            onClick={handleClick}
        >
            <h1 className="game-title">Arrête la barre dans la zone verte !</h1>
            
            <div className="game-bar">
                <div 
                    className="target-zone"
                    style={{
                        left: `${targetZone.start}%`,
                        width: `${targetZone.end - targetZone.start}%`
                    }}
                />
                
                <div 
                    className="moving-bar"
                    style={{ left: `${position}%` }}
                />
            </div>

            <div className="game-message">
                <div>
                    {!estArrete 
                        ? "Cliquez ou appuyez sur ESPACE pour arrêter la barre !"
                        : aGagne 
                            ? "Bravo ! Vous avez gagné !" 
                            : "Raté ! Essayez encore !"
                    }
                </div>
                {compteARebours !== null && (
                    <div className="countdown">
                        Passage au jeu suivant dans {compteARebours}...
                    </div>
                )}
            </div>
        </div>
    )
}