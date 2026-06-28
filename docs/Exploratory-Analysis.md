# Exploratory Analysis

## Executive Summary

This document summarizes the exploratory testing approach performed as part of the technical assessment.

The objective was to identify potential functional, integration, usability, security, and resilience risks beyond the implemented automated scenarios. Rather than validating only expected user behavior, the exploratory session focused on understanding the application's business workflows, backend interactions, and areas that would benefit from deeper investigation.

---

# Scope

The exploratory session focused on the following business areas:

* Product Search
* Product Details
* Vehicle Selection
* Checkout (Risk Assessment)
* Registration & Login Investigation

---

# Exploratory Charter

## Mission

Explore the e-commerce application to identify defects, usability concerns, integration issues, and business risks while understanding how the application behaves under normal and abnormal conditions.

## Objectives

* Validate critical user journeys.
* Understand backend API orchestration.
* Identify high-risk business scenarios.
* Discover security and data integrity risks.
* Identify automation opportunities.

---

# Risk Assessment

| Area                 | Risk                                           | Priority |
| -------------------- | ---------------------------------------------- | -------- |
| Checkout & Payment   | Incorrect order creation or payment processing | P1       |
| Product Pricing      | Incorrect pricing or manipulated requests      | P1       |
| Inventory            | Incorrect stock validation                     | P1       |
| Product Search       | Incorrect search results                       | P2       |
| Vehicle Selection    | Incorrect compatibility                        | P2       |
| Coupons & Promotions | Invalid discount calculation                   | P2       |
| Network Recovery     | Interrupted checkout process                   | P2       |
| Session Management   | Session expiration or duplicate orders         | P3       |

---

# Key Observations

# Defects Identified During Exploration

| ID   | Finding                                                                                   | Severity   | Priority |
| ---- | ----------------------------------------------------------------------------------------- | ---------- | -------- |
| F-01 | Browser becomes unresponsive after removing the email from Contact Details and submitting | **Major**  | High     |
| F-02 | Checkout phone number field accepts alphabetic characters                                 | **Medium** | Medium   |
| F-03 | Checkout first name field accepts numeric values                                          | **Medium** | Medium   |
| F-04 | Order form fields accept unsupported special characters                                   | **Medium** | Medium   |
| F-05 | Validation Feedback Is Not Associated with Individual Fields                              | **Medium**  | Medium  |
| F-06 | Invalid Fields Are Not Visually Highlighted                                               | **Medium**  | Medium  |
| F-07 | Mandatory fields are not visually indicated with an asterisk (*)                          | **Minor**  | Low      |
| F-08 | UI overlap/intersection in the header breadcrumb/navigation                               | **Minor**  | Low      |
| F-09 | UI overlap on the "Your Order" page                                                       | **Minor**  | Low      |


# Defects Identified During Exploration

The following findings were identified during exploratory testing. Severity and priority are assigned based on the observed business impact and user experience.

---

## F-01 – Browser Becomes Unresponsive After Removing Contact Email

**Severity:** Major

**Priority:** High

**Area:** Account Settings

**Description**

After registering a new account, navigating to **Account Settings → Contact Details**, removing the email address, and submitting the form, the browser becomes unresponsive and the operation does not complete successfully.

**Expected Result**

The application should validate mandatory fields before submission or handle the request gracefully without causing the browser to become unresponsive.

**Actual Result**

The browser becomes unresponsive after submitting the form.

**Evidence**

`docs/screenshots/F-01_Browser_Unresponsive.png`

---

## F-02 – Phone Number Field Accepts Alphabetic Characters

**Severity:** Medium

**Priority:** Medium

**Area:** Checkout

**Description**

The phone number field accepts alphabetic characters without validation, allowing invalid phone number formats.

**Expected Result**

The field should only accept valid phone number characters and display a validation message for invalid input.

**Actual Result**

Alphabetic characters are accepted.

**Evidence**

`docs/screenshots/F-02_Invalid_Phone_Number.png`

---

## F-03 – First Name Field Accepts Numeric Values

**Severity:** Medium

**Priority:** Medium

**Area:** Checkout

**Description**

The First Name field accepts numeric values without client-side validation.

**Expected Result**

The field should reject numeric input and accept only valid name characters.

**Actual Result**

Numeric values are accepted.

**Evidence**

`docs/screenshots/F-03_Invalid_First_Name.png`

