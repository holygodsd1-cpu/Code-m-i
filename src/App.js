import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const App = () => {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [network, setNetwork] = useState(null);
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
    }
  }, []);

  const connectMetaMask = async () => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (!accounts || accounts.length === 0) return;

      const selectedAccount = accounts[0];
      setAccount(selectedAccount);
      setIsConnected(true);

      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethProvider);

      const currentNetwork = await ethProvider.getNetwork();
      setNetwork(currentNetwork);

      const accountBalance = await ethProvider.getBalance(selectedAccount);
      setBalance(ethers.formatEther(accountBalance));

      window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length === 0) {
          disconnectMetaMask();
        } else {
          const newAccount = accounts[0];
          setAccount(newAccount);
          const newBalance = await ethProvider.getBalance(newAccount);
          setBalance(ethers.formatEther(newBalance));
        }
      });

      window.ethereum.on("chainChanged", async () => {
        const newNetwork = await ethProvider.getNetwork();
        setNetwork(newNetwork);
        if (account) {
          const newBalance = await ethProvider.getBalance(account);
          setBalance(ethers.formatEther(newBalance));
        }
      });
    } catch (error) {
      console.error("Error connecting to MetaMask or fetching balance", error);
      setBalance("0");
    }
  };

  const disconnectMetaMask = () => {
    setAccount(null);
    setIsConnected(false);
    setBalance("0");
  };

  // **Styles (không thay đổi logic, chỉ style phần UI)**
  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f9fafb",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    card: {
      backgroundColor: "#fff",
      padding: "40px 30px",
      borderRadius: "15px",
      boxShadow: "0 12px 25px rgba(0, 0, 0, 0.1)",
      width: "360px",
      textAlign: "center",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "25px",
      color: "#222",
    },
    infoText: {
      fontSize: "16px",
      marginBottom: "15px",
      color: "#444",
      wordBreak: "break-word",
    },
    button: {
      backgroundColor: "#f6851b",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      padding: "12px 20px",
      fontSize: "16px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "background-color 0.3s ease",
      marginTop: "20px",
    },
    buttonHover: {
      backgroundColor: "#e2761b",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Connect MetaMask</h1>
        {!isConnected ? (
          <button
            style={styles.button}
            onClick={connectMetaMask}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
          >
            Connect MetaMask
          </button>
        ) : (
          <>
            <p style={styles.infoText}>
              <strong>Connected Account:</strong> <br />
              {account}
            </p>
            <p style={styles.infoText}>
              <strong>Network:</strong> {network ? network.name : "N/A"}
            </p>
            <p style={styles.infoText}>
              <strong>Balance:</strong> {balance} ETH
            </p>
            <button
              style={styles.button}
              onClick={disconnectMetaMask}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
            >
              Disconnect
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
