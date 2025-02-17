import { SUBSTITUTES } from "./constants";

// Track for substitutions used for each letter
const substitutionTracker: Record<string, string[]> = {};

function getRandomIndexFor(arr: string[]): number {
  return Math.floor(Math.random() * arr.length);
}

function getSubstitutesFor(char: string): string {
  const lowerChar = char.toLowerCase();
  if (!(lowerChar in SUBSTITUTES)) {
    return char;
  }

  if (!substitutionTracker[lowerChar]) {
    substitutionTracker[lowerChar] = [...SUBSTITUTES[lowerChar]];
  }

  // If replacements are exhausted, the cycle restarts
  if (substitutionTracker[lowerChar].length === 0) {
    substitutionTracker[lowerChar] = [...SUBSTITUTES[lowerChar]];
  }

  // Removes and returns the next available replacement
  return substitutionTracker[lowerChar].shift()!;
}

function changeCase(prompt: string): string {
  const chars = prompt.split("");
  const index = getRandomIndexFor(chars);
  chars[index] =
    chars[index] === chars[index].toUpperCase()
      ? chars[index].toLowerCase()
      : chars[index].toUpperCase();

  return chars.join("");
}

function switchLetters(prompt: string): string {
  const words = prompt.split(" ");
  const wIndex = getRandomIndexFor(words);

  if (words[wIndex].length > 1) {
    const chars = words[wIndex].split("");
    const cIndex = Math.max(getRandomIndexFor(chars) - 1, 0);
    const a = chars[cIndex];
    const b = chars[cIndex + 1];

    chars[cIndex] = b;
    chars[cIndex + 1] = a;
    words[wIndex] = chars.join("");
  }

  return words.join(" ");
}

function substituteLetter(prompt: string): string {
  const words = prompt.split(" ");
  const wIndex = getRandomIndexFor(words);
  const chars = words[wIndex].split("");
  const cIndex = getRandomIndexFor(chars);

  // Replace the character with the next available one
  chars[cIndex] = getSubstitutesFor(chars[cIndex]);
  words[wIndex] = chars.join("");

  return words.join(" ");
}

export function augmentPrompt(
  prompt: string,
  options: {
    changeCase: boolean;
    shuffleLetters: boolean;
    replaceLetters: boolean;
  }
): string {
  if (prompt.length === 0 || prompt.trim() === "") return "";

  const transformations: Array<() => string> = [];

  if (options.replaceLetters) {
    transformations.push(() => substituteLetter(prompt));
  }

  if (options.shuffleLetters) {
    transformations.push(() => switchLetters(prompt));
  }

  if (options.changeCase) {
    transformations.push(() => changeCase(prompt));
  }

  if (transformations.length === 0) return prompt;

  const rand = Math.floor(Math.random() * transformations.length);
  return transformations[rand]();
}
