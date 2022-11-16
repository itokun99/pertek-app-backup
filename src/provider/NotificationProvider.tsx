import { Unsubscribe } from 'firebase/firestore';
import { createContext, PropsWithChildren, useCallback, useMemo, useState } from 'react';

export interface NotificationItem {
  id: number;
  module: string;
  isRead?: boolean;
  title: string;
  content: string;
  time: Date;
}

const dummyData = [
  {
    id: 1,
    module: 'token',
    isRead: false,
    title: 'Token Listrik',
    content: 'Permintaan pembelian token baru',
    time: new Date('2022-08-31'),
  },
  {
    id: 2,
    module: 'token',
    isRead: true,
    title: 'Token Listrik',
    content: 'Permintaan pembelian token baru',
    time: new Date('2022-08-30'),
  },
  {
    id: 3,
    module: 'token',
    isRead: false,
    title: 'Token Listrik',
    content: 'Permintaan pembelian token baru',
    time: new Date('2022-08-28'),
  },
  {
    id: 4,
    module: 'token',
    isRead: true,
    title: 'Token Listrik',
    content: 'Permintaan pembelian token baru',
    time: new Date('2022-09-01'),
  },
  {
    id: 5,
    module: 'token',
    isRead: true,
    title: 'Token Listrik',
    content: 'Permintaan pembelian token baru',
    time: new Date('2022-09-02'),
  },
];

export interface NotificationContextInterface {
  notifications?: NotificationItem[];
  unsubscribe?: Unsubscribe;
  unreadCount: number;
  pushNotification: (notif: NotificationItem) => void;
  setIsRead: (id?: number) => void;
}

export const NotificationContext = createContext<NotificationContextInterface>({
  unreadCount: 2,
  pushNotification: (_: NotificationItem) => {},
  setIsRead: (_?: number) => {},
});

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [notifications, setNotification] = useState<Array<NotificationItem> | undefined>(dummyData);
  const [unreadCount, setUnreadCount] = useState(2);

  const pushNotification = useCallback(
    (notif: NotificationItem) => {
      notifications?.push(notif);
      setNotification(notifications);
    },
    [notifications]
  );

  const setIsRead = useCallback(
    (id?: number) => {
      if (id) {
        const newNotif = notifications?.map((notif) => {
          if (notif.id === id) {
            notif.isRead = true;
            return notif;
          }
        });
        setUnreadCount(unreadCount - 1);
        setNotification(newNotif as NotificationItem[]);
        return;
      }

      const newNotif = notifications?.map((notif) => {
        notif.isRead = true;
        return notif;
      });

      setUnreadCount(0);
      setNotification(newNotif as NotificationItem[]);
    },
    [notifications, unreadCount]
  );

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      pushNotification: pushNotification,
      setIsRead,
    }),
    [notifications, pushNotification, setIsRead, unreadCount]
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};
