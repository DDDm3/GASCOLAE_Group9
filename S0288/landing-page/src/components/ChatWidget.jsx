import { useEffect, useRef, useState } from 'react';
import { agent } from '../data/content';
import { IconChat, IconDrone } from './Icons';

/**
 * Nút mở khung chat của AI Agent S0288.
 * Ghi chú: phần hội thoại thực tế (kết nối AGENT_S0288) sẽ được cập nhật sau —
 * ở bản landing page này chỉ hiển thị lời chào, câu hỏi gợi ý và luồng escalation.
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const launcherRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        if (launcherRef.current) launcherRef.current.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    if (panelRef.current) panelRef.current.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) {
    return (
      <button
        ref={launcherRef}
        type="button"
        className="chat-launcher"
        onClick={() => setOpen(true)}
        aria-label={`Mở khung chat với ${agent.name}`}
      >
        <span className="chat-launcher__pulse" aria-hidden="true" />
        <IconChat width="22" height="22" />
        Trợ lý AI S0288
      </button>
    );
  }

  return (
    <div
      ref={panelRef}
      className="chat-panel"
      role="dialog"
      aria-modal="false"
      aria-label={agent.name}
      tabIndex={-1}
    >
      <div className="chat-panel__head">
        <span className="chat-panel__avatar">
          <IconDrone width="24" height="24" />
        </span>
        <div>
          <div className="chat-panel__title">Trợ lý AI • Dịch vụ S0288</div>
          <div className="chat-panel__status">
            <i aria-hidden="true" />
            {agent.code}
          </div>
        </div>
        <button
          type="button"
          className="chat-panel__close"
          onClick={() => setOpen(false)}
          aria-label="Đóng khung chat"
        >
          ×
        </button>
      </div>

      <div className="chat-panel__body">
        <div className="chat-msg">
          <div className="chat-msg__bubble">{agent.welcome}</div>
        </div>

        <div className="chat-suggest">
          <span className="chat-suggest__label">Câu hỏi gợi ý</span>
          {agent.suggested.map((q) => (
            <button key={q} type="button" disabled title="Tính năng hội thoại sẽ được cập nhật sau">
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="chat-panel__foot">
        <div className="chat-panel__soon">
          <strong>Sắp ra mắt:</strong> Khung hội thoại trực tuyến với {agent.name} đang được hoàn
          thiện. Trong thời gian này, vui lòng gửi yêu cầu để chuyên gia kỹ thuật liên hệ trực tiếp.
        </div>

        <a
          className="btn btn--accent btn--block btn--sm"
          href="#lead-form"
          onClick={() => setOpen(false)}
        >
          {agent.escalation}
        </a>

        <p className="chat-panel__guardrail">{agent.guardrail}</p>
      </div>
    </div>
  );
}
