import { useState, useEffect } from 'react'
import './Jeu-timing.css'

export default function JeuTiming() {
    const [estActif, setEstActif] = useState(false)
    const [tempsDebut, setTempsDebut] = useState(null)
    const [tempsReaction, setTempsReaction] = useState(null)
    const [jeuDemarre, setJeuDemarre] = useState(false)
    const [aPerdu, setAPerdu] = useState(false)
    const [aGagne, setAGagne] = useState(false)
    const LIMITE_TEMPS = 400 // 400ms = 0.4 seconde

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
                setTempsReaction('Trop lent ! (plus de 400ms)')
                setEstActif(false)
                setJeuDemarre(false)
                setAPerdu(true)
            }, LIMITE_TEMPS)

            return () => clearTimeout(minuteurDefaite)
        }
    }, [estActif])

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
                setTempsReaction('Trop lent ! (plus de 400ms)')
                setAPerdu(true)
            } else {
                setTempsReaction(reaction)
                setAGagne(true)
            }

            setEstActif(false)
            setJeuDemarre(false)
        } else if (!aPerdu && !aGagne) {
            setTempsReaction('Trop tôt !')
            setJeuDemarre(false)
        }
    }

    const reinitialiserJeu = () => {
        setAPerdu(false)
        setAGagne(false)
        setJeuDemarre(false)
        setEstActif(false)
        setTempsReaction(null)
        setTempsDebut(null)
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
            {(aPerdu || aGagne) && (
                <button 
                    onClick={reinitialiserJeu}
                    className="game-button"
                >
                    {aPerdu ? 'Recommencer' : 'Rejouer'}
                </button>
            )}
        </div>
    )
}