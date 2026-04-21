import { useState } from "react";
import { Bell, X, CheckCheck, AlertCircle, Info, UserPlus, Calendar, PackageCheck } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

interface Notification {
  id: string;
  type: "info" | "warning" | "success" | "error" | "receiving";
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "receiving",
    title: "입고 예정 알림",
    message: "ORD-2024-001 발주건이 오늘 입고 예정입니다.",
    time: "5분 전",
    read: false,
    link: "/receiving/confirm"
  },
  {
    id: "2",
    type: "receiving",
    title: "입고 지연 알림",
    message: "ORD-2024-003 발주건의 입고가 지연되고 있습니다.",
    time: "10분 전",
    read: false,
    link: "/receiving/confirm"
  },
  {
    id: "3",
    type: "info",
    title: "새로운 직원 등록",
    message: "김철수 직원이 등록되었습니다.",
    time: "15분 전",
    read: false,
  },
  {
    id: "4",
    type: "warning",
    title: "재고 부족 알림",
    message: "노트북 재고가 부족합니다. 현재 재고: 15개",
    time: "30분 전",
    read: false,
  },
  {
    id: "5",
    type: "success",
    title: "일정 등록 완료",
    message: "내일 오전 회의 일정이 등록되었습니다.",
    time: "1시간 전",
    read: true,
  },
  {
    id: "6",
    type: "info",
    title: "근무 교대 요청",
    message: "박직원이 근무 교대를 요청했습니다.",
    time: "2시간 전",
    read: true,
  },
  {
    id: "7",
    type: "error",
    title: "시스템 점검 안내",
    message: "오늘 밤 11시부터 시스템 점검이 예정되어 있습니다.",
    time: "3시간 전",
    read: true,
  },
];

export function NotificationCenter() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "success":
        return <CheckCheck className="w-5 h-5 text-green-600" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case "receiving":
        return <PackageCheck className="w-5 h-5 text-blue-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <div className="relative">
      {/* Notification bell button */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Bell className="w-6 h-6 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification dropdown */}
      {showNotifications && (
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={() => setShowNotifications(false)}
          />
          <div className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-30 max-h-[500px] flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">알림</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    모두 읽음
                  </button>
                )}
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Notifications list */}
            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>새로운 알림이 없습니다</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => {
                      markAsRead(notification.id);
                      if (notification.link) {
                        navigate(notification.link);
                      }
                    }}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium text-gray-900 text-sm">
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}