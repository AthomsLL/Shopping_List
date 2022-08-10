const generateResetCode = () => {
    let minCode = 109473;
    let maxCode = 989647;

    const resetCode = Math.floor(Math.random() * (maxCode - minCode + 1)) + minCode;
    
    return resetCode;
}

module.exports = { generateResetCode }