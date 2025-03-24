import { expect, Locator } from "@playwright/test";
import { ExpectOptions, ExpectTextOptions } from "../types/optionalParameterTypes";

const TIME_OUT = 10000;

function configureAssertion(options?: ExpectOptions) {
  if (options?.soft !== undefined) {
    return expect.configure({ soft: options.soft });
  }
}

export async function expectToBeVisible(locator: Locator, options?: ExpectOptions): Promise<void> {
  configureAssertion(options);
  await expect(locator, options?.message).toBeVisible({ timeout: options?.timeout ?? TIME_OUT });
}

export async function expectNotToBeVisible(
  locator: Locator,
  options?: ExpectOptions
): Promise<void> {
  configureAssertion(options);
  await expect(locator, options?.message).not.toBeVisible({ timeout: options?.timeout });
}

export async function expectToHaveText(
  locator: Locator,
  expectedText: string,
  options?: ExpectOptions & ExpectTextOptions
): Promise<void> {
  configureAssertion(options);
  await expect(locator, options?.message).toHaveText(expectedText, {
    timeout: options?.timeout,
    ignoreCase: options?.ignoreCase,
  });
}

export async function expectNotToHaveText(
  locator: Locator,
  expectedText: string,
  options?: ExpectOptions & ExpectTextOptions
): Promise<void> {
  configureAssertion(options);
  await expect(locator, options?.message).not.toHaveText(expectedText, {
    timeout: options?.timeout,
    ignoreCase: options?.ignoreCase,
  });
}

export async function expectToHaveAttribute(
  locator: Locator,
  attribute: string,
  value: string,
  options?: ExpectOptions
): Promise<void> {
  configureAssertion(options);
  await expect(locator, options?.message).toHaveAttribute(attribute, value, {
    timeout: options?.timeout,
  });
}

export async function expectToBeEnabled(locator: Locator, options?: ExpectOptions): Promise<void> {
  configureAssertion(options);
  await expect(locator, options?.message).toBeEnabled({ timeout: options?.timeout });
}

export async function expectToBeDisabled(locator: Locator, options?: ExpectOptions): Promise<void> {
  configureAssertion(options);
  await expect(locator, options?.message).toBeDisabled({ timeout: options?.timeout });
}

export async function expectToBeChecked(locator: Locator, options?: ExpectOptions): Promise<void> {
  configureAssertion(options);
  await expect(locator, options?.message).toBeChecked({ timeout: options?.timeout });
}

export async function expectToContainText(
  locator: Locator,
  expectedText: string,
  options?: ExpectOptions & ExpectTextOptions
): Promise<void> {
  configureAssertion(options);
  await expect(locator, options?.message).toContainText(expectedText, {
    timeout: options?.timeout,
    ignoreCase: options?.ignoreCase,
  });
}

export async function expectNotToContainText(
  locator: Locator,
  expectedText: string,
  options?: ExpectOptions & ExpectTextOptions
): Promise<void> {
  configureAssertion(options);
  await expect(locator, options?.message).not.toContainText(expectedText, {
    timeout: options?.timeout,
    ignoreCase: options?.ignoreCase,
  });
}

export async function expectToHaveClass(
  locator: Locator,
  expectedClass: string,
  options?: ExpectOptions
): Promise<void> {
  configureAssertion(options);
  await expect(locator, options?.message).toHaveClass(expectedClass, {
    timeout: options?.timeout,
  });
}

export async function expectElementValueToBeEmpty(
  locator: Locator,
  options?: ExpectOptions
): Promise<void> {
  configureAssertion(options);
  await expect(locator, options?.message).toBeEmpty({
    timeout: options?.timeout,
  });
}

export async function expectElementValueNotToBeEmpty(
  locator: Locator,
  options?: ExpectOptions
): Promise<void> {
  configureAssertion(options);
  await expect(locator, options?.message).not.toBeEmpty({
    timeout: options?.timeout,
  });
}
