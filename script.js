import { Connection, PublicKey } from "@solana/web3.js";
import {
  WalletAdapterNetwork,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider, WalletModalButton } from "@solana/wallet-adapter-react-ui";

(async () => {
  const tokenAddress = "NYMZrPwuhqWLBv5et9FECfoAbbRoqYB12wjnLcMWDbN";
  const messageContainer = document.getElementById("message");
  const magicText = document.getElementById("magic-text");

  // Configuración de wallets disponibles
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new TorusWalletAdapter(),
  ];

  // Configuración del proveedor de wallets
  const walletProvider = new WalletProvider(wallets, WalletAdapterNetwork.Mainnet);

  document.addEventListener("DOMContentLoaded", () => {
    // Renderizar un botón para seleccionar y conectar wallets
    const walletModalButton = new WalletModalButton(walletProvider);
    document.body.appendChild(walletModalButton.render());

    walletProvider.on("connect", async (wallet) => {
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
    });
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
