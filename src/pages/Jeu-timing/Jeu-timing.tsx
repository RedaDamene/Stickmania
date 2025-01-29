import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Jeu-timing.css'

export default function JeuTiming() {
    const navigate = useNavigate()
    const [estActif, setEstActif] = useState(false)
    const [tempsDebut, setTempsDebut] = useState(null)
    const [tempsReaction, setTempsReaction] = useState(null)
    const [jeuDemarre, setJeuDemarre] = useState(false)
    const [aPerdu, setAPerdu] = useState(false)
    const [aGagne, setAGagne] = useState(false)
    const [compteARebours, setCompteARebours] = useState(null)
    const LIMITE_TEMPS = 500 // 500ms = 0.5 seconde

    useEffect(() => {
        if (jeuDemarre && !estActif) {
            const delai = Math.random() * 4000 + 1000
            const minuteur = setTimeout(() => {
                setEstActif(true)
                setTempsDebut(Date.now())
            }, delai)
            return () => clearTimeout(minuteur)
        }
    }, [jeuDemarre, estActif])

    useEffect(() => {
        if (estActif) {
            const minuteurDefaite = setTimeout(() => {
                setTempsReaction('Trop lent ! (plus de 500ms)')
                setEstActif(false)
                setJeuDemarre(false)
                setAPerdu(true)
                setCompteARebours(3)  // Redirection après timeout
            }, LIMITE_TEMPS)

            return () => clearTimeout(minuteurDefaite)
        }
    }, [estActif])

    useEffect(() => {
        if (compteARebours !== null && compteARebours > 0) {
            const timer = setTimeout(() => {
                setCompteARebours(prev => prev - 1)
            }, 1000)
            return () => clearTimeout(timer)
        } else if (compteARebours === 0) {
            navigate('/app/JeuDuClavier')
        }
    }, [compteARebours, navigate])

    useEffect(() => {
        const gererToucheClavier = (evenement) => {
            if (evenement.code === 'Space' && !aPerdu && !aGagne) {
                evenement.preventDefault()
                gererInteraction()
            }
        }

        window.addEventListener('keydown', gererToucheClavier)
        return () => window.removeEventListener('keydown', gererToucheClavier)
    }, [jeuDemarre, estActif, tempsDebut, aPerdu, aGagne])

    const gererInteraction = () => {
        if (!jeuDemarre && !aPerdu && !aGagne) {
            setJeuDemarre(true)
            setTempsReaction(null)
        } else if (estActif) {
            const tempsFin = Date.now()
            const reaction = tempsFin - tempsDebut

            if (reaction > LIMITE_TEMPS) {
                setTempsReaction('Trop lent ! (plus de 500ms)')
                setAPerdu(true)
                setCompteARebours(3)  // Redirection si trop lent
            } else {
                setTempsReaction(reaction)
                setAGagne(true)
                setCompteARebours(3)  // Redirection si gagné
            }

            setEstActif(false)
            setJeuDemarre(false)
        } else if (!aPerdu && !aGagne) {
            setTempsReaction('Trop tôt !')
            setJeuDemarre(false)
            setAPerdu(true)
            setCompteARebours(3)  // Redirection si trop tôt
        }
    }

    const obtenirCouleurFond = () => {
        if (!jeuDemarre) return 'bg-gray'
        if (estActif) return 'bg-green'
        return 'bg-red'
    }

    const obtenirMessage = () => {
        if (aPerdu) return 'Vous avez perdu !'
        if (aGagne) return 'Bravo, vous avez gagné !'
        if (!jeuDemarre) return 'Cliquez ou appuyez sur ESPACE pour commencer'
        if (estActif) return 'CLIQUEZ OU APPUYEZ SUR ESPACE!'
        return 'Attendez le vert...'
    }

    return (
        <div 
            className={`game-container ${obtenirCouleurFond()}`}
            onClick={!aPerdu && !aGagne ? gererInteraction : undefined}
        >
            <h1 className="game-title">Jeu de Timing</h1>
            <p className="game-message">{obtenirMessage()}</p>
            {tempsReaction && (
                <div className="game-result">
                    {typeof tempsReaction === 'number' 
                        ? `Temps de réaction : ${tempsReaction} ms`
                        : tempsReaction
                    }
                </div>
            )}
            {compteARebours !== null && (
                <div className="countdown">
                    Passage au jeu suivant dans {compteARebours}...
                </div>
            )}
        </div>
    )
}