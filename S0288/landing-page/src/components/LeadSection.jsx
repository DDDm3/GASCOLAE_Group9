import { useState } from 'react';
import { buildingTypes, cta, packageOptions } from '../data/content';
import { IconCheck, IconClock, IconMail, IconPhone } from './Icons';
import Reveal from './Reveal';

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  company: '',
  buildingType: '',
  scale: '',
  packageLevel: '',
  note: ''
};

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Vui lòng nhập họ và tên người liên hệ.';
  if (!/^[0-9\s+.()-]{9,15}$/.test(values.phone.trim()))
    errors.phone = 'Số điện thoại chưa hợp lệ (9–15 chữ số).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'Email công việc chưa hợp lệ.';
  if (!values.company.trim()) errors.company = 'Vui lòng nhập tên công ty / đơn vị quản lý.';
  if (!values.buildingType) errors.buildingType = 'Vui lòng chọn loại hình công trình.';
  return errors;
}

export default function LeadSection() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = document.querySelector('.has-error');
      if (first) first.focus();
      return;
    }
    // TODO (Team Dev): kết nối API đẩy lead về CRM Phòng Kinh doanh / Trưởng dự án kỹ thuật S0288.
    setSent(true);
  };

  const err = (field) => (errors[field] ? 'has-error' : '');

  return (
    <section className="section section--dark cta-section" id="lead-form">
      <div className="container">
        <div className="cta-grid">
          <Reveal className="cta-copy">
            <span className="eyebrow">Đăng ký khảo sát</span>
            <h2>{cta.headline}</h2>
            <p>{cta.sub}</p>

            <div className="cta-contact">
              <div className="cta-contact__item">
                <span className="cta-contact__icon">
                  <IconClock width="20" height="20" />
                </span>
                Phản hồi tư vấn &amp; báo giá khảo sát trong vòng 24 giờ làm việc
              </div>
              <div className="cta-contact__item">
                <span className="cta-contact__icon">
                  <IconPhone width="20" height="20" />
                </span>
                Hotline kỹ thuật: <strong>(Team Dev cập nhật)</strong>
              </div>
              <div className="cta-contact__item">
                <span className="cta-contact__icon">
                  <IconMail width="20" height="20" />
                </span>
                Email dự án: <strong>(Team Dev cập nhật)</strong>
              </div>
            </div>

            <div className="lead-form__routing" style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.74)' }}>
              <strong style={{ color: '#86e5ab' }}>Routing:</strong> Dữ liệu chuyển trực tiếp về CRM
              của Phòng Kinh doanh / Trưởng dự án Kỹ thuật S0288 GASCOLAE.
            </div>
          </Reveal>

          <Reveal className="lead-form" delay={120}>
            {sent ? (
              <div className="lead-form__success">
                <div className="lead-form__success-icon">
                  <IconCheck width="34" height="34" />
                </div>
                <h3>Đã ghi nhận yêu cầu của bạn</h3>
                <p>
                  Cảm ơn <strong>{values.name}</strong>. Chuyên gia kỹ thuật S0288 sẽ liên hệ theo số{' '}
                  <strong>{values.phone}</strong> trong vòng 24 giờ làm việc để thống nhất phạm vi
                  khảo sát và gửi báo giá chi tiết.
                </p>
                <button
                  type="button"
                  className="btn btn--ghost"
                  style={{ marginTop: 22 }}
                  onClick={() => {
                    setValues(EMPTY);
                    setSent(false);
                  }}
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="lead-form__head">
                  <h3>Đăng ký Khảo sát &amp; Nhận Tư vấn Kỹ thuật</h3>
                  <p>Các trường có dấu (*) là bắt buộc.</p>
                </div>

                <div className="field">
                  <label htmlFor="lf-name">
                    Họ và tên người liên hệ <span>*</span>
                  </label>
                  <input
                    id="lf-name"
                    className={err('name')}
                    value={values.name}
                    onChange={update('name')}
                    placeholder="Nguyễn Văn A"
                    autoComplete="name"
                  />
                  {errors.name && <span className="field__error">{errors.name}</span>}
                </div>

                <div className="field-row">
                  <div className="field field--half">
                    <label htmlFor="lf-phone">
                      Số điện thoại <span>*</span>
                    </label>
                    <input
                      id="lf-phone"
                      className={err('phone')}
                      value={values.phone}
                      onChange={update('phone')}
                      placeholder="09xx xxx xxx"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                    {errors.phone && <span className="field__error">{errors.phone}</span>}
                  </div>

                  <div className="field field--half">
                    <label htmlFor="lf-email">
                      Email công việc <span>*</span>
                    </label>
                    <input
                      id="lf-email"
                      className={err('email')}
                      value={values.email}
                      onChange={update('email')}
                      placeholder="ten@congty.vn"
                      inputMode="email"
                      autoComplete="email"
                    />
                    {errors.email && <span className="field__error">{errors.email}</span>}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="lf-company">
                    Tên công ty / Đơn vị quản lý công trình <span>*</span>
                  </label>
                  <input
                    id="lf-company"
                    className={err('company')}
                    value={values.company}
                    onChange={update('company')}
                    placeholder="Công ty CP ..."
                    autoComplete="organization"
                  />
                  {errors.company && <span className="field__error">{errors.company}</span>}
                </div>

                <div className="field-row">
                  <div className="field field--half">
                    <label htmlFor="lf-type">
                      Loại hình công trình <span>*</span>
                    </label>
                    <select
                      id="lf-type"
                      className={err('buildingType')}
                      value={values.buildingType}
                      onChange={update('buildingType')}
                    >
                      <option value="">-- Chọn loại hình --</option>
                      {buildingTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.buildingType && (
                      <span className="field__error">{errors.buildingType}</span>
                    )}
                  </div>

                  <div className="field field--half">
                    <label htmlFor="lf-scale">Diện tích sàn (m² GFA) hoặc chiều cao</label>
                    <input
                      id="lf-scale"
                      value={values.scale}
                      onChange={update('scale')}
                      placeholder="VD: 12.000 m² GFA / cao 9 tầng"
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="lf-package">Gói dịch vụ quan tâm</label>
                  <select
                    id="lf-package"
                    value={values.packageLevel}
                    onChange={update('packageLevel')}
                  >
                    <option value="">-- Chọn gói --</option>
                    {packageOptions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="lf-note">Ghi chú yêu cầu đặc thù</label>
                  <textarea
                    id="lf-note"
                    value={values.note}
                    onChange={update('note')}
                    placeholder="VD: cần khảo sát mái tôn nhà xưởng đang vận hành, nghi ngờ quá nhiệt máng cáp..."
                  />
                </div>

                <button type="submit" className="btn btn--accent btn--block">
                  {cta.button}
                </button>

                <p className="lead-form__disclaimer">{cta.disclaimer}</p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
