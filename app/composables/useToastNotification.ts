export function useToastNotification() {
  const toast = useToast()

  function showToast(
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'info'
  ) {
    const config: Record<
      'success' | 'error' | 'warning' | 'info',
      { title: string; icon: string; color: 'success' | 'error' | 'warning' | 'info' }
    > = {
      success: { title: 'Erfolg', icon: 'mdi:check-circle', color: 'success' },
      error: { title: 'Fehler', icon: 'mdi:alert-circle', color: 'error' },
      warning: { title: 'Warnung', icon: 'mdi:alert-circle', color: 'warning' },
      info: { title: 'Info', icon: 'mdi:information', color: 'info' }
    }

    const { title, icon, color } = config[type]

    toast.add({
      title,
      description: message,
      icon,
      color
    })
  }

  return { showToast }
}
