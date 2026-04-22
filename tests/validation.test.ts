import { isValidEmail, normalizePhone } from "@/lib/validation";

describe("normalizePhone", () => {
  it("accepts 05XX numbers without separators", () => {
    expect(normalizePhone("05321234567")).toBe("05321234567");
  });

  it("strips spaces, dashes, dots and parentheses", () => {
    expect(normalizePhone("0532 123 45 67")).toBe("05321234567");
    expect(normalizePhone("0532-123-45-67")).toBe("05321234567");
    expect(normalizePhone("(0532) 123.45.67")).toBe("05321234567");
  });

  it("normalizes +90 and 90 prefixes to leading 0", () => {
    expect(normalizePhone("+905321234567")).toBe("05321234567");
    expect(normalizePhone("905321234567")).toBe("05321234567");
    expect(normalizePhone("+90 532 123 45 67")).toBe("05321234567");
  });

  it("rejects invalid formats", () => {
    expect(normalizePhone("")).toBeNull();
    expect(normalizePhone("5321234567")).toBeNull();
    expect(normalizePhone("0532123456")).toBeNull();
    expect(normalizePhone("05321234567890")).toBeNull();
    expect(normalizePhone("04321234567")).toBeNull();
    expect(normalizePhone("abcd")).toBeNull();
  });
});

describe("isValidEmail", () => {
  it("treats empty string as valid (optional field)", () => {
    expect(isValidEmail("")).toBe(true);
  });

  it("accepts standard email formats", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("user.name+tag@sub.example.co")).toBe(true);
  });

  it("rejects malformed emails", () => {
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isValidEmail("missing@tld")).toBe(false);
    expect(isValidEmail("@example.com")).toBe(false);
    expect(isValidEmail("spaces in@example.com")).toBe(false);
  });
});
