import { Connection, PublicKey } from "@solana/web3.js";
import {
  WalletAdapterNetwork,
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";

(async () => {
  const tokenAddress = "NYMZrPwuhqWLBv5et9FECfoAbbRoqYB12wjnLcMWDbN";
  const connectButton = document.getElementById("connect-wallet");
  const messageContainer = document.getElementById("message");
  const magicText = document.getElementById("magic-text");

  connectButton.addEventListener("click", async () => {
    try {
      // Inicializa múltiples wallets
      const wallets = [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        new TorusWalletAdapter(),
      ];

      // Conectar usando el wallet seleccionado
      const wallet = wallets[0]; // Por ejemplo, Phantom
      await wallet.connect();

      const walletAddress = wallet.publicKey.toString();
      console.log("Wallet conectada: ", walletAddress);

      // Crear conexión a Solana
      const connection = new Connection(
        "https://api.mainnet-beta.solana.com"
      );
      const balance = await connection.getTokenAccountsByOwner(
        new PublicKey(walletAddress),
        { mint: new PublicKey(tokenAddress) }
      );

      if (balance.value.length > 0) {
        messageContainer.classList.remove("hidden");
        typeWriterEffect(
          '¡Tienes el token "NYM"! Bienvenido a la experiencia mágica.',
          magicText
        );
      } else {
        alert("No tienes el token requerido para acceder al contenido especial.");
      }
    } catch (error) {
      console.error("Error al conectar el wallet: ", error);
    }
  });

  function typeWriterEffect(text, element) {
    let index = 0;
    element.innerHTML = "";
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
