import { InventoryItem } from "./types";

const TEST_DELAY = 200;

export async function isOrderingEnabled(): Promise<boolean> {
  await testDelay();
  return true;
}

export async function getInventory(): Promise<InventoryItem[]> {
  await testDelay();
  return [
    {
      name: "Coffee",
      description: "Basic unspecified coffee"
    },
    {
      name: "Hot Chocolate"
    }
  ];
}

// Temporary test funcion to ensure our ui plays nice with simulated network delays.
function testDelay(): Promise<void> {
  return new Promise(accept => {
    setTimeout(accept, TEST_DELAY);
  });
}
