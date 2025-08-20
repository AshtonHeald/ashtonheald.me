export const formatTimeAgo = (dateString: string): string => {
  const now = new Date()
  const played = new Date(dateString)
  const diffInMinutes = Math.floor((now.getTime() - played.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return 'just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
  return `${Math.floor(diffInMinutes / 1440)}d ago`
}
