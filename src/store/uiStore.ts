import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme } from '@/types';

interface UIState {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;
  
  // Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  
  // Modals
  activeModals: Record<string, boolean>;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  title?: string;
  duration?: number; // in milliseconds, if not provided, notification won't auto-dismiss
  createdAt: number;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Theme
      theme: 'system' as Theme,
      setTheme: (theme) => set({ theme }),
      
      // Sidebar
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      // Modals
      activeModals: {},
      openModal: (modalId) => 
        set((state) => ({ 
          activeModals: { ...state.activeModals, [modalId]: true } 
        })),
      closeModal: (modalId) => 
        set((state) => ({ 
          activeModals: { ...state.activeModals, [modalId]: false } 
        })),
      
      // Notifications
      notifications: [],
      addNotification: (notification) => 
        set((state) => ({
          notifications: [
            ...state.notifications,
            {
              ...notification,
              id: crypto.randomUUID(),
              createdAt: Date.now(),
            },
          ],
        })),
      removeNotification: (id) => 
        set((state) => ({
          notifications: state.notifications.filter(
            (notification) => notification.id !== id
          ),
        })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'ui-store',
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);

export default useUIStore;
