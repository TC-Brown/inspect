from flask import Flask, render_template
import os

app = Flask(__name__,
            static_folder=os.path.join(os.path.dirname(__file__), 'static'),
            template_folder=os.path.join(os.path.dirname(__file__), 'templates'))

@app.route('/')
def inspection():
    return render_template('inspection.html')

if __name__ == '__main__':
    app.run(debug=True)
