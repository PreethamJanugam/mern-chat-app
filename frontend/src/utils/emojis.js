import allEmojis from 'emojis-list';

export function getRandomEmoji() {
  const randomIndex = Math.floor(Math.random() * allEmojis.length);
  return allEmojis[randomIndex];
}