---

## F-04 – Customer Information Fields Accept Unsupported Special Characters

**Severity:** Medium

**Priority:** Medium

**Area:** Checkout

**Description**

Customer information fields accept unsupported special characters without appropriate validation.

**Expected Result**

Input validation should restrict unsupported characters while allowing valid international name formats where applicable.

**Actual Result**

Unsupported special characters are accepted.

**Evidence**

`docs/screenshots/F-04_Special_Characters.png`

---

## F-05 – Validation Feedback Is Not Associated with Individual Fields

**Severity:** Medium

**Priority:** Medium

**Area:** Checkout / Form Validation

**Description**

Validation errors are displayed collectively in a summary banner above the form rather than adjacent to the corresponding input fields. Users must manually identify which fields require correction.

**Expected Result**

Validation feedback should be displayed next to each invalid field while optionally providing a summary message at the top of the page.

**Actual Result**

All validation messages are displayed in a single summary banner without inline field-level feedback.

**Evidence**

`docs/screenshots/F-05_Validation_Summary.png`

---

## F-06 – Invalid Fields Are Not Visually Highlighted

**Severity:** Medium

**Priority:** Medium

**Area:** Checkout / Form Validation

**Description**

After form submission, invalid fields remain visually identical to valid fields. No visual indicator helps users quickly identify which inputs require correction.

**Expected Result**

Invalid fields should be highlighted (e.g., red border, inline message, or focus on the first invalid field).

**Actual Result**

Only a summary validation message is displayed.

**Evidence**

`docs/screenshots/F-06_Invalid_Field_Highlighting.png`

---

## F-07 – Required Fields Are Not Clearly Indicated

**Severity:** Minor

**Priority:** Low

**Area:** Forms / User Experience

**Description**

Required fields are not visually distinguished using a standard indicator such as an asterisk (*), making it difficult for users to identify mandatory inputs before submitting the form.

**Expected Result**

Mandatory fields should be clearly indicated using a consistent visual indicator.

**Actual Result**

No visual indicator is provided for required fields.

**Evidence**

`docs/screenshots/F-07_Required_Fields.png`

---

## F-08 – Header Layout Overlap

**Severity:** Minor

**Priority:** Low

**Area:** User Interface

**Description**

A visual overlap was observed within the page header/breadcrumb section, affecting the overall layout consistency.

**Expected Result**

UI elements should be properly aligned without overlapping.

**Actual Result**

Header elements overlap under certain conditions.

**Evidence**

`docs/screenshots/F-08_Header_Overlap.png`

---

## F-09 – UI Overlap on the "Your Order" Section

**Severity:** Minor

**Priority:** Low

**Area:** Checkout UI

**Description**

Visual overlap was observed within the **Your Order** section, impacting layout consistency and readability.

**Expected Result**

The page layout should remain properly aligned across all checkout sections.

**Actual Result**

UI elements overlap within the **Your Order** section.

**Evidence**

`docs/screenshots/F-09_Your_Order_UI.png`



## Registration & Login

The Registration and Login flows were initially investigated for automation.

During exploration, it was observed that the production environment employs browser automation detection and CAPTCHA mechanisms to prevent automated interactions.

To avoid introducing unstable automation and to respect production security controls, these scenarios were intentionally excluded from the automated test suite.

---


## Checkout Architecture Observation

I would first analyze the network traffic to understand the backend orchestration.

From my experience with e-commerce applications, checkout typically involves multiple backend services such as cart validation, pricing, inventory, shipping, payment authorization, and order creation. Understanding these interactions helps identify API automation opportunities and determine the appropriate test layer for each scenario.

I would also evaluate how the application behaves when third-party services (e.g., payment gateways or shipping providers) experience failures, timeouts, or delayed responses to ensure the checkout process remains reliable.

Areas of interest include:

* Number of API requests involved during checkout
* API execution order
* Cart validation
* Price calculation
* Shipping calculation
* Payment authorization
* Order creation
* Error handling and retry mechanisms

Understanding these interactions helps identify API automation opportunities in addition to UI validation.

---


> **Note**
>
> The exploratory test ideas presented below were developed through a combination of professional experience testing e-commerce platforms and AI-assisted brainstorming. Each scenario was manually reviewed, refined, and prioritized based on risk, business impact, and practical testing experience. AI was used to broaden the range of ideas, while the final coverage strategy and prioritization reflect engineering judgment.

