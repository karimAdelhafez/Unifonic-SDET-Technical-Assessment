# AI Usage Report

## Overview

AI tools were used throughout this assessment as an engineering productivity assistant. All AI-generated suggestions were manually reviewed, validated, and selectively adopted based on engineering judgment.

The objective was to improve code quality, documentation, and design discussions rather than generate the complete solution.

---

# AI Usage Summary

| Activity          | AI Contribution                                                                      | Final Decision                                            |
| ----------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| Project Structure | Discussed folder organization and separation of concerns                             | Adopted with manual adjustments                           |
| Code Review       | Reviewed naming conventions, helper design, and code readability                     | Selectively adopted                                       |
| Documentation     | Assisted in drafting the README, Technical Design Document, and Exploratory Analysis | Manually refined and verified                             |
| Test Design       | Brainstormed exploratory test ideas and risk-based scenarios                         | Expanded and prioritized based on professional experience |
| Refactoring       | Suggested helper abstractions and implementation improvements                        | Accepted or rejected after manual review                  |

---

# AI Review Examples

## Example 1 – Helper Design

**AI Suggestion**

Introduce a reusable helper to encapsulate the product search and selection workflow.

**Decision**

Accepted.

The helper reduced duplicated business logic while keeping assertions within the test cases to maintain clear responsibilities.

---

## Example 2 – Refactoring Review

**AI Suggestion**

Refactor a helper implementation that changed the method contract by introducing an unnecessary Promise-based flow.

**Decision**

Rejected.

The suggestion unnecessarily altered the original behavior without improving maintainability. The implementation was reverted to preserve a simple and consistent API.

---

## Example 3 – Documentation

**AI Suggestion**

Generate initial drafts for the README, Technical Design Document, and Exploratory Analysis.

**Decision**

Accepted with manual refinement.

The generated content was reviewed, corrected, and tailored to accurately reflect the implemented solution without overstating the project's capabilities.

---

# Validation Process

Every AI-generated suggestion was evaluated against the following criteria before adoption:

* Correctness
* Maintainability
* Readability
* Consistency with the project architecture
* Alignment with automation best practices

Suggestions that introduced unnecessary complexity or did not provide clear value were intentionally rejected.

---

# Conclusion

AI was used as a productivity and review assistant rather than a replacement for engineering decisions. Final implementation, architecture, documentation, and validation were completed through manual analysis to ensure the submitted solution accurately represents the implemented work.
