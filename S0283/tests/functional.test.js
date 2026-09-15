"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "..", "src", "js", "main.js"), "utf8");

class FakeClassList {
  constructor() { this.values = new Set(); }
  add(...values) { values.forEach((value) => this.values.add(value)); }
  remove(...values) { values.forEach((value) => this.values.delete(value)); }
  contains(value) { return this.values.has(value); }
  toggle(value, force) {
    const enabled = force === undefined ? !this.values.has(value) : Boolean(force);
    enabled ? this.values.add(value) : this.values.delete(value);
    return enabled;
  }
}

class FakeStyle {
  constructor() { this.values = new Map(); }
  setProperty(name, value) { this.values.set(name, value); }
  getPropertyValue(name) { return this.values.get(name) || ""; }
}

class FakeElement {
  constructor(id = "") {
    this.id = id;
    this.attributes = new Map();
    this.classList = new FakeClassList();
    this.dataset = {};
    this.handlers = new Map();
    this.queries = new Map();
    this.style = new FakeStyle();
    this.textContent = "";
    this.type = "";
    this.value = "";
    this.validity = { valid: true };
  }
  addEventListener(type, handler) { this.handlers.set(type, handler); }
  dispatch(type, event = {}) { this.handlers.get(type)?.({ target: this, preventDefault() {}, ...event }); }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.has(name) ? this.attributes.get(name) : null; }
  querySelector(selector) { return this.queries.get(selector) || null; }
  getBoundingClientRect() { return { height: 64 }; }
  focus() { this.ownerDocument.activeElement = this; }
  closest(selector) {
    if (selector === "a") return this.tagName === "A" ? this : null;
    if (selector === "input, textarea") return ["INPUT", "TEXTAREA"].includes(this.tagName) ? this : null;
    return null;
  }
}

function buildEnvironment() {
  const documentElement = new FakeElement("html");
  const documentHandlers = new Map();
  const document = {
    documentElement,
    activeElement: null,
    addEventListener(type, handler) { documentHandlers.set(type, handler); },
    dispatch(type, event) { documentHandlers.get(type)?.(event); },
    querySelector(selector) { return rootQueries.get(selector) || null; },
    querySelectorAll(selector) { return selector === "[data-comparison]" ? [comparison] : []; },
  };
  documentElement.ownerDocument = document;

  const attach = (element, tagName = "DIV") => {
    element.ownerDocument = document;
    element.tagName = tagName;
    return element;
  };

  const header = attach(new FakeElement("header"), "HEADER");
  const menuButton = attach(new FakeElement("menu-button"), "BUTTON");
  menuButton.setAttribute("aria-expanded", "false");
  const navigation = attach(new FakeElement("site-nav"), "NAV");
  const firstLink = attach(new FakeElement("first-link"), "A");
  navigation.queries.set("a", firstLink);

  const comparison = attach(new FakeElement("comparison"));
  const range = attach(new FakeElement("comparison-range"), "INPUT");
  range.value = "50";
  const output = attach(new FakeElement("comparison-output"), "OUTPUT");
  comparison.queries.set("[data-comparison-range]", range);
  comparison.queries.set("[data-comparison-output]", output);

  const form = attach(new FakeElement("form"), "FORM");
  const formStatus = attach(new FakeElement("demo-form-status"), "P");
  const submitButton = attach(new FakeElement("submit"), "BUTTON");
  submitButton.type = "button";
  const ids = ["email", "so-dien-thoai", "dien-tich", "ho-ten", "aoi", "muc-tieu"];
  const fields = Object.fromEntries(ids.map((id) => [id, attach(new FakeElement(id), id === "aoi" || id === "muc-tieu" ? "TEXTAREA" : "INPUT")]));
  fields.email.validity = { valid: true };
  fields["dien-tich"].validity = { valid: true };
  const errors = Object.fromEntries(ids.map((id) => [id, attach(new FakeElement(`${id}-error`), "P")]));
  for (const id of ids) fields[id].setAttribute("aria-describedby", `${id}-error`);

  form.queries.set("#demo-form-status", formStatus);
  form.queries.set("[data-demo-submit]", submitButton);
  for (const id of ids) {
    form.queries.set(`#${id}`, fields[id]);
    form.queries.set(`#${id}-error`, errors[id]);
  }

  const rootQueries = new Map([
    [".site-header", header],
    [".menu-toggle", menuButton],
    ["#site-nav", navigation],
    ["[data-demo-form]", form],
  ]);

  const mediaQuery = {
    matches: false,
    handler: null,
    addEventListener(type, handler) { if (type === "change") this.handler = handler; },
    dispatch(matches) { this.matches = matches; this.handler?.({ matches }); },
  };
  const windowHandlers = new Map();
  const window = {
    scrollY: 0,
    matchMedia() { return mediaQuery; },
    requestAnimationFrame(callback) { callback(); },
    addEventListener(type, handler) { windowHandlers.set(type, handler); },
  };
  class ResizeObserver { constructor(callback) { this.callback = callback; } observe() { this.callback(); } }

  let networkCalls = 0;
  const context = { document, window, ResizeObserver, console, fetch() { networkCalls += 1; } };
  vm.runInNewContext(source, context, { filename: "src/js/main.js" });

  return { document, header, menuButton, navigation, firstLink, comparison, range, output, form, formStatus, submitButton, fields, errors, mediaQuery, getNetworkCalls: () => networkCalls };
}

