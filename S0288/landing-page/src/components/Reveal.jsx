import { useEffect, useRef, useState } from 'react';

/**
 * Bọc nội dung để hiện dần khi cuộn tới (IntersectionObserver).
 * `as` cho phép đổi thẻ bao ngoài, `delay` để tạo hiệu ứng so le.
 *
 * Lưu ý: trạng thái hiện được giữ bằng React state (không dùng classList.add),
 * vì nếu ghi class trực tiếp vào DOM thì mọi lần component cha đổi `className`
 * (ví dụ FAQ đóng/mở thêm class `is-open`) React sẽ ghi đè và xoá mất `is-visible`.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.replace(/\s+/g, ' ').trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
