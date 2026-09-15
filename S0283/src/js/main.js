"use strict";

document.documentElement.classList.add("js");

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");
const desktopNavigation = window.matchMedia("(min-width: 75rem)");

function updateHeaderOffset() {
  if (!header) return;
  const offset = Math.ceil(header.getBoundingClientRect().height + 16);
  document.documentElement.style.setProperty("--header-offset", `${offset}px`);
}

function updateHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

function setMenu(open, returnFocus = false) {
  if (!menuButton || !navigation) return;

  menuButton.setAttribute("aria-expanded", String(open));
  navigation.dataset.open = String(open);
  updateHeaderOffset();

  if (open) {
    const firstLink = navigation.querySelector("a");
    window.requestAnimationFrame(() => firstLink?.focus());
  } else if (returnFocus) {
    menuButton.focus();
  }
}

if (menuButton && navigation) {
  navigation.dataset.open = "false";

  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    setMenu(open);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a") && !desktopNavigation.matches) {
      setMenu(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenu(false, true);
    }
  });

  desktopNavigation.addEventListener("change", (event) => {
    if (event.matches) setMenu(false);
  });
}

if (header && "ResizeObserver" in window) {
  new ResizeObserver(updateHeaderOffset).observe(header);
} else {
  window.addEventListener("resize", updateHeaderOffset);
}

updateHeaderOffset();
updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

document.querySelectorAll("[data-comparison]").forEach((comparison) => {
  const range = comparison.querySelector("[data-comparison-range]");
  const output = comparison.querySelector("[data-comparison-output]");

  if (!range || !output) return;

  function updateComparison() {
    const value = Math.min(100, Math.max(0, Number(range.value)));
    comparison.style.setProperty("--comparison-position", `${value}%`);
    output.value = `${value}%`;
    output.textContent = `${value}%`;
  }

  range.addEventListener("input", updateComparison);
  updateComparison();
});

const demoForm = document.querySelector("[data-demo-form]");

if (demoForm) {
  const formStatus = demoForm.querySelector("#demo-form-status");
  const submitButton = demoForm.querySelector("[data-demo-submit]");
  const email = demoForm.querySelector("#email");
  const phone = demoForm.querySelector("#so-dien-thoai");
  const area = demoForm.querySelector("#dien-tich");
  const requiredFields = [
    [demoForm.querySelector("#ho-ten"), "ho-ten-error"],
    [demoForm.querySelector("#aoi"), "aoi-error"],
    [demoForm.querySelector("#muc-tieu"), "muc-tieu-error"],
  ];

  if (submitButton) submitButton.type = "submit";

  function setFieldError(field, errorId, message) {
    if (!field) return;
    const error = demoForm.querySelector(`#${errorId}`);
    field.setAttribute("aria-invalid", String(Boolean(message)));
    if (error) error.textContent = message;
  }

  function clearFormStatus() {
    if (!formStatus) return;
    formStatus.classList.remove("is-error", "is-valid");
    formStatus.textContent = "Bản demo — thông tin chưa được gửi.";
  }

  demoForm.addEventListener("input", (event) => {
    const field = event.target.closest("input, textarea");
    if (!field) return;
    if (field === email || field === phone) {
      setFieldError(email, "email-error", "");
      setFieldError(phone, "so-dien-thoai-error", "");
    }
    const describedBy = field.getAttribute("aria-describedby")?.split(" ") || [];
    const errorId = describedBy.find((id) => id.endsWith("-error"));
    if (errorId) setFieldError(field, errorId, "");
    clearFormStatus();
  });

  demoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const invalidFields = [];

    requiredFields.forEach(([field, errorId]) => {
      const invalid = !field?.value.trim();
      setFieldError(field, errorId, invalid ? "Vui lòng điền trường này." : "");
      if (invalid && field) invalidFields.push(field);
    });

    const emailValue = email?.value.trim() || "";
    const phoneValue = phone?.value.trim() || "";
    const phoneDigits = phoneValue.replace(/\D/g, "");
    const emailValid = Boolean(emailValue && email?.validity.valid);
    const phoneValid = Boolean(phoneValue && phoneDigits.length >= 7);

    let emailError = "";
    let phoneError = "";
    if (!emailValue && !phoneValue) {
      emailError = "Vui lòng nhập email hoặc số điện thoại.";
    } else {
      if (emailValue && !emailValid) emailError = "Vui lòng nhập email hợp lệ.";
      if (phoneValue && !phoneValid) phoneError = "Vui lòng nhập số điện thoại hợp lệ.";
    }
    setFieldError(email, "email-error", emailError);
    setFieldError(phone, "so-dien-thoai-error", phoneError);
    if (emailError && email) invalidFields.push(email);
    if (phoneError && phone) invalidFields.push(phone);

    const areaValue = area?.value.trim() || "";
    const areaInvalid = Boolean(areaValue && (!area?.validity.valid || Number(areaValue) <= 0));
    setFieldError(area, "dien-tich-error", areaInvalid ? "Vui lòng nhập diện tích lớn hơn 0 hoặc để trống." : "");
    if (areaInvalid && area) invalidFields.push(area);

    if (!formStatus) return;
    formStatus.classList.toggle("is-error", invalidFields.length > 0);
    formStatus.classList.toggle("is-valid", invalidFields.length === 0);

    if (invalidFields.length > 0) {
      formStatus.textContent = "Có thông tin cần kiểm tra. Dữ liệu vẫn được giữ nguyên và chưa được gửi.";
      invalidFields[0].focus();
      return;
    }

    formStatus.textContent = "Thông tin hợp lệ. Bản demo — thông tin chưa được gửi.";
  });
}
