/**
 * Notification Service
 * 
 * This service handles application-wide notifications, including:
 * - Toast notifications
 * - Alert modals
 * - System notifications
 */

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationOptions {
  title?: string;
  message: string;
  type: NotificationType;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  onClose?: () => void;
  onAction?: () => void;
  actionLabel?: string;
}

// In-memory queue for notifications
const notificationQueue: NotificationOptions[] = [];
const listeners: Array<(notification: NotificationOptions) => void> = [];

/**
 * Add a notification to the queue and notify all listeners
 */
export function showNotification(options: NotificationOptions): void {
  const notification: NotificationOptions = {
    duration: 5000,
    position: 'top-right',
    ...options,
  };
  
  notificationQueue.push(notification);
  
  // Notify all listeners
  listeners.forEach(listener => listener(notification));
}

/**
 * Subscribe to notification events
 */
export function subscribeToNotifications(callback: (notification: NotificationOptions) => void): () => void {
  listeners.push(callback);
  
  // Return unsubscribe function
  return () => {
    const index = listeners.indexOf(callback);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  };
}

/**
 * Convenience methods for different notification types
 */
export const notifications = {
  success: (message: string, options?: Partial<Omit<NotificationOptions, 'message' | 'type'>>) => 
    showNotification({ message, type: 'success', ...options }),
    
  error: (message: string, options?: Partial<Omit<NotificationOptions, 'message' | 'type'>>) => 
    showNotification({ message, type: 'error', ...options }),
    
  warning: (message: string, options?: Partial<Omit<NotificationOptions, 'message' | 'type'>>) => 
    showNotification({ message, type: 'warning', ...options }),
    
  info: (message: string, options?: Partial<Omit<NotificationOptions, 'message' | 'type'>>) => 
    showNotification({ message, type: 'info', ...options }),
};
