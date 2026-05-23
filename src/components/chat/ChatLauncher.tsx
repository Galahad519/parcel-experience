import { MessageCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

type ChatLauncherProps = {
  onClick: () => void;
};

export default function ChatLauncher({ onClick }: ChatLauncherProps) {
  return (
    <Button
      className="fixed bottom-5 right-5 z-30 rounded-full bg-violet-600 px-5 py-6 text-white shadow-xl shadow-violet-300/50 hover:bg-violet-700"
      onClick={onClick}
      type="button"
    >
      <MessageCircle className="size-5" />
      Besoin d’aide ?
    </Button>
  );
}
