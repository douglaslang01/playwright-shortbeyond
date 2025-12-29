export function generateULID() {
    const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
    const TIME_LENGTH = 10;
    const RANDOM_LENGTH = 16;

    // Timestamp em milissegundos
    let time = Date.now();
    let timeChars = '';

    for (let i = 0; i < TIME_LENGTH; i++) {
        timeChars = ENCODING[time % 32] + timeChars;
        time = Math.floor(time / 32);
    }

    // Parte aleatória (80 bits)
    let randomChars = '';
    for (let i = 0; i < RANDOM_LENGTH; i++) {
        randomChars += ENCODING[Math.floor(Math.random() * 32)];
    }

    return timeChars + randomChars;
}