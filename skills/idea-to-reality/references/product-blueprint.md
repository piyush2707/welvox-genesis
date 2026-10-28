
# Product Blueprint Template

Use this template to create a concise, actionable specification for a new digital product.

## 1. Product identity

- Working name:
- One-sentence description:
- Problem:
- Primary user:
- Desired outcome:

## 2. Core promise

Complete this sentence:

"For [specific user], this product helps them [achieve outcome] without [important friction]."

Avoid claims that the product cannot yet deliver.

## 3. Primary user journey

Describe the main workflow as numbered steps:

1. Entry point:
2. User input:
3. System action:
4. Result:
5. User's next action:

Include the expected result at each step.

## 4. MVP features

For every feature, state:

- Name:
- User benefit:
- Required behaviour:
- Acceptance criteria:
- Dependencies:
- Failure or empty state:

Rank features:

- P0: required for the core journey.
- P1: useful after the core journey works.
- P2: future opportunity.

Keep the first release small enough to build and verify.

## 5. Screen inventory

For each screen, identify:

- Purpose:
- Main content:
- Primary action:
- Secondary actions:
- Loading, empty, and error states:
- Mobile layout considerations:

## 6. Data and integrations

List the data the product needs to store or process.

For each item, specify:

- Source:
- Sensitivity:
- Storage location:
- Retention:
- Required permissions:
- Failure behaviour:

Distinguish local-only functionality from shared, server-backed functionality.

## 7. Architecture

Document:

- Frontend:
- Backend, if needed:
- Storage:
- External APIs:
- Authentication, if needed:
- Hosting:
- Secrets management:
- Testing strategy:

Give the simplest viable option first. Explain alternatives only where the trade-off matters.

## 8. Acceptance criteria

Use observable statements, for example:

- Given a valid idea, when the user generates a blueprint, the application displays the agreed sections.
- Given an empty input, the application explains what the user must enter.
- Given a saved project, the user can reopen it in the supported environment.
- Given an export action, the application creates a file in the documented format.

Do not mark a criterion complete without evidence.

## 9. Delivery milestones

1. Validate the core problem.
2. Build the primary workflow.
3. Verify mobile usability and error states.
4. Add the smallest necessary persistence or integrations.
5. Test and document.
6. Deploy and collect feedback.

## 10. Risks and exclusions

List:

- Unverified assumptions.
- External service dependencies.
- Privacy and security concerns.
- Cost or hosting constraints.
- Features intentionally deferred.
- Decisions that need the user's approval.

## 11. Release definition

State exactly what version 0.1.0 can do, what it cannot do, and how someone can verify the difference.
