import { Button } from '@/components/ui/button';

const quickActions = [
  'Où est mon colis ?',
  'Puis-je encore ajouter un article ?',
  'Pourquoi mon colis est retardé ?',
  'Quand sera-t-il livré ?',
  'Contacter le support',
];

type ChatQuickActionsProps = {
  disabled?: boolean;
  onSelect: (question: string) => void;
};

export default function ChatQuickActions({ disabled, onSelect }: ChatQuickActionsProps) {
  return (
    <div className="grid gap-2">
      {quickActions.map((question) => (
        <Button
          className="h-auto justify-start rounded-2xl border-violet-100 bg-white px-3 py-2 text-left text-slate-700 hover:bg-violet-50 hover:text-violet-700"
          disabled={disabled}
          key={question}
          onClick={() => onSelect(question)}
          type="button"
          variant="outline"
        >
          {question}
        </Button>
      ))}
    </div>
  );
}