# Exploratory Test Ideas 

## Product Search

* Search using exact product names.
* Partial keyword search.
* Invalid search terms.
* Special characters.
* Empty search.
* Search performance with large datasets.

---

## Product Details

* Verify product description accuracy.
* Verify compatible vehicle information.
* Validate product images.
* Verify unavailable products.

---

## Vehicle Selection

* Change vehicle before selecting a product.
* Change vehicle after selecting a product.
* Verify compatible products update correctly [Cascading].
* Refresh page after vehicle change.
* Browser Back navigation.

---

# Checkout Exploratory Test Ideas

## Objective

Validate the checkout workflow from functional, integration, security, usability, and resilience perspectives to identify risks that could impact order creation, payment processing, pricing accuracy, inventory consistency, or customer experience.

---

## Cart & Inventory

* Two users attempt to purchase the last available item simultaneously.
* Verify inventory synchronization.
* Verify out-of-stock handling during checkout.

---

## Inventory & Reservation

- Verify how long an item remains reserved in the shopping cart before becoming available to other customers.
- Verify inventory is released after the reservation period expires.
- Verify inventory is released when the customer abandons checkout.
- Verify inventory is released after payment failure.
- Verify inventory is released after order cancellation.
- Verify behavior when another customer purchases the last available item before the reservation expires.


## Inventory & Stock Integrity

- Verify product inventory is reduced after a successful purchase.
- Verify inventory is not reduced when payment fails.
- Verify inventory is restored after a cancelled order.
- Verify inventory consistency across multiple browser sessions.
- Verify concurrent purchases of the last available item are handled correctly.

## Network Resilience

* Disconnect the internet immediately after clicking **Checkout**.
* Restore the connection and verify recovery.
* Simulate slow network conditions.
* Retry failed checkout requests.

---

## Security

* Attempt to modify product price through intercepted network requests.
* Attempt to modify currency values.
* Attempt to modify quantity before order submission.
* Attempt to replace product identifiers.
* Verify server-side validation rejects manipulated requests.

---

## Coupons & Promotions

* Apply a valid coupon.
* Apply the same coupon twice.
* Apply an expired coupon.
* Apply an invalid coupon.
* Apply incompatible coupons.
* Remove products after coupon application.
* Verify discount recalculation.

---

## Delivery Options

Validate checkout using:

* Home Delivery
* Pickup Point
* DPD Collection Point

Verify:

* Shipping cost
* Delivery estimation
* Available payment methods

---

## Payment Methods

### Credit Card

* Valid card
* Invalid card number
* Expired card
* Invalid CVV
* Payment cancellation
* Payment timeout

### Bank Transfer

* Valid bank information
* Invalid bank information

### Cash at Pickup

* Successful order creation

### Card on Pickup

* Verify payment option availability

### Pay Later

* Redirect to third-party provider
* Invalid email
* Invalid mobile number
* User cancels approval
* Return to merchant after approval

---

## Order Management

After successful checkout:

* Check recived order-email.
* Cancel a single order item.
* Cancel the complete order.
* Verify refund calculation.
* Verify order status updates.
* Verify confirmation email.
* Verify order history.

---

## Order & Payment Verification

- Verify the order is created only after successful payment.
- Verify payment amount matches the order total.
- Verify taxes, shipping costs, and discounts are correctly reflected in the final order.
- Verify order confirmation details match the completed purchase.

## Data Integrity

* Verify totals remain consistent throughout checkout.
* Verify tax calculation.
* Verify shipping calculation.
* Verify currency consistency.
* Verify order summary matches submitted order.

---

## Session Management

* Refresh during checkout.
* Multiple browser tabs.
* Session timeout.
* User signs out from another tab.

---

## Usability

* Browser Back button.
* Multiple clicks on **Place Order**.
* Required field validation.
* Responsive behavior.
* Accessibility observations.

---



# Conclusion

The exploratory session identified several high-risk business areas, particularly around checkout, pricing, payment processing, and inventory management.

While the automated suite focuses on representative end-to-end business scenarios, the exploratory analysis highlights additional opportunities for API testing, security validation, resilience testing, and future automation expansion.

The proposed exploratory scenarios are intended to guide future test coverage and strengthen confidence in the application's most business-critical workflows.
