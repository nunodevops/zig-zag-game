class Translate {
    static anoAtual = new Date().getFullYear();
    static text = {
        PT: {
            startMessage: "Toque para mudar de direção.",
            levelComplete: "Nível concluído!",
            nextLevel: "Próximo Nível",
            gameComplete: "Parabéns! Chegou ao fim!\nMais níveis brevemente.",
            restart: "Recomeçar",
            gameOver: "Perdeste!",
            pauseMessage: "Pausa",
            titleOfLevel_1: "ALTA VELOCIDADE",
        },
        EN: {
            startMessage: "Tap to change direction.",
            levelComplete: "Level completed!",
            nextLevel: "Next Level",
            gameComplete: "Congratulations! You won!\nMore levels soon.",
            restart: "Restart",
            gameOver: "Game Over",
            pauseMessage: "Pause",
            titleOfLevel_1: "HIGH SPEED",
        },
    };

    getTranslation(lang, message) {
        if (Translate.text[lang] && Translate.text[lang][message]) {
            return Translate.text[lang][message];
        }
    }
}
