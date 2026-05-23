import { Bot, UserRound } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { AssistantMessage } from '@/lib/chat-context';
import { cn } from '@/lib/utils';

type ChatMessageProps = {
  message: AssistantMessage;
};

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex gap-3', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser ? (
        <Avatar className="mt-1 bg-violet-100 text-violet-700" size="sm">
          <AvatarFallback>
            <Bot className="size-3.5" />
          </AvatarFallback>
        </Avatar>
      ) : null}
      <div
        className={cn(
          'max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6',
          isUser ? 'bg-violet-600 text-white' : 'bg-slate-100 text-slate-800',
        )}
      >
        {message.content}
      </div>
      {isUser ? (
        <Avatar className="mt-1 bg-slate-900 text-white" size="sm">
          <AvatarFallback>
            <UserRound className="size-3.5" />
          </AvatarFallback>
        </Avatar>
      ) : null}
    </div>
  );
}
