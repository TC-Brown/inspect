# Inspection Scorecard

Inspection Scorecard is a web application designed to help organizations maintain facility compliance and safety through structured inspections. The app provides an interactive scorecard for cleaning and facility inspection, allowing users to record, rate, and print inspection results for areas such as waiting rooms, exam rooms, restrooms, and staff areas.

## Features

- **Facility Inspection Form:** Fill out inspector name, date, and location details.
- **Dynamic Scoring Sections:** Evaluate multiple facility areas with itemized checklists (waiting room, exam rooms, restrooms, staff areas).
- **Rating System:** Score each item and calculate the overall cleanliness rating ("Excellent", "Good", or "Needs Improvement").
- **Printable Reports:** Save and print a formatted inspection report summarizing scores and notes.
- **Responsive Design:** Built with Tailwind CSS for a clean, modern UI that works on desktop and mobile.

## Technologies Used

- **Frontend:** HTML, CSS (Tailwind), JavaScript
- **Backend:** Python (Flask)
- **Templates:** Jinja2 (via Flask)
- **Assets:** Google Fonts (Inter)

## Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/TC-Brown/inspect.git
   cd inspect
   ```

2. **Install dependencies:**
   ```bash
   pip install flask
   ```

3. **Run the app:**
   ```bash
   python app.py
   ```
   The app will be available at `http://localhost:5000/`.

## Usage

- Fill out the details fields (Inspector Name, Date, Location).
- For each area, score the listed items.
- Click **Calculate Score** to see your overall rating.
- Click **Save & Print** to generate a printable report.
- Use **Reset Form** to clear all inputs and start a new inspection.

## File Structure

- `app.py` — Flask server and routing
- `templates/inspection.html` — Main HTML template
- `static/js/inspect.js` — JavaScript for dynamic scoring and actions
- `static/css/style.css` — Custom styles
- `index.html` — (For static deployment/demo)

## Customization

You can tailor the checklist areas and items by editing the `areas` array in `static/js/inspect.js`. Modify styles in `static/css/style.css` to match your branding.

## License

This project currently does not specify a license. Please contact [TC-Brown](https://github.com/TC-Brown) for usage and contribution terms.

## Author

Developed by [TC-Brown](https://github.com/TC-Brown).