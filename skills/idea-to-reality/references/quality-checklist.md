
# Product Quality Checklist

Use this checklist before describing an implementation as ready.

## Functionality

- [ ] The main user journey works end to end.
- [ ] Inputs are validated.
- [ ] Empty, loading, success, and failure states are considered.
- [ ] Buttons and links perform their stated actions.
- [ ] Data is saved and restored if persistence is promised.
- [ ] Exports contain the intended data and format.
- [ ] No placeholder behaviour is presented as a completed integration.

## Interface

- [ ] Layout works on narrow phone screens and larger displays.
- [ ] Text remains readable at normal zoom.
- [ ] Forms have clear labels.
- [ ] Controls are keyboard accessible where applicable.
- [ ] Focus indicators and semantic headings are present.
- [ ] Long content does not break the layout.
- [ ] Feedback is provided after important actions.

## Engineering

- [ ] Files and asset paths resolve correctly.
- [ ] The browser console and available tests are checked.
- [ ] Existing functionality is preserved.
- [ ] Dependencies are necessary and documented.
- [ ] Errors do not silently destroy user work.
- [ ] Compatibility assumptions are documented.

## Security and privacy

- [ ] No API keys or secrets are exposed in public files.
- [ ] Untrusted user input is not inserted as executable HTML.
- [ ] Data collection and storage are explained.
- [ ] Permissions are limited to what is needed.
- [ ] Destructive actions are appropriately confirmed.
- [ ] External integrations and their trust boundaries are documented.

## Delivery

- [ ] README explains setup and usage.
- [ ] Deployment steps match the actual architecture.
- [ ] Required external services are identified.
- [ ] Tests are labelled passed, failed, blocked, or not run.
- [ ] Known limitations are explicit.
- [ ] Next steps are prioritised by user value.

## Evidence rule

A checkbox is not evidence by itself. Record the actual test, inspection, or observation used to mark a check complete. If a check cannot be performed, label it blocked or not run.
