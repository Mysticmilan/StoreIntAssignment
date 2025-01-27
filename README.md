# Blockchain UI for Storing and Retrieving uint and int using Smart Contract

This project demonstrates a simple user interface (UI) for storing and retrieving `uint` and `int` values on the blockchain using a smart contract. The tech stack includes Next.js for the UI, Hardhat for smart contract deployment, Ether.js for blockchain interaction, and MetaMask for wallet management.

## Tech Stack
- **Frontend**: Next.js
- **Blockchain**: Hardhat, Ether.js
- **Wallet**: MetaMask

## Setup Instructions

### Prerequisites
- Ensure you have MetaMask installed in your browser.
- Set up MetaMask and import some accounts to use in the project.

### Steps to Run the Project

1. **Start the Blockchain Node**:
   - In the root directory of the project, open a terminal and run:
     ```bash
     npx hardhat node
     ```

2. **Compile and Deploy the Smart Contract**:
   - In the same root directory, open another terminal and run:
     ```bash
     npm run hardhat
     ```

3. **Run the Frontend UI**:
   - Go to the `frontend` directory and run:
     ```bash
     npm run dev
     ```

   This will start the UI locally, allowing you to interact with the smart contract via MetaMask.