function submit(form) {
  let prevented = false;
  form.dispatch("submit", { preventDefault() { prevented = true; } });
  assert.equal(prevented, true, "form submission must always be prevented in demo mode");
}

function fillRequired(environment) {
  environment.fields["ho-ten"].value = "Nguyễn An";
  environment.fields.aoi.value = "Lô A";
  environment.fields["muc-tieu"].value = "Theo dõi tán cây";
}

test("mobile menu updates ARIA, focus and closes with Escape, links and desktop breakpoint", () => {
  const env = buildEnvironment();
  assert.equal(env.navigation.dataset.open, "false");
  env.menuButton.dispatch("click");
  assert.equal(env.menuButton.getAttribute("aria-expanded"), "true");
  assert.equal(env.navigation.dataset.open, "true");
  assert.equal(env.document.activeElement, env.firstLink);

  env.document.dispatch("keydown", { key: "Escape" });
  assert.equal(env.menuButton.getAttribute("aria-expanded"), "false");
  assert.equal(env.document.activeElement, env.menuButton);

  env.menuButton.dispatch("click");
  env.navigation.dispatch("click", { target: env.firstLink });
  assert.equal(env.navigation.dataset.open, "false");

  env.menuButton.dispatch("click");
  env.mediaQuery.dispatch(true);
  assert.equal(env.navigation.dataset.open, "false");
});

test("comparison initializes at 50 and updates at both range boundaries", () => {
  const env = buildEnvironment();
  assert.equal(env.comparison.style.getPropertyValue("--comparison-position"), "50%");
  assert.equal(env.output.textContent, "50%");
  for (const value of ["0", "100"]) {
    env.range.value = value;
    env.range.dispatch("input");
    assert.equal(env.comparison.style.getPropertyValue("--comparison-position"), `${value}%`);
    assert.equal(env.output.value, `${value}%`);
  }
});

test("empty form reports required/contact errors, keeps values and focuses first invalid field", () => {
  const env = buildEnvironment();
  env.fields["don-vi"] = { value: "Giữ nguyên" };
  submit(env.form);
  assert.equal(env.fields["ho-ten"].getAttribute("aria-invalid"), "true");
  assert.equal(env.fields.aoi.getAttribute("aria-invalid"), "true");
  assert.equal(env.fields["muc-tieu"].getAttribute("aria-invalid"), "true");
  assert.match(env.errors.email.textContent, /email/);
  assert.equal(env.document.activeElement, env.fields["ho-ten"]);
  assert.equal(env.formStatus.classList.contains("is-error"), true);
  assert.match(env.formStatus.textContent, /chưa được gửi/);
});

test("invalid email and non-positive area are rejected without a network call", () => {
  const env = buildEnvironment();
  fillRequired(env);
  env.fields.email.value = "sai-email";
  env.fields.email.validity = { valid: false };
  env.fields["dien-tich"].value = "-2";
  env.fields["dien-tich"].validity = { valid: false };
  submit(env.form);
  assert.match(env.errors.email.textContent, /email hợp lệ/);
  assert.match(env.errors["dien-tich"].textContent, /lớn hơn 0/);
  assert.equal(env.getNetworkCalls(), 0);
});

test("valid email-only and phone-only submissions stay in explicit demo mode", () => {
  for (const contact of [{ email: "an@example.vn", phone: "" }, { email: "", phone: "090 123 4567" }]) {
    const env = buildEnvironment();
    fillRequired(env);
    env.fields.email.value = contact.email;
    env.fields.email.validity = { valid: true };
    env.fields["so-dien-thoai"].value = contact.phone;
    submit(env.form);
    assert.equal(env.formStatus.classList.contains("is-valid"), true);
    assert.match(env.formStatus.textContent, /Thông tin hợp lệ/);
    assert.match(env.formStatus.textContent, /chưa được gửi/);
    assert.equal(env.getNetworkCalls(), 0);
  }
});

test("form enhancement activates submit only after JavaScript initializes", () => {
  const env = buildEnvironment();
  assert.equal(env.submitButton.type, "submit");
  assert.equal(env.document.documentElement.classList.contains("js"), true);
});
