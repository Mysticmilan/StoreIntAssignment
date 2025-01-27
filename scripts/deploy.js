const path = require("path");
const fs = require("fs");
const hre = require("hardhat");

async function main() {
  // Get the deployer's account address
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the StoreInt contract
  const storeIntContract = await hre.ethers.deployContract("StoreInt");
  await storeIntContract.waitForDeployment();  // Ensure deployment is complete

  const contractAddress = await storeIntContract.getAddress();
  console.log("StoreInt contract deployed at:", contractAddress);

  // Save contract details for frontend use
  saveFrontendFiles(contractAddress);
}

// Function to save deployed contract details for frontend
function saveFrontendFiles(contractAddress) {
  const contractsDir = path.join(__dirname, "..", "frontend", "contracts");

  // Create the contracts directory if it does not exist
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  // Save contract address
  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ StoreInt: contractAddress }, null, 2)
  );

  // Save contract ABI
  const storeIntArtifact = hre.artifacts.readArtifactSync("StoreInt");

  fs.writeFileSync(
    path.join(contractsDir, "StoreInt.json"),
    JSON.stringify(storeIntArtifact, null, 2)
  );

  console.log("Contract artifacts saved to:", contractsDir);
}

// Execute the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
