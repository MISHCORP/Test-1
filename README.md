# Test-1

Simple Bootstrap login + sign up pages (HTML/CSS/JS).

## Pages

- `index.html` — Single Page App
	- `#/login` — Login view
	- `#/signup` — Sign up view
- `signup.html` — Compatibility redirect to `index.html#/signup`

## Run locally

Option A (recommended): run a tiny local web server:

```sh
cd /home/deck/Desktop/Development/Mish/Test-1
python3 -m http.server 8000
```

Then open:

- http://localhost:8000/

Option B: open `index.html` directly in your browser (works, but some browsers apply stricter rules for local files).

## Notes

- This is demo-only auth using `localStorage` (see `assets/js/auth.js`), not production authentication.