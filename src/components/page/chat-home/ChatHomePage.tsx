import { CharacterPicker } from "@/components/character-picker/CharacterPicker";
import { getAllCharacters } from "@/services/characters.service";

const ChatHomePage = async () => {
  const { data: characters, error } = await getAllCharacters();
  if (error) {
    return (
      <div className="p-6">
        <p className="text-sm text-destructive">
          Failed to load characters: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="h-full min-h-0 overflow-hidden space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Start a conversation</h1>
        <p className="text-sm text-muted-foreground">
          Choose a character to begin a new chat.
        </p>
      </div>

      <CharacterPicker characters={characters ?? []} />
    </div>
  );
};

export default ChatHomePage;
