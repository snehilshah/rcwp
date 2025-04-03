import readline from "readline";

export async function userInput() {
  // Create interface for reading from stdin
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Wait for user to scan QR code
  console.log(
    "Please scan the QR code on WhatsApp Web and then press Enter..."
  );
  await new Promise<void>(resolve => {
    rl.question("", () => {
      console.log("Continuing execution...");
      resolve();
      rl.close();
    });
  });
}
