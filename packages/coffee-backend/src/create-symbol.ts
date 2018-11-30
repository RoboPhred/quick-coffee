export default function createSymbol(path: string): symbol {
  return Symbol.for(`com.github/robophred/coffee-frontend/${path}`);
}
