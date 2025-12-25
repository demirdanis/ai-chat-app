export type Character = {
  id: string;
  name: string;
  avatar_url: string | null;
  system_prompt: string;
};
export type CharacterPickerProps = {
  characters: Character[];
};
