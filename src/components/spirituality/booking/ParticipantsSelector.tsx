
import { Label } from "@/components/ui/label";

interface ParticipantsSelectorProps {
  maxParticipants: number;
  participants: number;
  onParticipantsChange: (count: number) => void;
}

const ParticipantsSelector = ({
  maxParticipants,
  participants,
  onParticipantsChange
}: ParticipantsSelectorProps) => {
  return (
    <div className="mb-3">
      <Label className="block text-sm text-muted-foreground mb-1">
        Number of Participants
      </Label>
      <select 
        className="w-full p-2 border rounded-md"
        value={participants}
        onChange={(e) => onParticipantsChange(Number(e.target.value))}
      >
        {[...Array(maxParticipants)].map((_, i) => (
          <option key={i+1} value={i+1}>
            {i+1} {i === 0 ? "person" : "people"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ParticipantsSelector;
