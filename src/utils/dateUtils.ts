export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getDaysUntilExpiry = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getStatusFromDaysUntilExpiry = (days: number): 'active' | 'expiring_soon' | 'expired' => {
  if (days < 0) return 'expired';
  if (days <= 30) return 'expiring_soon';
  return 'active';
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'active':
      return 'text-green-600 bg-green-100';
    case 'expiring_soon':
      return 'text-yellow-600 bg-yellow-100';
    case 'expired':
      return 'text-red-600 bg-red-100';
    case 'pending':
      return 'text-blue-600 bg-blue-100';
    case 'inactive':
      return 'text-gray-600 bg-gray-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};