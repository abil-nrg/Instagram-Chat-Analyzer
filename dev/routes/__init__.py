from .words_freq import words_frequency_bp

def init_routes(app):
    app.register_blueprint(words_frequency_bp, url_prefix='/words-frequency')
