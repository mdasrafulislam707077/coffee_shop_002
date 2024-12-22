import os
import joblib

def get_parent_directory(levels_up=0):
    current_path = os.getcwd()
    for _ in range(levels_up):
        current_path = os.path.dirname(current_path)
    return current_path

def save_model(vectorizer, tfidf_matrix, filename='model.joblib',dirname="similar"):
    save_directory = get_parent_directory(levels_up=0)
    file_path = os.path.join(save_directory,"models",dirname, filename)
    joblib.dump((vectorizer, tfidf_matrix), file_path)

def load_model(filename='model.joblib',dirname="similar"):
    load_directory = get_parent_directory(levels_up=0)
    try:
        file_path = os.path.join(load_directory,"models",dirname, filename)
        vectorizer, tfidf_matrix = joblib.load(file_path)
        return vectorizer, tfidf_matrix
    except:
        return None
    
