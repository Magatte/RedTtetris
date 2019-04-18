const playMusic = music => soundfile => {
    if (music) { // If music is true return a function
        try {
            const audio = new Audio(soundfile);
            audio.addEventListener('ended', () => {
                audio.currentTime = 0;
                audio.play().catch((error) => {console.log(error.message)});
            }, false);
            console.log(audio.currentTime);
            audio.play().catch((error) => {console.log(error.message)});
            
        } catch (error) {
            throw error;
        }
    }
}

export default playMusic;