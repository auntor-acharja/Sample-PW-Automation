import { Locator, Page } from "@playwright/test";

export type GotoOptions = Parameters<Page["goto"]>[1];
export type NavigationOptions = Parameters<Page["reload"]>[0]; // Same for GoBack, GoForward
export type WaitForLoadStateOptions = Parameters<Page["waitForLoadState"]>[0];

export type ClickOptions = Parameters<Locator["click"]>[0] & {
  loadState?: WaitForLoadStateOptions;
};
export type FillOptions = Parameters<Locator["fill"]>[1];
export type ClearOptions = Parameters<Locator["clear"]>[0];
export type SelectValues = Parameters<Locator["selectOption"]>[0];
export type SelectOptions = Parameters<Locator["selectOption"]>[1];
export type CheckOptions = Parameters<Locator["check"]>[0];
export type HoverOptions = Parameters<Locator["hover"]>[0];
export type UploadValues = Parameters<Locator["setInputFiles"]>[0];
export type UploadOptions = Parameters<Locator["setInputFiles"]>[1];
export type DragOptions = Parameters<Locator["dragTo"]>[1];
export type PressOptions = Parameters<Locator["press"]>[1];

export type ExpectOptions = {
  message?: string;
  timeout?: number;
  soft?: boolean;
};
export type ExpectTextOptions = {
  ignoreCase?: boolean;
  useInnerText?: boolean;
};

// /**
//  * 4. Locator Options: These types are used for locating elements on a page.
//  * They are based on the parameters of Playwright's built-in locator methods.
//  */
// export type LocatorOptions = Parameters<Page['locator']>[1];
// export type GetByTextOptions = Parameters<Locator['getByText']>[1];
// export type GetByRoleTypes = Parameters<Locator['getByRole']>[0];
// export type GetByRoleOptions = Parameters<Locator['getByRole']>[1];
// export type GetByLabelOptions = Parameters<Locator['getByLabel']>[1];
// export type GetByPlaceholderOptions = Parameters<Locator['getByPlaceholder']>[1];
