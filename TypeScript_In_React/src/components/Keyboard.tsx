import type {JSX} from "react"
import {clsx} from "clsx"

type KeyboardProps = {
    alphabet: string,
    guessedLetters: string[],
    currentWord: string,
    isGameOver: boolean,
    addGuessedLetter: (letter: string) => void 
}

export default function Keyboard({
                                    alphabet,
                                    guessedLetters,
                                    currentWord,
                                    isGameOver,
                                    addGuessedLetter
                                } : KeyboardProps): JSX.Element {


    const keyboardElements = alphabet.split("").map(letter => {

                    const isGuessed = guessedLetters.includes(letter);
                    const isCorrect = isGuessed && currentWord.includes(letter);
                    const isWrong = isGuessed && !currentWord.includes(letter);
                    const className = clsx({
                        correct: isCorrect,
                        wrong: isWrong
                    })

                    return (
                        <button
                            className={className}
                            key={letter}
                            disabled={isGameOver}
                            aria-disabled={guessedLetters.includes(letter)}
                            aria-label={`Letter ${letter}`}
                            onClick={() => addGuessedLetter(letter)}
                        >
                            {letter.toUpperCase()}
                        </button>
                    );
                })
    
    return (
        <section className="keyboard">
            {keyboardElements}
        </section>
    );
}