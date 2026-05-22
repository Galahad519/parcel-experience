import { Badge } from '@/components/ui/badge';
import { getStatusBadgeClassName, getStatusBadgeVariant, statusLabels } from '@/lib/status';
import type { ShipmentStatus } from '@/types/tracking';

type StatusBadgeProps = {
  status: ShipmentStatus;
  className?: string;
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge className={[getStatusBadgeClassName(status), className].filter(Boolean).join(' ')} variant={getStatusBadgeVariant(status)}>
      {statusLabels[status]}
    </Badge>
  );
}
