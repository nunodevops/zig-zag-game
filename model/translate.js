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
            titleOfLevel_2: "DENTRO DO MATRIX",
            titleOfLevel_3: "Páscoa Feliz",

            messageCredits: "Programação:\n Discover Tours\n\n\nGráficos:\n https://www.svgrepo.com \n",
            credits: "Créditos",
            music: "♫",
            fx: "Fx",
            madeWith: `© ${this.anoAtual} Feito com ❤️ por `,
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
            titleOfLevel_2: "INSIDE THE MATRIX",
            titleOfLevel_3: "Happy Easter",

            messageCredits: "Programming:\n Discover Tours\n\n\n Graphics:\n https://www.svgrepo.com \n",
            credits: "Credits",
            music: "♫",
            fx: "Fx",
            madeWith: `© ${this.anoAtual} Made with ❤️ by `,
        },
    };

    getTranslation(lang, message) {
        if (Translate.text[lang] && Translate.text[lang][message]) {
            return Translate.text[lang][message];
        }
    }
}
