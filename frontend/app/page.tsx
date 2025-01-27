"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import ContractAddress from "@/contracts/contract-address.json";
import abi from "@/contracts/StoreInt.json";

const contractAddress = ContractAddress.StoreInt;
const contractABI = abi.abi;
// const SEPOLIA_NETWORK_ID = "11155111";
const HARDHAT_NETWORK_ID = "31337";

interface StateType {
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  contract: ethers.Contract | null;
}

export default function Home() {
  const [state, setState] = useState<StateType>({
    provider: null,
    signer: null,
    contract: null,
  });

  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [unsignedValue, setUnsignedValue] = useState("");
  const [signedValue, setSignedValue] = useState("");
  const [retrievedValues, setRetrievedValues] = useState<{ unsigned: number | null; signed: number | null }>({
    unsigned: null,
    signed: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        window.ethereum.on("chainChanged", () => window.location.reload());
        window.ethereum.on("accountsChanged", () => window.location.reload());

        if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
          setState({ provider, signer, contract });
          setUserAddress(accounts[0]);
        } else {
          setUserAddress("Other Network");
        }
      } else {
        alert("Please install MetaMask");
      }
    };
    connectWallet();
  }, []);

  const storeValue = async (type: "unsigned" | "signed", value: string) => {
    if (!value) return alert("Please enter a value");

    try {
      const tx = type === "unsigned"
        ? await state.contract?.storeUint(parseInt(value))
        : await state.contract?.storeInt(parseInt(value));

      await tx.wait();
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} value stored successfully!`);
      retrieveValues();
    } catch (error) {
      console.error(`Error storing ${type} value:`, error);
    }
  };

  const retrieveValues = async () => {
    try {
      const unsignedVal = await state.contract?.retrieveUint();
      const signedVal = await state.contract?.retrieveInt();

      setRetrievedValues({
        unsigned: unsignedVal ? Number(unsignedVal) : null,
        signed: signedVal ? Number(signedVal) : null,
      });
    } catch (error) {
      console.error("Error retrieving values:", error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">StoreInt DApp</h1>
        <h2 className="text-sm font-bold mb-4 text-center">Your Address: {userAddress || "Not Connected"}</h2>

        <div className="mb-6">
          <input
            type="number"
            className="w-full p-2 mb-2 border rounded"
            placeholder="Enter unsigned integer"
            value={unsignedValue}
            onChange={(e) => setUnsignedValue(e.target.value)}
          />
          <button onClick={() => storeValue("unsigned", unsignedValue)} className="w-full bg-blue-500 text-white p-2 rounded">
            Store Unsigned Integer
          </button>
        </div>

        <div className="mb-6">
          <input
            type="number"
            className="w-full p-2 mb-2 border rounded"
            placeholder="Enter signed integer"
            value={signedValue}
            onChange={(e) => setSignedValue(e.target.value)}
          />
          <button onClick={() => storeValue("signed", signedValue)} className="w-full bg-blue-500 text-white p-2 rounded">
            Store Signed Integer
          </button>
        </div>

        <button onClick={retrieveValues} className="w-full bg-green-500 text-white p-2 rounded mb-6">
          Retrieve Values
        </button>

        <div className="text-center mb-4">
          <h2 className="text-lg font-bold">Stored Values:</h2>
          <p>Unsigned: {retrievedValues.unsigned ?? "N/A"}</p>
          <p>Signed: {retrievedValues.signed ?? "N/A"}</p>
        </div>
      </div>
    </div>
  );
}
