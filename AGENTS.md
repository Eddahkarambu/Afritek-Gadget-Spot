# Project workflow

- Keep and repair this existing storefront. The application root is `afritek-gadget-spot/`; do not scaffold a replacement application.
- Commit verified iterations on a feature branch, push to the original `Eddahkarambu/Afritek-Gadget-Spot` repository, and create a pull request. The owner will merge; do not merge PRs or push directly to main.
- Check the diff for secrets, environment files, generated output and test artifacts before committing. Only the public `.env.example` belongs in git.
- Track completed features and remaining launch checks in `docs/implementation-status.md`.
- Verify meaningful changes with the application unit tests, production build and relevant Playwright scenarios.
