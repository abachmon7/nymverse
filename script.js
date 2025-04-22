(async () => {
  const tokenAddress = 'NYMZrPwuhqWLBv5et9FECfoAbbRoqYB12wjnLcMWDbN';
  const connectButton = document.getElementById('connect-wallet');
  const messageContainer = document.getElementById('message');
  const magicText = document.getElementById('magic-text');

  connectButton.addEventListener('click', async () => {
    try {
      // Conectar wallet usando Phantom
      const provider = window.solana;
      if (!provider || !provider.isPhantom) {
        alert('Phantom Wallet no está instalado. Por favor, instálalo e inténtalo de nuevo.');
        return;
      }

      const response = await provider.connect();
      const walletAddress = response.publicKey.toString();
      console.log('Wallet conectada: ', walletAddress);

      // Crear conexión a Solana
      const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));
      const balance = await connection.getTokenAccountsByOwner(
        new solanaWeb3.PublicKey(walletAddress),
        { mint: new solanaWeb3.PublicKey(tokenAddress) }
      );

      if (balance.value.length > 0) {
        messageContainer.classList.remove('hidden');
        typeWriterEffect('¡Tienes el token "NYM"! Bienvenido a la experiencia mágica.', magicText);
      } else {
        alert('No tienes el token requerido para acceder al contenido especial.');
      }
    } catch (error) {
      console.error('Error al conectar el wallet: ', error);
    }
  });

  function typeWriterEffect(text, element) {
    let index = 0;
    element.innerHTML = '';
    const interval = setInterval(() => {
      if (index < text.length) {
        element.innerHTML += text[index];
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  }
})();